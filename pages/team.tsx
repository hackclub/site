import { Box, Container, Flex, Grid, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'
import ForceTheme from '../components/force-theme'
import { fetchTeam } from './api/team'

const CommunityTeamBox = ({ title, children }) => {
  return (
    <Box
      bg="rgb(247 225 255)"
      sx={{
        borderRadius: 'default',
        boxShadow: 'default',
        overflow: 'hidden'
      }}
      mb={2}
    >
      <div style={{ fontWeight: 'bold' }}>
        <Text
          variant="headline"
          as="h4"
          sx={{ textAlign: 'center', fontSize: 3 }}
        >
          {title}
        </Text>
      </div>
      <div
        style={{
          overflow: 'hidden',
          margin: '0 1rem 1rem'
        }}
      >
        {children}
      </div>
    </Box>
  )
}

export default function Team({ team }) {
  return (
    <>
      <Box as="main" key="main">
        <ForceTheme theme="light" />
        {/* @ts-expect-error -- TODO: fix this */}
        <Nav />
        <Meta
          as={Head}
          title="Team"
          description="Meet the team that runs Happy Hacking Space, a nonprofit network of hackers in Mesopotamia."
        />
        <Box
          pt={6}
          pb={5}
          px={[2, 4]}
          sx={{
            backgroundImage:
              'radial-gradient(ellipse farthest-corner at top left,rgb(36 181 165 / 70%),rgb(30 151 137 / 70%)), url(/team/hhsteam.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '25% 65%'
          }}
        >
          <Container>
            <Text variant="ultratitle" color="snow">
              By the hackers,
              <br /> for the hackers.
            </Text>

            <Text
              as="div"
              variant="lead"
              color="smoke"
              sx={{ maxWidth: '650px' }}
            >
              We believe in a world where every person is empowered to be
              the change they want to see around them. At Happy Hacking Space, we’re
              working hard to make it reality.
            </Text>
          </Container>
        </Box>
        <Box bg="#f9f9fa" py={4}>
          <Container>
            <Flex
              sx={{
                bg: 'rgb(51 142 218 / 40%)',
                p: 3,
                borderRadius: '20px',
                mb: 3,
                gap: 3,
                flexWrap: ['wrap', null, null, 'nowrap']
              }}
            >
              <Text
                variant="headline"
                as="h3"
                sx={{
                  textAlign: 'center',
                  fontSize: 3,
                  writingMode: [null, null, null, 'vertical-rl'],
                  mr: [0, 0, 0, 1],
                  transform: [null, null, null, 'rotate(180deg)'],
                  width: ['100%', null, null, 'fit-content'],
                  my: ['0px!important', '0px!important', '0px!important', 3]
                }}
              >
                Board & Advisors
              </Text>
              <Box sx={{ flexGrow: 1 }}>
                <Grid columns={[1, null, 2]} gap={2} mb={2}>
                  <Bio
                    img="/team/dogan.jpg"
                    name="Dogan Can Bakir"
                    teamRole="Founder & Chief Hacking Officer"
                    text=""
                    pronouns="he/him"
                    email="dogan"
                  />
                  <Bio
                    img="/team/omar.jpg"
                    name="Omar Kurt"  
                    teamRole="Co-founder & CISO"
                    text=""
                    pronouns="he/him"
                    email="omar"
                  />
                </Grid>
                <Grid columns={[1, null, 3]} gap={2}>
                  {/* <Bio
                    img="https://cloud-80nhjzldl-hack-club-bot.vercel.app/0.jpeg"
                    name="Tom Preston-Werner"
                    teamRole={<>Board Member</>}
                    subrole="Co-Founder, GitHub"
                    pronouns="he/him"
                    href="https://github.com/mojombo"
                  />
                  <Bio
                    img="https://philanthropy.hackclub.com/_next/image?url=/quinn.png&w=1200&q=75"
                    name="Quinn Slack"
                    teamRole={<>Board Member</>}
                    subrole="CEO, Sourcegraph"
                    pronouns="he/him"
                    href="https://github.com/sqs"
                  />
                  <Bio
                    img="https://media.licdn.com/dms/image/C5603AQFum8zxW-IEEA/profile-displayphoto-shrink_800_800/0/1517058384850?e=2147483647&v=beta&t=-oM8no3Zc7xUzCDBsHxajD_joBkQi8Ge5iPaeF5p0gM"
                    name="John Abele"
                    teamRole={<>Board Advisor</>}
                    href="https://en.wikipedia.org/wiki/John_Abele"
                    subrole="Founder, Boston Scientific"
                    pronouns="he/him"
                  /> */}
                </Grid>
              </Box>
            </Flex>
            <Grid columns={[1, null, 2]} gap={3}>
              <Box>
                <Box
                  sx={{
                    bg: 'rgb(51 214 166 / 40%)',
                    p: 3,
                    borderRadius: '20px'
                  }}
                >
                  <Text
                    variant="headline"
                    mt={2}
                    mb={3}
                    as="h3"
                    sx={{ textAlign: 'center', fontSize: 4 }}
                  >
                    Hacker Resources Team
                  </Text>
                  <Grid columns={[1, null, 2]} gap={2}>
                    {team.current
                      ?.filter(member => member.department === 'HQ')
                      .sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name))
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    bg: 'rgb(236 55 80 / 40%)',
                    p: 3,
                    borderRadius: '20px'
                  }}
                >
                  <Text
                    variant="headline"
                    mt={2}
                    mb={3}
                    as="h3"
                    sx={{ textAlign: 'center', fontSize: 4 }}
                  >
                    HHSB Team
                  </Text>
                  <Grid columns={[1, null, 2]} gap={2}>
                    {team.current
                      ?.filter(member => member.department === 'HHSB')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Box
              sx={{
                bg: 'rgb(166 51 214 / 40%)',
                p: 3,
                borderRadius: '20px',
                mt: 3
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 4 }}
              >
                Community Team
              </Text>
              <Grid columns={[1, null, 2]} gap={3}>
                <CommunityTeamBox title="Moderation">
                  <Grid columns={[1, null, 2]} gap={2} m={10}>
                    {team.current
                      ?.filter(member => member.department === 'Moderation')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
                <CommunityTeamBox title="Virtual Events">
                  <Grid columns={[1, null, 2]} gap={2} m={10}>
                    {team.current
                      ?.filter(member => member.department === 'Events')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
                <CommunityTeamBox title="Newspaper">
                  <Grid columns={[1, null, 2]} gap={2} m={10}>
                    {team.current
                      ?.filter(member => member.department === 'Newspaper')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
                <CommunityTeamBox title="Welcomers">
                  <Grid columns={[1, null, 2]} gap={2} m={10}>
                    {team.current
                      ?.filter(member => member.department === 'Welcoming')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
                          href={member.website}
                          key={member.name}
                        />
                      ))}
                  </Grid>
                </CommunityTeamBox>
              </Grid>
            </Box>
            <br />
            <Box sx={{ textAlign: 'center', mt: 100, mb: [3, 4] }}>
              <Text
                variant="title"
                color="orange"
                sx={{ lineHeight: '1em', fontSize: [4, 5, 6] }}
                as="h2"
              >
                Acknowledgements
              </Text>
              <Text
                variant="title"
                color="text"
                sx={{
                  lineHeight: '1.2',
                  fontSize: [1, 3, 4],
                  my: [3, 0, 0],
                  fontWeight: 400,
                  maxWidth: '600px',
                  width: '100%',
                  margin: 'auto'
                }}
                as="h2"
              >
                Thank you to everyone who helped shape Happy Hacking Space into what it is
                today...
              </Text>
            </Box>
            <Grid columns={[1, null, 2, 4]} gap={2}>
              {team.acknowledged?.map(member => (
                <Bio
                  img={member.avatar}
                  name={member.name}
                  teamRole={member.role}
                  text={member.bio}
                  pronouns={member.pronouns}
                  key={member.name}
                  href={member.website}
                />
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer light key="footer" />
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const team = await fetchTeam()
    return { props: { team } }
  } catch (e) {
    return { props: { team: {} } }
  }
}
