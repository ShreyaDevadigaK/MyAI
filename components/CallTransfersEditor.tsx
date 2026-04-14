'use client'

import { useState, useEffect } from 'react'

interface CallTransfer {
  id: string
  phoneNumber: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export default function CallTransfersEditor() {
  const [phoneInput, setPhoneInput] = useState('')
  const [transfers, setTransfers] = useState<CallTransfer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const STORAGE_KEY = 'call_transfers_local'

  // Load transfers from localStorage on component mount
  useEffect(() => {
    try {
      setLoading(true)
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      setTransfers(Array.isArray(parsed) ? parsed : [])
      setError(null)
    } catch {
      setError('Failed to load transfers')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveLocal = (items: CallTransfer[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }

  const reloadLocal = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      setTransfers(Array.isArray(parsed) ? parsed : [])
      setError(null)
    } catch {
      setError('Failed to load transfers')
    }
  }

  const handleAddTransfer = async () => {
    const trimmed = phoneInput.trim()
    if (!trimmed) return

    try {
      const now = new Date().toISOString()
      const newItem: CallTransfer = {
        id: `${Date.now()}`,
        phoneNumber: trimmed,
        createdAt: now,
        updatedAt: now,
        isActive: transfers.length === 0 ? true : false,
      }
      const updated = [newItem, ...transfers]
      setTransfers(updated)
      saveLocal(updated)
      setPhoneInput('')
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transfer')
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const updated = transfers.map(t => t.id === id ? { ...t, isActive: !currentStatus, updatedAt: new Date().toISOString() } : t)
      setTransfers(updated)
      saveLocal(updated)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update transfer')
    }
  }

  const handleDelete = (id: string) => {
    const updated = transfers.filter(t => t.id !== id)
    setTransfers(updated)
    saveLocal(updated)
  }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-100 p-6">
  //       <div className="bg-white rounded-lg shadow-md p-6">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
  //           <p className="mt-2 text-gray-600">Loading call transfers...</p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

if (loading) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        
        {/* Header */}
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-40 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-60 mb-6"></div>

          {/* Input and Button row */}
          <div className="flex gap-4 mb-6">
            <div className="h-10 bg-gray-200 rounded flex-1"></div>
            <div className="h-10 bg-gray-300 rounded w-40"></div>
          </div>

          {/* Table header skeleton */}
          <div className="grid grid-cols-4 gap-4 bg-gray-50 p-3 rounded">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Table rows skeleton */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4 p-3 border-b border-gray-100"
            >
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
            <button 
              onClick={reloadLocal}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">📲Call Transfer</h1>
        <p className="text-sm text-gray-600 mb-4">Configure when and how to transfer calls.</p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            placeholder="Enter phone number"
            className="flex-1 border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddTransfer}
            disabled={!phoneInput.trim()}
            className="bg-purple-600 text-white text-sm px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
          >
            Add Call Transfer
          </button>
        </div>

        {transfers.length === 0 ? (
          <div className="border rounded p-6 text-center text-gray-400 text-sm">
            No call transfers found
          </div>
        ) : (
          <table className="w-full text-sm border rounded overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">Phone Number</th>
                <th className="text-left p-3 border-b">Status</th>
                <th className="text-left p-3 border-b">Created</th>
                <th className="text-left p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">
                    <span className={!transfer.isActive ? ' text-gray-500' : ''}>
                      {transfer.phoneNumber}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    {!transfer.isActive ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-3 border-b text-xs text-gray-600">
                    {new Date(transfer.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b space-x-3">
                    <button
                      onClick={() => handleToggleActive(transfer.id, transfer.isActive)}
                      className={`text-sm px-3 py-1 rounded ${
                        transfer.isActive 
                          ? ' text-red-700'
                          : ' text-green-700 '
                      }`}
                    >
                      {transfer.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(transfer.id)}
                      className="text-sm px-3 py-1 rounded text-gray-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
