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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        
        const { authorization} = req.headers;
        const { rank1, rank2, rank3 } = req.body;

        const pointsDistribution = [5, 4, 3, 2, 1];

        const users = await usersTable.read({
            filterByFormula: `{Auth Token} = '${authorization}'`
        });
    
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        const userID = users[0].id;

        let jobs = []

        for (let i = 0; i < rank1.length; i++) {
            const project = rank1[i];
            const points = pointsDistribution[i];
    
            jobs.push(addVote(project, points, userID))
        }

        await Promise.all(jobs)

        jobs = []

        for (let i = 0; i < rank2.length; i++) {
            const project = rank2[i];
            const points = pointsDistribution[i];
    
            await addVote(project, points, userID);
        }

        await Promise.all(jobs)

        jobs = []

        for (let i = 0; i < rank3.length; i++) {
            const project = rank3[i];
            const points = pointsDistribution[i];
    
            await addVote(project, points, userID);
        }

        await Promise.all(jobs)

        res.status(200);
    } catch (error) {
        console.error('Error creating vote:', error);
        res.status(500).json({ error: error.message });
    }
}

const addVote = async (projectId, points, userID) => {
    if (!userID || !points || !projectId) {      
        return res.status(400).json({ error: 'Missing required headers' });
    }

    const vote = await votesTable.create({
            Points: parseInt(points, 10),
            Voter: [userID],
            Showcase: [projectId]
    });

}