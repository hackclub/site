
import api from './api';

// Types for HCB data
export interface HCBOrganization {
  id: string;
  name: string;
  balance: number;
  created_at: string;
}

export interface HCBTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  memo?: string;
  category?: string;
}

export interface HCBStats {
  organization: HCBOrganization;
  totalDonations: number;
  recentTransactions: HCBTransaction[];
  isLoading: boolean;
  error: string | null;
}

// Base URL for our secure backend API that proxies HCB requests
// In a real implementation, this would be your own secure backend endpoint
const SECURE_API_ENDPOINT = '/api/hcb'; 

/**
 * Fetches HCB stats through our secure backend API
 * The backend is responsible for securely authenticating with HCB
 */
export const fetchHCBStats = async (): Promise<HCBStats> => {
  try {
    const [orgResponse, transactionsResponse] = await Promise.all([
      api.get(`${SECURE_API_ENDPOINT}/organization`),
      api.get(`${SECURE_API_ENDPOINT}/transactions`)
    ]);

    const organization = orgResponse.data;
    const transactions = transactionsResponse.data;
    
    // Calculate total donations (only credit transactions)
    const totalDonations = transactions
      .filter((tx: HCBTransaction) => tx.type === 'credit')
      .reduce((sum: number, tx: HCBTransaction) => sum + tx.amount, 0);
    
    // Get recent transactions (last 5)
    const recentTransactions = transactions.slice(0, 5);
    
    return {
      organization,
      totalDonations,
      recentTransactions,
      isLoading: false,
      error: null
    };
  } catch (error) {
    console.error('Error fetching HCB stats:', error);
    
    // In development mode, provide fallback data for testing
    if (process.env.NODE_ENV === 'development') {
      return {
        organization: {
          id: 'hq',
          name: 'Hack Club HQ',
          balance: 102500.75,
          created_at: '2019-01-01T00:00:00Z'
        },
        totalDonations: 157800.50,
        recentTransactions: [
          {
            id: 'tx1',
            date: '2025-05-18T10:23:45Z',
            description: 'Workshop Grant',
            amount: 5000,
            type: 'credit',
            category: 'donation'
          },
          {
            id: 'tx2',
            date: '2025-05-16T14:15:32Z',
            description: 'Server Infrastructure',
            amount: -1200,
            type: 'debit',
            category: 'technology'
          },
          {
            id: 'tx3',
            date: '2025-05-12T09:45:00Z',
            description: 'Corporate Sponsorship',
            amount: 25000,
            type: 'credit',
            category: 'sponsorship'
          },
          {
            id: 'tx4',
            date: '2025-05-10T16:30:22Z',
            description: 'Hackathon Supplies',
            amount: -3500,
            type: 'debit',
            category: 'events'
          },
          {
            id: 'tx5',
            date: '2025-05-05T11:20:15Z',
            description: 'Individual Donation',
            amount: 1000,
            type: 'credit',
            category: 'donation'
          }
        ],
        isLoading: false,
        error: null
      };
    }
    
    throw error;
  }
};
