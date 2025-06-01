import React from 'react';
import { ChevronDown } from 'lucide-react';

export const TransactionLogSection = () => {
  return (
    <div className="bg-gray-900 border-4 border-blue-600 rounded-lg p-6 shadow-lg shadow-blue-600/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-blue-600 pb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <h2 className="text-blue-400 font-mono text-lg">HCB_TRANSACTIONS.log</h2>
        </div>
        
        {/* Dropdown */}
        <div className="relative">
          <select className="bg-gray-800 text-blue-400 border-2 border-blue-600 rounded px-3 py-1 font-mono text-sm appearance-none pr-8">
            <option>Hack Club HQ</option>
          </select>
          <ChevronDown className="w-4 h-4 text-blue-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Balance */}
      <div className="mb-6 border-2 border-blue-600 p-4 rounded bg-gray-800">
        <div className="text-gray-400 font-mono text-sm mb-1">Current Balance</div>
        <div className="text-blue-400 font-mono text-3xl">$4,340.595</div>
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded border-2 border-red-600">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            <span className="text-red-400 font-mono">DigitalOcean</span>
          </div>
          <div className="text-gray-400 font-mono text-sm border border-red-600 rounded px-2 py-1">
            <span className="mr-2">2024-03-15 14:30</span>
            <span className="text-red-400">(Pending)</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 