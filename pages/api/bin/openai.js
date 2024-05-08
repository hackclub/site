import OpenAI from 'openai';

const generateProjectIdea = async (parts) => {

  let prompt = `I'm running a hardware program around the raspberry pi pico w where high schoolers will build a simple project using the following parts. Please propose a simple project in 1-2 sentences to use as a prompt for the high schoolers to build with:

`
  parts.forEach((part) => {
    prompt += `- ${part}\n`
  })

  prompt += `
  The project should only involve household items. The project should only use sensors provided, and use those sensors for their intended use. For example, an accelerometer cannot be used to measure humidity or tilt.`

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

  res.send({recommendation, parts})
}

