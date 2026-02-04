import CardModel from './card-model'
import { Box, Image, Text } from 'theme-ui'

/** @jsxImportSource theme-ui */

export default function Scraps() {
  return (
    <CardModel
      color="black"
      sx={{
        background: 'white',
        borderRadius: '16px',
        border: '4px solid black',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Image
        alt="scraps dino"
        src="https://scraps.hackclub.com/hero.png"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: 'auto',
          objectFit: 'contain',
          display: ['none', 'none', 'block', 'block'],
          zIndex: 1
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          paddingInline: '50px',
          maxWidth: ['100%', '100%', '50%']
        }}
      >
        <Text
          as="h1"
          sx={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: ['48px', '64px'],
            fontWeight: 'bold',
            mb: 2,
            display: 'block',
            textAlign: 'left',
            textDecoration: 'none'
          }}
        >
          scraps
        </Text>

        <Text
          variant="subtitle"
          sx={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: 'black',
            fontSize: ['16px', '18px'],
            fontWeight: 'normal',
            lineHeight: 1.5,
            mb: 1,
            display: 'block',
            textAlign: 'left'
          }}
        >
          <strong>ys:</strong> any project (silly, nonsensical, or fun)
        </Text>
        <Text
          variant="subtitle"
          sx={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: 'black',
            fontSize: ['16px', '18px'],
            fontWeight: 'normal',
            lineHeight: 1.5,
            mb: 3,
            display: 'block',
            textAlign: 'left'
          }}
        >
          <strong>ws:</strong> a chance to win something amazing (including rare
          stickers)
        </Text>
        <a
          href="https://scraps.hackclub.com/?utm_source=site-card"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            padding: '12px 32px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'none'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" />
            <path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" />
            <path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027" />
          </svg>
          start scrapping
        </a>
      </Box>
    </CardModel>
  )
}
