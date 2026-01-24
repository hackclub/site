import OpenAI from 'openai'

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const messageStarters = [
  'you could build a',
  'what if you built a',
  'how about a',
  'you could make a',
  'as a dino, i think you should build a',
  "since it's summer, you should make a",
  "i've been dreaming of creating a",
  'picture this:',
  'oh, oh, oh! a',
  'i dare you to make a'
]

const generateProjectIdea = async () => {
  let prompt = `You are a software engineer that wants to bring joy through chaos. Come up with something different every time. Please propose a funky simple project that will take under 6 hours to complete in 1 quick sentence. Keep it at less than 15 words. The funkier, stupidier, and sillier your ideas the better. Think out of the box, and do not propose ideas that do nothing but generate text, like a joke or dance move generator. Random sound effect generators are boring, do not suggest them. Be very creative, do not suggest projects that are too simple. Your response must start with "${sample(messageStarters)}
`
  // expects OPENAI_API_KEY
  const openai = new OpenAI(process.env.OPENAI_API_KEY)
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo'
  })

  return chatCompletion.choices[0].message.content
}

export default async function handler(req, res) {
  const recommendation = await generateProjectIdea()

  res.send({ recommendation })
}
