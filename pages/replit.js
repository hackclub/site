import {
  Box,
  Link,
  Grid,
  Image,
  Container,
  Button,
  Heading,
  Text,
  Label,
  Input,
  Card,
  Progress
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Footer from '../components/footer'
import Nav from '../components/nav'
import { useState, useEffect } from 'react'
import useForm from '../lib/use-form'
import Submit from '../components/submit'
import ForceTheme from '../components/force-theme'

const ReplitPage = () => {
  const [userDetails, setUserDetails] = useState({ token: null, email: null })

  const [responseText, setResponseText] = useState('')
  const [progressText, setProgressText] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    setUserDetails({ token, email })

    setInterval(() => {
      try {
        fetch(`/api/replit/progress?token=${localStorage.getItem('token')}`)
          .then(res => res.text())
          .then(data => {
            const split = data.split('/')
            console.log(data, split)
            setProgressText(split[0] / split[1])
          })
      } catch (e) {
        console.warn(e)
      }
    }, 5_000)
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = {
      email: formData.get('email'),
      token: formData.get('token')
    }

    try {
      const response = await fetch('/api/replit/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      localStorage.setItem('token', result.token)
      localStorage.setItem('email', result.email)
      setUserDetails({ token: result.token, email: result.email })
      setResponseText('Success!')
    } catch (error) {
      setResponseText('Error submitting form')
      console.error('Error:', error)
    }
  }

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

  return (
    <>
      <Meta
        as={Head}
        title="Export your Repls"
        description="Replit free has shut down. Export with Hack Club to GitHub Education's new free codespaces offering"
      />
      <style>{`html { scroll-behavior: smooth; }`}</style>
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
          backgroundColor: 'black',
          color: 'white'
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: '3em'
          }}
        >
          Export your{' '}
          <Text as="span" sx={{ display: 'inline-flex' }}>
            Replit{' '}
            <Image
              src="/replit/replit.svg"
              alt="replit"
              sx={{ height: '1em' }}
            />
          </Text>{' '}
          repls
        </Heading>

        <Text sx={{ maxWidth: '80ch', fontSize: '1.2em', marginY: '1em' }}>
          Replit has discontinued its free plan. Previously free features like
          unlimited & private repls now cost $10 per month. GitHub Education is
          offering free{' '}
          <Link href="https://github.com/features/codespaces">Codespaces</Link>{' '}
          to all students.
        </Text>
      </Box>

      <Text sx={{ fontSize: '0.1rem' }}>{JSON.stringify(userDetails)}</Text>

      <Box sx={{ maxWidth: '100ch', marginX: 'auto' }}>
        <Box sx={{ marginTop: '3rem' }}>
          <Heading as="h2" sx={{ marginBottom: '0.5em' }}>
            Export your repls
          </Heading>
          <Card sx={{ background: 'smoke' }}>
            <form onSubmit={handleSubmit}>
              <Label sx={{ fontSize: 1 }} htmlFor="email">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                defaultValue={userDetails.email}
              />

              <Label sx={{ fontSize: 1, pt: 2 }} htmlFor="token">
                Replit connect.sid token
              </Label>
              <Input name="token" defaultValue={userDetails.token} />

              <Input
                type="submit"
                sx={{ backgroundColor: 'black', mt: '0.5rem', color: 'white' }}
                text="Submit"
              />
            </form>
            <Text>{responseText}</Text>

            {progressText ? (
              <Box
                sx={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                <Progress max={1} value={progressText}>
                  {progressText * 100}%
                </Progress>

                <Text sx={{ flexShrink: 0 }}>
                  {progressText * 100}% of your repls have processed.
                  {progressText <= 0 ? ' Please wait!' : null}
                  {progressText <= 1 ? ' Check your email!' : null}
                </Text>
              </Box>
            ) : null}
          </Card>
        </Box>

        <Card sx={{ background: 'smoke', marginTop: '3rem' }}>
          3: Something about free stickers
        </Card>

        <Box sx={{ marginTop: '3rem' }}>
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
                  lineHeight: 0,
                  background: 'smoke'
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
                backgroundColor: 'black',
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
