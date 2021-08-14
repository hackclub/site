import {
  Card,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Grid,
  theme
} from 'theme-ui'
import ForceTheme from '../components/force-theme'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'

import Landing from '../components/bank/Landing'
import Features from '../components/bank/Features'
import Testimonials from '../components/bank/Testimonials'
import Everything from '../components/bank/Everything'
import Start from '../components/bank/Start'

const styles = `
  ::selection {
    background-color: #e42d42;
    color: 'white';
    text-shadow: none;
  }
`

export default function Bank() {
  return (
    <>
      <Box as="main" key="main">
        <Nav dark />
        <ForceTheme theme="dark" />
        <Meta
          as={Head}
          title="Bank"
          description="Hack Club Bank provides a 501(c)(3) status-backed bank account optimized for high school hackathons including invoicing, debit cards, check sending, pre-written legal forms, automated tax filing, and transparent finances. Get fiscal sponsorship designed to help you run great events."
        />
        <style children={styles} />
        <Box>
          <Landing />
          <Features />
          <Testimonials />
          <Everything />
          <Start />
        </Box>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}
