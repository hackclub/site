/** @jsxImportSource theme-ui */
import { Box, Text, Image } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

export default function Fallout() {
  return (
    <CardModel
      color="black"
      sx={{
        borderRadius: '16px',
        border: '2px solid #61453A',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        backgroundImage: 'url("https://cdn.hackclub.com/019ce02f-ed7b-7b9f-bf91-84503a43c535/bg.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
        <video
            autoPlay
            loop
            muted
            playsInline
            style={{
            width: '300px',
            maxWidth: '30%',
            position: 'absolute',
            bottom: 0,
            right: 10,
            height: 'auto',
            zIndex: 10,
            }}
        >
            <source src="https://cdn.hackclub.com/019ce0b8-d90a-7f80-866c-185a5ccd74d9/soup.webm" type="video/webm" />
        </video>

        <Box
            sx={{
            position: 'relative',
            zIndex: 2,
            paddingInline: '20px',
            maxWidth: ['100%', '100%', '100%', '50%'],
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%'
            }}
        >
            <Image
            src="https://cdn.hackclub.com/019cdfd0-6f09-7c8c-bd01-d0349e421c32/logo2.svg"
            alt="Fallout"
            sx={{
                maxWidth: '400px',
                marginTop: '20px',
                width: '100%'
            }}
            />
            <Text
            variant="subtitle"
            as="p"
            sx={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: 'white',
                fontSize: ['20px', '24px'],
                fontWeight: 600,
                lineHeight: 1.5,
                mb: 4,
                maxWidth: '400px',
                display: 'block',
                textAlign: 'left'
            }}
            >
            Build hardware projects, track your hours,
            then <span style={{ fontWeight: 700 }}>attend a hardware hackathon in Shenzhen!</span>
            </Text>
            <Buttons
            id="fallout-join"
            icon="enter"
            link="https://fallout.hackclub.com/?utm_source=site_card"
            rel="noopener"
            sx={{
                background: '#9F715D',
                color: '#EDD1B0',
                border: '2px solid #61453A',
                borderRadius: '100px',
                px: 3,
                py: '10px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '600'
            }}
            >
            Start Building
            </Buttons>
        </Box>
    </CardModel>
  )
}