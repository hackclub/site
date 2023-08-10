import { Box, Button, Heading, Link, Text, Container, Badge } from 'theme-ui'
import Fade from 'react-reveal/Fade'
import ScrollHint from '../scroll-hint'
import Image from 'next/image'
import hero from '../../public/bank/bg.webp'
import Header from './header'

export default function Landing ({ eventsCount }) {
  return (
    <Header
      copy={{
        UnderlinedHeroText: () => <>
          Become a 501(c)(3) nonprofit
        </>,
        UnstyledHeroText: () => <>
          with&nbsp;Hack&nbsp;Club&nbsp;Bank.
        </>,
        PrimaryHeroText: () => <>
          The team behind the{' '}
          <Link
            href="https://innovationcircuit.com"
            target="_blank"
            color="inherit"
            bold
            hoverline
          >
            Innovation Circuit
          </Link>{' '}
          is one of {Math.round((eventsCount - 50) / 100) * 100}+
          teams who use <strong>Hack&nbsp;Club&nbsp;Bank</strong> to
          run world-class organizations, hackathons, and clubs.
        </>,
        Button1: () => <>
          Apply Now
        </>,
        Button2: () => <>
          Sign in
        </>,
        Caption: () => <>
          Singapore
        </>
      }}
      links={{
        button1: '#apply',
        button2: 'https://bank.hackclub.com'
      }}
      assets={{
        heroImage: hero,
        underlineColor: 'red'
      }}
    />
  )
}
