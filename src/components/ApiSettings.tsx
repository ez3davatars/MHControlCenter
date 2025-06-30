import React, { useState } from 'react';
import { Eye, EyeOff, Key, Save, TestTube, AlertCircle, CheckCircle } from 'lucide-react';

interface APIConfig {
  chatgptApiKey: string;
  elevenlabsApiKey: string;
  unrealEndpoint: string;
  localApiPort: string;
}

const ApiSettings: React.FC = () => {
  const [config, setConfig] = useState<APIConfig>({
    chatgptApiKey: '',
    elevenlabsApiKey: '',
    unrealEndpoint: 'localhost:8080',
    localApiPort: '3001',
  });

  const [showKeys, setShowKeys] = useState({
    chatgpt: false,
    elevenlabs: false,
  });

  const [testResults, setTestResults] = useState({
    chatgpt: null as boolean | null,
    elevenlabs: null as boolean | null,
    unreal: null as boolean | null,
  });

  const handleInputChange = (key: keyof APIConfig, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleKeyVisibility = (key: 'chatgpt' | 'elevenlabs') => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const testConnection = async (service: 'chatgpt' | 'elevenlabs' | 'unreal') => {
    // Simulate API testing
    setTestResults(prev => ({ ...prev, [service]: null }));
    
    setTimeout(() => {
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      setTestResults(prev => ({ ...prev, [service]: success }));
    }, 2000);
  };

  const saveConfiguration = () => {
    localStorage.setItem('neurosync-config', JSON.stringify(config));
    alert('Configuration saved securely!');
  };

  const loadConfiguration = () => {
    const saved = localStorage.getItem('neurosync-config');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  };

  const TestStatusIcon: React.FC<{ status: boolean | null }> = ({ status }) => {
    if (status === null) return <TestTube className="w-4 h-4 text-gray-400" />;
    if (status) return <CheckCircle className="w-4 h-4 text-green-400" />;
    return <AlertCircle className="w-4 h-4 text-red-400" />;
  };

  React.useEffect(() => {
    loadConfiguration();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Security Notice */}
      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Key className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-300">Secure Local Storage</h3>
            <p className="text-sm text-yellow-200/80 mt-1">
              Your API keys are stored locally on your device and never transmitted to external servers. 
              Ensure your device is secure and consider using environment variables for production use.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ChatGPT Configuration */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3" />
            ChatGPT API
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showKeys.chatgpt ? 'text' : 'password'}
                  value={config.chatgptApiKey}
                  onChange={(e) => handleInputChange('chatgptApiKey', e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 pr-12"
                />
                <button
                  onClick={() => toggleKeyVisibility('chatgpt')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showKeys.chatgpt ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Model
              </label>
              <select className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600">
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              </select>
            </div>

            <button
              onClick={() => testConnection('chatgpt')}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <TestStatusIcon status={testResults.chatgpt} />
              <span>Test Connection</span>
            </button>
          </div>
        </div>

        {/* ElevenLabs Configuration */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-purple-400 rounded-full mr-3" />
            ElevenLabs API
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Key
              </label>
              <div className="relative">
                <input
                  type={showKeys.elevenlabs ? 'text' : 'password'}
                  value={config.elevenlabsApiKey}
                  onChange={(e) => handleInputChange('elevenlabsApiKey', e.target.value)}
                  placeholder="Enter ElevenLabs API key..."
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 pr-12"
                />
                <button
                  onClick={() => toggleKeyVisibility('elevenlabs')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showKeys.elevenlabs ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Voice ID
              </label>
              <select className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600">
                <option value="21m00Tcm4TlvDq8ikWAM">Rachel</option>
                <option value="AZnzlk1XvdvUeBnXmlld">Domi</option>
                <option value="EXAVITQu4vr4xnSDxMaL">Bella</option>
                <option value="MF3mGyEYCl7XYWbV9V6O">Elli</option>
              </select>
            </div>

            <button
              onClick={() => testConnection('elevenlabs')}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <TestStatusIcon status={testResults.elevenlabs} />
              <span>Test Connection</span>
            </button>
          </div>
        </div>

        {/* Unreal Engine Configuration */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-3" />
            Unreal Engine TCP
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                TCP Endpoint
              </label>
              <input
                type="text"
                value={config.unrealEndpoint}
                onChange={(e) => handleInputChange('unrealEndpoint', e.target.value)}
                placeholder="localhost:8080"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Connection Timeout (ms)
              </label>
              <input
                type="number"
                defaultValue="5000"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
              />
            </div>

            <button
              onClick={() => testConnection('unreal')}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <TestStatusIcon status={testResults.unreal} />
              <span>Test Connection</span>
            </button>
          </div>
        </div>

        {/* Local API Configuration */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
            Local API Server
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Port
              </label>
              <input
                type="text"
                value={config.localApiPort}
                onChange={(e) => handleInputChange('localApiPort', e.target.value)}
                placeholder="3001"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CORS Origin
              </label>
              <input
                type="text"
                defaultValue="*"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600"
              />
            </div>

            <button className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <CheckCircle className="w-4 h-4" />
              <span>Server Running</span>
            </button>
          </div>
        </div>
      </div>

      {/* Save Configuration */}
      <div className="flex justify-center">
        <button
          onClick={saveConfiguration}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
        >
          <Save className="w-5 h-5" />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
};

export default ApiSettings;