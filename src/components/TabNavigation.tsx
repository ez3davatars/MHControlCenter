import React from 'react';
import { MessageSquare, Sliders, Settings, Activity } from 'lucide-react';

type TabType = 'chat' | 'controls' | 'settings' | 'status';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'chat' as TabType, label: 'Chat Interface', icon: MessageSquare },
    { id: 'controls' as TabType, label: 'Animation Controls', icon: Sliders },
    { id: 'settings' as TabType, label: 'API Settings', icon: Settings },
    { id: 'status' as TabType, label: 'System Status', icon: Activity },
  ];

  return (
    <nav className="flex space-x-1 bg-gray-800/30 backdrop-blur-sm p-2 rounded-xl border border-gray-700">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default TabNavigation;