import { Box, Link, Image, Button, Heading, Text, Card, Flex } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Footer from '../components/footer'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import ReplitForm from '../components/replit/form'
import Progress from '../components/replit/progress'
import TokenInstructions from '../components/replit/token-instructions'
import { useEffect, useState } from 'react'
import ScaleUp from '../components/replit/scale-up'

const ReplitPage = () => {
  // const [progress, setProgress] = useState(null)
  // const [stats, setStats] = useState(null)
  // const [oldStats, setOldStats] = useState(null)

  // const fetchStats = async () => {
  //   const statResponse = await fetch('/api/replit/stats')
  //   if (!statResponse.ok) throw new Error('Failed to fetch stats')
  //   const newStats = await statResponse.json()
  //   setOldStats(stats)
  //   setStats(newStats)
  // }

  // useEffect(async () => {
  //   await fetchStats()

  //   const interval = setInterval(async () => {
  //     const token = localStorage.getItem('token')
  //     if (!token) return

  //     try {
  //       const response = await fetch(`/api/replit/progress?token=${token}`)
  //       if (!response.ok) throw new Error('Failed to fetch progress')
  //       const data = await response.json()
  //       console.info(data)
  //       setProgress(data)

  //       await fetchStats()
  //     } catch (err) {
  //       console.error("Couldn't get progress:", err)
  //     }
  //   }, 5_000)

  //   return () => clearInterval(interval)
  // }, [])

  const steps = [
    'Enter your email',
    'Enter your replit token',
    'Get free stickers'
  ]

  const cssDark = 'hsl(23, 94%, 32%)'

  return (
    <>
      <Meta
        as={Head}
        title="Export your repls"
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
          color: 'white',
          overflow: 'hidden'
        }}
      >
        <Heading as="h1" sx={{ position: 'relative', marginBottom: '1rem' }}>
          Replit Lifeboat:{' '}
          <Text
            as="span"
            sx={{ display: 'inline-flex', flexDirection: 'column' }}
          >
            Save Our Ships
            <Image
              src="/replit/sos-morse.svg"
              alt="SOS in morse code"
              sx={{ opacity: 0.5 }}
            />
          </Text>
          <Text
            sx={{
              position: 'absolute',
              left: '-2.5rem',
              bottom: '-1rem',
              rotate: '-30deg',
              fontSize: '3rem'
            }}
          >
            🛟
          </Text>
          <Text
            sx={{
              position: 'absolute',
              left: '2rem',
              top: '-3rem',
              rotate: '15deg',
              fontSize: '2.5rem'
            }}
          >
            🛳️
          </Text>
          <Text
            sx={{
              position: 'absolute',
              right: '-2rem',
              top: '-2.5rem',
              rotate: '30deg',
              fontSize: '3rem'
            }}
          >
            🚤
          </Text>
          <Text
            sx={{
              position: 'absolute',
              right: '-5rem',
              bottom: '-1.5rem',
              rotate: '20deg',
              fontSize: '3rem'
            }}
          >
            🌊
          </Text>
          <Text
            sx={{
              position: 'absolute',
              right: '12rem',
              bottom: '-2.5rem',
              rotate: '-15deg',
              fontSize: '3rem',
              zIndex: 10
            }}
          >
            ⛵
          </Text>
        </Heading>

        <Heading
          as="h2"
          sx={{
            fontSize: '4em'
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
            /*
            onMouseOver={() => {
              document.getElementById('og-replit').style.opacity = '0'
              document.getElementById('fire-replit').style.opacity = '1'
            }}
            onMouseOut={() => {
              document.getElementById('og-replit').style.opacity = '1'
              document.getElementById('fire-replit').style.opacity = '0'
              }}
              */
          >
            Replit <style>{`.replit-fire {transition: opacity 0.1s;`}</style>
            <Image
              src="/replit/replit.svg"
              alt="replit"
              sx={{ height: '1em' }}
              id="og-replit"
              className="replit-fire"
            />
            {/*
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
            />*/}
          </Text>{' '}
          repls
        </Heading>

        <Text
          sx={{
            maxWidth: '100ch',
            fontSize: '1.2em',
            marginY: '1em',
            marginTop: '1em',
            textWrap: 'pretty'
          }}
        >
          Replit cut down its free plan - many students can't afford to keep
          using it.
          <br />
          We quickly built this project exporter. It's the only way to download
          your repls with <i>edit history intact</i> (as a git repo).
          <br />
          Written in Rust &{' '}
          <Link
            className="gh-link"
            href="https://github.com/hackclub/replit-lifeboat"
            sx={{
              color: 'inherit'
            }}
          >
            open source
          </Link>
          .{' '}
          <Text>
            <ScaleUp number={1091841} from={0} /> files &{' '}
            <ScaleUp number={82699} from={0} /> repls exported.
          </Text>
        </Text>
      </Box>

      <Box
        as="main"
        sx={{
          maxWidth: '100ch',
          marginX: 'auto',
          paddingX: '1rem'
        }}
      >
        <Text
          sx={{
            maxWidth: '100ch',
            fontSize: '1.2em',
            marginY: '1em',
            textWrap: 'balance',
            textAlign: 'center',
            mx: 'auto',
            marginBottom: '1em',
            display: 'block'
          }}
        >
          <Text as="span" sx={{ fontWeight: 'bold' }}>
            This does not work anymore.
          </Text>
          <br />
          After 9 months of operation, Replit has changed how their GraphQL
          endpoint works (presumably specifically to kill this project).
          <br />
          The time spent fixing it would not be worth it;{' '}
          
          <br />
          <br />

          Both of the following alternative ways to export your code will not{' '}
          <Text as="span" sx={{ fontWeight: 'bold' }}>
            not contain edit history.
          </Text>
          <br />
          <br />

          You can now{' '}
          <Text as="span" sx={{ fontWeight: 'bold' }}>
            download all your repos using Replits "bulk exporter".
          </Text>
          <br />

          Go to your{' '}
          <Link href="https://replit.com/account">account settings</Link>
          , scroll to the "Account" section and click the "Start Export" button.
          <Image
              src="/replit/BulkExportReplsReplit.png"
              sx={{
                width: '30%',
                marginX: 'auto',
                display: 'block',
                borderRadius: 12
              }}
          />
          <br />

          This will open the following pop-up. {' '}
          <Text as="span" sx={{ fontWeight: 'bold' }}>
            Click "Start Export".
          </Text>
          <Image 
            src="/replit/ExportReplsReplit.png"
            sx={{
              width: '50%',
              marginX: 'auto',
              display: 'block',
              borderRadius: 12
            }}
          />
          <br />
          After some time, you will recieve an e-mail containing a download link.
          <br />
          <br />
          
          <Text as="span" sx={{ fontWeight: 'bold' }}>
            Or you can alternatively still download individual Repls as ZIP archives.
          </Text>{' '}
        </Text>

        <Image
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/19a2da199dc4ea5b55eee1f69ce814ca4a7c3b01_screenshot_2025-04-22_at_1.38.22_pm.png"
          alt="download repl as zip instructions"
          sx={{
            width: '50%',
            marginX: 'auto',
            display: 'block',
            borderRadius: 12
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '2rem',
            position: 'relative',
            paddingX: [null, null, '6rem'],
            opacity: 0.5
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

        <Box
          sx={{
            marginTop: '3rem',
            maxWidth: '30rem',
            marginX: 'auto',
            opacity: 0.5,
            pointerEvents: 'none'
          }}
        >
          {/* <Progress progress={progress} /> */}
          <ReplitForm cssDark={cssDark} />
        </Box>

        <Box sx={{ paddingTop: '5rem' }} id="instructions">
          <Heading as="h2" sx={{ marginBottom: '0.5em', textAlign: 'center' }}>
            How to get your Replit <code>connect.sid</code> token
          </Heading>

          <TokenInstructions />

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
