import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Text,
  Link,
  Flex,
  Image
} from 'theme-ui'
import ForceTheme from '../../../components/force-theme'
import JSConfetti from 'js-confetti'
import Icon from '../../../components/icon'
import FlexCol from '../../../components/flex-col'

function Option({ icon, label, link }) {
  const color =
    icon === 'email' ? '#338eda' : icon === 'slack' ? '#a633d6' : '#ec3750'

  return (
    <Button
      variant="outline"
      as="a"
      href={link}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 'fit-content',
        color,
        borderColor: color
      }}
    >
      <Flex sx={{ alignItems: 'center', gap: [0, null, 1], px: 2 }}>
        <Icon
          glyph={icon}
          sx={{ width: [32, null, 46], height: [32, null, 46] }}
        />
        <Text sx={{ fontSize: [2, null, 3] }}>{label}</Text>
      </Flex>
    </Button>
  )
}

export default function ApplicationSuccess() {
  const router = useRouter()

  useEffect(() => {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({
      confettiColors: [
        // Hack Club colours!
        '#ec3750',
        '#ff8c37',
        '#f1c40f',
        '#33d6a6',
        '#5bc0de',
        '#338eda',
        '#a633d6'
      ]
    })
  }, [router])

  return (
    <Container variant="copy">
      <ForceTheme theme="dark" />
      <FlexCol
        height="100vh"
        textAlign="center"
        alignItems="center"
        justifyContent="space-between"
        py={5}
        gap={4}
      >
        <FlexCol gap={4} alignItems="center">
          <Image
            src="/hcb/apply/party-orpheus.svg"
            alt="Dinosaur partying"
            sx={{ width: '40%' }}
          />
          <FlexCol gap={2}>
            <Text variant="title">Thanks for applying!</Text>
            <Text variant="lead">
              Head on over to HCB and explore the dashboard
            </Text>
          </FlexCol>
        </FlexCol>

        <FlexCol gap={4} width="100%">
          <Text sx={{ fontSize: [3, null, 4] }}>
            Questions about your application?
          </Text>
          <Flex
            sx={{
              flexDirection: ['column', null, 'row'],
              justifyContent: 'space-evenly',
              alignItems: 'center',
              gap: [3, null, 0]
            }}
          >
            <Option icon="email" label="Mail" link="mailto:hcb@hackclub.com">
              hcb@hackclub.com
            </Option>
            <Option
              icon="slack"
              label="Slack"
              link="https://hackclub.slack.com/channels/hcb"
            >
              #hcb
            </Option>
            <Option icon="help" label="FAQ" link="https://hcb.hackclub.com/faq">
              FAQ
            </Option>
          </Flex>
        </FlexCol>

        <Button as="a" href="https://hcb.hackclub.com">
          <Flex sx={{ alignItems: 'center', px: [2, null, 3], py: 2 }}>
            <Icon glyph="bank-account" size={36} />
            <Text sx={{ fontSize: 3 }}>Head to HCB!</Text>
          </Flex>
        </Button>
      </FlexCol>
    </Container>
  )
}
