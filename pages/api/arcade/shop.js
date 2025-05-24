import AirtablePlus from "airtable-plus"

export const shopParts = async () => {
  const baseID = "app4kCWulfB02bV8Q";
  if (process.env.FORK_STATUS && process.env.FORK_STATUS === "fork") {
    return [];
  }
  const shopItemsTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID,
    tableName: "Shop Items"
  })
  const ordersTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID,
    tableName: "Orders"
  })

  const records = await shopItemsTable.read()
  const newRecordsPromise = records.map(async record => {
    const fields = record.fields;
    let stock = fields["Stock"]

    if (stock && fields["Count of Orders Fulfilled"]) {
      stock -= fields["Count of Orders Fulfilled"]
    }
    return { id: record.id, ...record.fields, "Stock": (stock == null) ? null : (stock >= 0 ? stock : 0) }
  })


  const newRecords = await Promise.all(newRecordsPromise)

  return newRecords
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
      stock: record['Stock'],
    }
  })

  return res.json(filteredData)
}