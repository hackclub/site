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
          <i>FIRST</i> teams all over the country run on HCB.
        </Heading>
        <Text variant="lead" color="muted">
          Everywhere from San Jose to Boston to New York, HCB powers teams of
          all sizes.
        </Text>
      </Container>
      <Container>
        <Grid
          gap={4}
          sx={{
            gridTemplateColumns: ['100%', null, null, '1fr 1fr']
          }}
        >
          <Organization
            logo="https://cloud-ab81zjlm9-hack-club-bot.vercel.app/0image.png"
            name="Poseidon Robotics"
            teamNum="FTC Team #16898"
            teamLocation="San Jose, CA"
            budget="$1,000,000"
            budgetLabel="in grants"
            website="evposeidon.wixsite.com"
            url="https://evposeidon.wixsite.com/robo/home"
            imgSrc="https://cloud-qtng6088u-hack-club-bot.vercel.app/0image.png"
            quote="Overall, [HCB] has opened more opportunities for Poseidon, allowing us to undertake larger projects, both on the playing field and in our community."
            hackerName="Ian Marwong"
            hackerRole="Team Lead"
            hackerAvatarUrl="/hackers/ian-marwong.jpg"
            transparency="poseidon-robotics"
          />
          <Organization
            logo="https://cloud-ga0lm1r8d-hack-club-bot.vercel.app/0image.png"
            name="Killabytez"
            teamNum="FTC Team #14663"
            teamLocation="Fremont, CA"
            budget="$1,000,000"
            budgetLabel="in grants"
            website="killabytez.club"
            url="http://www.killabytez.club/"
            hackerAvatarUrl="/hackers/brian-cisto.jpeg"
            hackerName="Brian Cisto"
            hackerRole="Team Captain & Software Lead"
            imgSrc="https://cloud-oelh6sp7b-hack-club-bot.vercel.app/0screen_shot_2022-11-06_at_8.45.37_pm.png"
            quote="[HCB] has been essential to keeping track of our finances as well as giving us the opportunity to establish ourselves as a nonprofit."
          />
        </Grid>
      </Container>
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
  hackerAvatarUrl,
  hackerRole,
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
          <Image
            src={imgSrc}
            alt="Robots team"
            width={800}
            height={450}
            sx={{
              borderRadius: 'default',
              objectFit: 'cover'
            }}
          />
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
                <Avatar
                  src={hackerAvatarUrl}
                  size={48}
                  sx={{
                    mr: 2,
                    borderRadius: '100%'
                  }}
                  alt="Photo of ${hackerName}"
                />
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
                  href={`https://hcb.hackclub.com/${transparency}`}
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
