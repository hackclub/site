import { Box, Button, Flex, Heading, Image, Link, Text } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../../../components/nav'
import { useEffect, useRef } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import { getOnboardProject } from '../../api/onboard/p/[project]'
import { getAllOnboardProjects } from '../../api/onboard/p'
import Icon from '@hackclub/icons'
import Tilt from '../../../components/tilt'

const BoardPage = ({ project }) => {
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
              {project.name}
            </Heading>
            <Text as="p" variant="subtitle" sx={{ textAlign: 'center' }}>
              by {project?.readmeData?.frontmatter?.github_handle}
            </Text>
            <Flex sx={{ mt: 16, gap: 10, flexDirection: ['column', 'row'] }}>
              <Button
                as="a"
                href="/onboard/gallery"
                sx={{
                  background: t => t.util.gx('#60cc38', '#113b11')
                }}
              >
                See more in the gallery
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
        <Box
          sx={{
            maxWidth: 'copyUltra',
            mx: 'auto',
            px: 3
          }}
        >
          {
            // two-column layout - image on left, title + desc on right
          }
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: ['1fr', 'repeat(2, 1fr)'],
              color: 'black'
            }}
          >
            <Tilt>
              <Image
                src={project.imageTop}
                alt={project.name}
                sx={{
                  borderRadius: 8,
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}
              />
            </Tilt>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Heading as="h2" variant="title" sx={{ textAlign: 'left' }}>
                {project.name}
              </Heading>
              <Text as="p" variant="subtitle" sx={{ textAlign: 'left' }}>
                {project?.readmeData?.frontmatter?.github_handle
                  ? `by ${project?.readmeData?.frontmatter?.github_handle}`
                  : ''}
              </Text>
              <Link
                target="_blank"
                href={`https://github.com/hackclub/OnBoard/blob/main/projects/${project.name}/`}
                sx={{
                  textDecoration: 'none',
                  color: 'black',
                  ':hover': {
                    color: 'primary'
                  },
                  textAlign: 'left'
                }}
              >
                <Icon glyph="github" size={18} />
                View on GitHub
              </Link>
              <Box
                sx={{
                  textAlign: 'left'
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    // render with remark to parse markdown
                    remark()
                      .use(html)
                      .processSync(project?.readmeData?.description)
                      .toString()
                      .replaceAll('h4', 'p')
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {process.env.NODE_ENV !== 'production' && (
        <>
          <pre>{JSON.stringify(project, null, 2)}</pre>
        </>
      )}
    </>
  )
}

export async function getStaticPaths(_context) {
  const projects = (await getAllOnboardProjects()).slice(0, 5)
  const paths = projects.map(project => {
    return {
      params: {
        slug: project.name
      }
    }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const name = context.params.slug
  const project = await getOnboardProject(name)
  return {
    props: {
      project
    },
    revalidate: 120
  }
}

export default BoardPage
