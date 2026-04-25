/** @jsxImportSource theme-ui */
import { Box, Text, Image } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

export default function Macondo() {
  return (
    <CardModel
      color="#EACFB3"
      sx={{
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        backgroundColor: '#684D3A',
        backgroundImage:
          'url("https://cdn.hackclub.com/019dc218-1e6a-7562-800c-d79da12bc5d1/background_logo_2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Image
        src="https://cdn.hackclub.com/019dc21b-d702-72d2-9930-487a4f7cfd9a/android-chrome-512x512.webp"
        alt="Macondo"
        sx={{
          width: '300px',
          maxWidth: '30%',
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 'auto',
          zIndex: 10
        }}
      />

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
          src="https://cdn.hackclub.com/019dc215-69df-7087-9b63-73db5a7126fd/logo_macondo.png"
          alt="Macondo"
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
            color: '#EACFB3',
            fontSize: ['20px', '24px'],
            fontWeight: 600,
            lineHeight: 1.5,
            mb: 4,
            maxWidth: '500px',
            display: 'block',
            textAlign: 'left'
          }}
        >
          Build software or hardware projects (with up to $1k in funding for
          hardware), win prizes, and{' '}
          <span style={{ fontWeight: 700 }}>
            fly to Bogotá, Colombia for a hackathon!
          </span>
        </Text>
        <Buttons
          id="macondo-join"
          icon="enter"
          link="https://macondo.hackclub.com/?utm_source=site_card"
          rel="noopener"
          sx={{
            background: '#EACFB3',
            color: '#684D3A',
            border: '2px solid #4A3525',
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
