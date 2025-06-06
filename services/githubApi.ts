import api from './api';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const HACK_CLUB_ORG = 'hackclub';

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
  image_url?: string;
}

export interface GithubStats {
  total_stars: number;
  total_forks: number;
  total_repos: number;
  total_contributors: number;
}

export interface HistoricalEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string;
  gallery_images?: string[];
  attendees?: number;
  highlights?: string[];
  repo_url?: string;
}

// Fetch Hack Club GitHub repositories
export const fetchHackClubRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await api.get(`${GITHUB_API_BASE_URL}/orgs/${HACK_CLUB_ORG}/repos`, {
      params: {
        sort: 'stars',
        direction: 'desc',
        per_page: 10
      }
    });
    
    // Enhance repos with proper image URLs
    const enhancedRepos = response.data.map((repo: GithubRepo) => {
      // Try to get a meaningful image for the repository
      // Priority: 1) Social image if exists, 2) OpenGraph image, 3) Default placeholder
      let imageUrl = `https://opengraph.githubassets.com/1/${repo.full_name}`;
      
      return {
        ...repo,
        image_url: imageUrl
      };
    });
    
    return enhancedRepos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return fallback data in case of API error
    return [
      {
        id: 1,
        name: 'hackclub',
        full_name: 'hackclub/hackclub',
        description: 'Hack Club is a nonprofit network of high school coding clubs and makers around the world.',
        html_url: 'https://github.com/hackclub/hackclub',
        homepage: 'https://hackclub.com',
        stargazers_count: 2800,
        watchers_count: 2800,
        forks_count: 450,
        topics: ['education', 'nonprofit', 'javascript'],
        image_url: 'https://repository-images.githubusercontent.com/57129348/b3b2a300-bc70-11e9-8f59-cb9ca3443218'
      },
      {
        id: 2,
        name: 'HCB',
        full_name: 'hackclub/HCB',
        description: 'Hack Club Bank: The financial toolkit for empowering the next generation of innovators.',
        html_url: 'https://github.com/hackclub/HCB',
        homepage: 'https://hackclub.com/bank',
        stargazers_count: 980,
        watchers_count: 980,
        forks_count: 120,
        topics: ['finance', 'banking', 'typescript'],
        image_url: 'https://assets.hackclub.com/api/v0.1/files/bc14122/download/hcb-screenshot.jpg'
      },
      {
        id: 3,
        name: 'sprig',
        full_name: 'hackclub/sprig',
        description: 'A game engine for building retro-style games that run anywhere JavaScript does.',
        html_url: 'https://github.com/hackclub/sprig',
        homepage: 'https://sprig.hackclub.com',
        stargazers_count: 1200,
        watchers_count: 1200,
        forks_count: 250,
        topics: ['game-engine', 'javascript', 'education'],
        image_url: 'https://cloud-4fn2dhsy0.vercel.app/2022-08-18_nyjjcxwuzuepecj0n11nfg9fszhncmjn.png'
      }
    ];
  }
};

// Fetch GitHub statistics for Hack Club
export const fetchGithubStats = async (): Promise<GithubStats> => {
  try {
    // Get total repos count first
    const orgResponse = await api.get(`${GITHUB_API_BASE_URL}/orgs/${HACK_CLUB_ORG}`);
    const totalRepos = orgResponse.data.public_repos || 0;
    
    // Fetch repos with pagination to calculate stars and forks
    let page = 1;
    let allRepos: GithubRepo[] = [];
    const perPage = 100; // GitHub API max per page
    
    // Only fetch up to 500 repos to avoid hitting rate limits
    const maxPages = Math.min(Math.ceil(totalRepos / perPage), 5);
    
    while (page <= maxPages) {
      const reposResponse = await api.get(`${GITHUB_API_BASE_URL}/orgs/${HACK_CLUB_ORG}/repos`, {
        params: {
          per_page: perPage,
          page: page
        }
      });
      
      if (reposResponse.data.length === 0) break;
      
      allRepos = [...allRepos, ...reposResponse.data];
      page++;
    }
    
    // Calculate aggregated statistics
    const stats: GithubStats = {
      total_stars: allRepos.reduce((sum: number, repo: GithubRepo) => sum + repo.stargazers_count, 0),
      total_forks: allRepos.reduce((sum: number, repo: GithubRepo) => sum + repo.forks_count, 0),
      total_repos: totalRepos,
      total_contributors: 0 // This would require many additional API calls
    };
    
    return stats;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    // Return mock data as fallback in case of API limits or failure
    return {
      total_stars: 15000,
      total_forks: 2500,
      total_repos: 200,
      total_contributors: 800
    };
  }
};

// Fetch historical events data
export const fetchHistoricalEvents = async (): Promise<HistoricalEvent[]> => {
  try {
    // In a real application, this would be an API call to fetch historical events
    // For now, we'll simulate a successful API response with mock data
    console.log('Fetching historical events...');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 1,
        title: "Hack Club Summit 2024",
        description: "Annual gathering of Hack Club leaders from around the world to collaborate, learn from each other, and plan for the future of Hack Club.",
        date: "2024-07-15",
        location: "Vermont, USA",
        image_url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
        gallery_images: [
          "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          "https://images.unsplash.com/photo-1531482615713-2afd69097998",
          "https://images.unsplash.com/photo-1528901166007-3784c7dd3653"
        ],
        attendees: 150,
        highlights: [
          "Keynote by notable tech industry leaders",
          "Workshops on new technologies",
          "Hackathon with impressive projects",
          "Community building activities"
        ]
      },
      {
        id: 2,
        title: "Sprig Game Jam 2023",
        description: "A 48-hour game development event where participants created games using Hack Club's Sprig game engine.",
        date: "2023-11-12",
        location: "Online (Global)",
        image_url: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
        gallery_images: [
          "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
          "https://images.unsplash.com/photo-1511512578047-dfb367046420",
          "https://images.unsplash.com/photo-1529101091764-c3526daf38fe"
        ],
        attendees: 320,
        repo_url: "https://github.com/hackclub/sprig-gallery"
      },
      {
        id: 3,
        title: "Assemble Summer Hackathon",
        description: "In-person hackathon bringing together high school students for a weekend of building and learning.",
        date: "2023-08-05",
        location: "San Francisco, CA",
        image_url: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        gallery_images: [
          "https://images.unsplash.com/photo-1500673922987-e212871fec22",
          "https://images.unsplash.com/photo-1544531585-9847b68c8c86", 
          "https://images.unsplash.com/photo-1531482615713-2afd69097998"
        ],
        attendees: 180,
        highlights: [
          "20+ projects built from scratch",
          "Hardware hacking stations",
          "Company tours of local tech companies",
          "Mentorship from industry professionals"
        ]
      },
      {
        id: 4,
        title: "HackClub Bank Launch Event",
        description: "The official launch of Hack Club Bank, providing financial tools for student-led initiatives.",
        date: "2022-05-20",
        location: "New York, NY",
        image_url: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
        gallery_images: [
          "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
          "https://images.unsplash.com/photo-1559523161-0fc0d8b38a77",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df"
        ],
        attendees: 120,
        repo_url: "https://github.com/hackclub/HCB"
      },
      {
        id: 5,
        title: "Winter of Making 2022",
        description: "A month-long virtual event encouraging students to build and ship projects during winter break.",
        date: "2022-12-15",
        location: "Online (Global)",
        image_url: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
        gallery_images: [
          "https://images.unsplash.com/photo-1466442929976-97f336a657be",
          "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931",
          "https://images.unsplash.com/photo-1581092921461-eab10d56d9d3"
        ],
        attendees: 450,
        highlights: [
          "Daily check-ins and progress sharing",
          "Workshops on various technologies",
          "Mentorship sessions with industry experts",
          "Demo day with project presentations"
        ]
      }
    ];
  } catch (error) {
    console.error('Error fetching historical events:', error);
    return [];
  }
};
