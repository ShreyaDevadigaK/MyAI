"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

interface AgentConfigLayoutProps {
  children: ReactNode;
}

const AgentConfigLayout: React.FC<AgentConfigLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [selectedMenu] = useState<string>("agent-configuration");

  const sidebarItems = [
    { id: "my-agent", label: "My Agent" },
    { id: "agent-configuration", label: "My Agent Configuration" },
    { id: "activity", label: "Activity" },
    { id: "call-transfer", label: "Call Transfers" },
    { id: "calendar", label: "My Calendar" },
    { id: "profile", label: "Profile" },
    { id: "subscription", label: "Subscription" },
  ];

  const handleNavigation = (itemId: string) => {
    if (itemId === "agent-configuration") {
      // Stay on current page
      return;
    }
    router.push(`/Dashboard?section=${itemId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <nav className="w-56 bg-gradient-to-b from-purple-800 to-purple-900 text-white flex flex-col shadow-lg">
        <div className="p-6 font-bold text-2xl border-b border-purple-700 tracking-wide">
          MYAI
        </div>

        <ul className="flex-1 mt-4 space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                className={`w-full text-left px-6 py-3 rounded-l-full transition-all duration-200 ${
                  item.id === selectedMenu
                    ? "bg-white text-purple-800 font-semibold shadow-md"
                    : "hover:bg-purple-700"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Logout button */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center justify-start px-6 py-3 mb-6 ml-2 text-white hover:bg-purple-700 transition-all"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            ></path>
          </svg>
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1 bg-white p-10 shadow-inner rounded-tl-3xl">
        {children}
      </main>
    </div>
  );
};

export default AgentConfigLayout;
