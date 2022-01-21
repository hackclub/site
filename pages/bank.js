import { Box } from 'theme-ui'
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
import Nonprofits from '../components/bank/Nonprofits'
import { useRouter } from 'next/router'
import PartnerFeatures from '../components/bank/PartnerFeatures'

const styles = `
  ::selection {
    background-color: #e42d42;
    color: #ffffff;
    text-shadow: none;
  }
input:-webkit-autofill {
  -webkit-text-fill-color: white;
}

`

function Bank() {
  const { ref } = useRouter().query
  const isGivebutter = ref === 'gb_help_desk'
  return (
    <>
      <Box as="main" key="main">
        <Nav dark />
        <ForceTheme theme="dark" />
        <Meta
          as={Head}
          title="Bank"
          description="Hack Club Bank provides a 501(c)(3) status-backed fund optimized for high school hackathons including invoicing, debit cards, check sending, pre-written legal forms, automated tax filing, and transparent finances. Get fiscal sponsorship designed to help you run a great organization."
          image="https://cloud-og86rfngo-hack-club-bot.vercel.app/0og_image-2.png"
        />
        <style>{styles}</style>
        <Box>
          {isGivebutter ? <Landing /> : <Landing showButton />}
          {isGivebutter ? <PartnerFeatures /> : <Features />}
          <Testimonials />
          <Nonprofits />
          {isGivebutter ? (
            <Everything fee="10" partner={true} />
          ) : (
            <Everything fee="7" partner={false} />
          )}
          {!isGivebutter && <Start />}
        </Box>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}

export default Bank
