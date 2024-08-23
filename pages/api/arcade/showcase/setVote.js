// import AirtablePlus from 'airtable-plus';

// const usersTable = new AirtablePlus({
//     baseID: 'app4kCWulfB02bV8Q',
//     apiKey: process.env.AIRTABLE_API_KEY,
//     tableName: 'Users',
// });

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ error: 'Method not allowed' });
//     }

//     try {
//         // i don't think thsi is needed?
//         // const authorization = req.headers['authorization']?.replace('Bearer ', '').replace(/[^a-zA-Z0-9-]/g, '');
        
//         const { userId } = req.body;

//         const userRecords = await usersTable.read({
//             filterByFormula: `{Internal ID} = '${userId}'`,
//         });

//         if (userRecords.length === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const userRecordId = userRecords[0].id;
//         await usersTable.update(userRecordId, {
//             Voted: true,
//         });

//         return res.status(200).json({ message: 'Marked as voted updated successfully' });
//     } catch (error) {
//         console.error('Error setting vote:', error);
//         return res.status(500).json({ error: error.message });
//     }
// }
