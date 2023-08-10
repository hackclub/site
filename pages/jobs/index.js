import { Box, Container, Heading, Card, Text, Grid } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '/components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Link from 'next/link'
import Icon from '../../components/icon'
import Image from 'next/image'
import zephyrPic from '../../public/jobs/zephyr-group-pic.jpg'
import { compact } from 'lodash'

const JobListing = ({
  positionName,
  positionDesc,
  positionLink,
  positionLocation,
  positionType
}) => (
  <Link href={positionLink} passHref>
    <Card
      variant="sunken"
      as="a"
      target="_blank"
      sx={{
        width: '100%',
        textDecoration: 'none',
        'span > svg': {
          opacity: '0',
          transition: '0.3s ease-in-out'
        },
        '&:hover span > svg': {
          opacity: '1'
        }
      }}
    >
      <Box
        as="span"
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Heading
          variant="headline"
          sx={{
            color: 'black',
            m: 0
          }}
        >
          {positionName}
        </Heading>
        <Icon glyph="external" size={24} color="black" />
      </Box>

      <Text
        variant="caption"
        sx={{
          mt: 1,
          display: 'block',
          textAlign: 'left'
        }}
      >
        {compact([positionDesc, positionLocation, positionType]).join(' • ')}
      </Text>
    </Card>
  </Link>
)

const Page = ({ jobs }) => (
  <>
    <Meta
      as={Head}
      title="Jobs"
      description="Hack Club is hiring! Check out the open positions."
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="main"
      key="main"
      sx={{
        color: 'black'
      }}
    >
      <Box
        sx={{
          py: [5, 6],
          background:
            'linear-gradient(90deg, rgba(2,0,36,0.53) 0%, rgba(2,0,36,0.46) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1
          }}
        >
          <Image
            src={zephyrPic}
            alt="Hack Clubbers hacking during the Hacker Zephyr trip"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Container>
          <Heading
            as="h1"
            sx={{
              fontSize: ['48px', '48px', '72px'],
              color: 'white'
            }}
          >
            Join the Hack Club Team
          </Heading>
          <Heading
            sx={{
              color: 'smoke',
              mt: 3,
              fontSize: ['18px', '24px'],
              lineHeight: ['1.5', '1.125']
            }}
          >
            <Text
              sx={{
                bg: 'dark',
                color: 'green',
                width: 'fit-content',
                px: 3,
                py: [1, 2],
                borderRadius: 6,
                mr: 1
              }}
            >
              $ ssh jobs.hackclub.com
            </Text>{' '}
            or scroll down to learn more...
          </Heading>
        </Container>
      </Box>
      <Container sx={{ py: [3, 4], px: [2, 2, 0] }}>
        <Grid
          sx={{
            maxWidth: '64rem',
            mx: 'auto'
          }}
          align="left"
          columns={['1fr', '1fr 1fr']}
        >
          {jobs.items.length > 0 ? (
            jobs.items.map(job => (
              <JobListing
                key={job.id}
                positionName={job.title}
                positionDesc={job.job_category_name}
                positionLink={job.job_post_url}
                positionLocation={job.display_location}
                positionType={job.kind_pretty}
              />
            ))
          ) : (
            <Text
              variant="headline"
              sx={{
                color: 'muted',
                textAlign: 'center',
                mx: 'auto',
                gridColumn: '1 / -1'
              }}
            >
              No open roles at this time. Check back later!
            </Text>
          )}
        </Grid>
      </Container>
    </Box>

    <Footer key="footer" />
  </>
)

export default Page

export async function getStaticProps() {
  const data = await fetch(
    'https://api.polymer.co/v1/hire/organizations/hackclub/jobs'
  )
  const jobs = await data.json()
  return {
    props: {
      jobs
    },
    revalidate: 60
  }
}
