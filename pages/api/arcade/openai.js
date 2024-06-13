import OpenAI from 'openai';

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

const messageStarters = [
  "you could build a",
  "what if you built a",
  "i'd use these parts to build a",
  "how about a",
  "you could make a",
  "as a raccoon, i'd build a",
  "since it's  summer, i'd make a",
  "i've been dreaming of creating a",
  "picture this:"
]

const generateProjectIdea = async () => {

  let prompt = `You are an experienced engineer and your niece is a high schoolers that wants to build a fun and cool coding project. Please propose a simple project that will take under 6 hours to complete in 1-2 sentences. Do not explain why they should build the project and 90% of the time recommend a software project. You can also suggest projects for a family member that the niece will have. Your response must start with "${sample(messageStarters)}
`
  // expects OPENAI_API_KEY
  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletion.choices[0].message.content
}

export default async function handler(req, res) {

  const recommendation = await generateProjectIdea()

  res.send({ recommendation })
}

