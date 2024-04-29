import AirtablePlus from "airtable-plus"

const createProject = async (partsList=[]) => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'appKjALSnOoA0EmPk',
    tableName: 'Supported Parts'
  })

  const parts = [
    { "type": "board-pi-pico-w", "id": "pico", "top": 0, "left": 0, "attrs": {} }
  ]

  await Promise.all(partsList.map(async (part) => {
    const airPart = await airtable.read({
      filterByFormula: `{Wokwi Name}= "${part}"`,
      maxRecords: 1
    })
    return airPart[0].fields['Wokwi Name'].split(',').forEach((name, i) => {
      parts.push({
        type: name,
        id: name + '-' + i,
        left: i * 100, // this is roughtly the width of most parts
      })
    })
  }))

  const body = JSON.stringify({
    name: "The Bin!",
    unlisted: false,
    files: [{
      name: "help.txt",
      content: `
# Welcome to The Bin!

Build 
    `
    },
    {
      name: "sketch.ino",
      content: `// Now turn this trash into treasure!
// Want some help? You can chat with us on the Hack Club Slack in the #electronics channel
void setup() {
  // put your setup code here, to run once:
  Serial1.begin(115200);
  Serial1.println("Hello, Raspberry Pi Pico W!");
}
void loop() {
  // put your main code here, to run repeatedly:
  delay(1); // this speeds up the simulation
}`
    }, {
      name: "diagram.json",
      content: JSON.stringify({
        "version": 1,
        "author": "The Bin - Hack Club",
        "editor": "wokwi",
        "parts": parts,
        "connections": [["pico:GP0", "$serialMonitor:RX", "", []], ["pico:GP1", "$serialMonitor:TX", "", []]], "dependencies": {}
      }, null, 2)
    }],
  })

  const response = await fetch('https://wokwi.com/api/projects/save', {
    method: 'POST',
    cors: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://wokwi.com/projects/new/pi-pico-w',
      'User-Agent': 'Hack Club - contact max@hackclub.com for any complaints!'
    },
    body
  }).catch((e) => {
    console.log(e)
  })

  const data = await response.json()
  const { projectId } = data

  return `https://wokwi.com/projects/${projectId}`
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { parts } = req.body

    const shareLink = await createProject(parts)
    if (shareLink) {
      res.status(200).json({ shareLink })
    } else {
      res.status(500).json({ error: 'Failed to create project' })
    }
  }
}