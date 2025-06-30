import React, { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import ChatInterface from './components/ChatInterface';
import AnimationControls from './components/AnimationControls';
import ApiSettings from './components/ApiSettings';
import StatusPanel from './components/StatusPanel';

type TabType = 'chat' | 'controls' | 'settings' | 'status';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface />;
      case 'controls':
        return <AnimationControls />;
      case 'settings':
        return <ApiSettings />;
      case 'status':
        return <StatusPanel connectionStatus={connectionStatus} />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-6">
        <Header connectionStatus={connectionStatus} />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="mt-6">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}

export default App;