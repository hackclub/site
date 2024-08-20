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
        const { authorization, points, 'project-id': projectId } = req.headers;

        if (!authorization || !points || !projectId) {      
            return res.status(400).json({ error: 'Missing required headers' });
        }

        const users = await usersTable.read({
            filterByFormula: `{auth_token} = '${authorization}'`
        });

        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = users[0];

        const vote = await votesTable.create({
            points: parseInt(points, 10),
            voter: [user.id]
        });

        const project = await showcaseTable.find(projectId);

        const updatedVotes = project.fields.Votes
            ? [...project.fields.Votes, vote.id]
            : [vote.id];

        await showcaseTable.update(projectId, {
            Votes: updatedVotes
        });

        res.status(200).json({ success: true, vote });
    } catch (error) {
        console.error('Error creating vote:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
