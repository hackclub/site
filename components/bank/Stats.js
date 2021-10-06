import { useState, useEffect } from 'react'
import { Text } from 'theme-ui'
import Stat from '../stat'
import api from '../../lib/api'
import { timeSince } from '../../lib/helpers'
import { keyframes } from '@emotion/react'

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
  const [volume, setVolume] = useState(100 * 1000 * 1000) // 1MM default
  const [raised, setRaised] = useState(100 * 1000 * 500) // half million default
  const [lastUpdated, setLastUpdated] = useState(Date.now()) // now default

  useEffect(() => {
    loadStats()
  })

  const loadStats = () => {
    api.get('https://bank.hackclub.com/stats').then(stats => {
      setVolume(renderMoney(stats.transactions_volume))
      setRaised(renderMoney(stats.raised))
      setLastUpdated(stats.last_transaction_date * 1000)
    })
  }

  return (
    <div>
      {/* styled-components has a rendering bug that applies classes
          to incorrect components in this particular tree, but I didn't
          have time to upgrade styled-components or fix root cause.
          This <div> soup seemed to remove the symptoms in the UI for now.
          - @thesephist */}
      <div>
        <Text
          variant="lead"
          fontSize={[2, 3]}
          color={props.labelColor}
          mt={[2, 4]}
          mb={[2, 3]}
        >
          <span></span>
          <Dot />
          As of {timeSince(lastUpdated, false, true)}...
        </Text>
      </div>
      <div>
        <Stat {...props} value={raised} label="raised on Hack Club Bank" />
        <Stat
          {...props}
          fontSize={[3, 4, 5]}
          value={volume}
          label="total amount transacted"
        />
      </div>
    </div>
  )
};

export default Stats;
