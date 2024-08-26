import { Text } from 'theme-ui'
import { Balancer } from 'react-wrap-balancer'
import Fade from 'react-reveal/Fade'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

/** @jsxImportSource theme-ui */

export default function Preview({
  text,
  img,
  imgAlt,
  isSmallScreen,
  // ref,
  // opacity,
  // inView,
  elementRef
}) {
  const { ref, inView } = useInView({ threshold: 0.9 })

  useEffect(() => {
    console.log(inView)
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
          height: ['70vh',  '70vh', '100vh'],
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
                  transition: 'opacity 0.3s ease-in-out'
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
            sx={{ position: 'relative', display: ['block', 'block', 'none'], transition: 'opacity 0.3s ease-in-out' }}
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
              display: 'block'
            }}
          />
        </div>
      </div>
    </section>
  )
}
