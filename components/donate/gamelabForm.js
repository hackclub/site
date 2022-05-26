import { useState } from "react"
import { Box, Container, Label, Input, Button, Text } from "theme-ui"

const pricePerGamelab = 100

const GamelabForm = () => {
  const [count, setCount] = useState(1)
  function url() {
    const u = new URL('https://bank.hackclub.com/donations/start/hq')
    u.searchParams.set('amount', pricePerGamelab * count * 100 /* convert to cents */)
    return u
  }
  return (
    <Base>
      <ButtonAmount amount={1} setCount={setCount} />
      <ButtonAmount amount={3} setCount={setCount} />
      <ButtonAmount amount={5} setCount={setCount} />
      <Button as="a" href={url()}>Donate ${count * pricePerGamelab}</Button>
    </Base>
  )
}
export default GamelabForm

function ButtonAmount({amount, setCount}) {
  return (
    <Button
      variant="outline"
      my={3}
      onClick={e => {
        e.preventDefault()
        setCount(amount)
      }}
    >
      {amount} kit
    </Button>
  )
}

function Base({ children }) {
  return (
    <Container
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: '1fr' }}
      variant="copy"
    >
      {children}
    </Container>
  )
}