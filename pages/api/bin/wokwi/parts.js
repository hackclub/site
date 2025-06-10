import AirtablePlus from "airtable-plus"
import camelcase from "camelcase"

const camelizeObject = (obj) => {
  Object.keys(obj).forEach(key => {
    obj[camelcase(key)] = obj[key]
    if (key !== camelcase(key)) {
      delete obj[key]
    }
  })
  return obj
}

const wokwiParts = async () => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'appKjALSnOoA0EmPk',
    tableName: 'Supported Parts'
  })

  const records = await airtable.read()
  const parts = records.map(record => camelizeObject(record.fields))
  return parts
}

export default async function handler(req, res) {
  const data = await wokwiParts()
  res.status(200).json(data)
}