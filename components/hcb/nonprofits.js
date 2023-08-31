import { Box, Image, Text, Heading, Container, Grid, Link } from 'theme-ui'
import { Slide } from 'react-reveal'
import Stat from '../stat'
import kebabCase from 'lodash/kebabCase'

const orgs = [
  {
    logo: '/hcb/nonprofits/girlgenius.png',
    name: 'Girl Genius',
    director: 'Chloe Yan',
    role: 'Executive Director',
    budget: 5,
    website: 'girlgeniusmag.tech',
    description:
      'Girl Genius Magazine is a fully student-run publication inspiring the next generation of female and non-binary leaders in STEAM. Their journalism and inclusive online community are dedicated to breaking down tech’s lingering gender barriers. Becoming fiscally sponsored allowed them to publish more issues, host over 40 workshops, organize a conference, and reach a global audience of 11k readers (and counting).'
  },
  {
    logo: '/hcb/nonprofits/techshift.png',
    transparency: 'techshift',
    name: 'TechShift',
    director: 'Daniel Jin',
    role: 'Co-Executive Director',
    budget: 100,
    website: 'techshift.org',
    description:
      'Founded in 2017, TechShift supports a network of 30+ student-run chapters across 3 continents leading initiatives at the intersection of technology and social impact. With the help of HCB, they are bringing about a more equitable technological future through their mentorship programs, community partnerships, microgrants, and the STEM For Social Good Toolkit.'
  },
  {
    logo: '/hcb/nonprofits/projectboom.jpg',
    transparency: 'projectboom',
    name: 'Project Boom',
    director: 'Kunal Botla',
    role: 'Founder',
    budget: '5.6',
    budgetLabel: 'raised',
    website: 'projectboom.org',
    url: 'https://projectboom.org/',
    description:
      'Project Boom is a student-led organization with a simple mission: getting computers to those who need them. Instead of becoming e-waste, old machines are given new life to deserving students worldwide. Joining HCB provided Project Boom with a platform to easily accept and manage donations, helping them to repair and ship more computers than ever before.'
  },
  {
    logo: '/hcb/nonprofits/executebig.png',
    name: 'Execute Big',
    director: 'Mingjie Jiang',
    role: 'Co-Executive Director',
    budget: '4',
    budgetLabel: 'funded',
    website: 'executebig.org',
    description:
      'Execute Big began by using leftover hackathon funds to provide travel grants for students. HCB helped make possible their array of grants, fellowships, and innovative programs to share computer science with students nationally. Now their own 501(c)(3) nonprofit, they leverage existing resources to make STEM activities accessible to everyone.'
  }
]

export default function Nonprofits() {
  return (
    <Container
      sx={{ pt: 6, pb: [2, null, 5], mx: 'auto', px: [null, null, 4] }}
    >
      <Container
        variant="copy"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          pb: 3
        }}
      >
        <Heading variant="title">Nonprofit? No problem.</Heading>
        <Text variant="lead" color="muted">
          HCB is a powerful, safe, and easy-to-use money thing, whether you're
          receiving your first donation or spending $100,000 a year.
        </Text>
      </Container>

      <Grid
        gap={4}
        sx={{
          gridTemplateColumns: ['100%', null, null, '1fr 1fr']
        }}
      >
        {orgs.map(org => {
          const id = kebabCase(org.name)
          return (
            <Organization
              logo={org.logo}
              name={org.name}
              budget={org.budget}
              budgetLabel={org.budgetLabel}
              website={org.website}
              description={org.description}
              url={org.url}
              key={id}
            />
          )
        })}
      </Grid>
    </Container>
  )
}

function Organization({
  logo,
  name,
  budget,
  budgetLabel,
  website,
  url,
  description
}) {
  return (
    <Slide bottom>
      <Box
        sx={{
          backgroundColor: 'darkless',
          color: 'smoke',
          borderRadius: 'extra',
          mx: 'auto'
        }}
      >
        <Container sx={{ padding: 0, margin: 0 }}>
          <Box p={[3, null, 4]}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  sx={{
                    height: '4rem',
                    width: '4rem',
                    objectFit: 'cover',
                    borderRadius: 'default'
                  }}
                />
                <Box sx={{ ml: 3 }}>
                  <Text
                    color="white"
                    variant="headline"
                    sx={{
                      fontSize: [28, null, 38],
                      lineHeight: 1,
                      letterSpacing: -0.1
                    }}
                  >
                    {name}
                  </Text>
                  <br />
                  <Link
                    href={url || `https://${website}`}
                    sx={{
                      textDecoration: 'none',
                      color: 'muted',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    {website}
                  </Link>
                </Box>
              </Box>
              <DetailStat
                value={`$${budget}k`}
                label={budgetLabel ?? 'budget'}
              />
            </Box>

            <br />
            <About>{description}</About>
          </Box>
        </Container>
      </Box>
    </Slide>
  )
}

function DetailStat({ value, label }) {
  return (
    <Box sx={{ px: 0, mb: [3, 0], ml: [-1, 0], mx: 3 }}>
      <Stat value={value} label={label} sm />
    </Box>
  )
}

function About({ children }) {
  return (
    <Text
      sx={{
        fontSize: 2,
        color: 'snow',
        textIndent: '-.375em',
        lineHeight: 'caption',
        fontSize: 18
      }}
    >
      {children}
    </Text>
  )
}
