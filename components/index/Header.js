import { Box, Button, Flex, Text } from 'theme-ui'
import Icon from "@hackclub/icons"
import { withCommas } from '../../lib/utils'

const Header = ({ slackData = { total_members_count: 60000 } }) => (
  <Box as="header" sx={{
    bg: 'cyberpunk.darkerBg',
    pt: [7, 8, '180px'],
    pb: [6, 7, '160px'],
    minHeight: ['50vh'],
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `
      linear-gradient(to bottom right, rgba(0, 191, 255, 0.1), rgba(138, 43, 226, 0.1)),
      linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
    `,
    backgroundSize: '100% 100%, 20px 20px, 20px 20px',
    animation: 'gridFloat 20s linear infinite',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 50% 50%, rgba(5, 8, 26, 0), rgba(5, 8, 26, 0.95) 70%)',
      pointerEvents: 'none'
    }
  }}>
    <Box sx={{
      maxWidth: ['90vw', '85vw', '80vw'],
      mx: 'auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 2
    }}>
      <Text as="h1" variant="title" sx={{
        fontSize: ['42px', '56px', '72px'],
        mb: 3,
        background: 'linear-gradient(to right, #00BFFF, #F002ED)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        A Home for High School Makers
      </Text>
      <Text as="p" variant="subtitle" sx={{
        fontSize: ['18px', '22px', '24px'],
        maxWidth: '650px',
        mx: 'auto',
        mb: 4,
        color: 'cyberpunk.textHighlight'
      }}>
        Join a community of {withCommas(slackData.total_members_count)} makers, building open source projects and learning to code together.
      </Text>
      <Flex sx={{
        justifyContent: 'center',
        gap: 3,
        flexWrap: 'wrap'
      }}>
        <Button variant="ctaLg" as="a" href="/slack" sx={{
          bg: '#8A2BE2',
          px: 4,
          py: 3,
          fontSize: [2, 3]
        }}>
          <Text>Join {withCommas(slackData.total_members_count)} Teen Hackers</Text>
          <Icon glyph="slack-fill" size={24} />
        </Button>
        <Button variant="ctaLg" as="a" href="https://shipwrecked.hack.club/3" sx={{
          backgroundImage: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
          px: 4,
          py: 3,
          fontSize: [2, 3]
        }}>
          Sign Up: Private Island Hackathon
        </Button>
      </Flex>
    </Box>
  </Box>
)

export default Header 