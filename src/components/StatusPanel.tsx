import React from 'react';
import { Activity, Cpu, MemoryStick as Memory, Network, HardDrive, Clock, Users, MessageSquare } from 'lucide-react';

interface StatusPanelProps {
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

const StatusPanel: React.FC<StatusPanelProps> = ({ connectionStatus }) => {
  const systemStats = {
    cpuUsage: 45,
    memoryUsage: 68,
    networkLatency: 12,
    uptime: '2h 34m',
    activeConnections: 3,
    messagesProcessed: 127,
  };

  const services = [
    { name: 'ChatGPT API', status: 'connected', latency: 89 },
    { name: 'ElevenLabs API', status: 'connected', latency: 156 },
    { name: 'Unreal TCP', status: 'connected', latency: 5 },
    { name: 'Local API Server', status: 'connected', latency: 2 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'connecting': return 'text-yellow-400';
      default: return 'text-red-400';
    }
  };

  const StatCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    value: string | number;
    unit?: string;
    color?: string;
  }> = ({ icon, title, value, unit = '', color = 'text-white' }) => (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-lg bg-gray-700/50 ${color}`}>
          {icon}
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${color}`}>{value}{unit}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Cpu className="w-5 h-5" />}
          title="CPU Usage"
          value={systemStats.cpuUsage}
          unit="%"
          color="text-blue-400"
        />
        <StatCard
          icon={<Memory className="w-5 h-5" />}
          title="Memory Usage"
          value={systemStats.memoryUsage}
          unit="%"
          color="text-purple-400"
        />
        <StatCard
          icon={<Network className="w-5 h-5" />}
          title="Network Latency"
          value={systemStats.networkLatency}
          unit="ms"
          color="text-green-400"
        />
        <StatCard
          icon={<Clock className="w-5 h-5" />}
          title="Uptime"
          value={systemStats.uptime}
          color="text-yellow-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Status */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Service Status
          </h2>
          
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${service.status === 'connected' ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-gray-300">{service.name}</span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${getStatusColor(service.status)}`}>
                    {service.status}
                  </span>
                  <p className="text-xs text-gray-400">{service.latency}ms</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Usage Statistics
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Active Connections</span>
              </div>
              <span className="text-lg font-semibold text-blue-400">{systemStats.activeConnections}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Messages Processed</span>
              </div>
              <span className="text-lg font-semibold text-green-400">{systemStats.messagesProcessed}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <HardDrive className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Storage Used</span>
              </div>
              <span className="text-lg font-semibold text-purple-400">2.4 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Performance Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Response Time Trend</h3>
            <div className="h-32 bg-gray-900/50 rounded-lg border border-gray-600 flex items-center justify-center">
              <p className="text-gray-400">Chart Placeholder</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">System Load</h3>
            <div className="h-32 bg-gray-900/50 rounded-lg border border-gray-600 flex items-center justify-center">
              <p className="text-gray-400">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Logs */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent System Logs</h2>
        
        <div className="bg-gray-900/50 rounded-lg border border-gray-600 p-4 font-mono text-sm max-h-64 overflow-y-auto">
          <div className="space-y-1">
            <p className="text-green-400">[2025-01-12 14:23:45] INFO: ChatGPT API connection established</p>
            <p className="text-blue-400">[2025-01-12 14:23:44] INFO: ElevenLabs API authenticated successfully</p>
            <p className="text-yellow-400">[2025-01-12 14:23:43] WARN: High memory usage detected (68%)</p>
            <p className="text-green-400">[2025-01-12 14:23:42] INFO: Unreal TCP listener started on port 8080</p>
            <p className="text-blue-400">[2025-01-12 14:23:41] INFO: Local API server initialized</p>
            <p className="text-gray-400">[2025-01-12 14:23:40] DEBUG: Loading animation presets</p>
            <p className="text-green-400">[2025-01-12 14:23:39] INFO: NeuroSync Control Center started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;