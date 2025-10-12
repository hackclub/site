import CardModel from './card-model'
import { Box, Text, Image } from 'theme-ui'
import Buttons from './button'
import Balancer from 'react-wrap-balancer'

/** @jsxImportSource theme-ui */

export default function Moonshot() {
  return (
    <Box sx={{ position: 'relative', my: [4, 4] }}>
      <Box
        sx={{
          position: 'absolute',
          left: ['-15px', '-20px', '-25px'],
          top: ['-15px', '-20px', '-25px'],
          zIndex: 2
        }}
      >
        <Box
          as="img"
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/ac76f2248f521ed47d23aa5c7c0af8183190a30c_cat.png"
          alt="Moonshot Cat"
          sx={{
            width: ['100px', '140px', '190px'],
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
            transform: 'rotate(-12deg)'
          }}
        />
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          right: ['-15px', '-20px', '-25px'],
          bottom: ['-15px', '-20px', '-25px'],
          zIndex: 2
        }}
      >
        <Box
          as="img"
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c174c635c2bacbc66963c134c26696e89da3f100_orpheus.png"
          alt="Orpheus"
          sx={{
            width: ['100px', '140px', '180px'],
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.4))',
            transform: 'rotate(12deg)'
          }}
        />
      </Box>
      
      <CardModel
        color="white"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '358.2px',
          overflow: 'hidden',
          textAlign: 'center',
          backgroundImage: "url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/06ca4c7576384b0f1a09d080433997f25d6c1191_moonshot_bg_final.png)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'extra'
        }}
        position={[null, 'bottom', 'bottom']}
      >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          position: 'relative',
          width: '100%',
          height: '100%',
          py: 4,
          px: 3
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/bb539d76681c26f45247d69cdab86d9d863a1a95_image_105.png"
            alt="moonshot!"
            sx={{
              width: ['250px', '320px', '400px'],
              height: 'auto',
              mb: 0
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Text
            as="p"
            sx={{
              fontSize: ['12px', '14px', '16px'],
              fontWeight: '500',
              color: 'white',
              mb: 2,
              textAlign: 'center'
            }}
          >
            4-day hackathon in Orlando, Florida
          </Text>
          
          <Text
            as="p"
            sx={{
              fontSize: ['18px', '20px', '22px'],
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
              mb: 0
            }}
          >
            w/ a FREE visit to NASA and Universal Studios!
          </Text>
        </Box>

        <Buttons
          href="https://moonshot.hackclub.com?t=web"
          target="_blank"
          rel="noopener"
          primary="#32466E"
          id="moonshot-btn"
          customIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="38" viewBox="0 0 40 38" fill="none">
  <path d="M20.5 0C30.4411 0 40 8.55887 40 18.5C40 28.4411 29.9411 38 20 38C10.0589 38 0.5 28.9411 0.5 19C0.5 9.05887 10.5589 0 20.5 0ZM22.9668 11.1836C22.3015 10.803 21.4528 11.0335 21.0723 11.7002C20.6918 12.3655 20.9222 13.2142 21.5889 13.5947C23.7472 14.8253 25.799 16.2735 27.6406 17.9443H8.38867C7.62224 17.9445 7.00022 18.5666 7 19.333C7 20.0996 7.6221 20.7225 8.38867 20.7227H27.6406C25.799 22.3935 23.7472 23.8417 21.5889 25.0723C20.9222 25.4528 20.6917 26.3015 21.0723 26.9668C21.4528 27.6334 22.3015 27.8639 22.9668 27.4834C25.9668 25.7654 29.715 23.4749 31.6289 20.4541C31.7345 20.2874 32 19.8552 32 19.333C31.9999 18.8111 31.7345 18.3796 31.6289 18.2129C29.6803 15.1366 26.0445 12.9461 22.9668 11.1836Z" fill="white"/>
</svg>
          }
          sx={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: '600'
          }}
        >
          Join Moonshot
        </Buttons>
      </Box>
      </CardModel>
    </Box>
  )
}