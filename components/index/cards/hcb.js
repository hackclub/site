import CardModel from './card-model'
import { Box, Grid, Heading, Text } from 'theme-ui'
import { Fade } from 'react-reveal'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Bank({ data }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        color="dark"
        sx={{
          minHeight: ['300px', '350px', '350px'],
          backgroundColor: '#fdf6ee',
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url('/home/hcb-pattern.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#513f31',
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
            background: '#e4d6c3',
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
            color: '#c0392b',
            fontSize: ['32px', '36px', '42px'],
            mb: 3,
            mt: [0, 1],
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            textShadow: '1px 1px 0 rgba(255,255,255,0.6)'
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
                color: '#513f31',
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
                color: '#513f31',
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
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                transform: 'rotate(-1deg)',
                bg: '#c0392b',
                '&:hover': {
                  transform: 'rotate(0deg) translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
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
                    display: 'block'
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
                boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                border: '4px solid #e4d6c3',
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
                  minHeight: '200px'
                }}
              />
            </Box>
          </Box>
        </Grid>
      </CardModel>
    </Box>
  )
}
