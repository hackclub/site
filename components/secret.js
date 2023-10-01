import { Box, Text } from 'theme-ui'
import { useState, useEffect } from 'react'

export default function Secret({ reveal, ...props }) {
  const [img, setImage] = useState('')

  useEffect(() => {
    setImage('https://github.com/hackclub/dinosaurs/raw/main/club_dinosaur.png')
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        right: 5,
        bottom: 0,
        transform: `${reveal ? 'translateY(0)' : 'translateY(100%)'}`,
        transition: '1s',
        zIndex: 3
      }}
      {...props}
    >
      <Box
        as="div"
        sx={{
          height: '200px',
          width: '300px',
          backgroundColor: 'black',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 0,
          '&:hover > .lid-one': {
            transform: 'rotateX(90deg)',
            transitionDelay: '0s'
          },
          '&:hover > .lid-two': {
            transform: 'rotateX(180deg)',
            transitionDelay: '0.25s'
          },
          '&:hover > .letter': {
            transform: 'translateY(-50px)',
            transitionDelay: '0.5s'
          }
        }}
      >
        <Box
          as="div"
          className="lid-one"
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            borderRight: '150px solid transparent',
            borderBottom: '100px solid transparent',
            borderLeft: '150px solid transparent',
            transformOrigin: 'top',
            transition: 'transform 0.25s linear',
            borderTop: '100px solid #8492a6',
            transform: 'rotateX(0deg)',
            zIndex: 3,
            transitionDelay: '0.75s'
          }}
        ></Box>
        <Box
          as="div"
          className="lid-two"
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            borderRight: '150px solid transparent',
            borderBottom: '100px solid transparent',
            borderLeft: '150px solid transparent',
            transformOrigin: 'top',
            transition: 'transform 0.25s linear',
            borderTop: '100px solid #8492a6',
            transform: 'rotateX(90deg)',
            zIndex: 1,
            transitionDelay: '0.5s'
          }}
        ></Box>
        <Box
          as="div"
          className="envelope"
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            borderTop: '100px solid transparent',
            borderRight: '150px solid #f9fafc',
            borderBottom: '150px solid #f9fafc',
            borderLeft: '150px solid #f9fafc',
            zIndex: 3
          }}
        ></Box>
        <Box
          as="div"
          className="letter"
          sx={{
            position: 'absolute',
            top: 0,
            width: '80%',
            height: '80%',
            backgroundColor: 'white',
            borderRadius: '5px',
            border: '3px solid #e0e6ed',
            zIndex: 2,
            transition: '0.5s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 3
          }}
        >
          <img
            src={img}
            width="30%"
            sx={{ margin: 'auto' }}
            alt="a secret dino!"
          />
          <Text>print kc</Text>
        </Box>
      </Box>
    </Box>
  )
}

// credits: https://codepen.io/Coding-Star/pen/WNpbvwB
