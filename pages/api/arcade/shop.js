import AirtablePlus from "airtable-plus"

export const shopParts = async () => {
  const shopItemsTable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: "app4kCWulfB02bV8Q",
    tableName: "Shop Items"
  })

  const records = await shopItemsTable.read()
  return records.map(record => {
    const fields = record.fields;
    let stock = fields["Stock"]

    if (stock) {
      // This is a limited item
      const orders = fields["Orders"]
      orders.forEach(order => {
        const orderFields = order.fields;
        const status = orderFields["Status"]
        if (status === "Fulfilled" || status === "Awaiting Fulfillment") {
          stock -= 1
        }
      })
    }
    return { id: record.id, ...record.fields, "Stock": stock }
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