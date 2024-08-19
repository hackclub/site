import AirtablePlus  from "airtable-plus"

const fetchPosts = async () => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'app4kCWulfB02bV8Q',
    tableName: 'Projects',
  })

  const records = await airtable.read({
    filterByFormula: '{Status} = "Shipped"'
  })

  return records.map(record => ({
    id: record.id,
    name: record.fields["Name"],
    desc: record.fields["Description"],
    slack: record.fields["Slack Handle"],
    codeLink: record.fields["Github Link"],
    playLink: record.fields["Playable Link"],
    images: record.fields["Screenshot / Video"],
  }))
}

export default async function handler(req, res) {
  try {
    const data = await fetchPosts();
    res.status(200).json(data);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}