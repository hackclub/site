import { sample, take } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { Box, Flex, Text } from 'theme-ui'
import { sql } from '@vercel/postgres'

const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', '#8067c3']

const Channel = ({ color, channel }) => (
  <Text as="strong" color={color}>
    {channel}
  </Text>
)

const whitelistedChannels = new Set(
  `epoch-tx epoch-ba epoch-vt epoch-satellites lounge counttoamillion code scrapbook hq epoch ship welcome confessions lobby question-of-the-day hack-night announcements assemble community leaders bank hcb college-apps cdn present sprig hackathons 8-ball hackathon-organizers zrl-land design ishan-ded apple out-of-context amas batcave matthews-brain-dump memes epoch-bts poll-of-the-day pasture music too-much-information corgi-states-of-hugo gamedev denio-den india linux neighbourhood packages politics sarthaks-dreams fayd-lives-here bayarea reesericdotci celesticide minecraft cabin -코트니- neon replit-embassy the-democratic-peoples-republic-of-yishun scrapbook-dev speedy-diffusion 10-days-in-public orpheus-legion hq-surroundings annοuncements productivity hackathon-grants secret-santa ian-things-ᴛᴍ emojibot hardware-party koggy-woggy surroundings honest-impressions charlie confessions-meta carot-dev wordle pranavs-lair crypto adventofcode cake one-north mayhaps epoch-food-n-fun toby-shenanigans seattle math fishhead lgbtq chars-corner github-embassy project-ideas rant-about-high-school orpheus-show shoutout rust alumni slack-themes 3d-printing art hacktoberfest newsletter india swim`
    .split(/\s+/gi)
    .filter(i => i.length > 0)
)

const SlackEvents = ({ sx, color, textColor, ...props }) => {
  const didUnmount = useRef(false)
  const [events, setEvents] = useState([])

  const STATIC_OPTIONS = useMemo(
    () => ({
      shouldReconnect: () => !didUnmount.current,
      reconnectInterval: 3000
    }),
    []
  )

  const { lastJsonMessage } = useWebSocket(
    'wss://joebunyan.haas.hackclub.com/stream',
    STATIC_OPTIONS
  )

  useEffect(() => {
    try {
      async function resolveEvent() {
        if (
            !lastJsonMessage ||
            !lastJsonMessage.channel
        ) {
          return false
        }

        const { name } = await fetch(
            `/api/channels/resolve/?id=${lastJsonMessage.channel}`
        )
            .then(r => r.json())
            .catch(err => console.error(err))

        if (whitelistedChannels.has(name)) {
          setEvents(prev => [
            {
              type: lastJsonMessage.type,
              channel: `#${name}`,
              color: sample(colors)
            },
            ...prev
          ])

          await sql`
          INSERT INTO channels (name)
          VALUES (${name})
          ON CONFLICT (name) DO NOTHING;
        `;
        }
      }

      resolveEvent()
    } catch (err) {
      true
    }
  }, [lastJsonMessage])

  useEffect(() => {
    try {
      async function resolveEvent() {
        if (
          !lastJsonMessage ||
          !lastJsonMessage.type === 'message' ||
          !lastJsonMessage.channel
        ) {
          return false
        }

        const { name } = await fetch(
          `/api/channels/resolve/?id=${lastJsonMessage.channel}`
        )
          .then(r => r.json())
          .catch(err => console.error(err))

        if (whitelistedChannels.has(name)) {
          //this check should happen before the web req, to save on net resources
          setEvents(prev => [
            {
              type: lastJsonMessage.type,
              channel: `#${name}`,
              color: sample(colors)
            },
            ...prev
          ])
        }
      }

      resolveEvent()
    } catch (err) {
      true
    }
  }, [lastJsonMessage])

  useEffect(() => {
    return () => {
      didUnmount.current = true
    }
  })

  return (
    <Flex
      sx={{
        minHeight: '4em',
        maxHeight: [128, 256],
        overflow: 'hidden',
        listStyle: 'none',
        lineHeight: 'heading',
        pl: 0,
        color: textColor || 'red',
        fontSize: 2,
        overflowY: 'hidden',
        position: 'relative',
        ':after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          display: 'block',
          height: '2em',
          backgroundImage: theme =>
            `linear-gradient(to left,rgba(255,255,255,0), ${
              color || theme.colors.white
            })`
        },
        div: { mb: [1, 2] },
        'circle:last-of-type': { animationDuration: '1s' },
        ...sx
      }}
      aria-hidden="true"
      {...props}
    >
      <Box sx={{ padding: 8 }}/>
      {take(events, 7).map(({ type, channel, color }) => (
          <>
            {type === 'message' && (
              <Text sx={{ marginX: "5px" }}>
                <Channel channel={channel} color={color} />
              </Text>
            )}
          </>
      ))}
      <Channel channel="#lounge" color="red"/>
    </Flex>
  )
}

export default SlackEvents
