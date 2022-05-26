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
    <Text style={{userSelect: 'none'}} pb={3}>I'm donating <span>
    <ButtonIncrease count={count} setCount={setCount} />
      {count}
    <ButtonDecrease count={count} setCount={setCount} />
      </span> Gamelab kits to teenagers</Text>
      <Button as="a" href={url()}>Donate ${count * pricePerGamelab}</Button>
    </Base>
  )
}
export default GamelabForm

function ButtonDecrease({count, setCount}) {
  function handleClick() {
    setCount(Math.max(count-1, 1))
  }
  return (
    <span
      style={{
        cursor: count <= 1 ? 'not-allowed' : 'pointer',
        position: 'relative',
        bottom: '-1em',
        left: '-0.5em',
      }}
      onClick={handleClick}
    >▼</span>
  )
}
function ButtonIncrease({count, setCount}) {
  function handleClick() {
    setCount(count+1)
  }
  return (
    <span
      style={{
        cursor: 'pointer',
        position: 'relative',
        bottom: '1em',
        left: '0.5em',
      }}
      onClick={handleClick}
    >▲</span>
  )
}

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