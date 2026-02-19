import { Box, Image, Text } from 'theme-ui'
import CardModel from './card-model'

/** @jsxImportSource theme-ui */

export default function Sleepover() {
  return (
    <Box sx={{ position: 'relative', my: [4, 4] }}>

      <CardModel
        color="white"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: ['280px', '320px', '358.2px'],
          overflow: 'hidden',
          textAlign: 'center',
          background: 'url(https://cdn.hackclub.com/019c76b9-22f2-710f-8627-5ff4190f5778/I34Drg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'extra',
          p: 0,
          my: 0,
          bg: 'transparent'
        }}
        position={[null, 'bottom', 'bottom']}
      >

        {/* Numbered list on the right */}
        <Box
          sx={{
            zIndex: 1,
            position: 'absolute',
            right: ['4%', '6%', '7%'],
            top: '50%',
            transform: 'translateY(-50%) rotate(2deg)',
            width: ['50%', '48%', '45%'],
          }}
        >
          <Box as="ol" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: [1, 2, 3] }}>
            {[
              'Spend 30 hours learning to code',
              'Earn prizes like plushies, iPads, and more!',
              'Fly to a slumber party themed hackathon in Chicago this April!'
            ].map((item, i) => (
              <Box as="li" key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Text sx={{
                  fontSize: ['10px', '16px', '22px'],
                  fontFamily: '"MADE Tommy Soft", system-ui, sans-serif',
                  fontWeight: '800',
                  color: '#6DA4DF',
                  WebkitTextStroke: ['2px white', '4px white', '5px white'],
                  paintOrder: 'stroke fill',
                  filter: 'drop-shadow(2px 3px 0px #9DC9F7)',
                  minWidth: ['18px', '24px', '28px'],
                  lineHeight: 1.4,
                }}>
                  {i + 1}.
                </Text>
                <Text sx={{
                  fontSize: ['10px', '18px', '28px'],
                  fontFamily: '"MADE Tommy Soft", system-ui, sans-serif',
                  fontWeight: '600',
                  color: '#6DA4DF',
                  WebkitTextStroke: ['2px white', '5px white', '7px white'],
                  paintOrder: 'stroke fill',
                  filter: 'drop-shadow(2px 3px 0px #9DC9F7)',
                  textAlign: 'left',
                  lineHeight: 1.4,
                }}>
                  {item}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Logo on the left */}
        <Box
          sx={{
            zIndex: 1,
            position: 'absolute',
            left: ['4%', '5%', '9%'],
            top: ['45%', 'auto', 'auto'],
            bottom: ['auto', '5%', '8%'],
            transform: ['translateY(-50%)', 'none', 'none'],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: [1, 2, 3],
          }}
        >
          <Image
            src="https://cdn.hackclub.com/019c76b7-644a-7ef7-b855-63253c99d2f8/UpZIvQ.png"
            alt="Sleepover"
            sx={{
              height: ['90px', '90px', '180px'],
              objectFit: 'contain',
              mb: [0, 2, 3],
            }}
          />
          {/* Button below logo - tablet/desktop only */}
          <Box
            as="a"
            href="https://sleepover.hackclub.com?utm_source=site_card"
            target="_blank"
            rel="noopener"
            sx={{ display: ['none', 'block', 'block'] }}
          >
            <Image
              src="/hc-cdn/join%20now.png"
              alt="Join Now"
              sx={{
                height: ['25px', '45px', '60px'],
                cursor: 'pointer',
                transition: 'transform 0.2s ease, filter 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                },
              }}
            />
          </Box>
        </Box>

        {/* Button at bottom center - mobile only */}
        <Box
          as="a"
          href="https://sleepover.hackclub.com?utm_source=site_card"
          target="_blank"
          rel="noopener"
          sx={{
            zIndex: 1,
            position: 'absolute',
            left: '50%',
            bottom: '5%',
            transform: 'translateX(-50%)',
            display: ['block', 'none', 'none'],
          }}
        >
          <Image
            src="/hc-cdn/join%20now.png"
            alt="Join Now"
            sx={{
              height: '40px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
              },
            }}
          />
        </Box>

      </CardModel>
    </Box>
  )
}
