/** @jsxImportSource theme-ui */
import { Box, Text, Image, Grid, Flex } from 'theme-ui'
import CardModel from './card-model'

export default function Jackpot() {
  return (
    <CardModel
      color="white"
      sx={{
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: ['280px', '320px', '358.2px'],
        backgroundColor: '#5F1212',
        backgroundImage:
          'url("https://cdn.hackclub.com/019d0244-1c96-79a6-925f-254d6da371c3/banner_1.png")',
        backgroundSize: 'cover',
        backgroundPosition: '40% center'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={false}
    >
      <Grid
        columns={[1, 1, '1.5fr 1fr']}
        sx={{
          position: 'relative',
          alignItems: 'center',
          zIndex: 2,
          paddingInline: '20px'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'
          }}
        >
          <Image
            src="https://cdn.hackclub.com/019d01dc-d676-746d-9fd9-794df0b50399/logo_draft.png"
            alt="Jackpot"
            sx={{
              maxWidth: ['235px', '255px', '275px'],
              height: ['76px', '86px', '96px'],
              marginTop: '0px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
          <Text
            variant="subtitle"
            as="p"
            sx={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              color: 'white',
              fontSize: ['19px', '21px', '23px'],
              fontWeight: 600,
              lineHeight: 1.5,
              mb: 2,
              maxWidth: '400px',
              display: 'block',
              textAlign: 'left'
            }}
          >
            Spend time coding and enjoy prizes that YOU choose!
          </Text>
          <Box
            as="a"
            href="https://jackpot.hackclub.com/?utm_source=site_card"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-block',
              width: 'fit-content'
            }}
          >
            <Image
              src="https://cdn.hackclub.com/019d0234-3adc-7ef6-9b62-7a6a96fc42da/join_button.png"
              alt="Join Now"
              sx={{
                height: ['80px', '96px', '112px'],
                width: 'auto',
                '&:hover': {
                  opacity: 0.9
                }
              }}
            />
          </Box>
        </Box>
        <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              height: '200px',
              width: '100%',
              display: ['none', 'none', 'block', 'block'],
              '@keyframes breathe': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.01) rotate(3deg)' },
                '100%': { transform: 'scale(1)' }
              }
            }}
          >
            <Image
              alt="Alice"
              src="https://cdn.hackclub.com/019c7b7a-1faf-7420-9657-6e7e4323258d/alice_face.png"
              sx={{
                position: 'absolute',
                top: ['-1px', '-2px', '-3px'],
                left: '90%',
                marginLeft: ['-45px', '-48px', '-51px'],
                width: ['110px', '118px', '126px'],
                rotate: '-10deg',
                animation: 'breathe infinite 3.5s ease',
                '@media (prefers-reduced-motion)': {
                  animation: 'none'
                }
              }}
            />
            <Image
              alt="Heidi"
              src="https://cdn.hackclub.com/019d0234-383a-7aad-be70-ae8b12ef26d3/heidi_card_brand.png"
              sx={{
                position: 'absolute',
                bottom: ['-1px', '-2px', '-3px'],
                left: '50%',
                marginLeft: ['-39px', '-42px', '-45px'],
                width: ['78px', '84px', '90px'],
                animation: 'breathe infinite 4s 1s ease-in-out',
                '@media (prefers-reduced-motion)': {
                  animation: 'none'
                },
                rotate: '2deg'
              }}
            />
          </Box>
        </Flex>
      </Grid>
    </CardModel>
  )
}
