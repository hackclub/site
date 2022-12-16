export default async function submit(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const resp = await fetch('https://postal.hackclub.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        api_key: '0RVoIVdbt0fm7mDs5vnS',
        name: data.name,
        email: data.email,
        list: 'SUTgXFrqIRPE61eg08bC5Q',
        boolean: 'true'
      }).toString()
    }).then(r => r.text())
    res.json(resp)
  }
}
