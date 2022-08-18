import { Box, Badge, Container, Flex, Grid, Heading } from 'theme-ui'
import { Link, Text, Button, Card } from 'theme-ui'
import Icon from '@hackclub/icons'
import { Slide } from 'react-reveal'
import Zoom from 'react-reveal/Zoom'
import MSparkles from './money'
// import Stage from '../stage'
import Image from 'next/image'
/** @jsxImportSource theme-ui */

function TimelineStep({ children }) {
    return (
      <Flex
        sx={{
          marginX: [2, null, null],
          // paddingX: [null, null, 3, 4],
          paddingY: [4, null, 0],
          flexDirection: ['row', null, 'column'],
          alignItems: 'center',
          justifyContent: ['center', 'center', 'unset', 'unset'],
          // width: 'fit-content',
          '&:before': {
            content: '""',
            background: '#3c4858',
            height: [0, null, '4px'],
            width: [0, null, '60%'],
            maxWidth: '840px',
            marginLeft: [null, null, 0],
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

const Photo = ({
  icon,
  color,
  name,
  desc,
  duration,
  children,
  src,
  width,
  height,
  alt,
  showAlt,
  dark,
  ...props
}) => {
  return (
    <Card
      {...props}
      as="figure"
      variant="interactive"
      sx={{
        p: [0, 0, 0],
        boxShadow: 'elevated',
        borderRadius: 'extra',
        position: 'relative',
        maxWidth: '100%',
        lineHeight: 0,
        height: 'fit-content',
        ...props.sx,
        img: { objectFit: 'cover', objectPosition: 'center' }
      }}
    >        <Box sx={{ position: 'relative' }}>
          <Image
            src={src}
            alt={alt}
            width="100%"
            height="60%"
            layout="responsive"
          />
          <Box
            as="span"
            sx={{
              width: 'fit-content',
              bg: color,
              borderRadius: 20,
              lineHeight: 0,
              p: '14px',
              px: 0,
              mb: 1,
              display: 'inline-block',
              transform: ['scale(0.75)', 'none'],
              transformOrigin: 'bottom left',
              boxShadow:
                'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              fontSize: '20px'
            }}
          >
              <Badge variant="pill">{duration}</Badge>
            {/* <Icon glyph={icon} size={36} /> */}
          </Box>
        </Box>
        <Box sx={{ mt: '20px' }}>
          {/* <Text
            sx={{
              color: 'muted',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              fontSize: [18, null, 22],
              p: 3,
              mx: [null, null, 'auto'],
              boxShadow: 'none !important'
            }}
          >
            {duration}
          </Text> */}
          <Heading variant="subtitle" mb={2} p={3} pt={0}>
            {name}
          </Heading>
        </Box>
    </Card>
  )
}

const Stage = ({ icon, color, name, desc, ...props }) => (
  <Box>
    <Box
      as="span"
      sx={{
        width: 'fit-content',
        bg: color,
        borderRadius: 18,
        lineHeight: 0,
        p: 2,
        mb: 1,
        display: 'inline-block',
        transform: ['scale(0.75)', 'none'],
        transformOrigin: 'bottom left',
        boxShadow:
          'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Icon glyph={icon} size={48} />
    </Box>
    <Box>
      <Image src="/hackathon-grant/first.png" width="200" height="200" />
      <Heading as="h3" variant="headline" mb={2}>
        {name}
      </Heading>
      <Text
        as="p"
        variant="subtitle"
        sx={{ mt: 0, pb: 2, a: { variant: 'styles.a', color: 'blue' } }}
      >
        {desc}
      </Text>
    </Box>
  </Box>
)

const Apply = ({ channel }) => {
  return (
    <>
      <Box id="apply" sx={{ pt: 6 }}>
          <Zoom>
          <Heading sx={{ textAlign: 'center', mb: 3, fontSize: [5, null, 6, 7] }}>
          The <MSparkles>bucks</MSparkles> start here.
        </Heading>
          </Zoom>
          <Zoom>
          <Heading
          sx={{
            textAlign: 'center',
            mb: [2, null, 4],
            fontSize: [28, 30, 40],
            color: 'muted'
          }}
        >
          Get your hackathon funded.
        </Heading>
          </Zoom>
      </Box>
      <Grid
        pt={[3, 4]}
        pb={[4, 5]}
        gap={[4, 3, 4]}
        columns={[1, 1, 3]}
        sx={{
          textAlign: 'left',
          '> a, > div': {
            borderRadius: 'extra',
            boxShadow: 'elevated',
          },
          span: {
            boxShadow:
              '-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)'
          },
          svg: { fill: 'currentColor' }
        }}
      >
          <Slide left delay={20}>
        <Photo
          src="/hackathon-grant/step1.png"
          alt="Summer Creek Hack Club meeting, February 2020"
          width={3000}
          height={2550}
          showAlt
          color="#ec3750"
          icon="slack"
          duration="Step 1"
          name={
            <>
              On{' '}
              <Link
                href="https://hackclub.com/slack"
                target="_blank"
                sx={{
                  color: 'white'
                }}
              >
                Slack
              </Link>
              , send your website to{' '}
              <Link href={channel} target="_blank">
                #hackathon-grants
              </Link>
            </>
          }
        />
        </Slide>
        <Slide left delay={10}>
        <Photo
          src="/hackathon-grant/step2.png"
          alt="Summer Creek Hack Club meeting, February 2020"
          width={3000}
          height={2550}
          showAlt
          color="#ec3750"
          icon="post"
          duration="Step 2"
          name={
            <>
              Fill in your application, we'll respond in 24 hours
            </>
          }
        />
        </Slide>
        <Slide left>
        <Photo
          src="/hackathon-grant/step3.png"
          alt="Summer Creek Hack Club meeting, February 2020"
          width={3000}
          height={2550}
          showAlt
          color="#ec3750"
          duration="Step 3"
          icon="payment-transfer"
          name="Ka-ching! If approved, start spending your $500"
        />
        </Slide>
      </Grid>

      <Slide left>
        <Link
          href="/slack/?reason=Application%20for%20the%20high%20school%20hackathon%20grant"
          target="_blank"
          sx={{ textDecoration: 'none' }}
        >
          <Button
            as="a"
            variant="primary"
            sx={{
              fontSize: [2, null, 3],
              display: 'block',
              mx: 'auto',
              width: 'fit-content'
            }}
          >
            Join Slack
          </Button>
        </Link>
        <Box
          sx={{
            fontSize: ['14px', 1, 1],
            textAlign: 'center',
            color: 'muted',
            my: 3,
            width: '60%',
            mx: 'auto'
          }}
        >
          Already have an account? Join the{' '}
          <Link href={channel} target="_blank">
            #hackathon-grants
          </Link>{' '}
          channel!
        </Box>
      </Slide>
    </>
  )
}

export default Apply
