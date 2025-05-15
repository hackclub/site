import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Neighborhood() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: '#017C74',
        backgroundSize: 'cover',
        borderRadius: '24px',
        border: '3px solid #A4D4A2',
        boxShadow: '0 8px 0 #786951',
        transform: 'translateY(-4px)',
        transition: '0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(0)',
          boxShadow: '0 4px 0 #786951',
        },
        overflow: 'hidden' // Ensure video doesn't overflow
      }}
      highlight="#A4D4A2"
    >
      {/* Background video without overlay */}
      <Box
        as="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          ml: -4,
          mt: -4,
          zIndex: 0,
          borderRadius: '20px'
        }}
      >
        <source src="/home/neighborhood-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Box>
      
      {/* Logo image */}
      <Image 
        src="/home/neighborhood-logo.png" 
        alt="Neighborhood"
        sx={{ 
          width: ['200px', '250px', '300px'],
          position: 'relative', 
          zIndex: 2,
          mt: 2,
          mb: 3,
          filter: 'drop-shadow(2px 2px 0 #786951)',
          // Add stronger text shadow to ensure readability without overlay
          textShadow: '3px 3px 5px rgba(0,0,0,0.8)'
        }}
      />
      
      <Grid columns={[1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Box>
          <Text as="p" variant="subtitle" sx={{ 
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            lineHeight: 1.2,  // Reduced from 1.6 to make less spacing between lines
            fontWeight: 600
          }}>
            Hack Club’s Neighborhood is a summer program for coders aged 18 or younger who build a new open-source project, track 100 hours with Hackatime, and earn a stay in San Francisco with flight, housing, and groceries covered.
          </Text>
          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 4] }}>
            <Buttons
              id="21"
              icon="welcome"
              link="/neighborhood"
              primary="#017C74"
              sx={{
                bg: '#A4D4A2',
                color: '#786951',
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                borderRadius: '24px',
                fontWeight: 'bold',
                border: '2px solid #786951',
                boxShadow: '0 4px 0 #786951',
                transform: 'translateY(-2px)',
                transition: '0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 0 #786951',
                }
              }}
            >
              Learn more
            </Buttons>
            <Buttons
              id="22"
              icon="clock"
              link="https://neighborhood.hackclub.com"
              sx={{
                bg: '#A4D4A2',
                color: '#786951',
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                borderRadius: '24px',
                fontWeight: 'bold',
                border: '2px solid #786951',
                boxShadow: '0 4px 0 #786951',
                transform: 'translateY(-2px)',
                transition: '0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 0 #786951',
                }
              }}
            >
              Apply now
            </Buttons>
          </Flex>
        </Box>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            display: ['none', 'flex', 'flex']
          }}
        >
          <Box
            sx={{
              bg: 'rgba(255,255,255,0.9)',
              p: 3,
              borderRadius: '16px',
              color: '#786951',
              textAlign: 'center',
              maxWidth: '300px',  // Increased from 250px to 300px
              width: '100%',      // Added to ensure it takes full available width
              border: '3px solid #A4D4A2',
              boxShadow: '0 4px 0 #786951'
            }}
          >
            <Text as="h4" sx={{ mb: 2, fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
              The program includes:
            </Text>
            <Text as="p" sx={{ 
              fontSize: 'small', 
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
              lineHeight: 1.4,
              textAlign: 'left'
            }}>
              • 100 hours of coding = free trip to SF<br />
              • Open to participants 18 and under<br />
              • Flight, housing, food included<br />
              • Connect with teen hackers
            </Text>
          </Box>
        </Flex>
      </Grid>
    </CardModel>
  )
}
