import { useEffect, useRef } from 'react'
import PaginationButtons from './pagination-buttons'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import { Box, Button, Flex, Grid, Heading, Text } from 'theme-ui'
import Item from './item'
import Nav from '../nav'
import { Slide } from 'react-reveal'

const perPage = 10

export const GalleryPage = ({ currentPage, itemCount, currentProjects }) => {
  const spotlightRef = useRef()
  useEffect(() => {
    const handler = event => {
      spotlightRef.current.style.background = `radial-gradient(
				circle at ${event.pageX}px ${event.pageY}px,
				rgba(0, 0, 0, 0) 10px,
				rgba(0, 0, 0, 0.8) 80px
			)`
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return (
    <>
      <Meta
        as={Head}
        title="Gallery"
        description="Check out the latest and greatest from the Onboard project."
      ></Meta>
      <style>{`

				@font-face {
					font-family: 'Phantom Sans';
					src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Med.woff')
							format('woff'),
						url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Med.woff2')
							format('woff2');
					font-weight: 500;
					font-style: normal;
					font-display: swap;
				}

				html {
					scroll-behavior: smooth;
				}
			`}</style>
      <Head></Head>
      <Nav />
      <Box
        as="header"
        sx={{
          bg: '#000000',
          backgroundImage: `
						linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
						url('https://cloud-dst3a9oz5-hack-club-bot.vercel.app/0image.png')
					`,
          color: '#ffffff',
          position: 'relative'
        }}
      >
        <Box
          ref={spotlightRef}
          sx={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: '#000000',
            pointerEvents: 'none'
          }}
        />
        <Flex
          sx={{
            p: 4,
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 5,
            position: 'relative'
          }}
        >
          <Flex
            sx={{
              p: 4,
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 5,
              margin: '3vh auto',
              position: 'relative'
            }}
          >
            <Heading as="h1" variant="title" sx={{ textAlign: 'center' }}>
              Gallery
            </Heading>
            <Text as="p" variant="subtitle" sx={{ textAlign: 'center' }}>
              Check out the latest and greatest from the OnBoard project.
            </Text>
            <Flex sx={{ mt: 16, gap: 10, flexDirection: ['column', 'row'] }}>
              <Button
                variant="ctaLg"
                as="a"
                href="https://hackclub.com/onboard"
                target="_blank"
                sx={{
                  background: t => t.util.gx('#60cc38', '#113b11')
                }}
              >
                Make your own!
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box
        sx={{
          bg: 'white',
          py: [4, 5],
          textAlign: 'center'
        }}
      >
        <PaginationButtons
          currentPage={currentPage}
          itemCount={itemCount}
          perPage={perPage}
        />
        <Grid
          gap={4}
          columns={[null, 2]}
          sx={{
            p: 4,
            maxWidth: 'copyPlus',
            mx: 'auto',
            mt: 4,
            mb: 5,
            textAlign: 'center'
          }}
        >
          {currentProjects.map(project => (
            <Slide delay={10} up key={project.name}>
              <Item key={project.name} project={project} />
            </Slide>
          ))}
        </Grid>
        <PaginationButtons
          currentPage={currentPage}
          itemCount={itemCount}
          perPage={perPage}
        />
      </Box>
    </>
  )
}
