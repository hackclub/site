// https://airtable.com/appKjALSnOoA0EmPk/tblYYhxN9TaPPMMRV/viwJFvTlmRNHj0Toh?blocks=hide
import AirtablePlus from 'airtable-plus'

const rsvpsTable = new AirtablePlus({
  apiKey: process.env.AIRTABLE_API_KEY,
  baseID: 'appKjALSnOoA0EmPk',
  tableName: 'RSVPs'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, high_schooler, stickers, address_line_1, address_zip } =
      req.body

    const fields = {
      Email: email,
      'High Schooler': '' + high_schooler,
      Stickers: '' + stickers,
      'Address (line 1)': address_line_1,
      'Address (zip code)': address_zip
    }

    await rsvpsTable.create(fields)

    res.status(200).json({ success: true })
  } else if (req.method == 'GET') {
    const result = await rsvpsTable.read()

    res.status(200).json(result.length)
  }
}
