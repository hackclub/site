import { Box, Container, Flex, Grid, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'
import BoardBox from '../components/boardbio'
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
        {/* @ts-expect-error -- TODO: fix this */}
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
              'radial-gradient(ellipse farthest-corner at top left,rgb(36 181 165 / 70%),rgb(30 151 137 / 70%)), url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/cf3488823b5ae7c41ed968224485ea06423a6862_IMG_9920.jpg)',
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
                img="https://upload.wikimedia.org/wikipedia/commons/7/75/Tom_Preston-Werner_%282024%29.jpg"
                name="Tom Preston-Werner"
                teamRole={<>Board Member</>}
                subrole="Co-Founder, GitHub"
                href="https://github.com/mojombo"
              />
              <BoardBox 
                img="https://philanthropy.hackclub.com/_next/image?url=/quinn.png&w=1200&q=75"
                name="Quinn Slack"
                teamRole={<>Board Member</>}
                subrole="Co-Founder and CEO, AMP"
                href="https://github.com/sqs"
              />
              <BoardBox 
                img="https://media.licdn.com/dms/image/C5603AQFum8zxW-IEEA/profile-displayphoto-shrink_800_800/0/1517058384850?e=2147483647&v=beta&t=-oM8no3Zc7xUzCDBsHxajD_joBkQi8Ge5iPaeF5p0gM"
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
                    Contractors:
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
              {team.current?.filter(member => member.department === 'HCB' && member.gapyear).length > 0 && (
                <>
                  <Text
                    variant="headline"
                    mt={3}
                    mb={2}
                    as="h4"
                    sx={{ fontSize:3 }}
                  >
                    2025-2026 Gap Years:
                  </Text>
                  <Grid columns={[1, null, 2, 3]} gap={3}>
                    {team.current
                      ?.filter(member => member.department === 'HCB' && member.gapyear)
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
              {team.current?.filter(member => member.department === 'HCB' && !member.gapyear && !member.staff).length > 0 && (
                <>
                  <Text
                    variant="headline"
                    mt={3}
                    mb={2}
                    as="h4"
                    sx={{ fontSize: 3 }}
                  >
                    Contractors:
                  </Text>
                  <Grid columns={[1, null, 2, 3]} gap={3}>
                    {team.current
                      ?.filter(member => member.department === 'HCB' && !member.gapyear && !member.staff)
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
                  {team.current?.filter(member => member.department === 'Moderation' && member.staff).length > 0 && (
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
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Moderation' && member.staff)
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
                  {team.current?.filter(member => member.department === 'Moderation' && member.gapyear).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize: 3 }}
                      >
                        2025-2026 Gap Years:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Moderation' && member.gapyear)
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
                  {team.current?.filter(member => member.department === 'Moderation' && !member.gapyear && !member.staff).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize: 3 }}
                      >
                        Contractors:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Moderation' && !member.gapyear && !member.staff)
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
                </CommunityTeamBox>
                <CommunityTeamBox title="Welcomers">
                  {team.current?.filter(member => member.department === 'Welcoming' && member.staff).length > 0 && (
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
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Welcoming' && member.staff)
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
                  {team.current?.filter(member => member.department === 'Welcoming' && member.gapyear).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize: 3 }}
                      >
                        2025-2026 Gap Years:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Welcoming' && member.gapyear)
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
                  {team.current?.filter(member => member.department === 'Welcoming' && !member.gapyear && !member.staff).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize: 3 }}
                      >
                        Contractors:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Welcoming' && !member.gapyear && !member.staff)
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
                </CommunityTeamBox>
                <CommunityTeamBox title="Virtual Events">
                  {team.current?.filter(member => member.department === 'Events' && member.staff).length > 0 && (
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
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Events' && member.staff)
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
                  {team.current?.filter(member => member.department === 'Events' && member.gapyear).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize: 3 }}
                      >
                        2025-2026 Gap Years:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Events' && member.gapyear)
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
                  {team.current?.filter(member => member.department === 'Events' && !member.gapyear && !member.staff).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize: 3 }}
                      >
                        Contractors:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Events' && !member.gapyear && !member.staff)
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
                </CommunityTeamBox>
                <CommunityTeamBox title="Newspaper">
                  {team.current?.filter(member => member.department === 'Newspaper' && member.staff).length > 0 && (
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
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Newspaper' && member.staff)
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
                  {team.current?.filter(member => member.department === 'Newspaper' && member.gapyear).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize:3 }}
                      >
                        2025-2026 Gap Years:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Newspaper' && member.gapyear)
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
                  {team.current?.filter(member => member.department === 'Newspaper' && !member.gapyear && !member.staff).length > 0 && (
                    <>
                      <Text
                        variant="headline"
                        mt={2}
                        mb={2}
                        as="h4"
                        sx={{ fontSize: 3 }}
                      >
                        Contractors:
                      </Text>
                      <Grid columns={[1, null, 2]} gap={3} m={10}>
                        {team.current
                          ?.filter(member => member.department === 'Newspaper' && !member.gapyear && !member.staff)
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
                Thank you to everyone who helped shape Hack Club into what it is
                today...
              </Text>
            </Box>
            <Grid columns={[1, null, 2, 3]} gap={3}>
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
