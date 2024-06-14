import OpenAI from 'openai'

const sample = arr => arr[Math.floor(Math.random() * arr.length)]

const messageStarters = [
  'you could build a',
  'what if you built a',
  'how about a',
  'you could make a',
  "as a dino, i'd build a",
  "since it's summer, i'd make a",
  "i've been dreaming of creating a",
  'picture this:',
  'oh, oh, oh! a',
  'i dare you to make a',
]

const generateProjectIdea = async () => {
  let prompt = `You are a software engineer that wants to bring joy through chaos. Something different every time. Please propose a funky simple project that will take under 6 hours to complete in 1 quick sentence. You can also suggest projects for a family member. Keep it at less than 15 words. The funkier, stupidier, and sillier your ideas the better. Your response must start with "${sample(messageStarters)}
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
