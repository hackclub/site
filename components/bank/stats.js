import { Text, Box, Flex } from 'theme-ui'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'

function startMoneyAnimation(setBalance, amount, duration = 2_000, moneyFormatter) {
  const easeInOutExpo = (x) =>
		x === 0
			? 0
			: x === 1
			? 1
			: x < 0.5
			? Math.pow(2, 20 * x - 10) / 2
			: (2 - Math.pow(2, -20 * x + 10)) / 2;

  
  const startTime = performance.now();

  function animate() {
    const time = performance.now() - startTime;
    const progress = time / duration;
    const easedProgress = easeInOutExpo(progress);

    setBalance(moneyFormatter(amount * easedProgress))

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      setBalance(moneyFormatter(amount))
    }
  }

  requestAnimationFrame(animate);
}
  
function formatMoney(amount) {
  const normalisedAmount = amount / 100
  return normalisedAmount
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    .split('.')
}

const Stats = () => {
  const [balance, setBalance] = useState() // A formatted balance string, split by decimal

  const transactedRaw = useSWR('https://bank.hackclub.com/stats', fetcher, {
    fallbackData: {
      transactions_volume: '779707769', // As of 01-03-2023
      last_transaction_date: Date.now()
    }
  }).data.transactions_volume

  useEffect(() => {
    let observer = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          startMoneyAnimation(setBalance, transactedRaw, 2_500, formatMoney)
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(document.querySelector("#parent"));

    return () => observer.disconnect();
  }, [])

  return (
    <Box id='parent'>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text sx={{ fontSize: [3, 4] }}>
          So far we have enabled
        </Text>
        { balance ?
          <>
            <Text variant='title' color='green' sx={{
                color: 'green',
                fontSize: [5, 6]
              }}
            >
              { balance[0] }
              <Text sx={{ fontSize: [3, 4] }}>.{ balance[1] }</Text>
            </Text>
            <Text sx={{ fontSize: [3, 4] }}>
              in transactions
            </Text>
          </>
          :
          <Text variant='title' color='green' sx={{
            color: 'green',
            fontSize: [5, 6]
          }}>...</Text>  
        }
      </Flex>
    </Box>
  )
}

export default Stats
