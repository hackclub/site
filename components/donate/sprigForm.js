import { useState } from 'react'
import { Button, Text } from 'theme-ui'

const pricePerSprig = 100

const SprigForm = () => {
  const [count, setCount] = useState(1)
  function url() {
    const u = new URL('https://hcb.hackclub.com/donations/start/game-lab-fund/')
    u.searchParams.set(
      'amount',
      pricePerSprig * count * 100 /* convert to cents */
    )
    return u
  }
  return (
    <>
      <Text
        sx={{
          fontSize: ['27px !important', 3],
          position: 'relative',
          justifySelf: 'center',
          alignSelf: 'center',
          paddingBottom: ['1em', '1em', 0]
        }}
        style={{ userSelect: 'none' }}
      >
        I'm donating{' '}
        <Text
          sx={{
            position: 'relative',
            px: [2],
            py: [1],
            mx: 1,
            borderRadius: 'default',
            color: 'white',
            bg: 'rgba(0,0,0,0.5)'
          }}
        >
          <ButtonIncrease count={count} setCount={setCount} />
          <ButtonDecrease
            count={count}
            setCount={setCount}
            sx={{ position: 'relative' }}
          />
          <Text>{count}</Text>
        </Text>
        Sprig kit{count === 1 ? '' : 's'} to teens
      </Text>
      <Button
        variant="outlineLg"
        as="a"
        sx={{ color: 'white', bg: 'rgba(0,0,0,0.5)', fontSize: [2, 3] }}
        href={url()}
      >
        Donate ${count * pricePerSprig}
      </Button>
    </>
  )
}
export default SprigForm

function ButtonDecrease({ count, setCount }) {
  function handleClick() {
    setCount(Math.max(count - 1, 1))
  }
  return (
    <span
      style={{
        cursor: count <= 1 ? 'not-allowed' : 'pointer',
        position: 'absolute',
        top: '1.2em',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
      onClick={handleClick}
    >
      ▼
    </span>
  )
}
function ButtonIncrease({ count, setCount }) {
  function handleClick() {
    setCount(count + 1)
  }
  return (
    <span
      style={{
        cursor: 'pointer',
        position: 'absolute',
        bottom: '1.2em',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
      onClick={handleClick}
    >
      ▲
    </span>
  )
}
