import { Box, Link, Image, Button, Heading, Text, Card } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Footer from '../components/footer'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import ReplitForm from '../components/replit/form'

const ReplitPage = () => {
  const steps = [
    'Enter your email',
    'Enter your replit token',
    'Get free stickers'
  ]

  const tokenSteps = [
    {
      image: '/replit/aarc1.gif',
      desc: "Open your browser's developer tools. You can do this by right-clicking on the page and selecting 'Inspect' or by pressing F12 on your keyboard."
    },
    {
      image: '/replit/aarc2.gif',
      desc: 'Select the application tab in the devtools'
    },
    {
      image: '/replit/aarc3.gif',
      desc: "Make sure replit.com cookies are selected, then scroll down to find 'connect.sid'. Copy the entire token & paste it in the form at the top of this page."
    }
  ]

  const cssDark = 'hsl(23, 94%, 32%)'

  return (
    <>
      <Meta
        as={Head}
        title="Export your Repls"
        description="Replit free has shut down. Export with Hack Club to GitHub Education's new free codespaces offering"
      />
      <style>{`html { scroll-behavior: smooth; } body { background-color: hsl(23, 94%, 96%); }`}</style>
      <ForceTheme theme="light" />
      <Nav />
      <Box
        as="header"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: ['4rem', null, '6rem'],
          paddingBottom: '1rem',
          textAlign: 'center',
          backgroundColor: cssDark,
          color: 'white'
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: '4em'
          }}
          onMouseOver={() => {
            document.getElementById('og-replit').style.opacity = '0'
            document.getElementById('fire-replit').style.opacity = '1'
          }}
          onMouseOut={() => {
            document.getElementById('og-replit').style.opacity = '1'
            document.getElementById('fire-replit').style.opacity = '0'
          }}
        >
          Export your{' '}
          <Text
            as="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            Replit <style>{`.replit-fire {transition: opacity 0.1s;`}</style>
            <Image
              src="/replit/replit.svg"
              alt="replit"
              sx={{ height: '1em' }}
              id="og-replit"
              className="replit-fire"
            />
            <Image
              src="/replit/replit-fire-nooutline.png"
              alt="replit"
              sx={{
                height: '1.35em',
                translate: '-0.095em -0.195em',
                position: 'absolute',
                right: 0,
                opacity: 0
              }}
              id="fire-replit"
              className="replit-fire"
            />
          </Text>{' '}
          repls
        </Heading>

        <Text sx={{ maxWidth: '80ch', fontSize: '1.2em', marginY: '1em' }}>
          On 25th August, Replit cut down its free plan - it's now unusable.
          <br />
          Previously, you got unlimited repls for free, for as long as you
          wanted.
          <br />
          Now you get three repls, for 600 minutes per month (20 mins/day).
        </Text>
      </Box>

      <Box as="main" sx={{ maxWidth: '100ch', marginX: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
            position: 'relative',
            paddingX: [null, null, '6rem']
          }}
        >
          {steps.map((step, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontWeight: '600',
                paddingX: '.25em'
              }}
            >
              <Box
                sx={{
                  width: '1.5em',
                  height: '1.5em',
                  backgroundColor: cssDark,
                  color: 'white',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text>{idx + 1}</Text>
              </Box>
              <Text sx={{ textAlign: 'center' }}>{step}</Text>
            </Box>
          ))}

          <Image
            src="/replit/arrow1.svg"
            alt=""
            sx={{
              position: 'absolute',
              width: `${7 * 0.9384843737}em`,
              bottom: '-1.5em',
              left: '32.5%',
              translate: '-50% 0'
            }}
          />
          <Image
            src="/replit/arrow2.svg"
            alt=""
            sx={{
              position: 'absolute',
              width: '7em',
              bottom: '-2em',
              left: '67%',
              translate: '-50% 0'
            }}
          />
        </Box>

        <Box sx={{ marginTop: '3rem' }}>
          <ReplitForm cssDark={cssDark} />
        </Box>

        <Box sx={{ paddingTop: '5rem' }} id="instructions">
          <Heading as="h2" sx={{ marginBottom: '0.5em' }}>
            How to get your Replit <code>connect.sid</code> token
          </Heading>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {tokenSteps.map((step, idx) => (
              <Card
                key={idx}
                sx={{
                  lineHeight: 0
                }}
              >
                <Heading as="h3" sx={{ lineHeight: 1.5 }}>
                  Step {idx + 1}
                </Heading>
                <Text sx={{ lineHeight: 1.5 }}>{step.desc}</Text>
                <Image
                  src={step.image}
                  alt=""
                  sx={{ borderRadius: '0.25rem', marginTop: '1em' }}
                />
              </Card>
            ))}
          </Box>

          <Link href="#">
            <Button
              sx={{
                width: '100%',
                backgroundColor: cssDark,
                marginTop: '2rem'
              }}
            >
              Back to top
            </Button>
          </Link>
        </Box>
      </Box>

      <Footer dark sx={{ marginTop: '3rem' }} />
    </>
  )
}

export default ReplitPage
