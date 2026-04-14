type TabsProps = {
  selectedTab: string
  onTabChange: (tab: string) => void
}

const Tabs = ({ selectedTab, onTabChange }: TabsProps) => {
  const tabs = [
    'Training Guide',
    // 'Knowledge Base',
    'Agent Greeting',
    'Chat Simulation',
    'Call Transfers',
    // 'More Settings',
  ]

  return (
    <div className="flex space-x-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            selectedTab === tab
              ? 'text-white-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-purple-600'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default Tabs
