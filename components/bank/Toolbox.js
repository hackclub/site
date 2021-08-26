import {
  Box,
  Avatar,
  Button,
  Image,
  Text,
  Heading,
  Container,
  Card,
  Grid,
  Link
} from 'theme-ui'
import { Slide } from 'react-reveal'
import Icon from '@hackclub/icons'

export default function Toolbox() {
  return (
    <Box sx={{ pt: 4}}>
      <Container>
        <Text variant="heading" sx={{ fontSize: 50 }}>
          The Founder's Toolbox.
        </Text>
        <br />
        <Text sx={{ color: 'muted', maxWidth: '48', fontSize: 28 }}>
          Unlock access to a suite of free perks to help you run the
          organization of your dreams.
        </Text>
      </Container>
      <Grid columns={1} sx={{ mx: [3, null, 7]}}>
      <Item
            icon="slack-fill"
            color="#5d114c"
            name="Chats with 100s of club leaders"
            desc={
              <>
                In our{' '}
                <Link href="/slack" passHref>
                  <a>Slack community</a>
                </Link>
                , you’ll join a private space for founders to ask
                questions, chat, share advice, and events.
              </>
            }
          />
      </Grid>

    </Box>
  )
}

function Item({ icon, color, name, desc, children, sx, ...props }) {
  return (
    <Box
    sx={{
      display: 'grid',
      gridGap: [0, 4],
      gridTemplateColumns: [null, 'auto 1fr'],
      alignItems: 'start',
      justifyContent: 'start',
      bg: 'darkless',
      p: [3, 4],
      mt: [1, 1],
      borderRadius: 'extra',
      span: { transform: 'none', width: 'min-intrinsic' },
      svg: { color: 'white' },
      ...sx
    }}
  >
    {children || (
      <Box
        as="span"
        sx={{
          width: 'fit-content',
          bg: color,
          borderRadius: 18,
          lineHeight: 0,
          p: 2,
          mb: 1,
          display: 'inline-block',
          transform: ['scale(0.75)', 'none'],
          transformOrigin: 'bottom left',
          boxShadow:
            'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Icon glyph={icon} size={40} />
      </Box>
    )}
    <Box>
      <Heading as="h3" variant="headline" mb={2} mt={0}>
        {name}
      </Heading>
      <Text
        as="p"
        sx={{  fontSize: 19,color: "muted", mt: 0, pb: 2, a: { variant: 'styles.a', color: 'primary' } }}
      >
        {desc}
      </Text>
    </Box>
  </Box> 
  )
}

// const Feature = ({ icon, color, name, desc, children, sx, ...props }) => (
//   <Box
//     sx={{
//       display: 'grid',
//       gridGap: [0, 4],
//       gridTemplateColumns: [null, 'auto 1fr'],
//       alignItems: 'start',
//       justifyContent: 'start',
//       bg: 'rgba(224, 230, 237, 0.25)',
//       p: [3, 4],
//       mt: [1, 1],
//       borderRadius: 'extra',
//       span: { transform: 'none', width: 'min-intrinsic' },
//       svg: { color: 'white' },
//       ...sx
//     }}
//   >
//     {children || (
//       <Box
//         as="span"
//         sx={{
//           width: 'fit-content',
//           bg: color,
//           borderRadius: 18,
//           lineHeight: 0,
//           p: 2,
//           mb: 1,
//           display: 'inline-block',
//           transform: ['scale(0.75)', 'none'],
//           transformOrigin: 'bottom left',
//           boxShadow:
//             'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
//         }}
//       >
//         <Icon glyph={icon} size={48} />
//       </Box>
//     )}
//     <Box>
//       <Heading as="h3" variant="headline" mb={2} mt={0}>
//         {name}
//       </Heading>
//       <Text
//         as="p"
//         variant="subtitle"
//         sx={{ mt: 0, pb: 2, a: { variant: 'styles.a', color: 'blue' } }}
//       >
//         {desc}
//       </Text>
//     </Box>
//   </Box>
// )
