import { useEffect, useState } from 'react'

const sample = arr => arr[Math.floor(Math.random() * arr.length)]
const languages = "Python Rust COBOL Wasm tailwind ".split(" ")
const tinyEyes = [
  "if you can see this, you're too close",
  "what are you looking at, tiny-eyes?",
  "I see you",
  "What is this, a website for ants?",
  "plz help, my font size has fallen and it can't get up",
  "*small loading sounds*"
]
const flavorText = [
  `I would've been faster written in ${sample(languages)}`,
  'Wait your turn!',
  'Form an orderly queue!',
  "I'm a teapo– WAIT WRONG ENDPOINT",
  "GET outta here with that request!",
  "PUT that request back where it came from or so help me",
  "POST haste!",
  "TODO: Delete this message",
  <p style={{fontSize: "3px"}}>{sample(tinyEyes)}</p>,
  "Caution: objects in loading box are slower than they appear",
  "Caution: wet pixels, do not touch",
  "*Fax machine noises*",
]
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const LoginPage = ({token}) => {
  const [ status, setStatus ] = useState('Loading...')
  useEffect(async () => {
    const minWaitTime = sleep(3 * 1000)
    const response = fetch(`/api/arcade/showcase/login/${token}`, {method: 'POST'})
    const data = response.json()
    const [ _wait, _data ] = await Promise.all([minWaitTime, data])

    if (data.error) {
      setStatus(data.error)
    } else {
      setStatus("Redirecting!")
      window.localStorage.setItem('arcade.authToken', data.authToken)
      await sleep(250)
      window.location.href = '/arcade/showcase/my'
    }

  }, [])

  return (
    <div>
      <p>{status}</p>
      <p><em>{sample(flavorText)}</em></p>
    </div>
  )
}

export default LoginPage

export function getServerSideProps(context) {
  const { token } = context.query
  return { props: { token } }
}