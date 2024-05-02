import AirtablePlus from "airtable-plus"

const createProject = async (partsList=[]) => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'appKjALSnOoA0EmPk',
    tableName: 'Supported Parts'
  })

  // adjust these to taste:
  const PADDING = 30;
  const MAX_WIDTH = 320; // big question mark on this one
  const ROW_HEIGHT = 215; // close enough for jazz, keypad is too big for this but ¯\_(ツ)_/¯
  
  const parts = [
    { "type": "board-pi-pico-w", "id": "pico", "top": 0, "left": 0, "attrs": {} }
  ]
  let x = 88 + PADDING; // for already included Pico
  let y = 0;
  await Promise.all(partsList.map(async (part) => {
    const airPart = await airtable.read({
      filterByFormula: `{Wokwi Name}= "${part}"`,
      maxRecords: 1
    })
    return airPart[0].fields['Wokwi Name'].split(',').forEach((name, i) => {
      const width = airPart[0].fields['Wokwi X-Offset'];
      if((x + width + PADDING) > MAX_WIDTH) {
        x = 0;
        y += ROW_HEIGHT;
      }
      parts.push({
        type: name,
        id: name + '-' + i,
        left: x,
        top: y
      })
      x += width + PADDING;
    })
  }))

  const body = JSON.stringify({
    name: "The Bin!",
    unlisted: false,
    files: [{
      name: "help.md",
      content: `# Welcome to The Bin! 🦝

Now that you've thrown some parts into The Bin, it's time to turn that trash into treasure! 🗑️➡️💎

Wire up your parts and write some code to make them work together.

If you'd like a tutorial, check out this short explainer on making a blinking LED:
https://github.com/hackclub/hackclub/pull/1860/files?short_path=0494126

You can get help by chatting with other high schoolers on the Hack Club Slack in the #electronics channel:
👉 https://hackclub.com/slack 👈

Once you're ready build your design IRL, click the "Share" button and submit your design:
https://forms.hackclub.com/t/adnj7zfgTyus
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