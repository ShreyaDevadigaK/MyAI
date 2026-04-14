import { useEffect, useRef, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { fetchUserActivities } from '@/lib/activity-service';

interface CallActivity {
  id: string;
  user_id: string;
  call_id: string;
  phone_from: string;
  phone_to: string;
  activity_type: string;
  date: string;
  time: string;
  duration: string;
  summary: string;
  created_at?: string;
}

export default function ActivityContent() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<CallActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [error, setError] = useState<string>('');
  const lastFetchedUserIdRef = useRef<string | null>(null);

  const loadActivities = async (userId: string) => {
    setLoading(true);
    try {
      const activities = await fetchUserActivities(userId);
      setData(activities);
      setError('');
      lastFetchedUserIdRef.current = userId;
    } catch (error: unknown) {
      console.error('Error fetching activities:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load call activities from database';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    if (!user?.id) {
      lastFetchedUserIdRef.current = null;
      setLoading(false);
      setError('Please sign in to view call activities');
      return;
    }

    if (lastFetchedUserIdRef.current === user.id) {
      return;
    }

    loadActivities(user.id);
  }, [isLoaded, user?.id]);

  const getActivityTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'inbound':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'outbound':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'inbound':
        return '📥';
      case 'outbound':
        return '📤';
      default:
        return '📞';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-7 gap-4 bg-purple-50 p-3 rounded-t">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-7 gap-4 p-3 border-b border-gray-200">
              {[...Array(7)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded w-20"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 mb-4">Please sign in to view call activities</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 mb-4">{error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 mb-4">No call activity found.</p>
        <p className="text-sm text-gray-400">Your call activities will appear here once you start making calls.</p>
      </div>
    );
  }

  const uniqueTypes = ['All', ...Array.from(new Set(data.map(item => item.activity_type)))];

  const filteredData = data.filter(activity => {
    const matchesSearch = 
      activity.phone_from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.phone_to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || activity.activity_type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <main>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-purple-700 mb-4 sm:mb-0">📞 Call Activity</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => user?.id && loadActivities(user.id)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Refresh
            </button>
            <input
              type="text"
              placeholder="Search by phone or summary..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-purple-300 shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-purple-100">
                <th className="border border-purple-300 px-4 py-3 text-left text-purple-800 font-semibold">Type</th>
                <th className="border border-purple-300 px-4 py-3 text-left text-purple-800 font-semibold">From</th>
                <th className="border border-purple-300 px-4 py-3 text-left text-purple-800 font-semibold">To</th>
                <th className="border border-purple-300 px-4 py-3 text-left text-purple-800 font-semibold">Summary</th>
                <th className="border border-purple-300 px-4 py-3 text-left text-purple-800 font-semibold">Date</th>
                <th className="border border-purple-300 px-4 py-3 text-left text-purple-800 font-semibold">Time</th>
                <th className="border border-purple-300 px-4 py-3 text-left text-purple-800 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((activity, idx) => (
                <tr key={activity.id || idx} className="hover:bg-purple-50 transition-colors">
                  <td className="border border-purple-200 px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getActivityTypeColor(activity.activity_type)}`}>
                      {getActivityIcon(activity.activity_type)} {activity.activity_type}
                    </span>
                  </td>
                  <td className="border border-purple-200 px-4 py-3">
                    <div className="text-sm text-gray-700">{activity.phone_from || 'N/A'}</div>
                  </td>
                  <td className="border border-purple-200 px-4 py-3">
                    <div className="text-sm text-gray-700">{activity.phone_to || 'N/A'}</div>
                  </td>
                  <td className="border border-purple-200 px-4 py-3 text-gray-900">
                    {activity.summary || 'N/A'}
                  </td>
                  <td className="border border-purple-200 px-4 py-3 text-gray-900">
                    {activity.date || 'N/A'}
                  </td>
                  <td className="border border-purple-200 px-4 py-3 text-gray-900">
                    {activity.time || 'N/A'}
                  </td>
                  <td className="border border-purple-200 px-4 py-3 text-sm text-gray-500">
                    {activity.duration || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No activities match your search criteria.
          </div>
        )}
      </div>
    </main>
  );
}
