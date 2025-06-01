import React, { useState } from 'react';
import { fetchHCBTransactions, fetchHCBOrganization, HCB_ORGANIZATIONS, HCBTransaction } from '../../services/hcbApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Separator } from '../../components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface HackClubBankStatsProps {
  initialOrgSlug?: string;
}

export const HackClubBankStats: React.FC<HackClubBankStatsProps> = ({ initialOrgSlug = 'hq' }) => {
  const [selectedOrg, setSelectedOrg] = useState(initialOrgSlug);

  const { data: transactions, isLoading: isLoadingTransactions, error: transactionsError } = useQuery({
    queryKey: ['hcb-transactions', selectedOrg],
    queryFn: () => fetchHCBTransactions(selectedOrg),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: true,
  });

  const { data: organization, isLoading: isLoadingOrg, error: orgError } = useQuery({
    queryKey: ['hcb-organization', selectedOrg],
    queryFn: () => fetchHCBOrganization(selectedOrg),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: true,
  });

  if (isLoadingTransactions || isLoadingOrg) {
    return (
      <Card className="w-full md:max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-hack-red" />
            <span>Loading Hack Club Bank Stats</span>
          </CardTitle>
          <CardDescription>
            Fetching real-time financial data...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (transactionsError || orgError) {
    return (
      <Alert variant="destructive" className="w-full md:max-w-3xl mx-auto">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Error Loading Financial Data</AlertTitle>
        <AlertDescription>
          We couldn't load the latest financial information. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  // Calculate total donations (positive transactions)
  const totalDonations = transactions?.reduce((sum, tx) => 
    tx.amount_cents > 0 ? sum + tx.amount_cents : sum, 0) || 0;

  return (
    <Card className="w-full md:max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-hack-red" />
            <span>{organization?.name} Bank Stats</span>
          </CardTitle>
          <Select value={selectedOrg} onValueChange={setSelectedOrg}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select organization" />
            </SelectTrigger>
            <SelectContent>
              {HCB_ORGANIZATIONS.map(org => (
                <SelectItem key={org.slug} value={org.slug}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Real-time financial data from Hack Club Bank
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Balance */}
          <div className="p-4 rounded-lg border bg-card-foreground/5">
            <div className="text-sm font-medium text-muted-foreground mb-2">Current Balance</div>
            <div className="text-3xl font-bold">${(organization?.balances.balance_cents / 100).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              As of {new Date().toLocaleDateString()}
            </div>
          </div>
          
          {/* Total Raised */}
          <div className="p-4 rounded-lg border bg-card-foreground/5">
            <div className="text-sm font-medium text-muted-foreground mb-2">Total Raised</div>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-3xl font-bold">${(organization?.balances.total_raised / 100).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        
        {/* Recent Transactions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.memo}</TableCell>
                  <TableCell className={`text-right ${
                    transaction.amount_cents > 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                  }`}>
                    {transaction.amount_cents > 0 ? '+' : '-'}${Math.abs(transaction.amount_cents / 100).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.pending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {transaction.pending ? 'Pending' : 'Completed'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div>Data refreshes every 5 minutes</div>
        <div>Powered by Hack Club Bank API</div>
      </CardFooter>
    </Card>
  );
};
