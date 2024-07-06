import AirtablePlus from "airtable-plus"

export const shopParts = async () => {
  const shopItemsTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: "app4kCWulfB02bV8Q",
    tableName: "Shop Items"
  })
  const ordersTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: "app4kCWulfB02bV8Q",
    tableName: "Orders"
  })

  const records = await shopItemsTable.read()
  return records.map(async record => {
    const fields = record.fields;
    let stock = fields["Stock"]

    if (stock) {
      stock -= (await ordersTable.read({
        filterByFormula: `AND(
          {Item} = "${record.id}",
          OR(
            {Status} = "Fulfilled",
            {Status} = "Awaiting Fulfillment"
          )
        )`
      })).length;
    }
    return { id: record.id, ...record.fields, "Stock": stock ?? null }
  })
}

export default async function handler(req, res) {
  const data = await shopParts()

  const filteredData = data.filter(record => record["Enabled"]).map(record => {
    return {
      name: record['Name'],
      smallName: record['Small Name'],
      description: record['Description'],
      hours: record['Cost Hours'],
      imageURL: record['Image URL'],
    }
  })

  res.json(filteredData)
}