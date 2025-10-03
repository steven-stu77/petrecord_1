import React, { useState } from 'react';

export const SummaryGraphs = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('behavior');

  // Mock data for demonstration
  const behaviorData = [
    { date: '2024-09-15', aggressive: 2, playful: 8, anxious: 3 },
    { date: '2024-09-20', aggressive: 1, playful: 12, anxious: 2 },
    { date: '2024-09-25', aggressive: 3, playful: 10, anxious: 4 },
    { date: '2024-09-30', aggressive: 1, playful: 15, anxious: 2 },
    { date: '2024-10-05', aggressive: 0, playful: 18, anxious: 1 }
  ];

  const healthMetrics = [
    { metric: 'Weight', value: 85, unit: 'lbs', trend: 'stable' },
    { metric: 'Temperature', value: 101.2, unit: '°F', trend: 'normal' },
    { metric: 'Heart Rate', value: 120, unit: 'bpm', trend: 'good' },
    { metric: 'Activity Level', value: 75, unit: '%', trend: 'up' }
  ];

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '✅';
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Summary Graphs & Analytics</h1>
        <p className="text-gray-600">Visual insights into your pets' health and behavior patterns</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Metric Type</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="behavior">Behavior Patterns</option>
              <option value="health">Health Metrics</option>
              <option value="activity">Activity Levels</option>
              <option value="training">Training Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Behavior Chart Simulation */}
      {selectedMetric === 'behavior' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Behavior Patterns Over Time</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-lg font-medium">Interactive Chart Would Appear Here</p>
              <p className="text-sm">Showing behavior trends: Playful, Aggressive, Anxious</p>
            </div>
          </div>
          
          {/* Data Table */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Data Points</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Playful</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aggressive</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Anxious</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {behaviorData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{data.date}</td>
                      <td className="px-4 py-3 text-sm text-green-600 font-medium">{data.playful}</td>
                      <td className="px-4 py-3 text-sm text-red-600 font-medium">{data.aggressive}</td>
                      <td className="px-4 py-3 text-sm text-yellow-600 font-medium">{data.anxious}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Health Metrics */}
      {selectedMetric === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">{metric.metric}</h3>
                <span className={`text-2xl ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
              </div>
              <div className={`text-sm ${getTrendColor(metric.trend)} capitalize`}>
                {metric.trend} trend
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Most Active Pet</h3>
          <div className="flex items-center">
            <div className="text-4xl mr-4">🐕</div>
            <div>
              <p className="text-xl font-bold text-gray-900">Buddy</p>
              <p className="text-sm text-gray-500">Golden Retriever</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Behavior Alerts</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">2</p>
            <p className="text-sm text-gray-500">Require attention</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Health Score</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">92%</p>
            <p className="text-sm text-gray-500">Excellent</p>
          </div>
        </div>
      </div>

      {/* Chart Placeholder for other metrics */}
      {selectedMetric !== 'behavior' && selectedMetric !== 'health' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 capitalize">{selectedMetric} Analytics</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-lg font-medium">{selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Chart</p>
              <p className="text-sm">Interactive visualization for {selectedMetric} data</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};