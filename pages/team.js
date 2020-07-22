import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Text
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/nav'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Icon from '../components/icon'
import Footer from '../components/footer'

const Avatar = ({ alt, src }) => (
  <Box
    sx={{
      width: '100%',
      minWidth: [96, 128],
      minHeight: [96, 128],
      position: 'relative',
      img: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        clipPath: 'url(#avatar-mask)',
        WebkitClipPath: 'url(#avatar-mask)'
      }
    }}
  >
    <Image
      src={src}
      alt=""
      aria-hidden={true}
      sx={{
        transform: 'scale(1.0625)',
        filter: 'saturate(2.5) blur(10px)',
        opacity: 0.5
      }}
    />
    <Image src={src} alt={alt} />
  </Box>
)

const Bio = ({ img, name, teamRole, pronouns, text, ...props }) => (
  <Grid
    variant="cards.primary"
    columns="auto 1fr"
    sx={{ gridColumnGap: 3, mx: -3 }}
    {...props}
  >
    <Avatar
      alt={name}
      src={
        img ||
        `https://hackclub.com/team/${name.toLowerCase().split(' ')[0]}.jpg`
      }
    />
    <Box sx={{ alignSelf: 'end' }}>
      <Heading
        as="h3"
        variant="headline"
        sx={{ lineHeight: 'title', mb: 0 }}
        children={name}
      />
      <Text
        as="span"
        variant="caption"
        children={[teamRole, pronouns].join(' – ')}
      />
    </Box>
    <Text
      sx={{ fontSize: 1, lineHeight: 'caption', gridColumn: 'span 2' }}
      children={text}
    />
  </Grid>
)

const Grouping = ({ columns = 2, sx = {}, children }) => (
  <Grid columns={[null, columns]} gap={3}>
    {children}
  </Grid>
)

export default () => (
  <>
    <Meta
      as={Head}
      title="Team"
      description="Meet the team behind Hack Club, a nonprofit network of high school hackers around the world."
      image="https://hackclub.com/cards/team.jpg"
    />
    <Nav />
    <Box
      as="header"
      sx={{
        color: 'white',
        bg: 'orange',
        backgroundImage: t => t.util.gx('yellow', 'orange'),
        py: [5, 6],
        position: 'relative'
      }}
    >
      <Container variant="copy">
        <Text as="p" variant="eyebrow" sx={{ color: 'white', opacity: 0.75 }}>
          Hack&nbsp;Club
        </Text>
        <Heading as="h1" variant="titleUltra">
          Meet the Team
        </Heading>
        <Text as="p" variant="subtitle">
          Hailing from 7 states &{' '}
        </Text>
      </Container>
    </Box>
    <svg
      width={0}
      height={0}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath
          id="avatar-mask"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 32C28.8 32 32 28.8 32 16C32 3.2 28.8 0 16 0C3.2 0 0 3.2 0 16C0 28.8 3.2 32 16 32Z"
        />
      </defs>
    </svg>
    <Container sx={{ h2: { mt: [4, 5], mb: 2 } }}>
      <Heading as="h2" variant="title">
        Core staff
      </Heading>
      <Grouping>
        <Bio
          name="Zach Latta"
          teamRole="Founder"
          text="Zach dropped out of high school after his freshman year to work in the technology industry and had over 5 million people using his software by the time he turned 17. He founded Hack Club to build the program he wish he had in high school and has been awarded the Thiel Fellowship and Forbes 30 Under 30 for his work."
          pronouns="he/him"
        />
        <Bio
          name="Max Wofford"
          teamRole="Operations"
          text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in San Francisco to grow the movement."
          pronouns="he/him"
        />
        <Bio
          name="Christina Asquith"
          teamRole="COO"
          text="Christina is founder & former editor-in-chief of Fuller Project, a global journalism nonprofit reporting on issues impacting women. A journalist since college, she’s reported from eight countries for the New York Times, Guardian, TIME, the Washington Post & others. She taught as a public school teacher in 2000, which inspired her book “The Emergency Teacher.”"
          pronouns="she/her"
        />
        <Bio
          name="Lachlan Campbell"
          teamRole="Storytelling"
          text="Lachlan joined as a club leader from State College, PA to make hackclub.com. 3 years later, as Head of Storytelling, they work on Hack Club’s website, design (system), open source, & communications. They previously designed Hack Club Bank. They also study Interactive Media Arts @ NYU, class of 2023."
          pronouns="they/them"
        />
        <Bio
          name="Chris Walker"
          teamRole="Hacker Resources"
          text="Chris started programming games in middle school, a hobby that developed into a deep passion for educational software. In 2013 he accepted a Thiel Fellowship and moved to San Francisco, where he watched Hack Club grow from an early stage. He now works full-time on Hack Club’s learning resources."
          pronouns="he/him"
        />
        <Bio
          name="Matthew Stanciu"
          teamRole="Clubs"
          text="After leading a successful club in West Lafayette, Indiana, & organizing multiple hackathons with Hack Club Bank, Matthew joined the team to work with clubs around the world. He now writes Hack Club’s curriculum & recently drove across North America to visit clubs."
          pronouns="he/him"
        />
        <Bio
          name="Theo Bleier"
          teamRole="Special Projects"
          text="Theo is a sophomore in high school & joined the Hack Club community in Summer 2018 after reading about Bank online. Since then, he's run multiple events on it & is now working on the product as a software engineer."
          pronouns="he/him"
        />
        <Bio
          name="Michael Destefanis"
          teamRole="Hack Club Bank"
          text="After graduating high school, Michael moved to California where he began working with Hack Club. He now leads Hack Club Bank and loves helping passionate people bring their ideas to reality."
          pronouns="he/him"
        />
        <Bio
          name="Dina Elhanan"
          teamRole="2020 Summer Intern"
          text="Dina started a club in Canada in 2018. Since then she’s run a local hackathon, organized club events & trips, and spoke at Hack Club’s Flagship 2019 Summit. After graduating high school, Dina joined HQ as a ✨Vibes Influencer✨ summer intern. She also studies Electrical Engineering at McMaster University, class of 2024."
          pronouns="she/her"
        />
        <Bio
          name="Athul Blesson"
          teamRole="Asia-Pacific Region"
          text="Athul started dozens of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager of Asia-Pacific & Africa, where he actively manages 117 clubs."
          pronouns="he/him"
        />
      </Grouping>
      <Heading as="h2" variant="title">
        Acknowledgements
      </Heading>
      <Grouping>
        <Bio
          img="https://hackclub.com/camp/mingjie.jpg"
          name="Mingjie Jiang"
          teamRole="Community"
          text="Mingjie started working with Hack Club in July 2017, while leading his club in Rockville, Maryland, working on community engagement & public identity. He’s also run Hack Chicago, CodeDay, and countless other hackathons to spread his passion for technology."
          pronouns="he/him"
        />
        <Bio
          name="Linus Lee"
          teamRole="Hack Club Bank"
          text="Linus spends most of his free time working on side projects ranging from an audio travel diary to creative coding tools to his own programming language. He brought his experience in product & community from Cal Hacks & Dorm Room Fund to grow Hack Club Bank."
          pronouns="he/him"
        />
        <Bio
          img="https://hackclub.com/camp/fernanda.jpg"
          name="Fernanda Lozano"
          teamRole="Flagship"
          text="Fernanda is a student of computational neuroscience, entrepreneur, & organizer of events like the Entrepreneurial Learning Academy for students in Mexico. In summer 2019, she helped organize the Flagship Summit in San Francisco."
          pronouns="she/her"
        />
      </Grouping>
    </Container>
    <Footer />
  </>
)
