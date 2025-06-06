import api from './api';
import { fetchHCBStats } from './hcbApiService';
import { teamMembers } from '../data/team';

// Real API base URLs for Hack Club services
const EVENTS_API_URL = 'https://events.hackclub.com/api';
const SCRAPBOOK_API_URL = 'https://scrapbook.hackclub.com/api';
const HCB_API_URL = 'https://hcb.hackclub.com/api/v3';
const TEAM_API_URL = 'https://team.hackclub.com';

// Type definitions for API responses
export interface Project {
  id: string;
  name: string;
  description: string;
  image_url: string;
  repo_url: string;
  demo_url: string;
  tags: string[];
}

export interface SlackMessage {
  id: string;
  user: string;
  avatar_url: string;
  message: string;
  timestamp: string;
  reactions: string[]; // Simple string array for reactions
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  is_hot: boolean;
  registration_url: string;
}

export interface ScrapbookUser {
  username: string;
  avatar: string;
  streakCount: number;
  displayName: string;
}

export interface ScrapbookPost {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  attachments: string[];
}

export interface BankData {
  name: string;
  totalBalance: number;
  recentTransactions: BankTransaction[];
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string;
  fallback_avatar?: string;
  github?: string;
  twitter?: string;
  website?: string;
  team?: string;
}

// Real API implementation with fallback mock data
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get(`${EVENTS_API_URL}/events/upcoming`);
    
    // Map the API response to our interface
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((event: any) => ({
        id: event.id || String(Math.random()),
        title: event.name || 'Unnamed Event',
        description: event.description || '',
        start_date: event.start_date || event.start || new Date().toISOString(),
        end_date: event.end_date || event.end || new Date().toISOString(),
        location: event.location || event.venue || 'Online',
        is_hot: Boolean(event.is_featured || event.featured),
        registration_url: event.registration_url || event.url || '#'
      }));
    }
    
    throw new Error('Invalid response format from Events API');
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return mock data as fallback
    return [
      {
        id: '101',
        title: 'Aurora - Game Dev w/ Godot',
        description: 'Learn how to create your own video game in the Godot game engine alongside other girls and nonbinary folks! These workshops are for the Aurora team to demo our day-long tracks for our July SF Athena event. Learn more about Aurora at aurora.hackclub.com',
        start_date: '2025-05-2118:00:00Z',
        end_date: '2025-05-2118:00:00ZZ',
        location: 'Online',
        is_hot: true,
        registration_url: 'https://events.hackclub.com/aurora---game-dev-w-godot/'
      },
      {
        id: '102',
        title: 'Aurora - PCB Design',
        description: 'Learn how to design and print circuit board keychains alongside other girls and nonbinary folks! These workshops are for the Aurora team to demo our day-long tracks for our July SF Athena event. Learn more about Aurora at aurora.hackclub.com ',
        start_date: '2025-05-22T20:00:00Z',
        end_date: '2025-05-22T08:00:00Z',
        location: 'Online',
        is_hot: false,
        registration_url: 'https://events.hackclub.com/hack-night-games'
      },
      {
        id: '103',
        title: 'Gartic Phone',
        description: 'Do you enjoy the games Telephone or Pictionary? Gartic Phone is a fun, exciting combination between the two. Join for a few rounds and be part of the chaos that results!',
        start_date: '2025-05-23T08:00:00Z',
        end_date: '2025-05-23T08:00:00Z',
        location: 'San Francisco, CA',
        is_hot: true,
        registration_url: 'https://events.hackclub.com/gartic-phone/'
      }
    ];
  }
};

// Fetch Scrapbook posts (real implementation with fallback)
export const fetchSlackMessages = async (): Promise<SlackMessage[]> => {
  try {
    // Using Scrapbook API to get recent posts as our "Slack" messages
    const response = await api.get(`${SCRAPBOOK_API_URL}/posts?limit=5`);
    
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((post: any) => ({
        id: post.id || String(Math.random()),
        user: post.username || post.user?.username || 'hackclubber',
        avatar_url: post.avatar || post.user?.avatar || 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0avatar1.png',
        message: post.text || post.content || 'Shared a project on Scrapbook!',
        timestamp: post.created_at || post.timestamp || '2 min ago',
        reactions: Array.isArray(post.reactions) 
          ? post.reactions.map((r: any) => typeof r === 'string' ? r : (r.emoji || '👍'))
          : ['🚀', '👍']
      }));
    }
    
    throw new Error('Invalid response format from Scrapbook API');
  } catch (error) {
    console.error('Error fetching Scrapbook posts:', error);
    // Return mock data as fallback
    return [
      {
        id: '1',
        user: 'dinosaur',
        avatar_url: 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0avatar1.png',
        message: 'Just shipped a new feature for my web app!',
        timestamp: '2 min ago',
        reactions: ['🚀', '🎉', '👏']
      },
      {
        id: '2',
        user: 'jajoosam',
        avatar_url: 'https://cloud-4jf4qfhil-hack-club-bot.vercel.app/0avatar2.png',
        message: 'Looking for feedback on my new game. Anyone want to test it?',
        timestamp: '15 min ago',
        reactions: ['👍', '🎮', '👀']
      },
      {
        id: '3',
        user: 'melody',
        avatar_url: 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0avatar3.png',
        message: 'Hit a roadblock with my React project, any ideas on state management?',
        timestamp: '45 min ago',
        reactions: ['🤔', '💡', '🔄']
      },
      {
        id: '4',
        user: 'leo',
        avatar_url: 'https://cloud-4jf4qfhil-hack-club-bot.vercel.app/0avatar4.png',
        message: 'Made a cool animation with Three.js today!',
        timestamp: '1 hour ago',
        reactions: ['🎨', '✨', '🤩']
      }
    ];
  }
};

// Fetch Scrapbook users stats
export const fetchScrapbookStats = async (): Promise<ScrapbookUser[]> => {
  try {
    const response = await api.get(`${SCRAPBOOK_API_URL}/users?limit=5`);
    
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((user: any) => ({
        username: user.username,
        avatar: user.avatar,
        streakCount: user.streakCount || 0,
        displayName: user.displayName || user.username
      }));
    }
    
    throw new Error('Invalid response format from Scrapbook API');
  } catch (error) {
    console.error('Error fetching Scrapbook users:', error);
    // Return mock data as fallback
    return [
      { username: 'dinosaur', avatar: 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0avatar1.png', streakCount: 12, displayName: 'Dino' },
      { username: 'melody', avatar: 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0avatar3.png', streakCount: 30, displayName: 'Melody' },
      { username: 'jajoosam', avatar: 'https://cloud-4jf4qfhil-hack-club-bot.vercel.app/0avatar2.png', streakCount: 5, displayName: 'Sam' }
    ];
  }
};

// Fetch Hack Club Bank data (transparency mode)
// This function will now use our secure HCB API service
export const fetchBankData = async (): Promise<BankData> => {
  try {
    // Instead of directly calling the HCB API, we now call our secure backend API
    // In a real implementation, this would make a request to your secure backend
    const { fetchHCBStats } = await import('./hcbApiService');
    
    try {
      // Try to use our secure HCB API service
      const hcbStats = await fetchHCBStats();
      
      return {
        name: hcbStats.organization.name,
        totalBalance: hcbStats.organization.balance,
        recentTransactions: hcbStats.recentTransactions.map(tx => ({
          id: tx.id,
          date: tx.date,
          description: tx.description,
          amount: tx.amount,
          type: tx.type === 'credit' ? 'income' : 'expense'
        }))
      };
    } catch (secureApiError) {
      console.warn('Secure HCB API error, falling back to mock data:', secureApiError);
      throw secureApiError; // Re-throw to use the fallback data
    }
  } catch (error) {
    console.error('Error fetching HCB data:', error);
    // Return mock data as fallback
    return {
      name: 'Hack Club',
      totalBalance: 25000.00,
      recentTransactions: [
        { id: 't1', date: '2025-05-15', description: 'Hackathon Sponsorship', amount: 5000, type: 'income' },
        { id: 't2', date: '2025-05-10', description: 'Workshop Supplies', amount: -250, type: 'expense' },
        { id: 't3', date: '2025-05-05', description: 'Club Donation', amount: 1000, type: 'income' },
        { id: 't4', date: '2025-04-30', description: 'Server Costs', amount: -120, type: 'expense' },
        { id: 't5', date: '2025-04-25', description: 'Workshop Registration', amount: 800, type: 'income' }
      ]
    };
  }
};

// Fetch Projects (mock implementation for now) - could be replaced with GitHub API in future
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    // In a real implementation, you could fetch from GitHub API or Scrapbook
    // For now, return improved mock data
    return [
      {
        id: '1',
        name: 'Sprig',
        description: 'A game programming language and console designed for learning and creativity',
        image_url: 'https://cloud-kj72d9s4f-hack-club-bot.vercel.app/0sprig.png',
        repo_url: 'https://github.com/hackclub/sprig',
        demo_url: 'https://sprig.hackclub.com',
        tags: ['game-dev', 'javascript', 'education']
      },
      {
        id: '2',
        name: 'Hack Club Bank',
        description: 'The financial toolkit for high school hackathons and nonprofits',
        image_url: 'https://cloud-c6k3c9j0x-hack-club-bot.vercel.app/0bank.png',
        repo_url: 'https://github.com/hackclub/bank',
        demo_url: 'https://bank.hackclub.com',
        tags: ['fintech', 'react', 'ruby-on-rails']
      },
      {
        id: '3',
        name: 'Scrapbook',
        description: 'A daily diary of what Hack Clubbers are building and learning every day',
        image_url: 'https://cloud-7xfc6edug-hack-club-bot.vercel.app/0scrapbook.png',
        repo_url: 'https://github.com/hackclub/scrapbook',
        demo_url: 'https://scrapbook.hackclub.com',
        tags: ['social', 'next.js', 'community']
      }
    ];
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// New: Fetch team members
export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    // In a real implementation, this would fetch from the team API
    // For now, we'll use our local team data
    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};
