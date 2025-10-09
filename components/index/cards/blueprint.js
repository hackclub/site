import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Blueprint({ stars, blueprintData }) {
  const [projects, setProjects] = useState(blueprintData || '100+ projects built')

  useEffect(() => {
    if (!blueprintData) {
      fetch('/api/blueprint')
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch(error => {
          console.error('Error fetching Blueprint data:', error)
          setProjects('100+ projects built')
        })
    }
  }, [])

  return (
    <Box
      sx={{
        backgroundColor: '#0e305b',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        backgroundPosition: '0 0, 0 0',
        borderRadius: '12px',
        p: ['32px', '40px', '48px'],
        my: [4, 4],
        position: 'relative',
        color: 'white',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          right: ['-30px', '-40px', '-50px'],
          top: ['-30px', '-40px', '-50px'],
          zIndex: 2
        }}
      >
        <img
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/db8d0fd43bb664a8b07431b0262a7ca13c1602c7_blueprint_logo__img_.png"
          alt="Blueprint Logo"
          style={{
            width: '180px',
            height: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(219, 228, 238, 0.4))',
            transform: 'rotate(12deg)'
          }}
        />
      </Box>
      <Box
        sx={{
          mt: ['38px', 0, 0],
          position: 'relative'
        }}
      >
        <img
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c06427309a3db7299065c0a41f1e8cc70531f0a9_blueprint.png"
          alt="Blueprint"
          style={{
            maxWidth: '300px',
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 0 30px rgba(219, 228, 238, 0.6))'
          }}
        />
      </Box>
      <Box>
        <Flex
          sx={{
            alignItems: 'baseline',
            gap: 1,
            px: 2,
            py: 1,
            width: 'fit-content',
            borderRadius: 'extra',
            border: 'rgba(255,255,255,0.2) dashed 1px',
            zIndex: 2,
            mb: 3
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              width: '12px',
              height: '12px',
              flexShrink: 0,
              mb: '2px',
              mr: '5px'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '9999px',
                backgroundColor: '#a8f0ae',
                alignItems: 'center',
                animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                '@keyframes ping': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 1
                  },
                  '75%, 100%': {
                    transform: 'scale(2)',
                    opacity: 0
                  }
                }
              }}
            />
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '9999px',
                backgroundColor: '#a8f0ae'
              }}
            />
          </Box>
          <Text
            as="span"
            variant="subheadline"
            sx={{
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              m: 0,
              lineHeight: 1
            }}
          >
            {projects}
          </Text>
        </Flex>
        <Text as="p" variant="subtitle" sx={{ color: 'white', mb: 4, maxWidth: '600px' }}>
          Design a Hardware project and get up to $400 to make it real!
        </Text>

        <Flex sx={{ flexDirection: ['column', 'row'], gap: 3, alignItems: ['stretch', 'center'], flexWrap: 'wrap' }}>
          <Buttons
            id="59"
            icon="enter"
            link="https://blueprint.hackclub.com/?utm_source=site"
            primary="#dbe4ee"
            color="black"
          >
            Sign Up
          </Buttons>
          <Buttons icon="docs" link="https://blueprint.hackclub.com/guides/?utm_source=site" id="60">
            Learn how to build hardware
          </Buttons>
          <Buttons icon="friend" link="https://blueprint.hackclub.com/explore/?utm_source=site" id="61">
            See what other hackers have built
          </Buttons>
        </Flex>
      </Box>
    </Box>
  )
}