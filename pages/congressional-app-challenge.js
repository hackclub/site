import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Text
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Carousel from '../components/congressional-app-challenge/carousel'
import ForceTheme from '../components/force-theme'

const color = '#000'

function Page({
  carouselCards
}) {
  return (
    <>
      <Meta
        as={Head}
        title="Congressional App Challenge"
        description="How Hack Club can help you apply to the Congressional App Challenge."
      />
      <ForceTheme theme="light" />
      <Nav color={color} light />
      <Box id="main">
        <Box id="header"
          as="header"
          sx={{
            color: 'text',
            pt: [5, null, null, null, 6],
            pb: [1, 2, 3, null, 4],
            textAlign: 'center'
          }}>
          <Heading
            as="h1"
            variant="title"
            sx={{
              color: 'black',
              textShadow: 'text',
              width: '90%',
              my: [3, 4],
              mx: 'auto',
              zIndex: 1
            }}
          >
            <Text
              as="span"
            >
              Build a cool project for the{' '}
            </Text>
            <br />
            <Text
              as="span"
              sx={{
                color: '#C70000',
              }}
            >
              Congressional App Challenge
            </Text>
          </Heading>
          <Box
            id="lines"
            sx={{
              my: 5,
            }}
          >
            <Box
              as="hr"
              sx={{
                border: 'none',
                borderTop: '20px solid',
                borderColor: '#C70000',
                width: '100%',
              }}
            />
            <Box
              as="hr"
              sx={{
                border: 'none',
                borderTop: '20px solid',
                borderColor: '#001D85',
                width: '100%',
                my: 3,
              }}
            />
          </Box>
        </Box>
        <Container
          id="about-hack-club"
          sx={{
            alignItems: 'center',
            width: '90%',
            display: 'flex',
            flexDirection: ['column', 'row']
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: ['center', 'flex-start'],
              width: ['100%', '60%']
            }}
          >
            <Text variant="headline" as="h1" >What is Hack Club?</Text>
            <Text variant="subtitle" as="p" sx={{ textAlign: ['center', 'left'] }}>
              Hack Club is a community of thousands of Hack Clubbers who gather online and in person to make things with code.
              Whether you’re a beginner programmer or have years of experience, there’s a place for you at Hack Club.
              At Hack Club, you can meet other Hack Clubbers in your community at one of the 400+ Hack Clubs and high school
              hackathons or build open-source games and tools together.
            </Text>
            <a target="_blank" href="https://forms.hackclub.com/t/eLhFehpKG6us">
              <Button
                sx={{
                  background: '#001D85',
                  color: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  fontSize: '23px',
                  margin: '10px 0 10px 0',
                  fontWeight: 'bold'
                }}>
                Get Free Stickers!
              </Button>
            </a>
          </Box>
          <Image src="/home/flagship_4.jpg"
            sx={{
              width: ['80%', '60%', '40%'],
              marginTop: ['10px', null],
              borderRadius: '10px',
              border: '5px solid',
              borderColor: '#C70000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              marginLeft: '10px'
            }}>
          </Image>
        </Container>
        <Container
          id="about-congressional"
          sx={{
            alignItems: 'center',
            width: '90%',
            display: 'flex',
            marginTop: '4',
            flexDirection: ['column', 'row']
          }}>
          <Image src="https://www.congressionalappchallenge.us/wp-content/uploads/2018/08/Congressional-App-Challenge-Coalition-Vertical-2.png"
            sx={{
              width: ['80%', '60%', '40%'],
              marginBottom: ['10px', null],
              borderRadius: '10px',
              border: '5px solid',
              borderColor: '#C70000',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              marginRight: '10px',
              order: [1, 0],
              marginTop: ['10px', null]
            }}>
          </Image>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: ['center', 'flex-end'],
              width: ['100%', '60%']
            }}
          >
            <Text variant="headline" as="h1" sx={{ textAlign: ['center', 'right'] }}>What is the Congressional App Challenge?</Text>
            <Text variant="subtitle" as="p" sx={{ textAlign: ['center', 'right'] }}>
              The Congressional App Challenge is a contest where students create their own app,
              regardless of their coding experience. In 2022, 35% of participants were beginners.
              You’ll learn coding skills, showcase your ideas, and access various opportunities.
            </Text>
            <a target="_blank" href="https://www.congressionalappchallenge.us/">
              <Button
                sx={{
                  background: '#001D85',
                  color: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  fontSize: '23px',
                  margin: '10px 0 10px 0',
                  fontWeight: 'bold'
                }}>
                Learn more here
              </Button>
            </a>
          </Box>
        </Container>
        <Container id="steps" sx={{ alignItems: 'center', textAlign: 'center', marginTop: '4', width: '90%' }}>
          <Text variant="headline" as="h1">
            <Text as="span">
              How can Hack Club help you make an{' '}
            </Text>
            <Text
              as="span"
              sx={{
                color: '#C70000',
              }}
            >
              AMAZING{' '}
            </Text>
            <Text>Project?</Text>
          </Text>
          <Container id="step1" sx={{ alignContent: 'center' }}>
            <Text as="h2" sx={{ color: '#C70000', fontSize: '30px', mt: '2' }}>STEP 1</Text>
            <Box
              sx={{
                alignItems: 'center',
                width: '100%',
                display: 'flex',
                marginTop: '2',
                flexDirection: ['column', 'row'],
              }}>
              <Text as="p" sx={{ width: ['100%', '50%'], fontSize: '23px', textAlign: ['center', 'left']}}>Join the Hack Club Slack to get advice from past winners, help with your project, and to join a community of over 35K+ teen coders.</Text>
              <a target="_blank" href="https://hackclub.com/slack/">
                <Button
                  sx={{
                    background: '#001D85',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    fontSize: '25px',
                    marginTop: '5px',
                    fontWeight: 'bold',
                    ml: '2',
                  }}>
                  #congressional-app-challenge
                </Button>
              </a>
            </Box>
          </Container>
          <Container id="step2"
            sx={{
              background: '#001D85',
              width: '100%',
              borderRadius: '20px',
              color: 'white',
              p: '2', mt: '5',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Text as="h2" sx={{ fontSize: '30px', mt: '3', color: '#C70000' }}>STEP 2</Text>
            <Text as="p" sx={{ width: ['90%', '70%'], fontSize: '23px' }}>Join Zoom calls with past Hack Club winners to learn about their projects and to get advice on where to start.</Text>
            <Grid
              columns={[2, 5]}
              sx={{
                m: '2',
                justifyItems: 'center',
                alignItems: 'space-between'
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Image
                  src="https://cloud-b6mzh2987-hack-club-bot.vercel.app/21704591152368.jpg"
                  sx={{ borderRadius: '10px', width: ['90%'], margin: 'auto', mb: '3', mt: '3'}}>
                </Image>
                <Text as='p' sx={{ fontSize: '23px' }}>Clay, 16</Text>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Image
                  src="https://cloud-b6mzh2987-hack-club-bot.vercel.app/31659043447794.jpg"
                  sx={{ borderRadius: '10px', width: ['90%'], margin: 'auto', mb: '3', mt: '3'}}>
                </Image>
                <Text as='p' sx={{ fontSize: '23px' }}>Sahiti, 17</Text>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Image
                  src="https://cloud-b6mzh2987-hack-club-bot.vercel.app/11705187020782.jpg"
                  sx={{ borderRadius: '10px', width: ['90%'], margin: 'auto', mb: '3', mt: '3' }}>
                </Image>
                <Text as='p' sx={{ fontSize: '23px' }}>Alex, 16</Text>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Image
                  src="https://cloud-b6mzh2987-hack-club-bot.vercel.app/01725595833101.jpg"
                  sx={{ borderRadius: '10px', width: ['90%'], margin: 'auto', mb: '3', mt: '3'}}>
                </Image>
                <Text as='p' sx={{ fontSize: '23px' }}>Andrea, 16</Text>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                <Image
                  src="https://cloud-b6mzh2987-hack-club-bot.vercel.app/51716079075907.jpg"
                  sx={{ borderRadius: '10px', width: ['90%'], margin: 'auto', mb: '3', mt: '3' }}>
                </Image>
                <Text as='p' sx={{ fontSize: '23px' }}>Samay, 17</Text>
              </Box>
            </Grid>
            <Grid
              id="zoom-cards"
              gap={2}
              columns={[1, 2]}
              sx={{
                m: '2',
                justifyContent: 'center',
                alignItems: 'center',
                justifyItems: 'center'
              }}
            >
              <Box id="zoom-card" sx={{ width: ['90%'], m: '3' }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white',
                    color: 'black',
                    p: '2',
                    borderRadius: '10px',
                    marginBottom: '2',
                    padding: '3'
                  }}
                >
                  <Text as="h3" sx={{}}>September 19th, 8 PM EST</Text>
                  <a target="_blank" href='https://calendar.app.google/eKgDw7tvHRw5G1BLA'>
                    <Button sx={{ background: '#001D85', color: 'white', mt: '2', borderRadius: '10px' }}>Add to Calendar</Button>
                  </a>
                </Box>
              </Box>
              <Box id="zoom-card" sx={{ width: ['90%'], m: '3' }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'white',
                    color: 'black',
                    p: '2',
                    borderRadius: '10px',
                    marginBottom: '2',
                    padding: '3'
                  }}
                >
                  <Text as="h3" sx={{}}>October 2nd, 7 PM EST</Text>
                  <a target="_blank" href='https://calendar.app.google/6k5nSPEmUdMJi8p17'>
                    <Button sx={{ background: '#001D85', color: 'white', mt: '2', borderRadius: '10px' }}>Add to Calendar</Button>
                  </a>
                </Box>
              </Box>
            </Grid>
          </Container>
          <Container id='step3'
            sx={{
              alignItems: 'center',
              width: '100%',
              display: 'flex',
              marginTop: '2',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <Text as="h2" sx={{ color: '#C70000', fontSize: '30px', mt: '3' }}>STEP 3</Text>
            <Text as="p" sx={{ width: ['90%', '70%'], fontSize: '23px' }}>Submit your project for a grant!</Text>
            <Grid
              id="grant-drig"
              gap={4}
              columns={[1, 2]}
              gridAutoRows={'1fr'}
              sx={{
                m: '2',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Box bg="#e9e9e9" sx={{ borderRadius: '30px', p: '3', border: '3px solid', borderColor: '#C70000', height: '100%' }}>
                <Image
                  sx={{
                    width: ['100%', '55%']
                  }}
                  src='https://cloud-d1apz790h-hack-club-bot.vercel.app/0orpheuslaptop.png'
                >
                </Image>
                <Text as='h4' sx={{ fontSize: '20px' }}>1. Come up with a project idea for the Congressional App Challenge! See the project guidelines </Text>
                <a href='https://www.congressionalappchallenge.us/students/rules/'>
                  <Text sx={{ fontSize: '20px' }} as='h4'>here.</Text>
                </a>
              </Box>
              <Box
                bg="#e9e9e9"
                sx={{
                  borderRadius: '30px',
                  p: '3', width: '100%',
                  border: '3px solid',
                  borderColor: '#C70000',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '95%' }}>
                  <Box sx={{ display: 'flex', m: '2'}}>
                    <a href='https://sprig.hackclub.com/' target="_blank">
                      <Button
                        sx={{
                          color: '#001D85',
                          background: 'white',
                          border: '3px solid',
                          borderColor: '#001D85',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          borderRadius: '10px', mr: '2'
                        }}
                      >Sprig
                      </Button>
                    </a>
                    <Text as='p' sx={{ width: '100%', textAlign: 'right'}}>Build a JS game, play it on your own console</Text>
                  </Box>
                  <Box sx={{ display: 'flex', m: '2', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <a href='https://hackclub.com/bin/' target="_blank">
                      <Button
                        sx={{
                          color: '#001D85',
                          background: 'white',
                          border: '3px solid',
                          borderColor: '#001D85',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          width: '100%', borderRadius: '10px', mr: '2'
                        }}
                      >Bin
                      </Button>
                    </a>
                    <Text as='p' sx={{ width: '100%', textAlign: 'right' }}>Build an online circuit, get the parts for free!</Text>
                  </Box>
                  <Box sx={{ display: 'flex', m: '2', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <a href='https://hackclub.com/onboard/' target="_blank">
                      <Button
                        sx={{
                          color: '#001D85',
                          background: 'white',
                          border: '3px solid',
                          borderColor: '#001D85',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          borderRadius: '10px', mr: '2'
                        }}
                      >OnBoard
                      </Button>
                    </a>
                    <Text as='p' sx={{ width: '100%', textAlign: 'right'}}>Design a PCB, get a $100 grant</Text>
                  </Box>
                  <Box sx={{ display: 'flex', m: '2', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <a href='https://blot.hackclub.com/' target="_blank">
                      <Button
                        sx={{
                          color: '#001D85',
                          background: 'white',
                          border: '3px solid',
                          borderColor: '#001D85',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          borderRadius: '10px', mr: '2'
                        }}
                      >Blot
                      </Button>
                    </a>
                    <Text as='p' sx={{ width: '100%', textAlign: 'right' }}>Write code. Make art. Get a drawing machine.</Text>
                  </Box>
                </Box>
                <Text as='h4' sx={{ mt: '2', fontSize: '20px' }}>2. Submit your project to one of Hack Club's Hardware You Ship, We Ship programs.</Text>
              </Box>
              <Box
                bg="#e9e9e9"
                sx={{
                  borderRadius: '30px',
                  p: '3',
                  border: '3px solid',
                  borderColor: '#C70000',
                  height: '100%'
                }}
              >
                <Image
                  sx={{
                    width: ['100%', '60%']
                  }}
                  src='https://cloud-he1w40eua-hack-club-bot.vercel.app/0hardware.png'
                >
                </Image>
                <Text as='h4' sx={{ fontSize: '20px' }}>3. Receive hardware that helps you complete your project.</Text>
              </Box>
              <Box
                bg="#e9e9e9"
                sx={{
                  borderRadius: '30px',
                  p: '3',
                  border: '3px solid',
                  borderColor: '#C70000',
                  height: '100%'
                }}
              >
                <Image
                  sx={{
                    width: ['100%', '60%']
                  }}
                  src='https://cloud-9e2cjx37b-hack-club-bot.vercel.app/0laptop.png'
                >
                </Image>
                <Text as='h4' sx={{ fontSize: '20px' }}>4. Submit your project to the Congressional App Challenge.</Text>
              </Box>
            </Grid>
            <Text as="p" sx={{ width: ['90%', '70%'], fontSize: '23px', mt: '4' }}>Explore other Hack Club You Ship, We Ship for additional grants</Text>
            <Grid
              id="ysws"
              gap={2}
              columns={[1, 3]}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
                mt: '3'
              }}
            >
              <a href='https://boba.hackclub.com/' target="_blank">
                <Button
                  sx={{
                    color: '#001D85',
                    background: 'white',
                    border: '3px solid',
                    borderColor: '#001D85',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '100%', borderRadius: '10px'
                  }}
                >Boba Drops
                </Button>
              </a>
              <a href='https://fraps.hackclub.com/' target="_blank">
                <Button
                  sx={{
                    color: '#001D85',
                    background: 'white',
                    border: '3px solid',
                    borderColor: '#001D85',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    borderRadius: '10px'
                  }}
                >Hackaccino
                </Button>
              </a>
              <a href='https://cider.hackclub.com/' target="_blank">
                <Button
                  sx={{
                    color: '#001D85',
                    background: 'white',
                    border: '3px solid',
                    borderColor: '#001D85',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    width: '100%',
                    borderRadius: '10px'
                  }}
                >Cider
                </Button>
              </a>
            </Grid>
          </Container>
        </Container>
        <Container id="past-winners"
          sx={{
            background: '#001D85',
            width: '90%',
            borderRadius: '20px',
            color: 'white',
            p: '2', mt: '5',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
          <Text as="h2" sx={{ fontSize: '30px', mt: '3', color: 'white' }}>Past Hack Club Winners</Text>
          <Carousel cards={carouselCards} />
        </Container>
        <Container id="madeby" sx={{ mt: '4', mb: '4', textAlign: 'center', alignItems: 'center' }}>
          <Text as="h2" sx={{ fontSize: '25px' }}>Made with &lt;3 by Hack Clubbers</Text>
          <Text variant="subtitle" as="p">
            Special thanks to Congresswoman Becca Balint, VT-00, for pioneering this collaboration between Hack Club and the Congressional App Challenge.
            </Text>
        </Container>
      </Box>
      <Footer light />
    </>
  )
}

export async function getStaticProps() {
  const carouselCards = require('../lib/congressional-carousel.json')
  return {
    props: {
      carouselCards
    },
    revalidate: 60
  }
}

export default Page