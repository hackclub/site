import OpenAI from 'openai';
import AirtablePlus from "airtable-plus"

const saveProject = async (parts = [], idea) => {
  const airtable = new AirtablePlus({
    apiKey: process.env.AIRTABLE_API_KEY,
    baseID: 'appKjALSnOoA0EmPk',
    tableName: 'Cached Ideas'
  })
  const cacheName = parts.sort().join(',')
  airtable.create({
    "Name": cacheName,
    "Recommendation": idea
  })
}

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

const messageStarters = [
  "you could build a",
  "what if you built a",
  "i'd use these parts to build a",
  "how about a",
  "you could make a",
  "as a raccoon, i'd build a",
  "i live in the trash and i'd build a",
]

const generateProjectIdea = async (parts) => {

  let prompt = `I'm running a hardware program around the raspberry pi pico w where high schoolers will build a simple project using the following parts. Please propose a simple project in 1-2 sentences to use as a prompt for the high schoolers to build with:

`
  parts.forEach((part) => {
    prompt += `- ${part}\n`
  })

  prompt += `
  The project should only involve household items. The project should only use sensors provided, and use those sensors for their intended use. For example, an accelerometer cannot be used to measure humidity or tilt. Reply in all lowercase. Your response should start with "${sample(messageStarters)}"`
  

  // expects OPENAI_API_KEY
  const openai = new OpenAI();
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message.content
}

export default async function handler(req, res) {
  const requestedParts = req.body.parts

  const availablePartsReq = await fetch('https://hackclub.com/api/bin/wokwi/parts')
  const availableParts = await availablePartsReq.json()

  // check that the requested parts are in the available parts
  const parts = requestedParts.map((requestedPart) => {
    return availableParts.find((availablePart) => availablePart.wokwiName === requestedPart)?.name
  })

  const recommendation = await generateProjectIdea(parts)
  await saveProject(parts, recommendation)

  res.send({ recommendation, parts })
}

