import CardModel from './card-model'
import { Box, Flex, Grid, Heading, Image, Link, Text } from 'theme-ui'
import Buttons from './button'
import Event from '../events'
import Dot from '../../dot'
import Comma from '../../comma'
/** @jsxImportSource theme-ui */

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage:
        'linear-gradient(to bottom,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85))',
      opacity: 0.8,
      zIndex: 1
    }}
  />
)
const Stats = ({ data, subheading }) => (
  <Box>
    <Heading
      variant="headline"
      as="h4"
      sx={{ mb: 0, pt: 2, fontSize: ['28px', '36px', '38px'] }}
    >
      <Comma>{data}</Comma>
    </Heading>
    <Text
      sx={{
        color: 'muted',
        fontSize: ['14px', '16px', '18px'],
        fontWeight: '400'
      }}
      as="h5"
    >
      {subheading}
    </Text>
  </Box>
)
export default function Slack({ data, slackKey, events }) {
  return (
    <CardModel
      color="white"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: t => t.util.gx('cyan', 'purple'),
        minHeight: ['300px', '400px', '500px']
      }}
    >
      <Image
        src="/home/slack_ama.webp"
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          ml: ['-24px', '-32px', '-32px', '-32px'],
          mt: ['-24px', '-32px', '-32px', '-32px']
        }}
      />
      <Cover />
      <Grid sx={{ zIndex: 2 }}>
        <Text
          as="h3"
          variant="title"
          sx={{
            fontSize: ['36px', 4, 5],
            zIndex: 2,
            maxWidth: [null, null, '70%', null]
          }}
        >
          Our online community
        </Text>
      </Grid>
      <Grid columns={[1, 1, '1.6fr 1fr', '1.6fr 1fr']} sx={{ zIndex: 2 }}>
        <Box
          sx={{
            zIndex: 2
          }}
        >
          <Text
            variant="subtitle"
            as="p"
            sx={{ fontSize: [1, '16px', '20px'] }}
          >
            Coding doesn’t have to be a solidary activity. At Hack&nbsp;Club, we
            make things together and in our Slack, you’ll find awesome people to
            hangout with too. Code together, find your programming community, or
            just hang out.
          </Text>
          <Text as="p" variant="subtitle">
            We also invite someone we really want to speak to (like
            Sal Khan, George Hotz, and Lady Ada) and host an{' '}
            <Link
              href="/amas"
              target="_blank"
              rel="noopener"
              sx={{ color: 'inherit' }}
            >
              AMA
            </Link>{' '}
            with them.{' '}
          </Text>
          <Event events={events} />
          <Buttons id="13" link="/slack" icon="slack" primary="purple">
            Join our Slack
          </Buttons>
          <Grid sx={{ zIndex: 2 }}>
            <Box
              sx={{
                background: 'rgb(0,0,0,0.6)',
                height: ['200px', '170px', '170px', '100%'],
                position: ['relative', 'relative', 'absolute'],
                zIndex: 3,
                width: ['120%', '120%', '260px'],
                right: 0,
                top: [null, null, 0],
                mt: [3, 3, 0],
                ml: ['-10%', '-10%', '-5%'],
                mb: ['-10%', '-10%', '-5%'],
                p: 4,
                pt: [3, 3, 4]
              }}
            >
              <Flex
                sx={{
                  flexDirection: ['column', 'row', 'row', 'column'],
                  justifyContent: 'space-between'
                }}
              >
                <Text variant="eyebrow" as="p" sx={{ color: 'white' }}>
                  <Dot />
                  Live from Slack
                </Text>
              </Flex>
              <Flex
                sx={{
                  flexDirection: ['row', 'row', 'column'],
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}
              >
                <Stats data={data.readers_count_1d} subheading="Online" />
                <Stats
                  data={data.chats_channels_count_1d}
                  subheading="Total channels"
                />
                <Stats
                  data={data.messages_count_1d}
                  subheading="Daily messages"
                />
                <Stats
                  data={data.total_members_count}
                  subheading="Total members"
                />
              </Flex>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </CardModel>
  )
}
