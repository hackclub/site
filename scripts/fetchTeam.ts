import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

interface TeamMember {
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

async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    // Fetch the team page
    const response = await axios.get('https://hackclub.com/team');
    const $ = cheerio.load(response.data);

    const teamMembers: TeamMember[] = [];
    const teamSections = ['leadership', 'engineering', 'community', 'operations'];

    // Process each team section
    teamSections.forEach(team => {
      $(`[data-team="${team}"]`).each((_, element) => {
        const $member = $(element);
        
        // Extract member information
        const name = $member.find('h3').text().trim();
        const role = $member.find('h4').text().trim();
        const bio = $member.find('p').text().trim();
        
        // Extract social links
        const github = $member.find('a[href*="github.com"]').attr('href')?.split('/').pop();
        const twitter = $member.find('a[href*="twitter.com"]').attr('href')?.split('/').pop();
        const website = $member.find('a[href*="http"]').not('[href*="github.com"]').not('[href*="twitter.com"]').attr('href');
        
        // Get avatar URL
        const avatarUrl = $member.find('img').attr('src') || '';
        
        // Create member object
        const member: TeamMember = {
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          role,
          bio,
          avatar_url: avatarUrl,
          fallback_avatar: avatarUrl, // Use same URL as fallback for now
          team,
          ...(github && { github }),
          ...(twitter && { twitter }),
          ...(website && { website })
        };

        teamMembers.push(member);
      });
    });

    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
}

async function main() {
  try {
    const teamMembers = await fetchTeamMembers();
    
    // Create the data directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to team.ts file
    const filePath = path.join(dataDir, 'team.ts');
    const fileContent = `export const teamMembers = ${JSON.stringify(teamMembers, null, 2)};\n`;
    
    fs.writeFileSync(filePath, fileContent);
    console.log(`Successfully wrote ${teamMembers.length} team members to ${filePath}`);
  } catch (error) {
    console.error('Failed to fetch and save team members:', error);
    process.exit(1);
  }
}

main(); 