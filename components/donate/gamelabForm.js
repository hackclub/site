import { useState } from "react"
import { Box, Container, Label, Input, Button, Text, Flex } from "theme-ui"

const pricePerGamelab = 100

const GamelabForm = () => {
  const [count, setCount] = useState(1)
  function url() {
    const u = new URL('https://bank.hackclub.com/donations/start/game-lab-fund/')
    u.searchParams.set('amount', pricePerGamelab * count * 100 /* convert to cents */)
    return u
  }
  return (
    <>
      <Text sx={{fontSize: [1,2,3]}} style={{userSelect: 'none'}}>I'm donating{' '}
      <Text sx={{
        position: 'relative',
          p: [1],
          mx: 1,
          borderRadius: "default",
          color: 'white', bg: 'rgba(0,0,0,0.5)',
        }}>
        <ButtonIncrease count={count} setCount={setCount} />
        <ButtonDecrease count={count} setCount={setCount} />
        <Text>{count}</Text>
        {' '}
      </Text>
      Game Lab kit{count === 1 ? '' : 's'} to teens</Text>
      <Button
        variant="outlineLg"
        as="a"
        sx={{ color: 'white', bg: 'rgba(0,0,0,0.5)' }}
        href={url()}>
        Donate ${count * pricePerGamelab}
      </Button>
    </>
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
        position: 'absolute',
        top: '1em',
        // left: '0.5em',
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
        position: 'absolute',
        bottom: '1em',
        // left: '0.5em',
      }}
      onClick={handleClick}
    >▲</span>
  )
}