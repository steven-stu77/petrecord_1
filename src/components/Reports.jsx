import React, { useState } from 'react';

export const Reports = () => {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedPet, setSelectedPet] = useState('');
  
  const pets = ['All Pets', 'Buddy', 'Bella', 'Max'];
  const reportTypes = [
    { value: 'behavior-summary', label: 'Behavior Summary Report' },
    { value: 'health-records', label: 'Health Records Report' },
    { value: 'activity-log', label: 'Activity Log Report' },
    { value: 'training-progress', label: 'Training Progress Report' }
  ];

  const sampleReports = [
    { id: 1, name: 'Monthly Behavior Report - September', type: 'Behavior Summary', date: '2024-10-01', pet: 'All Pets' },
    { id: 2, name: 'Buddy Health Check Report', type: 'Health Records', date: '2024-09-28', pet: 'Buddy' },
    { id: 3, name: 'Training Progress - Week 40', type: 'Training Progress', date: '2024-09-25', pet: 'Bella' }
  ];

  const handleGenerateReport = () => {
    if (!reportType) {
      alert('Please select a report type');
      return;
    }
    // Simulate report generation
    alert(`Generating ${reportTypes.find(r => r.value === reportType)?.label} for ${selectedPet || 'All Pets'}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate and view comprehensive pet reports</p>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Report Type</option>
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pet</label>
            <select
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Pets</option>
              {pets.slice(1).map((pet) => (
                <option key={pet} value={pet}>{pet}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateReport}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Generate Report
        </button>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Reports</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.pet}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">📄 View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">📥 Download</button>
                    <button className="text-red-600 hover:text-red-900">🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Reports</h3>
          <p className="text-3xl font-bold text-blue-600">23</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">This Month</h3>
          <p className="text-3xl font-bold text-green-600">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Avg. per Week</h3>
          <p className="text-3xl font-bold text-purple-600">2</p>
        </div>
      </div>
    </div>
  );
};