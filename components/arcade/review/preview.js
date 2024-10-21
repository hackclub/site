import { Text } from 'theme-ui'
import { Balancer } from 'react-wrap-balancer'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'

/** @jsxImportSource theme-ui */

export default function Preview({
  text,
  img,
  imgAlt,
  isSmallScreen,
  rotation,
  sticker1,
  sticker2,
  // position,
  // ref,
  // opacity,
  // inView,
  elementRef
}) {
  const { ref, inView } = useInView({ threshold: 0.9 })
  const [position, setPosition] = useState([])
  useEffect(() => {
    console.log(inView)
    setPosition([
      Math.floor(Math.random() * 12) + 5,
      Math.floor(Math.random() * 15) + 8,
      Math.random() * 20 + 3,
      Math.random() > 0.4
    ])
  }, [])
  return (
    <section
      sx={{
        scrollSnapAlign: 'start',
        height: '100vh'
      }}
    >
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr'],
          alignItems: 'center',
          position: 'relative',
          px: '10vw',
          height: ['70vh', '70vh', '100vh'],
          pt: ['18vh', '20vh', '0vh']
        }}
        ref={ref}
      >
        <Balancer>
          {inView && (
            <Fade>
              <Text
                variant="subtitle"
                className="slackey"
                sx={{
                  transition: 'opacity 0.3s ease-in-out',
                  display: 'block'
                }}
              >
                {text}
              </Text>
            </Fade>
            // )
          )}
        </Balancer>
        {inView && (
          <div
            sx={{
              display: ['none', 'none', 'block'],
              position: 'absolute',
              top: `${position[3] ? position[0] : position[0] + 60}vh`,
              left: `${position[1]}vh`,
              width: '62px',
              transform: `rotate(${position[2]}deg)`,
              zIndex: 5,
              transitionDuration: '0.52s'
            }}
          >
            <Zoom>
              <img
                src={sticker1}
                sx={{ width: '100%', filter: 'drop-shadow(2px 2px #24ffffff)' }}
              />
            </Zoom>
          </div>
        )}

        {inView && (
          <div
            sx={{
              position: 'absolute',
              bottom: [
                '-120px',
                '-120px',
                `${position[3] ? position[0] : position[0] + 60}vh`
              ],
              right: ['23px', '23px', `${position[1]}vh`],
              width: ['50px', '81px'],
              transform: `rotate(-${position[2]}deg)`,
              zIndex: 5,
              transitionDuration: '0.52s'
            }}
          >
            <Zoom>
              <img
                src={sticker2}
                sx={{ width: '100%', filter: 'drop-shadow(2px 2px #24ffffff)' }}
              />
            </Zoom>
          </div>
        )}

        {inView && (
          <div
            sx={{
              position: 'relative',
              display: ['block', 'block', 'none'],
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <img
              src={img}
              alt={imgAlt}
              sx={{
                width: ['300px', '350px', '400px'],
                height: 'auto',
                margin: 'auto',
                display: 'block'
              }}
            />
          </div>
        )}

        <div sx={{ position: 'relative', display: ['none', 'none', 'block'] }}>
          <img
            src={img}
            alt={imgAlt}
            sx={{
              width: ['300px', '350px', '400px'],
              height: 'auto',
              margin: 'auto',
              display: 'block',
              transform: `rotate(${rotation}deg)`
            }}
          />
        </div>
      </div>
    </section>
  )
}
