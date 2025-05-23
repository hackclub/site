import CardModel from './card-model'
import { Box, Flex, Grid, Image, Link, Text } from 'theme-ui'
import Buttons from './button'
import Dot from '../../dot'
import { formatDate } from '../../../lib/dates'

/** @jsxImportSource theme-ui */
const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage:
        'linear-gradient(to bottom,rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7))',
      opacity: 0.8,
      zIndex: 1,
      borderRadius: '12px'
    }}
  />
)

export default function Hackathons({ data, stars }) {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'dark',
        position: 'relative',
        overflow: 'hidden',
        py: [3, 3, 4],
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 3
        }
      }}
      stars={stars}
      github_link="https://github.com/hackclub/hackathons"
      highlight="blue"
    >
      <Image
        src="https://cloud-issl87d62-hack-club-bot.vercel.app/0bmc_1823.jpg"
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '110%',
          height: '110%',
          ml: ['-20px', '-32px', '-32px'],
          mt: ['-20px', '-32px', '-32px'],
          zIndex: 0
        }}
        alt="A crowd of hackers cheering at Epoch"
      />
      <Cover />
      <Text
        variant="title"
        as="h3"
        sx={{
          fontSize: ['22px', '26px', '30px'],
          position: 'relative',
          zIndex: 2,
          fontFamily: '"Comic Sans MS", cursive, sans-serif',
          borderRadius: '10px',
          px: 3,
          py: 1,
          bg: 'rgba(255, 255, 255, 0.15)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          width: 'fit-content',
          mb: 3
        }}
      >
        High School Hackathons
      </Text>
      <Grid
        columns={1}
        sx={{ position: 'relative', zIndex: 2, minHeight: '200px' }}
        gap={3}
      >
        <Box>
          <Text as="p" variant="subtitle" sx={{
            textShadow: '1px 1px 5px black',
            fontSize: ['16px', '18px', '20px'],
            mb: 3,
            lineHeight: 1.5
          }}>
            We support the largest network of high school hackathons in the
            world. From an online community of organizers to free stickers and
            more!
          </Text>

          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 2] }}>
            <Buttons
              id="19"
              icon="event-code"
              link="https://hackathons.hackclub.com"
              primary="blue"
              sx={{
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                transform: 'rotate(-1deg)',
                mb: 2,
                '&:hover': {
                  transform: 'rotate(0deg) translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                }
              }}
            >
              Attend a hackathon
            </Buttons>
            <Buttons
              id="20"
              icon="bolt"
              link="/hackathons"
              sx={{
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                transform: 'rotate(1deg)',
                '&:hover': {
                  transform: 'rotate(0deg) translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
                }
              }}
            >
              Organizer? Learn more.
            </Buttons>
          </Flex>
        </Box>

        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: ['flex-start', 'flex-start', 'flex-end'],
            alignSelf: 'flex-start',
            position: ['static', 'static', 'relative'],
            right: 0,
            top: 0,
            display: ['none', 'none', 'block'],
            bg: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            p: 3,
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            border: '2px solid rgba(255,255,255,0.1)'
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Text
              as="h4"
              sx={{
                fontSize: ['14px', '16px', '18px'],
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                mb: 2,
                pb: 2,
                borderBottom: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Dot /> Upcoming Hackathons
            </Text>
            <Box sx={{ maxHeight: '220px', overflowY: 'auto', pr: 2 }}>
              {data.slice(0, 5).map(data => (
                <Box
                  sx={{
                    zIndex: '1',
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 'normal',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: ['12px', '14px'],
                    mb: 3,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateX(5px)'
                    },
                    a: {
                      textDecoration: 'none',
                      color: 'white'
                    }
                  }}
                  key={data.name}
                >
                  {data.logo && (
                    <Box
                      sx={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 75%), url('${data.banner}')`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 'circle',
                        height: ['24px', '28px', '32px'],
                        width: ['24px', '28px', '32px'],
                        mr: '10px',
                        flexShrink: 0,
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      <Image
                        src={data.logo}
                        alt={`${data.name} logo`}
                        loading="lazy"
                        sx={{
                          height: '70%',
                          width: '70%',
                          objectFit: 'contain',
                          borderRadius: 'default'
                        }}
                      />
                    </Box>
                  )}
                  <Flex sx={{ flexDirection: 'column' }}>
                    <Link
                      href={data.website}
                      as="a"
                      target="_blank"
                      sx={{
                        color: 'inherit',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      {data.name}
                    </Link>
                    <Text
                      as="h6"
                      sx={{
                        fontWeight: '400',
                        fontSize: '0.85em',
                        color: 'sunken'
                      }}
                    >
                      {formatDate('mmmm d', new Date(data.start))}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Box>
          </Box>
        </Flex>

        {/* Mobile hackathon list */}
        <Flex
          sx={{
            flexDirection: 'row',
            position: 'relative',
            alignItems: 'center',
            mt: 2,
            mb: 1,
            justifyContent: 'space-between',
            display: ['block', 'block', 'none'],
            bg: 'rgba(0,0,0,0.2)',
            borderRadius: '10px',
            p: 2,
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
            border: '2px solid rgba(255,255,255,0.1)'
          }}
        >
          <Text sx={{ fontSize: 'small', color: 'white', fontWeight: 'bold', mb: 1 }}>
            Upcoming Hackathons:
          </Text>
          <Flex sx={{ gap: '10px', flexDirection: 'column' }}>
            {data.slice(0, 2).map(data => (
              <Box
                sx={{
                  zIndex: '1',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 'normal',
                  width: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 'small',
                  a: {
                    textDecoration: 'none',
                    color: 'white'
                  }
                }}
                key={data.name}
              >
                {data.logo && (
                  <Box
                    sx={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 75%), url('${data.banner}')`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'circle',
                      height: ['20px', '25px'],
                      width: ['20px', '25px'],
                      mr: '5px',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <Image
                      src={data.logo}
                      alt={`${data.name} logo`}
                      loading="lazy"
                      sx={{
                        height: '70%',
                        width: '70%',
                        objectFit: 'contain',
                        borderRadius: 'default',
                        fontSize: 'small'
                      }}
                    />
                  </Box>
                )}
                <Link href={data.website}>{data.name}</Link>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Grid>
    </CardModel>
  )
}
