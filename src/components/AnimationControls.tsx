import React, { useState } from 'react';
import { RotateCcw, Save, Upload } from 'lucide-react';

interface AnimationSettings {
  facialIntensity: number;
  lipSyncIntensity: number;
  bodyIntensity: number;
  eyeMovement: number;
  headRotation: number;
  gestureFrequency: number;
  emotionalRange: number;
  breathingIntensity: number;
}

const AnimationControls: React.FC = () => {
  const [settings, setSettings] = useState<AnimationSettings>({
    facialIntensity: 75,
    lipSyncIntensity: 80,
    bodyIntensity: 60,
    eyeMovement: 70,
    headRotation: 50,
    gestureFrequency: 65,
    emotionalRange: 85,
    breathingIntensity: 40,
  });

  const handleSliderChange = (key: keyof AnimationSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings({
      facialIntensity: 75,
      lipSyncIntensity: 80,
      bodyIntensity: 60,
      eyeMovement: 70,
      headRotation: 50,
      gestureFrequency: 65,
      emotionalRange: 85,
      breathingIntensity: 40,
    });
  };

  const savePreset = () => {
    // Save current settings as preset
    console.log('Saving preset:', settings);
  };

  const loadPreset = () => {
    // Load preset settings
    console.log('Loading preset');
  };

  const SliderControl: React.FC<{
    label: string;
    value: number;
    onChange: (value: number) => void;
    unit?: string;
  }> = ({ label, value, onChange, unit = '%' }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-sm text-purple-400 font-mono">{value}{unit}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg pointer-events-none transition-all duration-200"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Facial Controls */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          Facial Animation
          <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </h2>
        
        <div className="space-y-6">
          <SliderControl
            label="Overall Facial Intensity"
            value={settings.facialIntensity}
            onChange={(value) => handleSliderChange('facialIntensity', value)}
          />
          
          <SliderControl
            label="Lip Sync Precision"
            value={settings.lipSyncIntensity}
            onChange={(value) => handleSliderChange('lipSyncIntensity', value)}
          />
          
          <SliderControl
            label="Eye Movement"
            value={settings.eyeMovement}
            onChange={(value) => handleSliderChange('eyeMovement', value)}
          />
          
          <SliderControl
            label="Emotional Range"
            value={settings.emotionalRange}
            onChange={(value) => handleSliderChange('emotionalRange', value)}
          />
        </div>
      </div>

      {/* Body Controls */}
      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          Body Animation
          <div className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        </h2>
        
        <div className="space-y-6">
          <SliderControl
            label="Body Movement Intensity"
            value={settings.bodyIntensity}
            onChange={(value) => handleSliderChange('bodyIntensity', value)}
          />
          
          <SliderControl
            label="Head Rotation"
            value={settings.headRotation}
            onChange={(value) => handleSliderChange('headRotation', value)}
          />
          
          <SliderControl
            label="Gesture Frequency"
            value={settings.gestureFrequency}
            onChange={(value) => handleSliderChange('gestureFrequency', value)}
          />
          
          <SliderControl
            label="Breathing Intensity"
            value={settings.breathingIntensity}
            onChange={(value) => handleSliderChange('breathingIntensity', value)}
          />
        </div>
      </div>

      {/* Presets & Actions */}
      <div className="space-y-6">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Animation Presets</h2>
          
          <div className="space-y-3">
            <button className="w-full p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Realistic (Default)
            </button>
            <button className="w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Subtle & Natural
            </button>
            <button className="w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Expressive & Dynamic
            </button>
            <button className="w-full p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              Minimal Movement
            </button>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Actions</h2>
          
          <div className="space-y-3">
            <button
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Defaults</span>
            </button>
            
            <button
              onClick={savePreset}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save as Preset</span>
            </button>
            
            <button
              onClick={loadPreset}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Load Preset</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Live Preview</h2>
          <div className="aspect-video bg-gray-900 rounded-lg border border-gray-600 flex items-center justify-center">
            <p className="text-gray-400">MetaHuman Preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationControls;