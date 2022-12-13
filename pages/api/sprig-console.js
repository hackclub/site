export default async function getConsoles(req, res) {
  let data = await fetch(
    'https://airbridge.hackclub.com/v0.1/Sprig%20Waitlist/Requests'
  ).then(r => r.json())

  const consoleCount = data
    ? data.filter(console => console.fields.Status === 'Pending').length
    : 100 // arbitrary fallback number

  res.json(consoleCount)
}
