import { Box, Badge, Container, Flex, Grid, Heading } from 'theme-ui'
import { Link, Text, Button, Card } from 'theme-ui'
import Icon from '@hackclub/icons'
import JoinSlack from './join-slack'
import { Slide } from 'react-reveal'
import Sparkles from '../sparkles'

function Timeline({ children }) {
  return (
    <Flex
      sx={{ flexDirection: ['column', null, 'row'], justifyContent: 'center' }}
    >
      {children}
    </Flex>
  )
}

function TimelineStep({ children }) {
  return (
    <Flex
      sx={{
        marginX: [2, null, null],
        // paddingX: [null, null, 3, 4],
        paddingY: [4, null, 0],
        flexDirection: ['row', null, 'column'],
        alignItems: 'center',
        // width: 'fit-content',
        '&:before': {
          content: '""',
          background: '#3c4858',
          height: ['440px', null, '4px'],
          width: ['4px', null, '60%'],
          marginLeft: [26, null, 0],
          marginTop: [null, null, '34px'],
          position: 'absolute',
          zIndex: -1
        },
        '&:first-of-type:before': {
          top: [0, null, 'auto'],
          width: [0, null, 0],
          left: [0, null, 0]
        },
        '&:last-of-type:before': {
          bottom: [0, null, 'auto'],
          left: [0, null, 0],
          width: [0, null, 0]
        }
      }}
    >
      {children}
    </Flex>
  )
}

function Circle({ children }) {
  return (
    <Box
      style={{
        padding: 12,
        backgroundColor: '#ec3750',
        color: 'white',
        borderRadius: '100%',
        display: 'inline-block',
        lineHeight: 0,
        position: 'relative',
        zIndex: 999
      }}
    >
      {children}
    </Box>
  )
}

function Step({ icon, name, duration, href }) {
  return (
    <TimelineStep pb={4}>
      <Slide left>
        <Circle>
          {href ? (
            <Link href={href} sx={{ cursor: 'pointer' }}>
              <Icon glyph={icon} size={48} color="white" />
            </Link>
          ) : (
            <Icon glyph={icon} size={48} />
          )}
        </Circle>
        <Container
          sx={{
            marginTop: 3,
            display: 'flex',
            justifyContent: ['left', null, 'center'],
            flexDirection: 'column',
            textAlign: ['left', null, 'center']
          }}
        >
          <Badge
            variant="pill"
            sx={{
              bg: 'muted',
              color: 'darker',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              width: 64,
              fontSize: 18,
              px: 2,
              mx: [null, null, 'auto']
            }}
          >
            {duration}
          </Badge>
          <Text
            sx={{ color: 'white', fontSize: 24, maxWidth: [300, null, 550] }}
          >
            {name}
          </Text>
        </Container>
      </Slide>
    </TimelineStep>
  )
}

const Apply = () => {
  return (
    <>
      <Heading sx={{ textAlign: 'center', mb: 3, fontSize: [5, null, 6, 7] }}>
        The bucks start here.
      </Heading>
      <Heading sx={{ textAlign: 'center', mb: 5, fontSize: 4, color: 'muted' }} id="apply">
        Get your hackathon <Sparkles>funded</Sparkles>.
      </Heading>
      <Timeline px={3}>
        <Step
          icon="slack"
          name={
            <>
              On{' '}
              <Link
                href="https://hackclub.com/slack"
                target="_blank"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontStyle: 'italic'
                }}
              >
                slack
              </Link>
              , send your website to #hackathon-grant{' '}
            </>
          }
          duration="Step 1"
          href="https://hackclub.com/slack"
        />
        <Step
          icon="post"
          name="Fill in your application, we'll respond in 24 hours"
          duration="Step 2"
        />
        <Step
          icon="payment-transfer"
          name="Kaching! If approved, start spending your $500"
          duration="Step 3"
        />
      </Timeline>
      <Slide left>
        <JoinSlack />
      </Slide>
    </>
  )
}

export default Apply
