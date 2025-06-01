import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { ChevronDown, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { fetchHCBTransactions, fetchHCBOrganization, HCB_ORGANIZATIONS } from '../../services/hcbApi';

interface HCBTransaction {
  id: string;
  amount_cents: number;
  memo: string;
  date: string;
  pending: boolean;
  type: string;
}

interface HCBOrganization {
  id: string;
  name: string;
  balances: {
    balance_cents: number;
    total_raised: number;
  };
}

const initialOrgSlug = 'hq';

export const HackClubBankStats = () => {
  const [selectedOrg, setSelectedOrg] = useState(initialOrgSlug);

  const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = useQuery<HCBTransaction[]>({
    queryKey: ['hcb-transactions', selectedOrg],
    queryFn: () => fetchHCBTransactions(selectedOrg),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const { data: organization, isLoading: isLoadingOrg, error: orgError } = useQuery<HCBOrganization>({
    queryKey: ['hcb-organization', selectedOrg],
    queryFn: () => fetchHCBOrganization(selectedOrg),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount / 100); // Convert cents to dollars
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isLoading = isLoadingTransactions || isLoadingOrg;
  const error = transactionsError || orgError;

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
          <select 
            className="bg-gray-800 text-blue-400 border-2 border-blue-600 rounded px-3 py-1 font-mono text-sm appearance-none pr-8"
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
          >
            {HCB_ORGANIZATIONS.map(org => (
              <option key={org.slug} value={org.slug}>
                {org.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-blue-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Balance */}
      <div className="mb-6 border-2 border-blue-600 p-4 rounded bg-gray-800">
        <div className="text-gray-400 font-mono text-sm mb-1">Current Balance</div>
        <div className="text-blue-400 font-mono text-3xl">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : error ? (
            <span className="text-red-400">Error loading balance</span>
          ) : (
            formatCurrency(organization?.balances.balance_cents || 0)
          )}
        </div>
      </div>

      {/* Total Raised */}
      <div className="mb-6 border-2 border-blue-600 p-4 rounded bg-gray-800">
        <div className="flex items-center">
          <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-3xl font-bold text-blue-400">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : error ? (
              <span className="text-red-400">Error loading total raised</span>
            ) : (
              formatCurrency(organization?.balances.total_raised || 0)
            )}
          </span>
        </div>
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-gray-400 font-mono text-center py-4">Loading transactions...</div>
        ) : error ? (
          <div className="text-red-400 font-mono text-center py-4">Error loading transactions</div>
        ) : transactions?.length === 0 ? (
          <div className="text-gray-400 font-mono text-center py-4">No transactions found</div>
        ) : (
          transactions?.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-gray-800 rounded border-2 border-blue-600"
            >
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${
                  transaction.amount_cents > 0 ? 'bg-green-500' : 'bg-red-500'
                } mr-2`}></div>
                <span className="text-blue-400 font-mono">{transaction.memo}</span>
              </div>
              <div className="text-gray-400 font-mono text-sm border border-blue-600 rounded px-2 py-1">
                <span className="mr-2">{formatDate(transaction.date)}</span>
                <span className={transaction.amount_cents > 0 ? 'text-green-400' : 'text-red-400'}>
                  {formatCurrency(transaction.amount_cents)}
                  {transaction.pending && ' (Pending)'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
