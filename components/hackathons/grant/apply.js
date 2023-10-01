import { Box, Badge, Grid, Heading } from 'theme-ui'
import { Link, Button, Card } from 'theme-ui'
import { Slide } from 'react-reveal'
import Zoom from 'react-reveal/Zoom'
import MSparkles from '../../sparkles/money'
import Image from 'next/image'
/** @jsxImportSource theme-ui */

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
    >
      {' '}
      <Box sx={{ position: 'relative' }}>
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
        </Box>
      </Box>
      <Box sx={{ mt: '20px' }}>
        <Heading variant="subtitle" mb={2} p={3} pt={0}>
          {name}
        </Heading>
      </Box>
    </Card>
  )
}

const Apply = ({ channel }) => {
  return (
    <>
      <Box id="apply" sx={{ pt: 6 }}>
        <Zoom>
          <Heading
            sx={{ textAlign: 'center', mb: 3, fontSize: [5, null, 6, 7] }}
          >
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
            boxShadow: 'elevated'
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
            src="/hackathons/grant/step1.gif"
            alt="Image of a user sending a Slack message and filling out a form"
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
            src="/hackathons/grant/step2.png"
            alt="Screenshot of a form in a Slack modal"
            width={3000}
            height={2550}
            showAlt
            color="#ec3750"
            icon="post"
            duration="Step 2"
            name={<>Fill in your application, we'll respond in 24 hours</>}
          />
        </Slide>
        <Slide left>
          <Photo
            src="/hackathons/grant/step3.png"
            alt="Screenshot of a grant in the form of a transaction on a HCB ledger"
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
