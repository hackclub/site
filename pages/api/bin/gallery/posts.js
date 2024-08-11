import AirtablePlus from "airtable-plus";

const fetchPosts = async () => {
  try {
    const airtable = new AirtablePlus({
      apiKey: process.env.AIRTABLE_API_KEY,
      baseID: 'appKjALSnOoA0EmPk',
      tableID: 'tblkpXP848G112FPg',
      tableName: 'Main',
    });

    const records = await airtable.read();
    const posts = records.map((record) => record.fields);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error; // Re-throw the error after logging it
  }
};

export default async function handler(req, res) {
  try {
    const data = await fetchPosts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
