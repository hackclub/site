export interface HCBTransaction {
  id: string;
  object: string;
  href: string;
  amount_cents: number;
  memo: string;
  date: string;
  type: string;
  pending: boolean;
  receipts: {
    count: number;
    missing: boolean;
  };
  comments: {
    count: number;
  };
  organization: {
    id: string;
    object: string;
    href: string;
  };
  tags: Array<any>;
  card_charge?: {
    id: string;
    object: string;
    href: string;
  };
}

export interface HCBOrganization {
  id: string;
  object: string;
  href: string;
  name: string;
  slug: string;
  website: string;
  category: string;
  transparent: boolean;
  demo_mode: boolean;
  logo: string;
  donation_header: string;
  background_image: string;
  public_message: string;
  donation_link: string;
  balances: {
    balance_cents: number;
    fee_balance_cents: number;
    incoming_balance_cents: number;
    total_raised: number;
  };
  created_at: string;
}

export async function fetchHCBTransactions(orgSlug: string = 'hq'): Promise<HCBTransaction[]> {
  const res = await fetch(`https://hcb.hackclub.com/api/v3/organizations/${orgSlug}/transactions`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function fetchHCBOrganization(orgSlug: string = 'hq'): Promise<HCBOrganization> {
  const res = await fetch(`https://hcb.hackclub.com/api/v3/organizations/${orgSlug}`);
  if (!res.ok) throw new Error('Failed to fetch organization data');
  return res.json();
}

// List of known Hack Club organizations
export const HCB_ORGANIZATIONS = [
  { slug: 'hq', name: 'Hack Club HQ' },
  { slug: 'onboard', name: 'OnBoard' },
  { slug: 'sprig', name: 'Sprig' },
  { slug: 'sinerider', name: 'Sinerider' },
  { slug: 'musk-foundation-2022-hcb-grant', name: 'Musk Foundation Hack Club Bank Grant' },
  { slug: 'community-team', name: 'Community Team' },
  { slug: 'mail-team', name: 'Mail Team' },
  { slug: 'discretionary-fund', name: 'Discretionary Fund' },
  { slug: 'reserve', name: 'Hack Club Reserve' },
  { slug: 'highseas', name: 'High Seas' },
  { slug: '2024-leaders-summit', name: 'The Summit' },
  { slug: 'outernet', name: 'Outernet' },
  { slug: 'hq-game-jam-spring-event-2023', name: 'AngelHacks Boston' },
  { slug: 'horizon', name: 'Horizon' },
  { slug: 'winter-hardware-wonderland', name: 'Winter Hardware Wonderland' },
  { slug: 'epoch', name: 'Epoch' },
  { slug: 'assemble', name: 'Assemble' },
  { slug: 'zephyr', name: 'The Hacker Zephyr' },
  { slug: 'arcade', name: 'Arcade' }
]; 