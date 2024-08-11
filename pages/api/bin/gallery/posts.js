import AirtablePlus from "airtable-plus"

const fetchPosts = async () => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'appKjALSnOoA0EmPk',
    tableName: 'Main'
  })

  const records = await airtable.read()
  const posts = records.map(record => record.fields)
  return posts
}

export default async function handler(req, res) {
  const data = await fetchPosts()
  res.status(200).json(data)
}