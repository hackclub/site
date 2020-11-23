import React, { useState, useMemo, useRef, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { Box, Text } from 'theme-ui'
import { take, sample } from 'lodash'
import { Slide } from 'react-reveal'

const types = {
  user_typing: 'typing',
  reaction_added: 'reaction',
  unmarshalling_error: 'message',
  message: 'message'
}

const emoji = ['🚀', '🥳', '😂', '💖', '👀', '👍', '🙌', '🙂', '👏']
const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', '#8067c3']

const Channel = ({ color, channel }) => (
  <Text as="strong" color={color} children={channel} />
)

const whitelistedChannels = new Set(
  `
  3d-printing ai all-hands apple art bank blockchain books cats
  challenges code college-apps confessions cooking coronavirus counttoamillion deals
  debate design dogs ethical-hacking film food
  functional gamedev go-bears hack-night hackathons hardware
  homelab hours hq india javascript languages late-night-hw-club lgbtq linux lounge
  mason math memes minecraft music neuroscience photography python
  rust scrapbook ship sink-my-ship sleep social studycorner support swift todayilearned
  politics welcome westborough wip workshops writing
`
    .split(/\s+/gi)
    .filter(i => i.length > 0)
    .map(i => '#' + i)
)

const generateEvent = () => ({
  type: sample(['message', 'typing']),
  color: sample(colors),
  channel: sample(Array.from(whitelistedChannels)),
  timestamp: new Date().toISOString()
})

const SlackEvents = ({ sx, ...props }) => {
  const didUnmount = useRef(false)
  const [events, setEvents] = useState([])
  useEffect(() => {
    setEvents([generateEvent(), generateEvent()])
    setTimeout(() => setEvents(e => [generateEvent(), ...e]), 5000)
  }, [])

  const STATIC_OPTIONS = useMemo(
    () => ({
      shouldReconnect: () => !didUnmount.current,
      reconnectInterval: 3000
    }),
    []
  )
  const { lastMessage } = useWebSocket(
    'wss://streambot-hackclub.herokuapp.com/',
    STATIC_OPTIONS
  )

  useEffect(() => {
    let e = lastMessage?.data
    if (e) {
      try {
        e = JSON.parse(e)
        if (
          Object.keys(types).includes(e.type) &&
          whitelistedChannels.has(e.channel)
        ) {
          e.type = types[e.type]
          e.color = sample(colors)
          if (e.type === 'reaction') e.emoji = sample(emoji)
          setEvents(prev => [e, ...prev])
        }
      } catch (err) {
        true
      }
    }
  }, [lastMessage])

  useEffect(() => {
    return () => {
      didUnmount.current = true
    }
  })

  return (
    <Box
      as="ol"
      sx={{
        height: '100%',
        minHeight: '4em',
        maxHeight: [128, 256],
        overflow: 'hidden',
        listStyle: 'none',
        lineHeight: 'heading',
        pl: 0,
        color: 'black',
        fontSize: 2,
        overflowY: 'hidden',
        position: 'relative',
        ':after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'block',
          height: '2em',
          backgroundImage: theme =>
            `linear-gradient(rgba(255,255,255,0), ${theme.colors.white})`
        },
        div: { mb: [1, 2] },
        'circle:last-of-type': { animationDuration: '1s' },
        ...sx
      }}
      aria-hidden="true"
      {...props}
    >
      {take(events, 7).map(({ timestamp, type, emoji, ...channel }) => (
        <Slide top duration={256} key={timestamp + JSON.stringify(channel)}>
          <>
            {type === 'message' && (
              <>
                Message in <Channel {...channel} />
              </>
            )}
            {type === 'typing' && (
              <>
                …typing in <Channel {...channel} />
              </>
            )}
            {type === 'reaction' && (
              <>
                <Channel {...channel} /> reaction: {emoji}
              </>
            )}
          </>
        </Slide>
      ))}
    </Box>
  )
}

export default SlackEvents
