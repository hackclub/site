import { Text, Box, Flex } from 'theme-ui'
import { useEffect, useState } from 'react'

const easeInOutExpo = x =>
  x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2

function startMoneyAnimation(
  setBalance,
  amount,
  duration = 2_000,
  moneyFormatter
) {
  const startTime = performance.now()

  function animate() {
    const time = performance.now() - startTime
    const progress = time / duration
    const easedProgress = easeInOutExpo(progress)

    setBalance(moneyFormatter(amount * easedProgress))

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      setBalance(moneyFormatter(amount))
    }
  }

  requestAnimationFrame(animate)
}

function formatMoney(amount) {
  const normalisedAmount = amount / 100
  return normalisedAmount
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    .split('.')
}

const Stats = ({ stats }) => {
  const [balance, setBalance] = useState(0) // A formatted balance string, split by decimal

  useEffect(() => {
    let observer = new IntersectionObserver(
      e => {
        if (e[0].isIntersecting) {
          console.info('intersecting')
          startMoneyAnimation(
            setBalance,
            stats.transactions_volume,
            2_500,
            formatMoney
          )
        }
      },
      { threshold: 1.0 }
    )
    observer.observe(document.querySelector('#parent'))

    return () => observer.disconnect()
  }, [stats.transactions_volume])

  return (
    <Box id="parent">
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text sx={{ fontSize: [3, 4] }}>So far we have enabled</Text>
        {stats ? (
          <>
            <Text
              variant="title"
              color="green"
              sx={{
                color: 'green',
                fontSize: [5, 6]
              }}
            >
              {balance[0]}
              <Text sx={{ fontSize: [3, 4] }}>.{balance[1]}</Text>
            </Text>
          </>
        ) : (
          <Text
            variant="title"
            color="green"
            sx={{
              color: 'green',
              fontSize: [5, 6]
            }}
          >
            ...
          </Text>
        )}
        <Text sx={{ fontSize: [3, 4] }}>in transactions</Text>
      </Flex>
    </Box>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://hcb.hackclub.com/stats`)
  const stats = await res.json()

  return {
    props: {
      stats
    }
  }
}

export default Stats
