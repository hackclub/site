import AirtablePlus from "airtable-plus";

const fetchTags = async () => {
  try {
    const airtable = new AirtablePlus({
      apiKey: process.env.AIRTABLE_API_KEY,
      baseID: 'appKjALSnOoA0EmPk',
      tableName: 'Supported Parts',
    });
    
    const records = await airtable.read();

    const tags = records.map((record) =>  {
      return {
        ID: record.id,
        hide: record.fields["Hide From Gallery"],
      };
    });
  
    console.log('tags', tags);
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    const data = await fetchTags();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
}
