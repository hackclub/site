import React from 'react'
import styled from '@emotion/styled'
import { Box, Image, Link } from 'theme-ui'

const Base = styled(Box)`
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  align-items: center;
  justify-content: center;
  img {
    margin: auto;
    max-width: 12rem;
  }
`

const Sponsor = ({ name, href, img, ...props }) => (
  <Link href={href || `https://${name.toLowerCase()}.com`} target="_blank">
    <Image
      src={`/inkind_logos/${img || name.toLowerCase() + '.svg'}`}
      alt={name}
      {...props}
    />
  </Link>
)

const Sponsors = props => (
  <Base maxWidth={48} {...props}>
    {[
      'Vercel',
      'Slack',
      'Netlify',
      'FullStory',
      'BrowserStack',
      'Stripe',
      'Segment',
      'Bugsnag',
      'Google',
      'Dialpad'
    ].map(name => (
      <Sponsor name={name} key={name} />
    ))}
    <Sponsor name="Checkly" href="https://checklyhq.com" img="checkly.svg" />
    <Sponsor
      name="Fast Forward"
      href="https://ffwd.org"
      img="fastforward.png"
    />
  </Base>
)

export default Sponsors
