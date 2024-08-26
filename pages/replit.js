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
  Card
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
  const [savedToken, setSavedToken] = useState('')
  const [savedEmail, setSavedEmail] = useState('')

  useEffect(() => {
    // Load saved data from localStorage on component mount
    const token = localStorage.getItem('replitToken')
    const email = localStorage.getItem('replitEmail')
    if (token) setSavedToken(token)
    if (email) setSavedEmail(email)

    if (token) {
      const progressUrl = new URL('http://68.183.252.105/progress')
      progressUrl.searchParams.append('token', token)

      // setInterval(() => {
      //   fetch(progressUrl)
      // }, 1_000)
    }
  }, [])

  const { status, data, useField, formProps } = useForm(
    '/api/replit/signup',
    response => {
      // Callback function after successful submission
      localStorage.setItem('replitToken', data.token)
      localStorage.setItem('replitEmail', data.email)
      alert('Form submitted successfully!')
    },
    {
      clearOnSubmit: false,
      initData: { token: savedToken, email: savedEmail }
    }
  )

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

      <Box sx={{ maxWidth: '100ch', marginX: 'auto' }}>
        <Box sx={{ marginTop: '3rem' }}>
          <Heading as="h2" sx={{ marginBottom: '0.5em' }}>
            Export your repls
          </Heading>
          <Card>
            <form {...formProps}>
              <Label sx={{ fontSize: 1, pt: 2 }} htmlFor="token">
                Replit connect.sid token
              </Label>
              <Input {...useField('token')} />

              <Label sx={{ fontSize: 1, pt: 2 }} htmlFor="email">
                Email override
              </Label>
              <Input {...useField('email', 'email')} />

              <Submit
                sx={{ backgroundColor: 'black', mt: '0.5rem' }}
                status={status}
                value="Submit"
              />
            </form>
          </Card>
        </Box>

        <Box sx={{ marginTop: '3rem' }}>
          <Heading as="h2" sx={{ marginBottom: '0.5em' }}>
            How to get your Replit <code>connect.sid</code> token
          </Heading>

          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              padding: '1rem'
            }}
          >
            {tokenSteps.map((step, idx) => (
              <Card
                key={idx}
                sx={{
                  padding: '1rem !important',
                  lineHeight: 0,
                  minWidth: '64rem'
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
