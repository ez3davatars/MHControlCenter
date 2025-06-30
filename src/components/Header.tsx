import React from 'react';
import { Brain, Wifi, WifiOff, Loader } from 'lucide-react';

interface HeaderProps {
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-5 h-5 text-green-400" />;
      case 'connecting':
        return <Loader className="w-5 h-5 text-yellow-400 animate-spin" />;
      default:
        return <WifiOff className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      default:
        return 'Disconnected';
    }
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">NeuroSync Control Center</h1>
          <p className="text-gray-400">MetaHuman Interactive Experience</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
        {getStatusIcon()}
        <span className="text-sm font-medium text-gray-300">{getStatusText()}</span>
      </div>
    </header>
  );
};

export default Header;