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

const Stats = () => {
  const [transactedRaw, setTransactedRaw] = useState() // The raw amount transacted (in cents).
  const [balance, setBalance] = useState(0) // A formatted balance string, split by decimal

  useEffect(() => {
    if (!transactedRaw) {
      fetch('https://bank.hackclub.com/stats')
        .then(res => res.json())
        .then(data => setTransactedRaw(data.transactions_volume))
        .catch(err => {
          console.error(err)
          setTransactedRaw(830796389)
        })
    }

    let observer = new IntersectionObserver(
      e => {
        if (e[0].isIntersecting) {
          console.info('intersecting')
          startMoneyAnimation(setBalance, transactedRaw, 2_500, formatMoney)
        }
      },
      { threshold: 1.0 }
    )
    observer.observe(document.querySelector('#parent'))

    return () => observer.disconnect()
  }, [transactedRaw])

  return (
    <Box id="parent">
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text sx={{ fontSize: [3, 4] }}>So far we have enabled</Text>
        {transactedRaw ? (
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

export default Stats
