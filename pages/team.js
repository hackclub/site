import { Box, Container, Flex, Grid, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Bio from '../components/bio'
import ForceTheme from '../components/force-theme'

export default function Team() {
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
            backgroundPosition: '75%'
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
                  />
                  <Bio
                    img="/team/christina.jpg"
                    name="Christina Asquith"
                    teamRole="Co-founder and COO"
                    text="With more than a decade of experience in starting and leading organizations, Christina has built global teams and raised millions of dollars. She has 20 years experience as a journalist, including reporting for The New York Times from Iraq. She has an MA in education, and taught as a public school teacher in 2000, which inspired her book “The Emergency Teacher.”"
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
                    <Bio
                      name="Kara Massie"
                      teamRole="Production Lead"
                      text="Before joining Hack Club, Kara was a lead producer at Activision, shipping Crash Bandicoot N. Sane Trilogy and Bungie's Destiny 2 expansions. She’s deeply committed to inclusivity in gaming and tech spaces, and is beyond thrilled to be part of an org with kindness at its core. She has lived in 3 countries and names her pets after vegetables."
                      img="/team/kara.png"
                      pronouns="she/her"
                    />
                    <Bio
                      name="Leo McElroy"
                      teamRole="Clubs Engineering Lead"
                      text="Leo builds digital systems, physical tools, and communities to help people express themselves and pursue their curiosity. He's created tools for democratizing personal automation (including programming languages for designing stuff), travelled the world visiting makerspaces on a Watson Fellowship, and created and ran a few makerspaces himself."
                      img="/team/leo.png"
                      pronouns="he/him"
                    />
                    <Bio
                      name="Lexi Mattick"
                      teamRole="Clubs Engineering"
                      text="Always driven by curiosity for how things work, Lexi fell in love with Hack Club in 2019 after joining a Hack Night call and discovering like-minded individuals. She spends her time programming, making music, and studying for her private pilot license; at Hack Club, she spends her time working on whatever fantastic project is happening in the present moment."
                      img="https://media.kognise.dev/other-avatars/bean-man.jpg"
                      pronouns="she/her"
                    />
                    <Bio
                      name="Shawn Malluwa-Wadu"
                      img="https://cloud-8u876lgxi-hack-club-bot.vercel.app/0shawn.png"
                      teamRole="Local Cowboy"
                      text="Shawn Malluwa (@Shawn M.) is a Hack clubber from Maryland who joined in 2022 around the launch of Sprig and is now heavily involved in refining hardware designs for various HQ projects! He’s also the face and voice of a bunch of our social media videos, and works to share the process of making with the world. In his free time, Shawn loves to create Art across various mediums, particularly comics and animation."
                      pronouns="he/him"
                    />
                    <Bio
                      name="Faisal Sayed"
                      teamRole="Engineering"
                      img="https://ca.slack-edge.com/T0266FRGM-U014ND5P1N2-78db6630a13d-512"
                      text="Faisal Sayed (@fayd) has been associated with Hack Club for 3 years and loves building open-source projects that bring joy. During the first workshop-bounty-program back in 2020, Faisal was heavily involved in creating & reviewing numerous programming workshops. At HQ, He works with Graham on HQ Engineering and infrastructure. Outside of Hack Club, Faisal likes working on his side-projects like Firefiles and tmdr."
                      pronouns="he/him"
                    />
                    <Bio
                      name="Deven Jadhav"
                      teamRole="Events"
                      text="Deven is a Hack Clubber from India who enjoys building meaningful things at the intersections of art and technology. He also loves music and plays the guitar & drums! Along with this, he also likes talking to strangers over the internet and having interesting & deep conversations. He is also a sucker for nature photography and enjoys hikes and treks into the wild!"
                      img="https://github.com/devenjadhav.png"
                      pronouns="he/him"
                    />
                    <Bio
                      name="Hugo Hu"
                      teamRole="Mail Coordinator & Engineering"
                      text="Hugo is a Hack Clubber from NYC who joined during the summer of 2020 for Summer of Making, and he then went on the Hacker Zephyr in 2021. He's a lover of all things mail and logistics related, and does hardware engineering and procurement work for projects like Sprig and Blot. In his free time, he's building up his courage to pet random dogs, listening to outdated music, and designing fun projects with hardware."
                      img="https://ca.slack-edge.com/T0266FRGM-U017EPB6LE9-84f26d2a184c-512"
                      pronouns="he/him"
                    />
                    <Bio
                      name="Graham Darcey"
                      teamRole="Creative Technologist"
                      text="Originally from Vermont, Graham has worked as a full-stack software engineer in Silicon Valley for over 20 years, most recently at Uber where he worked on their core routing services and map data platform.  He recently moved back east, and currently resides in Shelburne VT.  Graham's hobbies include gaming, gamedev, cooking with his wife, and playing joyfully with his three year old daughter."
                      img="/team/graham.jpg"
                      pronouns="he/him"
                    />
                    <Bio
                      img="/team/chris.jpg"
                      name="Chris Walker"
                      teamRole="Hacker Resources"
                      text="Chris started programming games in middle school, a hobby that developed into a deep passion for educational software. In 2013 he accepted a Thiel Fellowship and moved to San Francisco, where he watched Hack Club grow from an early stage. He worked on Hack Club’s learning resources & clubs program for two years."
                      pronouns="he/him"
                    />
                    <Bio
                      name="Woody Keppel"
                      teamRole="Event Alchemist"
                      text={`Woody is a film actor, musician, comedian, band leader, event producer, and convener of fun. He founded Vermont’s Festival of Fools, The Feast of Fools, The Hawaiian Vaudeville Festival, and the artist retreat & concert venue known as Mt. Foolery. For Woody, “putting on events has always been one of my great pleasures. I’ve also had the privilege of sharing my time with the elderly as well as mentoring middle & high schools students in Vermont. Being part of the Hack Club community has opened my eyes & heart to so much that is possible. It’s a great adventure we’re all on, and we’re here to light the way for each other. Shine on!”`}
                      img="/team/woody.jpg"
                      pronouns="he/him"
                    />
                    <Bio
                      img="/team/josias.jpg"
                      name="Josias Aurel"
                      teamRole="Engineering"
                      text="Josias Aurel (@Josias Aurel) has been associated with Hack Club for about 3 years, working on a variety of projects including Sinerider. He has organized events such as the TiC Summit and TiC Hackathon in his local town of Yaoundé, Cameroon. He is a curiosity-driven coder who likes to take on interesting challenges and who is interested in machine learning and systems programming. He'll be working very closely with Graham over the next year on a variety of projects. Outside of tech he likes going on hikes with friends and eating vegetables."
                      pronouns="he/him"
                    />
                    <Bio
                      img="https://cloud-p623dki6o-hack-club-bot.vercel.app/0img_2668.jpg"
                      name="Nila Palmo Ram"
                      teamRole="Engineering Assistant"
                      text="Nila absolutely loves coding and is all about making tech awesome while experimenting on how to keep it ethical and humanistic. Over at Hack Club, she's on a mission to empower more girl Hack Clubbers by guiding them in organizing Hackathons, collaborating on special projects, and fostering connections amongst them. Alongside Christina, she's also busy drumming up funds for Hack Club, always on the lookout for new donors. When she's not in front of the screen, you'll find her out by the water, diving into all sorts of aquatic adventures."
                      pronouns="she/her"
                    />
                     <Bio
                      img="https://cloud-diex6x51t-hack-club-bot.vercel.app/01671553183325__1_.jpeg"
                      name="Arpan Pandey"
                      teamRole="Clubs Operations And Engineering"
                      text="Arpan Pandey (@A) is a Hack Clubber from India who joined Hack Club about 1.5 years ago. He is a passionate programmer and loves to build things, especially for clubs. He has created and maintained Jams API, Clubs Directory and many other projects for clubs. He also onboards and supports clubs through their Hack Club Journey. He is also the person to send out mails to Hack Clubbers in India. He loves Harry Potter and is a proud Gryffindor. You'll also find him playing around with electronics and hardware, and he is also a licensed HAM (KC1TPD). He is very much interested in having deep conversations with people and loves to make new friends. Here is his favorite quote: “It does not do to dwell on dreams and forget to live.”"
                      pronouns="he/him"
                    />
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
                  <Grid
                    columns={[1, null, 2]}
                    gap={2}
                    sx={{ height: 'fit-content' }}
                  >
                    <Bio
                      img="/team/max.jpg"
                      name="Max Wofford"
                      teamRole="Tech & Creative Lead"
                      text="After teaching himself to code in junior year of high school, Max joined a group of nomadic hackers in Costa Rica to experience coding in a real-world setting. He has been with Hack Club since day one and is now working full-time in Vermont to grow the movement."
                      pronouns="he/him"
                    />
                    <Bio
                      name="Melanie Smith"
                      teamRole="Director of Operations"
                      text="Melanie grew up in northern New England where she obtained a degree in Marine Biology. She then spent several years running a pet store with 20+ employees. In Feb 2021, she joined the HCB team as the Operations Lead. Now as Director of Operations, she is responsible for leading the team in vision and growth."
                      img="/team/mel.png"
                      pronouns="she/her"
                    />
                    <Bio
                      name="Caleb Denio"
                      teamRole="Engineering"
                      text="Caleb enjoys the simple things in life: making music, drinking lattes, and programming. At HCB, he engineers features."
                      img="/team/caleb.jpg"
                      pronouns="he/him"
                    />
                    <Bio
                      name="Liv Cook"
                      teamRole="Jr Project Manager"
                      text="Supporting hackathon organizers and makers worldwide is Liv’s favorite part about being at Hack Club. Being a part of the HCB team for over two years now, Liv also strives to make sure everyone has the best experience possible on the platform and that team projects are on track. She graduated from the University of Vermont with a degree in Healthcare Systems and Policy and enjoys traveling, writing, and jokes. #LivLaughLove Her current favorite song is:"
                      img="/team/liv.png"
                      pronouns="she/her"
                      video="https://www.youtube-nocookie.com/embed/MtN1YnoL46Q?si=FJcJN7kMptzBaGn4"
                    />
                    <Bio
                      name="Gary Tou"
                      teamRole="Engineering"
                      text="Gary is a software engineer from Seattle and loves photography! After using HCB to launch a nonprofit organization, Gary joined Hack Club to make the product that enabled him to do great things even greater for others."
                      img="https://assets.garytou.com/profile/GaryTou.jpg"
                      pronouns="he/him"
                    />
                    <Bio
                      name="Daisy Reyes"
                      teamRole="Operations Associate"
                      text="Daisy has a passion for growing and maintaining positive relationships with all of the members of Hack Club and that’s her favorite part about being on the HCB team. Daisy especially loves onboarding and helping FIRST teams navigate HCB so that they can excel in their own goals. She grew up in Vermont on a dairy farm and graduated from The University of Vermont with her bachelors in Animal Science. She loves animals of all types, crocheting, board games, and traveling."
                      img="https://ca.slack-edge.com/T0266FRGM-U046V3EK56W-b9777e33eece-512"
                      pronouns="she/her"
                    />
                    <Bio
                      name="Ben Dixon"
                      teamRole="Engineering"
                      text="Coming all the way from drizzly England, Ben reconnected with his adoration for teaching people about programming through the computer graphics demoscene during lockdown; firmly believing “HLSL is basically pseudocode”. At Hack Club, Ben designs and implements snazzy new features at HCB, along with raiding their granola bars."
                      img="https://ca.slack-edge.com/T0266FRGM-U03DFNYGPCN-d76abb1ba329-512"
                      pronouns="he/him"
                      video="https://www.youtube-nocookie.com/embed/POv-3yIPSWc?si=25WKed0HkazCZZOz"
                    />
                    <Bio
                      name="Hunter Goodenough"
                      teamRole="Operations Associate"
                      text="Hunter is a jack of all trades with a particular passion for creating and supporting communities. He is an ardent hobbyist and is always trying out new things. He is a newer hire at HCB (Having previously worked in both the Restaurant and Medical Technology industries) and is excited to join the community and is looking forward to participating in various Hack Club projects and events."
                      img="https://ca.slack-edge.com/T0266FRGM-U05RDPEKGA3-647435768a53-512"
                      pronouns="he/him"
                    />
                    <Bio
                      name="Bence Beres"
                      teamRole="Bookkeeper"
                      text="Bence is a true bureaucrat who doesn’t leave any documents unturned. Having made a sharp U-turn after college to switch from his burgeoning career in the world of political science towards the thrilling and life altering adventures of the world of Accounting, Bence understands that knowing Excel is a greatly underappreciated life skill."
                      img="/team/bence.png"
                      pronouns="he/him"
                    />
                    <Bio
                      name="Kris Hoadley"
                      teamRole="Bookkeeper"
                      text="Kris is a native Vermonter and accounting nerd with the need to make all of life balance. Numbers? Give her numbers anytime."
                      img="/team/kris.png"
                      pronouns="she/her"
                    />
					<Bio
						name="Paul Spitler"
						teamRole="Partnerships Lead"
						text="Before joining Hack Club Paul (a native Shelburnite) was working in the e-commerce space in NYC but has moved back to his homeland a few years ago. His role at Hack Club will be building out new partnerships and although he has no idea how to code, he’s hoping to learn over his career. Paul enjoys playing hockey, being outdoors with his wife and dog and any kind of boards sports."
				  		img="/team/paul.png"
						pronouns="he/him"
					/>
					<Bio
                      name="Arianna Martinelli"
                      teamRole="Operations"
                      text="Arianna (a current freshman at Carnegie-Mellon University and a former Hack Club leader from Kentucky) loves onboarding all our cool organizations and making HCB more accessible. When she’s not learning about how humans and computers can work together, she’s making memes and decorating the world with Hack Club stickers."
                      img="https://cloud-oubklmp6c-hack-club-bot.vercel.app/0arianna_profile_photo.png"
                      pronouns="she/her"
                    />
                    <Bio
                      name="Shubham Panth"
                      teamRole="Operations"
                      text="Shubham, a self-taught coder from the tranquil terrains of Sweden, has been weaving through C# and Unity3D since 2017. After utilizing HCB to catapult his own developer dreams, he pivoted to help others, ensuring that every young dreamer’s journey through HCB is as seamless and spirited as his own coding adventures."
                      img="https://ca.slack-edge.com/T0266FRGM-U014E8132DB-8b1a8e7a1a41-512"
                      pronouns="he/him"
                    />
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
                <Bio
                  name="Toby Brown"
                  teamRole="Moderation & Events"
                  img="https://ca.slack-edge.com/T0266FRGM-U02C9DQ7ZL2-a57a3718241a-512"
                  pronouns="he/him"
                />
                <Bio
                  name="Mutammim"
                  teamRole="Moderation & Events"
                  img="https://ca.slack-edge.com/T0266FRGM-U021VLF7880-2bf2660768cc-512"
                  pronouns="he/him"
                />
                <Bio
                  name="Faisal Sayed"
                  teamRole="Moderation & Events"
                  img="https://github.com/faisalsayed10.png"
                  pronouns="he/him"
                />
                <Bio
                  name="Sahiti Dasari"
                  teamRole="Moderation & Events"
                  img="https://cloud-rb1s4ys4w-hack-club-bot.vercel.app/0pfp.jpg"
                  pronouns="she/her"
                />
                <Bio
                  name="Gaurav Pandey"
                  teamRole="Moderation & Events"
                  img="https://ca.slack-edge.com/T0266FRGM-U043Q05KFAA-95e93fd7beff-512"
                  pronouns="he/him"
                />
                <Bio
                  name="Arav Narula"
                  teamRole="Moderation & Events"
                  img="https://ca.slack-edge.com/T0266FRGM-U01MPHKFZ7S-7b67dc7c40fb-512"
                  pronouns="he/him"
                />
                <Bio
                  name="Arpan Pandey"
                  teamRole="Moderation & Events"
                  img="https://ca.slack-edge.com/T0266FRGM-U0409FSKU82-e912a98d0ead-512"
                  pronouns="he/him"
                />
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