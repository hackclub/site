import { useEffect, useState } from 'react'
const LoginPage = ({token}) => {
  const [ status, setStatus ] = useState('loading')
  useEffect(async () => {
    const response = await fetch(`/api/arcade/showcase/login/${token}`, {method: 'POST'})
    const data = await response.json()
    setStatus(data.error || data.authToken)
    if (data.authToken) {
      window.localStorage.setItem('arcade.authToken', data.authToken)
      window.location.href = '/arcade/showcase/my'
    }
  }, [])
  return (
    <div>
      <h1>{status}</h1>
    </div>
  )
}

export default LoginPage

export function getServerSideProps(context) {
  const { token } = context.query
  return { props: { token } }
}