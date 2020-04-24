const AirtablePlus = require('airtable-plus')

const joinTable = new AirtablePlus({
	apiKey: 'keysWpSXVV7AGLLAg',
	baseID: 'appaqcJtn33vb59Au',
	tableName: 'Join Requests'
})

export default async (req, res) => {
	if (req.method === 'POST') {
		const data = JSON.parse(req.body)
		console.log(data)
		await joinTable.create({
			'Full Name': data.name,
			'Email Address': data.email,
			'Student': data.teen ? true : false,
			'Reason': data.reason
		})
		res.json({ status: 'success' })
	}
}