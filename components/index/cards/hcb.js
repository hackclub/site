import CardModel from './card-model'
import { Box, Grid, Heading, Text, useColorMode } from 'theme-ui'
import { Fade } from 'react-reveal'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Bank({ data }) {
  const [colorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        color="dark"
        sx={{
          minHeight: ['300px', '350px', '350px'],
          backgroundColor: isDark ? '#222' : '#fdf6ee',
          backgroundImage: isDark 
            ? `linear-gradient(to bottom, rgba(34, 34, 34, 0.95), rgba(34, 34, 34, 0.9)), url('/home/hcb-pattern.webp')`
            : `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url('/home/hcb-pattern.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: isDark ? '#ddd' : '#513f31',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: isDark ? '#444' : '#e4d6c3',
            zIndex: 5
          },
          py: [3, 3, 4]
        }}
        badge
        text={data[0] === 'error' ? 'The coolest money thing' : data[0]}
      >
        <Heading
          variant="title"
          sx={{
            color: isDark ? '#ff686b' : '#c0392b',
            fontSize: ['32px', '36px', '42px'],
            mb: 3,
            mt: [0, 1],
            fontFamily: '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
            textShadow: isDark 
              ? '1px 1px 0 rgba(0,0,0,0.6)' 
              : '1px 1px 0 rgba(255,255,255,0.6)'
          }}
        >
          Hack Club Bank
        </Heading>
        <Grid columns={[1, '1.3fr 1fr', '3fr 2fr']} gap={4}>
          <Box>
            <Text
              as="p"
              variant="subtitle"
              sx={{
                fontSize: ['16px', '18px', '20px'],
                mb: 3,
                color: isDark ? '#ccc' : '#513f31',
                lineHeight: 1.5
              }}
            >
              Become a 501(c)3 nonprofit and join 700+ teams using Hack Club Bank
              to run world-class events.
            </Text>
            <Text
              as="p"
              variant="subtitle"
              sx={{
                fontSize: ['16px', '18px', '20px'],
                color: isDark ? '#ccc' : '#513f31',
                lineHeight: 1.5
              }}
            >
              This platform is built and maintained by the Hack&nbsp;Club team.
            </Text>
            <Buttons
              id="27"
              icon="bank-account"
              link="/hcb"
              primary="red"
              sx={{
                mt: [3, 3, 4],
                borderRadius: '12px',
                boxShadow: isDark 
                  ? '0 4px 8px rgba(0,0,0,0.3)' 
                  : '0 4px 8px rgba(0,0,0,0.15)',
                transform: 'rotate(-1deg)',
                bg: isDark ? '#d64541' : '#c0392b',
                '&:hover': {
                  transform: 'rotate(0deg) translateY(-5px)',
                  boxShadow: isDark 
                    ? '0 8px 16px rgba(0,0,0,0.4)' 
                    : '0 8px 16px rgba(0,0,0,0.2)'
                }
              }}
            >
              Start fundraising!
            </Buttons>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                display: [null, 'none', 'none'],
                mb: '-50px',
                mt: 3
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '250px',
                  position: 'relative',
                  display: 'block',
                  textAlign: 'center',
                  '&:before': {
                    content: '""',
                    backgroundImage: 'url(/home/hcb-mobile.webp)',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    marginX: 'auto',
                    display: 'block',
                    filter: isDark ? 'brightness(0.85) contrast(1.1)' : 'none'
                  }
                }}
              />
            </Box>
          </Box>

          <Box sx={{
            display: ['none', 'block', 'block'],
            position: 'relative',
            height: '100%',
          }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: isDark 
                  ? '0 8px 16px rgba(0,0,0,0.25)' 
                  : '0 8px 16px rgba(0,0,0,0.12)',
                border: isDark ? '4px solid #444' : '4px solid #e4d6c3',
                transform: 'rotate(2deg)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'rotate(0deg)'
                }
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'url(/home/hcb.webp)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  minHeight: '200px',
                  filter: isDark ? 'brightness(0.85) contrast(1.1)' : 'none'
                }}
              />
            </Box>
          </Box>
        </Grid>
      </CardModel>
    </Box>
  )
}
