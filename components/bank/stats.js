import { Text, Box, Flex } from 'theme-ui'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'

function renderMoney(amount) {
  const normalisedAmount = amount / 100
  return normalisedAmount
    .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

const Stats = () => {
  const { data } = useSWR('https://bank.hackclub.com/stats', fetcher, {
    fallbackData: {
      transactions_volume: '771911351', // As of 20-02-23
      last_transaction_date: Date.now()
    }
  })

  const transacted = renderMoney(data.transactions_volume).split('.');

  return (
    <Box>
      <Flex sx={{flexDirection: 'column', alignItems: 'center' }}>
        <Text sx={{fontSize: 4}}>
          So far we have enabled
        </Text>
        <Text variant='heading' sx={{
            color: 'green',
            fontSize: 84
          }}
        >
          { transacted[0] }
          <Text sx={{ fontSize: 4 }}>.{ transacted[1] }</Text>
        </Text>
        <Text sx={{fontSize: 4}}>
          in transactions
        </Text>
      </Flex>
    </Box>
  )
}

export default Stats
