import AirtablePlus from 'airtable-plus';

const usersTable = new AirtablePlus({
    baseID: 'app4kCWulfB02bV8Q',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'Users',
});

const votesTable = new AirtablePlus({
    baseID: 'app4kCWulfB02bV8Q',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'Vote',
});

const showcaseTable = new AirtablePlus({
    baseID: 'app4kCWulfB02bV8Q',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: 'Showcase',
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        
        const { authorization} = req.headers;
        const { rank1, rank2, rank3 } = req.body;
        return res.status(500).json({ error: req.body });

        const pointsDistribution = [5, 4, 3, 2, 1];

        for (let i = 0; i < rank1.length; i++) {
            const project = rank1[i];
            const points = pointsDistribution[i];
    
            addVote(project, points, authorization);
        }

        for (let i = 0; i < rank2.length; i++) {
            const project = rank2[i];
            const points = pointsDistribution[i];
    
            addVote(project, points, authorization);
        }

        for (let i = 0; i < rank3.length; i++) {
            const project = rank3[i];
            const points = pointsDistribution[i];
    
            addVote(project, points, authorization);
        }

        { success: true, vote }
       
        res.status(200).json();
    } catch (error) {
        console.error('Error creating vote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const addVote = async (projectId, points, authorization) => {
    if (!authorization || !points || !projectId) {      
        return res.status(400).json({ error: 'Missing required headers' });
    }

    const users = await usersTable.read({
        filterByFormula: `{Auth Token} = '${authorization}'`
    });

    if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    console.log(user);

    const vote = await votesTable.create({
            Points: parseInt(points, 10),
            Voter: [user.id]
    });

    const project = await showcaseTable.find(projectId);

    const updatedVotes = project.fields.Votes
        ? [...project.fields.Votes, vote.id]
        : [vote.id];

    await showcaseTable.update(projectId, {
            Votes: updatedVotes
    });

}