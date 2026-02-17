import { Box, Container, Flex, Grid, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'
import BoardBox from '../components/boardbio'
import ForceTheme from '../components/force-theme'
import { fetchTeam } from './api/team'
import Link from 'next/link'

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
          sx={{ textAlign: 'center', fontSize: 4 }}
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
  // Spacing between major team section boxes
  const BOX_SPACING = 5

  return (
    <>
      <Box as="main" key="main">
        <ForceTheme theme="light" />
        <Nav />
        <Meta
          as={Head}
          title="Team"
          description="Meet the team that runs Hack Club, a global nonprofit network of high school computer science clubs."
        />
        <Box
          pt={6}
          pb={5}
          px={[2, 4]}
          sx={{
            backgroundImage:
              'radial-gradient(ellipse farthest-corner at top left,rgb(36 181 165 / 70%),rgb(30 151 137 / 70%)), url(/hc-cdn/cf3488823b5ae7c41ed968224485ea06423a6862_IMG_9920.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '25% 15%'
          }}
        >
          <Container>
            <Text variant="ultratitle" color="snow">
              By the students,
              <br /> for the students.
            </Text>

            <Text
              as="div"
              variant="lead"
              color="smoke"
              sx={{ maxWidth: '650px' }}
            >
              We believe in a world where every young person is empowered to be
              the change they want to see around them. At Hack Club, we’re
              working hard to make it reality.
            </Text>
          </Container>
        </Box>
        <Box bg="#f9f9fa" py={4}>
          <Container>
            <Box sx={{
                mb: BOX_SPACING
              }}>
            <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 5 }}
              >
                Board & Advisors
              </Text>
            <Grid columns={[1, null, 2]} gap={5} mb={4}>
            <BoardBox
              img="/team/zach.jpg"
              name="Zach Latta"
              teamRole="Founder"
              text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
              email="zach"
            />
            <BoardBox 
              img="/team/christina.jpg"
              name="Christina Asquith"
              teamRole="Co-Founder and COO"
              text="With more than a decade of experience in starting and leading organizations, Christina has built global teams and raised millions of dollars. She has 20 years experience as a journalist, including reporting for The New York Times from Iraq. She has an MA in education, and taught as a public school teacher in 2000, which inspired her book “The Emergency Teacher.”"
              email="christina"
            />
            </Grid>
            <Grid columns={[1, null, 3]} gap={4} mb={4}>
            <BoardBox 
                img="https://i.ibb.co/gMVMqJzt/2026-01-27-0io-Kleki.jpg"
                name="Tom Preston-Werner"
                teamRole={<>Board Member</>}
                subrole="Co-Founder, GitHub"
                href="https://github.com/mojombo"
              />
              <BoardBox 
                img="https://i.ibb.co/qMCYrJn8/sqs.jpg"
                name="Quinn Slack"
                teamRole={<>Board Member</>}
                subrole="Co-Founder and CEO, AMP"
                href="https://github.com/sqs"
              />
              <BoardBox 
                img="https://i.ibb.co/0pGTSmks/2026-01-27-0il-Kleki.png"
                name="John Abele"
                teamRole={<>Board Advisor</>}
                href="https://en.wikipedia.org/wiki/John_Abele"
                subrole="Founder, Boston Scientific"
              />
              </Grid>
            </Box>
            <Box
              sx={{
                bg: '#afcfee',
                p: 3,
                borderRadius: '20px',
                mb: BOX_SPACING
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 5 }}
              >
                Hacker Resources Team
              </Text>
              {team.current?.filter(member => member.department === 'HQ' && member.staff).length > 0 && (
                <>
                  <Text
                    variant="headline"
                    mt={2}
                    mb={2}
                    as="h4"
                    sx={{ fontSize: 3 }}
                  >
                    Staff:
                  </Text>
                  <Grid columns={[1, null, 2, 3]} gap={3}>
                    {team.current
                      ?.filter(member => member.department === 'HQ' && member.staff)
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
                </>
              )}
              {team.current?.filter(member => member.department === 'HQ' && member.gapyear).length > 0 && (
                <>
                  <Text
                    variant="headline"
                    mt={3}
                    mb={2}
                    as="h4"
                    sx={{ fontSize: 3 }}
                  >
                    2025-2026 Gap Years:
                  </Text>
                  <Grid columns={[1, null, 2, 3]} gap={3}>
                    {team.current
                      ?.filter(member => member.department === 'HQ' && member.gapyear)
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
                </>
              )}
              {team.current?.filter(member => member.department === 'HQ' && !member.gapyear && !member.staff).length > 0 && (
                <>
                  <Text
                    variant="headline"
                    mt={3}
                    mb={2}
                    as="h4"
                    sx={{ fontSize: 3 }}
                  >
                    Teen Contractors:
                  </Text>
                  <Grid columns={[1, null, 2, 3]} gap={3}>
                    {team.current
                      ?.filter(member => member.department === 'HQ' && !member.gapyear && !member.staff)
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
                </>
              )}
            </Box>
            <Box
              sx={{
                bg: 'rgb(236 55 80 / 40%)',
                p: 3,
                borderRadius: '20px',
                mb: BOX_SPACING
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 5 }}
              >
                HCB Team
              </Text>
              {team.current?.filter(member => member.department === 'HCB' && member.staff).length > 0 && (
                <>
                  <Text
                    variant="headline"
                    mt={2}
                    mb={2}
                    as="h4"
                    sx={{ fontSize: 3 }}
                  >
                    Staff:
                  </Text>
                  <Grid columns={[1, null, 2, 3]} gap={3}>
                    {team.current
                      ?.filter(member => member.department === 'HCB' && member.staff)
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
                </>
              )}
              {team.current?.filter(member => member.department === 'HCB' && !member.staff).length > 0 && (
                <>
                  <Text
                    variant="headline"
                    mt={3}
                    mb={2}
                    as="h4"
                    sx={{ fontSize: 3 }}
                  >
                    Contributors:
                  </Text>
                  <Grid columns={[1, null, 2, 3]} gap={3}>
                    {team.current
                      ?.filter(member => member.department === 'HCB' && !member.staff)
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
                </>
              )}
            </Box>
            <Box
              sx={{
                bg: 'rgb(166 51 214 / 40%)',
                p: 3,
                borderRadius: '20px'
              }}
            >
              <Text
                variant="headline"
                mt={2}
                mb={3}
                as="h3"
                sx={{ textAlign: 'center', fontSize: 5 }}
              >
                Community Team
              </Text>
              <Grid columns={[1, null, 2]} gap={3}>
                <CommunityTeamBox title="Moderation">
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
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
                <CommunityTeamBox title="Welcomers">
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
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
                <CommunityTeamBox title="Virtual Events">
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
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
                  <Grid columns={[1, null, 2]} gap={3} m={10}>
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
              </Grid>
            </Box>
            <br />
            <Box sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              <Link href="/acknowledged/">
                <Box sx={{ cursor: 'pointer' }}>
                  <Text
                    variant="title"
                    color="orange"
                    sx={{ lineHeight: '1em', fontSize: [4, 5, 6], textAlign: 'center', textDecoration: 'underline' }}
                    as="h2"
                  >
                    Acknowledgements
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 2, mt: 2 }}>
                    Thank you to everyone who helped shape Hack Club into what it is today...
                  </Text>
                </Box>
              </Link>
            </Box>
          </Container>
        </Box>
      </Box>
      <Footer light key="footer" />
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const current = await fetchTeam()
    return { props: { team: { current } } }
  } catch (e) {
    return { props: { team: {} } }
  }
}
