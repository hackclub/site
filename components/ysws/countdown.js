import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'

const CountdownWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Value = styled.span(props => ({
  textAlign: 'right',
  marginLeft: '10px',
  fontSize: props.big ? '3rem' : 'inherit',
  textShadow: '0 0 0.4em #ff000090',
  color: 'red'
}))

const Label = styled.span(props => ({
  textAlign: 'left',
  marginLeft: '10px',
  fontSize: props.big ? '3rem' : 'inherit'
}))

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        })
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
          milliseconds: distance % 1000
        })
      }
    }, 10)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <Box
      sx={{
        fontFamily: "'7Seg', monospace",
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}
    >
      <Box sx={{ marginY: 3 }}>
        <Label>Ends in</Label>

        <Box sx={{ lineHeight: 1 }}>
          <Value big={true}>{String(timeLeft.days)}</Value>
          <Label big={true}>DAY{timeLeft.days === 1 ? '' : 's'}</Label>
        </Box>
      </Box>
      <CountdownWrapper>
        <Value>{String(timeLeft.hours)}</Value>
        <Label>HOUR{timeLeft.hours === 1 ? '' : 's'}</Label>

        <Value>{String(timeLeft.minutes)}</Value>
        <Label>MINUTE{timeLeft.minutes === 1 ? '' : 's'}</Label>

        <Value>{String(timeLeft.seconds)}</Value>
        <Label>SECOND{timeLeft.seconds === 1 ? '' : 's'}</Label>

        <Value>{String(timeLeft.milliseconds)}</Value>
        <Label>MILLISECONDS</Label>
      </CountdownWrapper>
    </Box>
  )
}
