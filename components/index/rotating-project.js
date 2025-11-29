import {
  Box,
  Card,
  Heading,
  Text,
  Image,
  Button,
  Flex,
  Badge,
  Link
} from 'theme-ui'
import Icon from '../icon'
import { useState, useEffect } from 'react'

const RotatingProject = ({ project }) => {
  const [views, setViews] = useState(null)
  const [showBackstory, setShowBackstory] = useState(false)

  useEffect(() => {
    fetch('/api/project-views', { method: 'POST' })
      .then(r => r.json())
      .then(data => setViews(data.views))
  }, [])

  if (!project) return null
  return (
    <Card
      sx={{
        p: 3,
        background:
          'linear-gradient(to bottom, rgba(255, 140, 55, 0.95) 0%, rgba(236, 55, 80, 0.95) 100%)',
        borderRadius: 'extra',
        // border: '1px solid rgba(255, 255, 255, 0.125)',
        height: 'fit-content',
        minHeight: '400px',
        position: 'relative',
        color: 'white',
        transition: 'transform 0.2s ease-in-out',
        ':hover': {
          transform: 'scale(1.02)',
          zIndex: 2
        },
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Flex
        sx={{ alignItems: 'center', mb: 2, justifyContent: 'space-between' }}
      >
        <Text
          sx={{
            px: 2,
            backgroundColor: 'white',
            borderRadius: 'default',
            transform: 'rotate(-3deg)',
            color: 'black',
            // fontWeight: 'bold',
            fontSize: 2,
            userSelect: 'none'
          }}
        >
          Project of the Week
        </Text>
        <Link
          href={project.githubLink}
          target="_blank"
          sx={{ color: 'white', opacity: 0.8, ':hover': { opacity: 1 } }}
        >
          <Icon glyph="github" />
        </Link>
      </Flex>

      {showBackstory ? (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Heading as="h3" variant="headline" mb={2}>
            The Story
          </Heading>
          <Text
            as="p"
            sx={{ fontSize: 2, lineHeight: 'caption', mb: 3, flex: 1 }}
          >
            {project.backstory}
          </Text>
          <Button
            onClick={() => setShowBackstory(false)}
            variant="outline"
            sx={{
              width: '100%',
              color: 'white',
              borderColor: 'white',
              ':hover': { bg: 'rgba(255,255,255,0.1)' }
            }}
          >
            Back to Project
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              position: 'relative',
              mb: 3,
              borderRadius: 'default',
              overflow: project.layerUp ? 'visible' : 'hidden',
              height: '150px'
            }}
          >
            <Image
              src={project.image}
              alt={project.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: project.layerUp ? 'contain' : 'cover',
                bg: project.layerUp ? 'transparent' : 'sunken',
                transform:
                  'translateY(20px)' +
                  (project.imageScale
                    ? `scale(${project.imageScale})`
                    : project.layerUp
                      ? 'scale(1.5)'
                      : 'none')
              }}
            />
          </Box>

          <Heading
            as="h3"
            variant="headline"
            mb={1}
            sx={{ fontSize: [2, 3], textShadow: '0 1px 2px rgba(0,0,0,0.375)' }}
          >
            {project.title}
          </Heading>

          <Text as="p" sx={{ fontSize: 1, opacity: 0.875, mb: 2 }}>
            by {project.author}
            {views && (
              <>
                {' '}
                &bull; {views} view{views === 12345 ? '' : 's'}
              </>
            )}
          </Text>

          <Text
            as="p"
            mb={3}
            sx={{
              fontSize: 1,
              lineHeight: 'caption',
              textShadow: '0 1px 2px rgba(0,0,0,0.375)'
            }}
          >
            {project.description}
          </Text>

          <Flex sx={{ gap: 2, mt: 'auto' }}>
            {project.backstory && (
              <Button
                onClick={() => setShowBackstory(true)}
                variant="outline"
                sx={{
                  flex: 1,
                  color: 'white',
                  borderColor: 'white',
                  whiteSpace: 'nowrap',
                  px: 2,
                  ':hover': { bg: 'rgba(255,255,255,0.1)' }
                }}
              >
                Read More
              </Button>
            )}
            <Button
              as="a"
              href={project.demoLink}
              target="_blank"
              variant="outline"
              sx={{
                flex: 1,
                color: 'white',
                borderColor: 'white',
                whiteSpace: 'nowrap',
                px: 2,
                display: !project.demoLink ? 'none' : '',
                ':hover': { bg: 'rgba(255,255,255,0.1)' }
              }}
            >
              Check it out
            </Button>
          </Flex>
        </>
      )}
    </Card>
  )
}

export default RotatingProject
