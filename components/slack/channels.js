import { Badge, Box, Card, Flex, Grid, Heading, Image, Text } from 'theme-ui'
import Icon from '@hackclub/icons'
import NextLink from 'next/link'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'
import SlackEvents from './slack-events'

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default function Channels() {
  const { data: millionCount } = useSWR(
    'https://jia.haas.hackclub.com/api/currentNumber',
    fetcher,
    { refreshInterval: 10_000 }
  )
  return (
    <Grid
      columns={[2, 9, 15]}
      gap={3}
      sx={{
        py: [3, 4],
        h3: { my: 0 },
        '> div': {
          px: [2, 3],
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gridColumn: ['span 1', 'span 3']
        },
        a: {
          position: 'relative',
          ':hover,:focus': {
            svg: {
              transform: 'translateX(28px) translateY(-28px)',
              opacity: 0
            }
          }
        },
        svg: {
          position: 'absolute',
          top: 2,
          right: 2,
          fill: 'white',
          transition: 'transform 0.25s ease-in-out, opacity 0.25s ease-in-out'
        },
        h3: {
          variant: 'text.headline',
          color: 'white',
          lineHeight: 'title',
          m: 0,
          '+ p': {
            mt: 2,
            color: 'white',
            opacity: 0.75,
            fontSize: 2,
            lineHeight: 'caption'
          }
        }
      }}
    >
      <Box
        as="aside"
        sx={{
          gridRow: [null, 'span 2'],
          gridColumn: ['span 2', 'span 3'],
          maxHeight: '100%',
          overflow: 'hidden'
        }}
      >
        <Heading
          as="h2"
          variant="subheadline"
          sx={{
            mt: 0,
            mb: 0,
            color: 'red',
            textTransform: 'uppercase',
            letterSpacing: 'headline'
          }}
        >
          Live from our&nbsp;Slack <br />
        </Heading>
        <Text
          as="p"
          variant="caption"
          sx={{
            fontSize: 1,
            fontWeight: 300,
            fontStyle: 'italic',
            mb: '16px'
          }}
        >
          Waiting for more messages...
        </Text>
        <SlackEvents />
      </Box>
      <NextLink href="/ship" passHref>
        <Card
          as="a"
          variant="interactive"
          sx={{
            gridColumn: ['span 2', 'span 5'],
            bg: 'blue',
            backgroundImage: t => t.util.gx('cyan', 'blue')
          }}
        >
          <Icon glyph="external" size={24} />
          <Heading as="h3" variant="headline">
            #ship
          </Heading>
          <Text as="p">Launch your latest projects & get feedback</Text>
        </Card>
      </NextLink>
      <Card
        as="a"
        href="https://scrapbook.hackclub.com/"
        variant="interactive"
        sx={{
          gridColumn: ['span 2', 'span 5'],
          bg: 'dark',
          backgroundImage: t => t.util.gx('yellow', 'orange')
        }}
      >
        <Icon glyph="external" size={24} />
        <Heading as="h3" variant="headline">
          #scrapbook
        </Heading>
        <Text as="p">A daily diary of project updates</Text>
      </Card>
      <Card
        bg="red"
        sx={{
          gridColumn: ['span 2 !important', 'span 2 !important'],
          gridRow: ['span 1 !important', 'span 3 !important'],
          writingMode: ['lr-tb', 'tb-rl']
        }}
      >
        <Heading as="h3">#counttoamillion</Heading>
        <Text as="p" sx={{ display: 'flex', alignItems: 'baseline' }}>
          We’re at{' '}
          <Badge
            variant="outline"
            as="span"
            sx={{ ml: [2, 0], mt: [0, 2], px: [2, 0], py: [0, 2] }}
          >
            {millionCount ? withCommas(millionCount.number) : '???'}
          </Badge>
          !
        </Text>
      </Card>
      <Card backgroundColor="green">
        <h3 sx={{ color: 'black' }}>#gamedev</h3>
      </Card>
      <Card
        sx={{
          backgroundImage:
            'url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/12020-07-25_fqxym71bmqjr1d35btawn5q6ph1zt0mk.png)',
          backgroundColor: '#FEC62E',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
          gridColumn: ['span 2', 'span 3 !important', 'span 4 !important'],
          h3: { opacity: 0 }
        }}
      >
        <h3>#design</h3>
      </Card>
      <Card
        bg="dark"
        sx={{ h3: { color: 'green', textShadow: '0 0 4px currentColor' } }}
      >
        <h3>#code</h3>
      </Card>
      <Card
        sx={{
          bg: 'dark',
          backgroundImage:
            'url(https://cloud-jnfb0t781-hack-club-bot.vercel.app/02020-07-25_r6thfxwv1u0c71uw0qk94juv6fxxjygf.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textShadow: 'text',
          gridColumn: ['span 2 !important', 'span 4 !important']
        }}
      >
        <h3>#photography</h3>
      </Card>
      <Card bg="purple">
        <Flex>
          <Text as="h3" sx={{ placeSelf: 'center' }}>
            #music
          </Text>
          <Image
            src="https://cloud-jd45ga0mv-hack-club-bot.vercel.app/0music.svg"
            alt="Music notes"
            sx={{ height: '50px', width: '50px', ml: 2 }}
          />
        </Flex>
      </Card>
      <Card bg="orange">
        <Flex>
          <Text as="h3" sx={{ placeSelf: 'center' }}>
            #lounge
          </Text>
        </Flex>
      </Card>
      <Card
        bg="red"
        sx={{
          backgroundImage: ({ colors }) =>
            `linear-gradient(-184deg, ${colors.red} 0%, ${colors.red} 16.6666%, ${colors.orange} 16.6666%, ${colors.orange} 33.333%, ${colors.yellow} 33.333%, ${colors.yellow} 50%, ${colors.green} 50%, ${colors.green} 66.6666%, ${colors.blue} 66.6666%, ${colors.blue} 83.3333%, ${colors.purple} 83.3333%, ${colors.purple} 100%)`
        }}
      >
        <h3>#lgbtq</h3>
      </Card>
    </Grid>
  )
}
