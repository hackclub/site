import {
  Box,
  Avatar,
  Button,
  Image,
  Text,
  Heading,
  Container,
  Card,
  Grid,
  Link
} from 'theme-ui'
import { Slide } from 'react-reveal'
import Stat from '../stat'
import kebabCase from 'lodash/kebabCase'

const orgs = [
  {
    logo: '/bank/nonprofits/girlgenius.png',
    name: 'Girl Genius',
    director: 'Chloe Yan',
    role: 'Executive Director',
    budget: 5,
    website: 'girlgeniusmag.tech',
    oldDescription:
      'Girl Genius was founded by a high schooler in California running an online community of female and non-binary leaders in STEAM. They joined Hack Club Bank to publish their magazine, now 5 issues deep with 11k+ readers.',
    description:
      'Girl Genius Magazine inspires the next generation of female and non-binary leaders in STEAM through their magazine and online community. Fully student-ran, they are destroying conventional gender standards. Becoming fiscally sponsored allowed them to scale up their impact and reach a larger audience– now at 5 issues and with 11k+ readers globally.'
  },
  {
    logo: '/bank/nonprofits/techshift.png',
    transparency: 'techshift',
    name: 'TechShift',
    director: 'Daniel Jin',
    role: 'Co-Executive Director',
    budget: 100,
    website: 'techshift.org',
    oldDescription:
      'TechShift supports student groups at colleges across the United States by providing mentorship and microgrants for local initiatives. The 30+ student-run chapters launch programs in their communities, both on and off campus.',
    description:
      'TechShift member organizations organize tech ethics and CS + Social Good courses, work with local community partners on technical projects, and build community spaces that focus on the intersection of tech and social issues. The 30+ student-run chapters launch programs in their communities, both on and off campus.'
  },
  {
    logo: '/bank/nonprofits/projectboom.jpg',
    transparency: 'projectboom',
    name: 'Project Boom',
    director: 'Kunal Botla',
    role: 'Founder',
    budget: '5.6',
    budgetLabel: 'raised',
    website: 'projectboom.org',
    oldDescription:
      'In spring of 2020, Kunal started sending used laptops to students in need. With his tech background, the only thing holding him back was the ability to accept and store donations. Fiscal sponsorship helped him raise funds to repair computers otherwise designated for electronic waste and donate them to 50+ students.',
    description:
      'Project Boom is a student-run organization with a simple mission: to get students access to computers. Computers that would otherwise become electronic waste instead go to students in need. Joining Hack Club Bank gave Project Boom a platform to accept and store donations to support their mission to repair these computers.'
  },
  {
    logo: '/bank/nonprofits/executebig.png',
    name: 'Execute Big',
    director: 'Mingjie Jiang',
    role: 'Co-Executive Director',
    budget: '4',
    budgetLabel: 'funded',
    website: 'executebig.org',
    oldDescription:
      'One of the our earliest fiscally sponsored projects, Execute Big was founded on Hack Club Bank providing travel grants to high schoolers attending hackathons. They have since been granted their own 501(c)(3) and have expanded to running many additional programs.',
    description:
      'Execute Big is a minimal & transparent student-run nonprofit enabling all students to experience computer science education. They started by using left over hackathon funds to provide travel grants to students. Now their own nonprofit, they’ve expanded to share computer science with underrepresented students nationally.'
  }
]

export default function Nonprofits() {
  return (
    <Container sx={{ pt: 6, pb: 5, mx: 'auto', px: [null, null, 4] }}>
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
          Hack Club Bank is a powerful, safe, and easy-to-use financial platform, whether you're receiving your first donation or spend $100,000 a year.
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
              director={org.director}
              role={org.role}
              budget={org.budget}
              budgetLabel={org.budgetLabel}
              website={org.website}
              description={org.description}
              transparency={org.transparency}
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
  role,
  budget,
  budgetLabel,
  director,
  website,
  description,
  transparency
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
                      fontSize: [48, null, 38],
                      lineHeight: 1,
                      letterSpacing: -0.1
                    }}
                    children={name}
                  />
                  <br />
                  <Link
                    href={`https://${website}`}
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
            {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
              mt={3}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Avatar
                  src={`/hackers/${director.split(' ')[0].toLowerCase()}.jpg`}
                  size={48}
                  mr={2}
                />
                <Text
                  sx={{
                    fontSize: 19,
                    display: 'flex',
                    flexDirection: 'column',
                    color: 'smoke'
                  }}
                >
                  <Text sx={{ fontWeight: 'bold', lineHeight: 1.125 }}>
                    {director}
                  </Text>
                  <Text>{role}</Text>
                </Text>
              </Box>
              {transparency && (
                <Link
                  href={`https://bank.hackclub.com/${transparency}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    mt={[null, null, 4, 0]}
                    ml={[0, 'auto']}
                    sx={{ textTransform: 'none' }}
                    variant="primary"
                  >
                    See Finances
                  </Button>
                </Link>
              )}
            </Box> */}
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
