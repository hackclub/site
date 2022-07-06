import { Box, Container, Text, Grid } from 'theme-ui'
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
                text="With more than a decade of experience in nonprofit management, Christina has built global teams and raised millions of dollars.  Before joining Hack Club, she founded & served as editor-in-chief of Fuller Project, an award-winning journalism nonprofit, which had the TIME Magazine cover story in 2019. She also led the partnership with Kenyan women journalists to build the first all-female news desk for Africa’s largest newspaper. She has 20 years experience as a journalist, including reporting for The New York Times from Iraq.  She has an MA in education, and taught as a public school teacher in 2000, which inspired her book “The Emergency Teacher.”"
                pronouns="she/her"
              />
              <Bio
                img="/team/max.jpg"
                name="Max Wofford"
                teamRole="Tech & Creative Lead"
                text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in Vermont to grow the movement."
                pronouns="he/him"
              />
              <Bio
                name="Kara Massie"
                teamRole="Clubs & Community Production Lead"
                text="With more than a decade of experience in nonprofit management, Christina has built global teams and raised millions of dollars.  Before joining Hack Club, she founded & served as editor-in-chief of Fuller Project, an award-winning journalism nonprofit, which had the TIME Magazine cover story in 2019. She has 20 years experience as a journalist, including reporting for The New York Times from Iraq.  She has an MA in education, and taught as a public school teacher in 2000."
                img="/team/kara.png"
                pronouns="she/her"
              />
              <Bio
                name="Leo McElroy"
                teamRole="Clubs Lead"
                text="Leo builds digital systems, physical tools, and communities to help people express themselves and pursue their curiosity. He's created tools for democratizing personal automation (including programming languages for designing stuff), travelled the world visiting makerspaces on a Watson Fellowship, and created and ran a few makerspaces himself."
                img="/team/leo.png"
                pronouns="he/him"
              />
              <Bio
                name="Cedric Hutchings"
                teamRole="Clubs Constructionist"
                text="Already more at home on the internet than anywhere in meat space, you can imagine a young Ced's horror when his parents moved him into a holler so deep in the Appalachian Mountains that his beloved internet was only accessible through sluggish satellite. Stubbornly refusing to be separated from his online games, he threw together his own for his brothers, a captive audience. Now he's at Hack Club making materials that share his enthusiasm for making fun somethings from nothing but technology."
                img="/team/ced.png"
                pronouns="he/him"
              />
              <Bio
                name="Jessica Card"
                teamRole="Education Engineer"
                text="Jessica is a self taught programmer originally from Alaska. She worked for over a decade as a software engineer at startups like GitHub and Bugsnag in San Francisco. She then left the web development world to learn how to make video games. Now, at Hack Club, she’s excited to be a part of a community she wishes she had when she was in high school."
                img="/team/jessica.jpg"
                pronouns="she/her"
              />
              <Bio
                name="Celeste Drummond"
                teamRole="Community Engineer"
                text="After existing in and building various online communities (including a large Twitter presence and an active Discord server), Celeste joined Hack Club to make the Slack an even better space for teens who code. They are interested in— among other things— programming, generative art, music and effective altruism."
                img="/team/celeste.jpg"
                pronouns="they/them"
              />
              <Bio
                name="Melanie Smith"
                teamRole="Bank Operations Lead"
                text="Melanie grew up in northern New England where she obtained a degree in Marine Biology. She then spent several years running a pet store with 20+ employees and recently decided to change career paths. This led her to Hack Club where she is excited about helping students pursue their dreams."
                img="/team/mel.png"
                pronouns="she/her"
              />
              <Bio
                name="Liv Cook"
                teamRole="Bank Operations"
                text="Liv recently graduated from the University of Vermont, where she studied health policy and gained experience as a writing fellow and business assistant. Originally from New York City, she is always eager to be one in a fast-paced community of diverse thinking and grand ideas. Supporting projects and makers with incredible goals is her favorite part about being at Hack Club."
                img="/team/liv.png"
                pronouns="she/her"
              />
              <Bio
                name="Rick Blount"
                teamRole="VP of Philanthropy"
                text="Rick Blount was previously helped raise $19.5 million for a brand-new YMCA in Burlington, Vermont. Before that, he worked at the University of Vermont’s medical school in communications and alumni/fundraising; and has been a journalist–helping start Consumer Reports’ health publication. When he was 25, he taught English for a year near Wuhan, China."
                img="/team/rick.png"
                pronouns="he/him"
              />
              <Bio
                name="Thea Baren"
                teamRole="Executive Assistant to the COO"
                text="Thea will now serve as Christina’s executive assistant."
                img="/team/thea.png"
                pronouns="she/her"
              />
              <Bio
                name="Bence"
                teamRole="Bookkeeper"
                text="Bence is responsible for keeping accurate financial books for HQ and every org on Hack Club Bank (40,000+ transactions in the last year!)."
                img="/team/bence.png"
                pronouns="he/him"
              />
               <Bio
                name="Chris Walker"
                teamRole="Engineer"
                text="Chris Walker is joining us part-time from San Francisco to ship Sinerider (https://github.com/hackclub/sinerider) and bring mayhem and magic to #gamedev and beyond."
                img="/team/chris.png"
                pronouns="he/him"
              />
            </Grid>
            <br />
            <Text variant="title" color="orange" sx={{ lineHeight: '1.75em' }}>
              Asia-Pacific HQ
            </Text>
            <Grid columns={[1, null, 2]} gap={4}>
              <Bio
                img="/team/athul.jpg"
                name="Athul Blesson"
                teamRole="APAC Director"
                text="Athul started dozens of the largest Hack Clubs in India. After graduating from high school, he joined as the Regional Manager of Asia-Pacific & Africa, where he actively manages 117 clubs."
                pronouns="he/him"
              />
              <Bio
                name="Harsh Bajpai"
                teamRole="Clubs Lead"
                text="Harsh is a gentle force in both his local and the Slack community. He is a vegetarian musician who enjoys traveling around India. When he is not reading ancient mythology, he is programming with purpose and passion."
                img="/team/harsh.png"
                pronouns="he/him"
              />
              <Bio
                name="Annlee Fores"
                teamRole="Operations"
                text="As the COO of Hack Club APAC, he oversees operations and handles event organisation & logistics at Hack Club APAC.
When not seen busy juggling between different tasks he takes up, he enjoys tinkering & building fun projects."
                img="/team/annlee.jpg"
                pronouns="he/him"
              />
              <Bio
                name="Anna Grace Benny"
                teamRole="Clubs Lead"
                text="Anna is a visual communication graduate and a social media enthusiast. She loves films and everything related. Managing and meeting new Hack Clubbers is her jam. She helps with onboarding new Hack Clubbers in the APAC region and manages the social media pages."
                img="/team/anna.png"
                pronouns="she/her"
              />
              <Bio
                name="Shubhangi Gupta"
                teamRole="Community"
                text="Shubhangi is the founder of Raahee, a mental health startup aiming to provide affordable therapy. She is a Gold Microsoft Learn Student Ambassador and the runner-up of Microsoft Imagine Cup, Healthcare Category. She loves to interact with people & dogs and talk about everything Harry Potter."
                img="/team/shubhangi.jpeg"
                pronouns="she/her"
              />
            </Grid>
            <br />
            <Text variant="title" color="orange" sx={{ lineHeight: '1.75em' }}>
              Student Team
            </Text>
            <Grid columns={[1, null, 2]} gap={4}>
              <Bio
                name="Claire Wang"
                teamRole="Community Team"
                text="Claire works on the Community Team and was a previous summer intern. She hopes to make the community both more welcoming and more technical, as well as inspire beginners to love STEM and making. She first joined Hack Club in 8th grade because of an online competition, and has been running a Hack Club ever since then. In addition to CS, she loves neuroscience, sci-fi, debate, and creating Spotify playlists."
                img="/team/claire.png"
                pronouns="she/her"
              />
              <Bio
                name="Caleb Denio"
                teamRole="Community Team"
                text="Caleb is a New Hampshire-born high-schooler with a passion for coding, music, and homemade food. He enjoys building wacky, creative projects, configuring linters, and hanging out in the Hack Club community. As part of Community Team, he hopes to further Hack Club's goal of creating the most wholesome spot on the Internet."
                img="/team/caleb.jpg"
                pronouns="he/him"
              />
              {/* <Bio
                name="Rishi Kothari"
                teamRole="Community Team"
                text={`yeah`}
                img="/stickers/logo.png"
                pronouns="he/him"
              /> */}
              <Bio
                name="Abby Fischler"
                teamRole="Intern to the COO"
                text="Abby is a high school junior from Los Angeles passionate about STEM! Abby is a former Kode With Klossy scholar and a 2021 Los Angeles Affiliate Honorable Mention for the NCWIT Award for Aspirations in Computing (AiC). In addition, she is an ambassador for Bit by Bit and Generation She. In the future, Abby’s intention is to attend a top university where she can study computer science and pursue her passion in coding."
                img="https://github.com/abbyfischler.png"
                pronouns="she/her"
              />
              <Bio
                name="Belle See"
                teamRole="Coordinator to the COO"
                text="Belle enjoys building for her community, whether that be through developing websites or planning programs and events. She is excited to make Hack Club a better place for students around the world and looks forward to learning from the team at Hack Club!"
                img="https://github.com/bellesea.png"
                pronouns="she/her"
              />
              <Bio
                name="Gary Tou"
                teamRole="Bank Engineering"
                text="Gary is a software engineer from Seattle and loves photography! After using Hack Club Bank to launch a nonprofit organization, Gary joined Hack Club to make the product that enabled him to do great things even greater for others."
                img="https://assets.garytou.com/profile/GaryTou.jpg"
                pronouns="he/him"
              />
              <Bio
                name="Kunal Botla"
                teamRole="Bank Operations"
                text={`Kunal loves to make for making! He started Project Boom to help provide computers, helps build and run Hack Club Bank, and is organizing MAHacks for a post-pandemic world. He takes photos to tell stories of an ever-changing world.`}
                img="https://kunalbotla.com/images/kunal.jpeg"
                pronouns="he/him"
              />
              <Bio
                name="Ella Xu"
                teamRole="Bank Operations"
                text="Ella joined the Hack Club community after learning about Hack Club Bank from a project running on Bank. Since then, she has contributed to Bank itself in addition to other Hack Club open source projects on GitHub."
                img="https://scrapbook.hackclub.com/ella.png"
                pronouns="she/her"
              />
              <Bio
                name="Deven Jadhav"
                teamRole="Bank Operations (APAC)"
                text="Deven is a Hack Clubber from India who enjoys building meaningful things at the intersections of art and technology. He also loves music and plays the guitar & drums! Along with this, he also likes talking to strangers over the internet and having interesting & deep conversations. He is also a sucker for nature photography and enjoys hikes and treks into the wild!"
                img="https://github.com/devenjadhav.png"
                pronouns="he/him"
              />
              <Bio
                name="Kognise"
                teamRole="Special Projects and Hiring"
                text="Always driven by curiosity for how things work, Kognise fell in love with Hack Club in 2019 after joining a Hack Night call and discovering like-minded individuals. They spend their time programming, making music, and studying for their private pilot license; at Hack Club, they support hiring and contribute to various projects."
                img="https://media.kognise.dev/other-avatars/bean-man.jpg"
              />
              <Bio
                name="Sam Poder"
                teamRole="Engineering & Operations"
                text={`Originally from Australia, Sam's family moved to Singapore when he was young. He now runs a Hack Club at his school in Singapore. 
Sam has worked on all sorts of Hack Club projects, focusing on web development and logistics. Outside of Hack Club, Sam enjoys travelling with his family 
and participating in academic competitions with his friends.`}
                img="https://change-my-pfp.vercel.app/api/current/"
                pronouns="he/him"
              />
              <Bio
                name="Hugo Hu"
                teamRole="Mail Team Coordinator"
                text="Hugo is an avid fan of corgis, hardware, and shipping. He works with club leaders to get stickers to clubs and events and community members to assist with logistical challenges. He ships for Hack Club Mail Team and runs Hack Shop, helping to plan, design, produce, and distribute various types of swag for different events."
                img="https://scrapbook.hackclub.com/hugo.y.hu935.png"
                pronouns="he/him"
              />
              <Bio
                name="Ishan Goel"
                teamRole="Summer Communications Intern"
                text="Ishan is a 16-year-old summer intern from Seattle! This summer he is working on shipping projects with partners to get the word out about Hack Club, and bring more people into the community."
                img="https://github.com/quackduck.png"
                pronouns="he/him"
              />
            </Grid>
            <br />
            <Text variant="title" color="orange" sx={{ lineHeight: '1.75em' }}>
              Behind the Scenes
            </Text>
            <Grid columns={[1, null, 2]} gap={4}>
              <Bio
                name="Chris Newton"
                teamRole="Accountant"
                text="After finding her love of accounting at an early age, Chris spent most of her accounting career in construction, but recently branched out to nonprofits. Chris is married (Bryan) with a young daughter (Brylee), and lives in Des Moines, Iowa."
                pronouns="she/her"
                img="/team/cnewton.jpg"
              />
              <Bio
                name="Woody Keppel"
                teamRole="Club Alchemist"
                text={`Woody is a film actor, musician, comedian, band leader, event producer, and convener of fun. He founded Vermont’s Festival of Fools, The Feast of Fools, The Hawaiian Vaudeville Festival, and the artist retreat & concert venue known as Mt. Foolery. For Woody, “putting on events has always been one of my great pleasures. I’ve also had the privilege of sharing my time with the elderly as well as mentoring middle & high schools students in Vermont. Being part of the Hack Club community has opened my eyes & heart to so much that is possible. It’s a great adventure we’re all on, and we’re here to light the way for each other. Shine on!”`}
                img="/team/woody.jpg"
                pronouns="he/him"
              />
            </Grid>
            <br />
            <Text variant="title" color="orange" sx={{ lineHeight: '1.75em' }}>
              Acknowledgements
            </Text>
            <Grid columns={[1, null, 2]} gap={4}>
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
                text="Philippine bred and settled with family in the U.S., Tina shifted her career from marketing and film production to teaching kids in the Clark County School District. At Hack Club, she helped thousands of high school students hack their way to a fabulous future."
                pronouns="she/her"
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
