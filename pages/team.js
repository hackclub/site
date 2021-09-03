import {
  Card,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  Grid
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'

export default function Team() {
  return (
    <>
      <Box as="main" key="main">
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
          sx={{ background: theme => theme.util.gx('#24B5A5', '#1E9789') }}
        >
          <Container>
            <Text variant="ultratitle" color="snow">
              By the students,
              <br /> for the students.
            </Text>

            <Text as="div" variant="lead" color="smoke" sx={{maxWidth: '650px'}}>
              We believe in a world where every young person is
              empowered to be the change they want to see around 
              them. At Hack Club, we’re working hard to make it reality.
            </Text>
          </Container>
        </Box>
        <Box
          bg="#f9f9fa"
          py={4}
        >
          <Container>
            <Grid columns={[1, null, 2]} gap={4}>
              <Bio
                img="/team/zach.jpg"
                name="Zach Latta"
                teamRole="Founder"
                text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
                pronouns="he/him"
              />
              <Bio
                img="/team/christina.jpg"
                name="Christina Asquith"
                teamRole="COO"
                text="Christina is founder &amp; former editor-in-chief of Fuller Project, a global journalism nonprofit reporting on issues impacting women. A journalist since college, she’s reported from eight countries for the New York Times, Guardian, TIME, the Washington Post & others. She taught as a public school teacher in 2000, which inspired her book “The Emergency Teacher.”"
                pronouns="she/her"
              />
              <Bio
                img="/team/max.jpg"
                name="Max Wofford"
                teamRole="Operations"
                text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in Vermont to grow the movement."
                pronouns="he/him"
              />
              <Bio
                img="/team/athul.jpg"
                name="Athul Blesson"
                teamRole="Asia-Pacific Region"
                text="Athul started dozens of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager of Asia-Pacific & Africa, where he actively manages 117 clubs."
                pronouns="he/him"
              />
              <Bio
                name="Zach Fogg"
                teamRole="Community Game Designer"
                text="Before he helped start Bitcamp, one of the largest & longest-running annual collegic hackathons, Zach Fogg was homeschooled in Maryland. He's been a mentor at tons of student hackathons and worked as software engineer for the past 8 years in SF."
                pronouns="he/him"
                img="/team/zfogg.jpg"
              />
              <Bio
                name="Melanie Smith"
                teamRole="Bank Operations Lead"
                text="Melanie grew up in northern New England where she obtained a degree in Marine Biology. She then spent several years running a pet store with 20+ employees and recently decided to change career paths. This led her to Hack Club where she is excited about helping students pursue their dreams."
                img="/team/mel.png"
                pronouns="she/her"
              />
              <Bio
                name="Leo McElroy"
                teamRole="Clubs Lead"
                text="Leo builds digital systems, physical tools, and communities to help people express themselves and pursue their curiosity. He's created tools for democratizing personal automation (including programming languages for designing stuff), travelled the world visiting makerspaces on a Watson Fellowship, and created and ran a few makerspaces himself."
                img="/team/leo.png"
                pronouns="he/him"
              />
            </Grid>
            <br />
            <Text variant="title" color="orange" sx={{ lineHeight: '1.75em' }}>
              Behind the Scenes
            </Text>
            <Grid columns={[1, null, 2]} gap={4}>
              <Bio
                img="/team/robert.jpg"
                name="Robert Caldwell"
                teamRole="Philanthropy"
                text=" After serving for thirty-two years in education management and advancement, Robert joined Hack Club to help raise the resources necessary to provide students with 21st century technical skills and develop a new generation of programmers, coders and makers. Robert is from Canada and lives in Charlotte, Vermont with his wife and children."
                pronouns="he/him"
              />
              <Bio
                img="/team/scott.jpg"
                name="Scott Motte"
                teamRole="Hack Club Bank"
                text="After teaching himself to code in college, Scott went on to lead an exciting software life with multiple startups. Now a father, he joined Hack Club to help build the program he wants available to his children—when they reach high school age."
                pronouns="he/him"
              />
              <Bio
                img="/team/tina.jpg"
                name="Tina Soriano"
                teamRole="Assistant"
                text="Philippine bred and settled with family in the U.S., Tina shifted her career from marketing and film production to teaching kids in the Clark County School District. Now she is happy to help high school students hack their way to a fabulous future."
                pronouns="she/her"
              />
              <Bio
                name="Chris Newton"
                teamRole="Accountant"
                text="After finding her love of accounting at an early age, Chris spent most of her accounting career in construction, but recently branched out to nonprofits. Chris is married (Bryan) with a young daughter (Brylee), and lives in Des Moines, Iowa."
                pronouns="she/her"
                img="/team/cnewton.jpg"
              />
            </Grid>
            <br />
            <Text variant="title" color="orange" sx={{ lineHeight: '1.75em' }}>
              Acknowledgements
            </Text>
            <Grid columns={[1, null, 2]} gap={4}>
              <Bio
                img="/team/matthew.jpg"
                name="Matthew Stanciu"
                teamRole="Clubs"
                text="After leading a successful Hack Club in West Lafayette, Indiana, & organizing multiple hackathons with Hack Club Bank, Matthew joined the team to lead the clubs program. He wrote curriculum, helped mentor club leaders around the world, & in spring 2020 drove across the U.S. to visit clubs."
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
                img="/team/chris.jpg"
                name="Chris Walker"
                teamRole="Hacker Resources"
                text="Chris started programming games in middle school, a hobby that developed into a deep passion for educational software. In 2013 he accepted a Thiel Fellowship and moved to San Francisco, where he watched Hack Club grow from an early stage. He worked on Hack Club’s learning resources & clubs program for two years."
                pronouns="he/him"
              />
              <Bio
                img="/team/dina.jpg"
                name="Dina Elhanan"
                teamRole="2020 Summer Intern"
                text="Dina started a club in Canada in 2018. Since then she’s run a local hackathon, organized club events & trips, and spoke at Hack Club’s Flagship 2019 Summit. After graduating high school, Dina joined HQ as a ✨Vibes Influencer✨ summer intern. She now studies Electrical Engineering at McMaster University, class of 2024."
                pronouns="she/her"
              />
              <Bio
                img="/team/theo.jpg"
                name="Theo Bleier"
                teamRole="Special Projects"
                text="Theo, a high schooler, joined the Hack Club community in Summer 2018 after reading about Bank online. Since then, he’s run multiple events on Bank & worked on coding it. In 2020, Theo worked on AMAs & distributing laptop grants to students."
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
                teamRole="Hack Club Bank"
                text="Linus spends most of his free time working on side projects ranging from an audio travel diary to creative coding tools to his own programming language. He brought his experience in product & community from Cal Hacks & Dorm Room Fund to grow Hack Club Bank."
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
                teamRole="Hack Club Bank"
                text="After graduating high school, Michael moved to California where he began working with Hack Club. He handled the day-to-day operations of Hack Club Bank from its start starting to its first million dollars in transactions."
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
