import styles from './project-view.module.css'
import { useState, useEffect } from 'react'
import randomNotFoundImg from './random-not-found-img'
import { Button, Text } from 'theme-ui'
import Icon from '@hackclub/icons'
import ReadmeRenderer from './readme-renderer'
import YoutubeRenderer from './youtube-renderer'
/** @jsxImportSource theme-ui */

function darkenColor(hex, factor) {
  let r = parseInt(hex.substring(1, 3), 16)
  let g = parseInt(hex.substring(3, 5), 16)
  let b = parseInt(hex.substring(5, 7), 16)

  r = Math.floor(r * factor)
  g = Math.floor(g * factor)
  b = Math.floor(b * factor)

  return (
    '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
  )
}

function invertColor(hex) {
  hex = hex.replace(/^#/, '')
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)
  r = (255 - r).toString(16).padStart(2, '0')
  g = (255 - g).toString(16).padStart(2, '0')
  b = (255 - b).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

const ProjectView = ({
  id,
  title = 'Title Not Found',
  description = 'Description Not Found',
  slack = 'Slack Not Found',
  scrapbook = '',
  playLink,
  images = [],
  githubProf,
  user = 'User Not Found',
  codeLink = '',
  color = '',
  textColor = '',
  screenshot = '',
  video = '',
  readMeLink = '',
  preview,
  ...props
}) => {
  const [darkColor, setDarkColor] = useState('#000000')
  const [invertedColor, setInvertedColor] = useState('#000000')

  const codeHost = codeLink.includes('github')
    ? 'View on GitHub'
    : 'View project source'

  const image = screenshot.length > 1 ? screenshot : [randomNotFoundImg(id)]

  useEffect(() => {
    setDarkColor(darkenColor(color, 0.8))
    setInvertedColor(invertColor(textColor))
  }, [color])

  // function convertToRawUrl(githubUrl) {
  //   if (!githubUrl.includes('github.com')) {
  //     // throw new Error('Invalid GitHub URL')
  //     return ''
  //   }

  //   return githubUrl
  //     .replace('github.com', 'raw.githubusercontent.com')
  //     .replace('/blob/', '/')
  // }

  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    const fetchMarkdown = async () => {
      if (readMeLink) {
        try {
          const res = await fetch(readMeLink)
          const text = await res.text()
          setMarkdown(text)
        } catch (error) {
          console.error('Error fetching markdown:', error)
          setMarkdown('Failed to load markdown content')
        }
      }
    }

    fetchMarkdown()
  }, [readMeLink])

  return (
    // export a css property for each of the color and dark color
    <div
      {...props}
      className="gaegu"
      sx={{
        position: 'relative',
        backgroundColor: color,
        color: textColor,
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <style>
        {`
          * {
            --color: ${color};
            --dark-color: ${darkColor};
            --text-color: ${textColor};
          }

          body {
            background-color: var(--color);
          }
        `}
      </style>
      <div
        sx={{
          py: 4,
          backgroundColor: darkColor,
          textAlign: 'center',
          color: textColor
        }}
      >
        <h1 className="slackey">{title}</h1>
        <h2>{description != 'Description Not Found' ? description : <></>}</h2>
        <h3>{user != 'User Not Found' ? <>By {user}</> : <></>}</h3>

        <div
          className={styles.buttonGroup}
          sx={{ width: '90%', margin: 'auto', pt: 2, pb: 2 }}
        >
          {playLink && (
            <Button
              as="a"
              sx={{
                backgroundColor: '#FF5C00',
                color: '#ebebeb',
                textSizeAdjust: '16px',
                borderRadius: '10px'
              }}
              href={playLink}
              target="_blank"
              rel="noopener"
            >
              Try Now!
            </Button>
          )}

          <Button
            as="a"
            sx={{
              backgroundColor: '#09AFB4',
              color: '#ebebeb',
              textSizeAdjust: '16px',
              borderRadius: '10px'
            }}
            href={codeLink}
            target="_blank"
            rel="noopener"
          >
            {codeHost}
          </Button>
        </div>
        <Text
          as="a"
          href="/arcade/showcase/my"
          sx={{
            border: `2px dashed ${textColor}`,
            borderRadius: '5px',
            position: ['relative', 'relative', 'absolute'],
            display: 'flex',
            minWidth: "fit-content",
            left: '10px',
            top: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
            py: 1,
            transitionDuration: '0.4s',
            cursor: 'pointer',
            textDecoration: 'none',
            mb: 3,
            '&:hover': {
              background: textColor || '#333',
              color: invertedColor || '#F4E7C7'
            },
            '@media screen and (max-width: 767px)': {
              width: '50%',
              left: 'calc(25%)'
            }
          }}
        >
          {/* <Icon glyph="home" /> View all my ships */}
        </Text>
      </div>
      <div
        sx={{
          width: '90%',
          margin: 'auto',
          my: 3,
          maxWidth: '800px'
        }}
      >
        <div
          sx={{
            display: 'grid',
            flexWrap: 'wrap',
            gridTemplateColumns:
              screenshot != '' && video != ''
                ? ['1fr', '1fr 1fr', '1fr 1fr']
                : '1fr',
            gap: '10px'
          }}
        >
          {image != '' && (
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src={image} alt="Project Image" className={styles.image} />
            </div>
          )}
          {video.includes('youtube') && <YoutubeRenderer youtubeLink={video} />}
          {/* { video != '' && (
            <div
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <video sx={{ width: '100%', height: 'auto' }} controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )} */}
        </div>

        <p
          className={styles.description}
          sx={{ textAlign: screenshot.length != 1 ? 'center' : 'left' }}
        >
          <ReadmeRenderer markdown={markdown} />
        </p>
      </div>
    </div>
  );
}

export default ProjectView
