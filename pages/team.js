import { Box, Container, Flex, Grid, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'
import ForceTheme from '../components/force-theme'

export default function Team({ team }) {
  return (
    <>
      <Box as="main" key="main">
        <ForceTheme theme="light" />
        <Nav light />
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
              'radial-gradient(ellipse farthest-corner at top left,rgb(36 181 165 / 70%),rgb(30 151 137 / 70%)), url(https://cloud-6b7atvvf8-hack-club-bot.vercel.app/0hack_club_team_-_july_2023.jpg)',
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
                my={[0, 0, 3]}
                as="h3"
                sx={{
                  textAlign: 'center',
                  fontSize: 4,
                  writingMode: [null, null, null, 'vertical-rl'],
                  mr: [0, 0, 0, 2],
                  transform: [null, null, null, 'rotate(180deg)'],
                  width: ['100%', null, null, 'fit-content'],
                  marginBottom: [
                    '0px!important',
                    '0px!important',
                    '0px!important',
                    3
                  ]
                }}
              >
                Our Board
              </Text>
              <Box sx={{ flexGrow: 1 }}>
                <Grid columns={[1, null, 2]} gap={2} mb={2}>
                  <Bio
                    img="/team/zach.jpg"
                    name="Zach Latta"
                    teamRole="Founder"
                    text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
                    pronouns="he/him"
                    email="zach"
                  />
                  <Bio
                    img="/team/christina.jpg"
                    name="Christina Asquith"
                    teamRole="Co-founder and COO"
                    text="With more than a decade of experience in starting and leading organizations, Christina has built global teams and raised millions of dollars. She has 20 years experience as a journalist, including reporting for The New York Times from Iraq. She has an MA in education, and taught as a public school teacher in 2000, which inspired her book “The Emergency Teacher.”"
                    pronouns="she/her"
                    email="christina"
                  />
                </Grid>
                <Grid columns={[1, null, 3]} gap={2}>
                  <Bio
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
                  />
                </Grid>
              </Box>
            </Flex>
            <Grid columns={[1, null, null, 2]} gap={3}>
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
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
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
                    HCB Team
                  </Text>
                  <Grid columns={[1, null, 2]} gap={2}>
                    {team.current
                      ?.filter(member => member.department === 'HCB')
                      .map(member => (
                        <Bio
                          img={member.avatar}
                          name={member.name}
                          teamRole={member.role}
                          text={member.bio}
                          pronouns={member.pronouns}
                          email={member.email}
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
              <Grid columns={[1, 2, null, 4]} gap={2}>
                {team.current
                  ?.filter(member => member.department === 'Community')
                  .map(member => (
                    <Bio
                      img={member.avatar}
                      name={member.name}
                      teamRole={member.role}
                      text={member.bio}
                      pronouns={member.pronouns}
                      email={member.email}
                      key={member.name}
                    />
                  ))}
              </Grid>
            </Box>
            <br />
            <Box sx={{ textAlign: 'center', mt: 2, mb: [3, 4] }}>
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
            <Grid columns={[1, null, 2, 4]} gap={2}>
              <Bio
                name="Hugo Hu"
                teamRole="Mail Coordinator & Engineering"
                text="During his time Hack Club, Hugo led Mail Team, significantly improving logistics for Hack Clubbers across the world. He also helped organize Assemble, and designed the PCBs for Sprig and Blot."
                img="https://ca.slack-edge.com/T0266FRGM-U017EPB6LE9-84f26d2a184c-512"
                pronouns="he/him"
                href="https://hugohu.me"
              />
              <Bio
                name="Lexi Mattick"
                teamRole="Clubs Engineering"
                text="Always driven by curiosity for how things work, Lexi fell in love with Hack Club in 2019 after joining a Hack Night call and discovering like-minded individuals. She spends her time programming, making music, and studying for her private pilot license; at Hack Club, she spends her time working on whatever fantastic project is happening in the present moment."
                img="/team/bean-man.jpg"
                pronouns="she/her"
              />
              <Bio
                name="Holly Delisle"
                teamRole="Clubs Operations Lead"
                text="Holly comes to Hack Club with 10 years of operations management in the banking industry, bringing people together and simplifying processes. She's lived in Maine and Vermont in intervals all her life and loves the outdoors in every season. Now, Holly meets and works with amazing, inspiring technical teenagers every day from around the world. She's got two sons, two dogs and two cats, the latter of which are all named after characters in some of her favorite books."
                img="/team/holly.jpeg"
                pronouns="she/her"
              />
              <Bio
                name="Kunal Botla"
                teamRole="Operations"
                text={`Kunal loves to make for making! He started Project Boom to help provide computers, helped build and run HCB, and organized MAHacks for a post-pandemic world. He takes photos to tell stories of an ever-changing world.`}
                img="https://github.com/kunalbotla.png"
                pronouns="he/him"
              />
              <Bio
                name="Ella Xu"
                teamRole="Clubs Engineering"
                text="Ella joined the Hack Club community after learning about HCB from a project running on it. Since then, she has contributed to HCB itself in addition to other Hack Club open source projects on GitHub."
                img="https://ca.slack-edge.com/T0266FRGM-U01D6FYHLUW-edb3e93ee1fe-512"
                pronouns="she/her"
              />
              <Bio
                name="Cedric Hutchings"
                teamRole="Constructionist"
                text="Already more at home on the internet than anywhere in meat space, you can imagine a young Ced's horror when his parents moved him into a holler so deep in the Appalachian Mountains that his beloved internet was only accessible through sluggish satellite. Stubbornly refusing to be separated from his online games, he threw together his own for his brothers, a captive audience. At Hack Club, Ced made materials that shared his enthusiasm for making fun somethings from nothing but technology."
                img="/team/ced.png"
                pronouns="he/him"
              />
              <Bio
                name="Kara Massie"
                teamRole="Production Lead"
                text="Before joining Hack Club, Kara was a lead producer at Activision, shipping Crash Bandicoot N. Sane Trilogy and Bungie's Destiny 2 expansions. She’s deeply committed to inclusivity in gaming and tech spaces, and is beyond thrilled to be part of an org with kindness at its core. She has lived in 3 countries and names her pets after vegetables."
                img="/team/kara.png"
                pronouns="she/her"
              />
              <Bio
                name="Sam Poder"
                teamRole="Engineering & Operations"
                text={`Originally from Australia, Sam's family moved to Singapore when he was young. In Singapore, he ran a Hack Club at his school and multiple hackathons with his friends. During his time in Hack Club, he worked on everything from events to engineering. The wildest things from his time at Hack Club include 4am rickshaw rides in New Delhi, attempting to oversee several raves, rickrolling the Slack twice, losing his voice waking up hundreds of sleeping hackers and heartstopping late-night launches. Now at university, Sam will never forget the crazy times at Hack Club and will always have his friends from Hack Club.`}
                img="https://change-my-pfp.vercel.app/api/current/"
                pronouns="he/him"
                href="https://github.com/sampoder"
              />
              <Bio
                name="Maggie Liu"
                teamRole="Moderation & Events"
                img="https://ca.slack-edge.com/T0266FRGM-U026XSMKEDC-a5beea76faa2-512"
                pronouns="she/her"
              />
              <Bio
                img="/team/athul.jpg"
                name="Athul Blesson"
                teamRole="APAC Director"
                text="Athul started dozens of the largest Hack Clubs in India. After graduating from high school, he joined Hack Club as the Regional Manager of the Asia-Pacific & Africa team where he actively managed hundreds of clubs. Then, as the APAC Director, Athul lead the APAC HQ team dedicated to supporting all of the clubs in the APAC region."
                pronouns="he/him"
              />
              <Bio
                name="Harsh Bajpai"
                teamRole="APAC Clubs"
                text="Harsh is a vegetarian musician who enjoys traveling around India. As the APAC Clubs Lead, Harsh welcomed new clubs to the community and built amazing tools for them. When he is not reading ancient mythology, he is programming with purpose and passion."
                img="/team/harsh.png"
                pronouns="he/him"
              />
              <Bio
                name="Annlee Fores"
                teamRole="APAC Ops."
                text="As the COO of Hack Club APAC, Annlee oversaw operations and handled event organisation & logistics at Hack Club APAC.
When not busy juggling different tasks he takes up, he enjoys tinkering & building fun projects."
                img="/team/annlee.jpg"
                pronouns="he/him"
              />
              <Bio
                name="Anna Grace Benny"
                teamRole="APAC Clubs"
                text="Anna is a visual communication graduate and a social media enthusiast. She loves films and everything related. Managing and meeting new Hack Clubbers as the APAC Clubs Lead, she helped with onboarding new clubs and managed the APAC social media pages."
                img="/team/anna.png"
                pronouns="she/her"
              />
              <Bio
                name="Ishan Goel"
                teamRole="Communications Intern"
                text="Ishan was a summer intern from Seattle! During the summer of 2022, he worked on shipping projects with partners to get the word out about Hack Club, and bring more people into the community."
                img="https://github.com/quackduck.png"
                pronouns="he/him"
              />
              <Bio
                name="Abby Fischler"
                teamRole="Junior Administrative Engineer"
                text={`Abby is a high school junior from Los Angeles that loves technology! Since joining the Hack Club community in May 2020, she’s enjoyed learning with friends in the Slack and on board the Hacker Zephyr. She joined Hack Club to support Christina’s work in encouraging more girls to get involved. Abby has hosted events for the community and loves sharing her coding journey on the #ship channel.`}
                img="https://github.com/abbyfischler.png"
                pronouns="she/her"
              />
              <Bio
                name="Jessica Card"
                teamRole="Education Engineer"
                text="Jessica is a self taught programmer originally from Alaska. She worked for over a decade as a software engineer at startups like GitHub and Bugsnag in San Francisco. She then left the web development world to learn how to make video games. At Hack Club, Jessica brought her creative energy to an array of projects! Most notably, when she learnt Assembly along with Hack Clubbers to produce Some Assembly Required."
                img="/team/jessica.jpg"
                pronouns="she/her"
              />
              <Bio
                name="Belle See"
                teamRole="Engineer for Comms"
                text="Belle enjoys building for her community, whether that be through developing websites or planning programs and events. She is excited to make Hack Club a better place for students around the world and looks forward to learning from the team at Hack Club!"
                img="https://github.com/bellesea.png"
                pronouns="she/her"
              />
              <Bio
                name="Claire Wang"
                teamRole="Community"
                text="Claire works on the Community Team and was a previous summer intern. She hopes to make the community both more welcoming and more technical, as well as inspire beginners to love STEM and making. She first joined Hack Club in 8th grade because of an online competition, and has been running a Hack Club ever since then. In addition to CS, she loves neuroscience, sci-fi, debate, and creating Spotify playlists."
                img="/team/claire.png"
                pronouns="she/her"
              />
              <Bio
                name="Rishi Kothari"
                teamRole="Summer Intern"
                text="Rishi is a high school senior that's super interested in open-source development, startups, React, and everything in between! He is primarily a JS/TS dev, but has worked with Rust 🔥, C++ 💖, Haskell ⚡️, and Swift 🏎 in the past. He is the president of TFSS' Hack Club and a workshop coordinator at TurnerHacks, among other things."
                img="https://github.com/rishiosaur.png"
                pronouns="he/him"
              />
              <Bio
                name="Zach Fogg"
                teamRole="Community Game Designer"
                text="At college, Zach Fogg started Bitcamp, one of the largest & longest-running annual college hackathons. He then went on to work as a software engineer in SF and mentor many more student hackathons. Zach joined the team at HQ in early 2021, he went on to bring his energy to the community and hack on countless creative projects (such as the Zephyrnet, which he then maintained as it traveled across the US)."
                pronouns="he/him"
                img="/team/zfogg.jpg"
              />
              <Bio
                img="/team/matthew.jpg"
                name="Matthew Stanciu"
                teamRole="Clubs Lead"
                text="After leading a successful Hack Club in West Lafayette, Indiana, & organizing multiple hackathons with HCB, Matthew joined the team to lead the clubs program. He wrote curriculum, helped mentor club leaders around the world, & in spring 2020 drove across the U.S. to visit clubs."
                pronouns="he/him"
              />
              <Bio
                img="/team/lachlan.jpg"
                name="Lachlan Campbell"
                teamRole="Storytelling"
                text="Lachlan joined as a club leader from State College, PA to make hackclub.com. 3 years later, as Head of Storytelling, they work on Hack Club’s website, design, frontend, open source, & communications. They’re currently on COVID leave from NYU ’23, majoring in Interactive Media Arts."
                pronouns="they/them"
              />
              <Bio
                img="/team/scott.jpg"
                name="Scott Motte"
                teamRole="HCB Engineer"
                text="After teaching himself to code in college, Scott went on to lead an exciting software life with multiple startups. Now a father, he joined Hack Club to help build the program he wants available to his children—when they reach high school age."
                pronouns="he/him"
              />
              <Bio
                img="/team/tina.jpg"
                name="Tina Soriano"
                teamRole="Exec. Assistant"
                text="Philippine bred and settled with family in the U.S., Tina shifted her career from marketing and film production to teaching kids in the Clark County School District. At Hack Club, she helped thousands of high school students hack their way to a fabulous future."
                pronouns="she/her"
              />
              <Bio
                name="Mark Allen"
                teamRole="AMA Producer"
                img="https://ca.slack-edge.com/T0266FRGM-U03Q20XM953-91ae3b0d0243-512"
                pronouns="he/him"
              />
              <Bio
                img="/team/dina.jpg"
                name="Dina Elhanan"
                teamRole="Summer Intern"
                text="Dina started a club in Canada in 2018. Since then she’s run a local hackathon, organized club events & trips, and spoke at Hack Club’s Flagship 2019 Summit. After graduating high school, Dina joined HQ as a ✨Vibes Influencer✨ summer intern. She now studies Electrical Engineering at McMaster University, class of 2024."
                pronouns="she/her"
              />
              <Bio
                img="/team/theo.jpg"
                name="Theo Bleier"
                teamRole="Special Projects"
                text="Theo, a high schooler, joined the Hack Club community in Summer 2018 after reading about HCB online. Since then, he’s run multiple events on HCB & worked on coding it. In 2020, Theo worked on AMAs & distributing laptop grants to students."
                pronouns="he/him"
              />
              <Bio
                img="/team/mingjie.jpg"
                name="Mingjie Jiang"
                teamRole="Community"
                text="Mingjie started working with Hack Club in July 2017, while leading his club in Rockville, Maryland, working on community engagement & public identity. He’s also run Hack Chicago, CodeDay, and countless other hackathons to spread his passion for technology."
                pronouns="he/him"
              />
              <Bio
                img="/team/linus.jpg"
                name="Linus Lee"
                teamRole="HCB Engineer"
                text="Linus spends most of his free time working on side projects ranging from an audio travel diary to creative coding tools to his own programming language. He brought his experience in product & community from Cal Hacks & Dorm Room Fund to grow HCB."
                pronouns="he/him"
              />
              <Bio
                img="/team/fernanda.jpg"
                name="Fernanda Lozano"
                teamRole="Flagship"
                text="Fernanda is a student of computational neuroscience, entrepreneur, & organizer of events like the Entrepreneurial Learning Academy for students in Mexico. In summer 2019, she helped organize the Flagship Summit in San Francisco."
                pronouns="she/her"
              />
              <Bio
                img="/team/michael.jpg"
                name="Michael Destefanis"
                teamRole="HCB Ops."
                text="After graduating high school, Michael moved to California where he began working with Hack Club. He handled the day-to-day operations of HCB from its start starting to its first million dollars in transactions."
                pronouns="he/him"
              />
              <Bio
                img="/team/amogh.jpg"
                name="Amogh Chaubey"
                teamRole="Community + Events"
                text="Amogh is all about having fun. Whether it’s running an art showcase on the Slack or massive Kahoots at hackathons, he loves to run awesome events. Amogh joined HQ to run spectacular community events, to make Hack Club the best place to be a teenager on the internet, and as Hack Club’s second best rapper."
                pronouns="he/him"
              />
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
    const team = await fetch('https://internal.hackclub.com/team').then(res =>
      res.json()
    )
    return { props: { team } }
  } catch (e) {
    return { props: { team: [] } }
  }
}
