import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import {
  Box,
  Container,
  Heading,
  Button,
  Text,
  Image,
  Input,
  Label,
  Link
} from 'theme-ui'
import styled from '@emotion/styled'
import Snowfall from 'react-snowfall'
import Footer from '../components/footer'
import FadeIn from '../components/fade-in'
import { keyframes } from '@emotion/react'
import { useState } from 'react'

const Hero = styled(Box)`
  background-image: linear-gradient(
    to right bottom,
    rgb(45, 158, 228),
    rgb(41, 143, 206)
  );
  min-height: 100vh;
  position: relative;
  text-align: center;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const Lead = styled(Box)`
  font-size: 24px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 18px;
  margin-bottom: 18px;
  color: rgb(249, 249, 250);
  max-width: 48rem;
`

const Space = styled(Text)`
  white-space: pre;
  transition: 1s;
`
const RemoveSpace = styled(Text)`
  &:hover .space {
    font-size: 0;
  }
`

const floating = keyframes`
  from {
    transform: translateY(20px) rotate(0deg);
  }
  to {
    transform: translateY(-20px) rotate(5deg);
  }
`

const Page = () => (
  <Box sx={{ overflowX: 'hidden' }}>
    <Meta
      as={Head}
      title="Secret Santa"
      description="Find your holiday zen this year with Hack Club’s Secret Santa."
      image="https://cloud-9kgqrlg7o-hack-club-bot.vercel.app/0santa.png"
    />
    <Nav />
    <Hero py={4}>
      <Snowfall />
      <Container px={3} py={[3, 4]}>
        <Heading
          sx={{ py: [3, 5], fontSize: [4, 5], color: 'white', opacity: 0.8 }}
          bold
          caps
        >
          <FadeIn delay={300} duration={600}>
            It's 2022,
          </FadeIn>
          <FadeIn delay={1200} duration={600}>
            the holidays have come,
            <br />
          </FadeIn>
          <FadeIn delay={2300} duration={600}>
            now let's all have some fun!
          </FadeIn>
        </Heading>
        <Image
          src="https://cloud-k3gxm6uem.vercel.app/2020-12-07_0vmfbtyfzec2kqeujbwmp3q4bu50pr0y.png"
          alt="Illustration of a holiday themed Orpheus"
          width={384}
          height={384}
          sx={{
            zIndex: 1,
            animation: `${floating} cubic-bezier(.55,.03,.43,.98) 8s infinite alternate`
          }}
        />
        <FadeIn delay={3000}>
          <Heading
            as="h1"
            sx={{ fontSize: [5, 6], color: 'white', margin: 'auto' }}
          >
            Hack Club Secret Santa
          </Heading>
          <Lead
            fontSize={[3, null, 4]}
            color="snow"
            maxWidth={48}
            my={3}
            mx="auto"
          >
            Christmas is here and it's time for some fun! The holiday season is
            among us and the elves have assembled, which means its time for
            gift-giving to begin! The magical elf will assign you a partner,
            send them something fun, &amp; you'll get your own gift in the mail
            just in time for the holidays!
          </Lead>
          {/* Signup form */}
          <Signup />
          {/* <Button disabled sx={{ bg: 'primary', mb: 4 }}>
            Signups closed. Check back next year!
          </Button> */}
        </FadeIn>
      </Container>
    </Hero>
    <Footer />
  </Box>
)
export default Page

function Base({ children, action, target, method }) {
  return (
    <Box
      as="form"
      sx={{
        display: 'grid',
        width: ['full', 512],
        bg: 'white',
        borderRadius: 'extra',
        mx: 'auto',
        p: 4,
        mt: 4
      }}
      action={action}
      target={target}
      method={method}
    >
      {children}
    </Box>
  )
}

function Field({ placeholder, label, name, type, value, onChange }) {
  return (
    <Box sx={{ my: 2 }}>
      <Label htmlFor={name} sx={{ color: 'muted', fontSize: 18 }}>
        {label}
      </Label>
      <Input
        id={name}
        placeholder={placeholder}
        name={name}
        type={type}
        sx={{
          bg: 'smoke',
          color: 'black'
        }}
        autofillBackgroundColor="smoke"
        onChange={onChange}
        value={value}
        required
      />
    </Box>
  )
}

function Signup() {
  const [values, setValues] = useState({})
  return (
    <Base method="get" action="https://airtable.com/shrL7dmiWE6vdlyYf">
      <Heading sx={{ color: 'black', textAlign: 'left', mb: 2 }}>
        Register!
      </Heading>
      <Text sx={{ textAlign: 'left', color: 'muted' }}>
        Be sure to check out the{' '}
        <Link
          href="https://hackclub.slack.com/archives/C01D7AHKMPF/p1671483616032169"
          sx={{ color: 'blue' }}
        >
          rules
        </Link>{' '}
        before you sign up!
      </Text>
      <Field
        label="Your Name"
        name="prefill_Name"
        placeholder="Fiona Hackworth"
        value={values.name}
        onChange={e => setValues({ ...values, name: e.target.value })}
      />

      <Field
        label="Likes"
        name="prefill_What do you like?"
        placeholder="Hardware, plushies, microwaved apples?"
        type="text"
        value={values.likes}
        onChange={e => setValues({ ...values, likes: e.target.value })}
      />
      <Field
        label="Dislikes"
        name="prefill_What do you absolutely NOT like?"
        placeholder="Socks, cheese, coal..."
        type="text"
        value={values.dislikes}
        onChange={e => setValues({ ...values, dislikes: e.target.value })}
      />
      <Button sx={{ bg: 'blue', mt: [2, 3], py: 3 }} type="submit">{`Finish ${
        7 - Object.values(values).filter(n => n !== '').length
      } fields to sign up`}</Button>
    </Base>
  )
}
