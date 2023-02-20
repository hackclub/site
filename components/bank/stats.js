import { Text, Box, Flex } from 'theme-ui'
import { keyframes } from '@emotion/react'
import { timeSince } from '../../lib/helpers'
import useSWR from 'swr'
import Stat from '../stat'
import fetcher from '../../lib/fetcher'

const renderMoney = amount =>
  Math.floor(amount / 100)
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    .replace('.00', '')

const flashing = keyframes({
  from: { opacity: 0 },
  '50%': { opacity: 1 },
  to: { opacity: 0 }
})

function Dot() {
  return (
    <Text
      sx={{
        bg: 'green',
        color: 'white',
        borderRadius: 'circle',
        display: 'inline-block',
        lineHeight: 0,
        width: '.4em',
        height: '.4em',
        marginRight: '.4em',
        marginBottom: '.12em',
        animationName: `${flashing}`,
        animationDuration: '3s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
      }}
    />
  )
}

const Stats = props => {
  const { data } = useSWR('https://bank.hackclub.com/stats', fetcher, {
    fallbackData: {
      transactions_volume: 500 * 1000 * 1000,
      last_transaction_date: Date.now()
    }
  })

  return (
    <Box>
      <Flex sx={{flexDirection: 'column', alignItems: 'center' }}>
        <Text sx={{fontSize: 4}}>
          So far we have enabled
        </Text>
        <Text variant='heading' sx={{
          color: 'green',
          fontSize: 84
        }}>
          $7,711,681
        </Text>
        <Text sx={{fontSize: 4}}>
          in transactions
        </Text>
      </Flex>
      {/* <Text
        variant="lead"
        fontSize={[2, 3]}
        color="muted"
        mt={[2, 4]}
        mb={[2, 3]}
      >
        <Dot />
        As of {timeSince(data?.last_transaction_date * 1000, false, true)}...
      </Text>
      <Box>
        <Stat
          {...props}
          value={renderMoney(data?.raised)}
          label="raised on Hack Club Bank"
        />
        <Stat
          {...props}
          fontSize={[3, 4, 5]}
          value={renderMoney(data?.transactions_volume)}
          label="total amount transacted"
        />
      </Box> */}
    </Box>
  )
}

export default Stats
