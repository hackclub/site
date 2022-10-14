import {
  Box,
  Image,
  Text,
  Heading,
  Container,
  Grid,
  Link,
  Avatar,
  Button
} from 'theme-ui'
import { Slide } from 'react-reveal'

export default function Testimonials() {
  return (
    <>
      <Container
        variant="copy"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Heading variant="title">
          FIRST® teams all over the country run on Bank.
        </Heading>
        <Text variant="lead" color="muted">
          Everywhere from San Jose to Boston to New York,
          Hack&nbsp;Club&nbsp;Bank powers teams of all sizes.
        </Text>
      </Container>
      <Grid
        gap={4}
        sx={{
          gridTemplateColumns: ['100%', null, null, '1fr 1fr']
        }}
      >
        <Organization
          logo="https://github.com/hackclub.png"
          name="Poseidon Robotics"
          teamNum="FTC #16898"
          teamLocation="San Jose, CA"
          budget="$1,000,000"
          budgetLabel="in grants"
          website="hackclub.com"
          url="https://hackclub.com"
          imgSrc="https://cloud-qtng6088u-hack-club-bot.vercel.app/0image.png"
          quote="Hack Club is a global nonprofit network of high school coding clubs. We provide the resources, community, and support students need to start coding clubs."
          hackerName="Wahoo Fish"
          hackerRole="Team Captain"
        />
        <Organization
          logo="https://github.com/hackclub.png"
          name="Poseidon Robotics"
          teamNum="FTC #16898"
          budget="$1,000,000"
          budgetLabel="in grants"
          website="hackclub.com"
          url="https://hackclub.com"
          quote="Hack Club is a global nonprofit network of high school coding clubs. We provide the resources, community, and support students need to start coding clubs."
        />
      </Grid>
    </>
  )
}

function Organization({
  logo,
  name,
  website,
  teamNum,
  teamLocation,
  url,
  imgSrc,
  quote,
  hackerName,
  hackerRole,
  transparency = false
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
                    {teamNum}
                  </Link>{' '}
                  • {teamLocation}
                </Box>
              </Box>
            </Box>

            <br />

            <Image
              src={imgSrc}
              alt="Robots team standing"
              width={1000}
              height={667}
              sx={{
                objectFit: 'cover',

                width: '100%',
                borderRadius: 'default'
              }}
            />

            <Text
              sx={{
                fontSize: 2,
                color: 'snow',
                textIndent: '-.375em',
                lineHeight: 'caption',
                fontSize: 18
              }}
            >
              "{quote}"
            </Text>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: ['0px', 3]
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: ['16px', '0px']
                }}
              >
                <Avatar src={logo} size={48} mr={2} alt="Photo of ${logo}" />
                <Text
                  color="white"
                  sx={{
                    fontSize: 19,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Text sx={{ fontWeight: 'bold', lineHeight: 1.125 }}>
                    {hackerName}
                  </Text>
                  <Text>{hackerRole}</Text>
                </Text>
              </Box>
              {transparency && (
                <Link
                  href={`https://bank.hackclub.com/${transparency}`}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ mt: ['16px', '0px'] }}
                >
                  <Button
                    mt={[null, null, 4, 0]}
                    ml={[0, 'auto']}
                    sx={{ textTransform: 'none' }}
                    variant="primary"
                    title="🎶 take a look, it's in our books 🎵"
                  >
                    See Finances
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Slide>
  )
}
