import React, { useState } from 'react';
import { fetchHCBTransactions, fetchHCBOrganization, HCB_ORGANIZATIONS, HCBTransaction } from '../../services/hcbApi';
import { useQuery } from '@tanstack/react-query';
import { Loader2,DollarSign } from 'lucide-react';
interface TerminalBankDataProps {
  initialOrgSlug?: string;
}

export const TerminalBankData: React.FC<TerminalBankDataProps> = ({ initialOrgSlug = 'hq' }) => {
  const [selectedOrg, setSelectedOrg] = useState(initialOrgSlug);

  const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = useQuery({
    queryKey: ['hcb-transactions', selectedOrg],
    queryFn: () => fetchHCBTransactions(selectedOrg),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: organization, isLoading: isLoadingOrg, error: orgError } = useQuery({
    queryKey: ['hcb-organization', selectedOrg],
    queryFn: () => fetchHCBOrganization(selectedOrg),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoadingTransactions || isLoadingOrg) {
    return (
      <div className="terminal-card mb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-hack-blue rounded-full mr-2"></div>
          <h3 className="text-hack-blue font-mono text-sm">HCB_TRANSACTIONS.log</h3>
        </div>
        <div className="flex justify-center items-center h-32">
          <Loader2 className="h-6 w-6 text-hack-blue animate-spin" />
          <span className="ml-2 text-terminal-text">Loading bank data...</span>
        </div>
      </div>
    );
  }

  if (transactionsError || orgError || !transactions || !organization) {
    return (
      <div className="terminal-card mb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-hack-red rounded-full mr-2"></div>
          <h3 className="text-hack-red font-mono text-sm">ERROR</h3>
        </div>
        <div className="p-2 border border-hack-red/30 rounded">
          <p className="text-terminal-text">Failed to load bank data. Try refreshing.</p>
          <p className="text-terminal-muted text-xs mt-1">
            <span className="text-hack-green">$</span> <span className="italic">run bank.sh --retry</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-hack-blue rounded-full mr-2"></div>
          <h3 className="text-hack-blue font-mono text-sm">HCB_TRANSACTIONS.log</h3>
        </div>
        <select
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
          className="bg-terminal-bg border border-terminal-accent/20 rounded px-2 py-1 text-xs text-terminal-text text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {HCB_ORGANIZATIONS.map(org => (
            <option key={org.slug} value={org.slug}>
              {org.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="p-2 border border-terminal-accent/20 rounded bg-terminal-bg/80">
        <div className="flex justify-between items-center mb-3">
          <div className="text-hack-green font-mono text-sm">Organization: {organization.name}</div>
          <div className="font-mono text-sm">
            <span className="text-terminal-muted">Balance: </span>
            <span className="text-hack-green">${(organization.balances.balance_cents / 100).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="space-y-2 max-h-[160px] overflow-y-auto scrollbar-thin">
          {transactions.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id} 
              className={`p-2 rounded flex items-start gap-2 ${
                transaction.amount_cents > 0 ? 'bg-hack-green/10' : 'bg-hack-red/10'
              }`}
            >
              <div className={`p-1 rounded-full ${
                transaction.amount_cents > 0 ? 'bg-hack-green/20' : 'bg-hack-red/20'
              }`}>
                <DollarSign size={14} className={
                  transaction.amount_cents > 0 ? 'text-hack-green' : 'text-hack-red'
                } />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="text-terminal-text text-xs">{transaction.memo}</div>
                  <div className={`font-mono text-xs ${
                    transaction.amount_cents > 0 ? 'text-hack-green' : 'text-hack-red'
                  }`}>
                    {transaction.amount_cents > 0 ? '+' : '-'}${Math.abs(transaction.amount_cents / 100).toLocaleString()}
                  </div>
                </div>
                <div className="text-terminal-muted text-xs">
                  {new Date(transaction.date).toLocaleDateString()}
                  {transaction.pending && ' (Pending)'}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 text-terminal-muted text-xs pt-2 border-t border-terminal-accent/20">
          <span className="text-hack-green">$</span> <span className="italic">Run 'hcb --org=&lt;slug&gt;' to view other organizations</span>
        </div>
      </div>
    </div>
  );
};

