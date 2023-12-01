export async function getConsoles() {
  let data = await fetch(
    'https://airbridge.hackclub.com/v0.1/Sprig%20Waitlist/Requests'
  ).then(r => r.json())

  function check(val) {
    return val === 'Pending' || val === 'Approved'
  }

  const consoleCount = data
    ? data.filter(console => check(console.fields.Status)).length
    : 100 // arbitrary fallback number

  return consoleCount
}

export default async function SprigConsoles(req, res) {
  const consoleCount = await getConsoles()
  res.json(consoleCount)
}
