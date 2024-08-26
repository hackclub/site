import { Text } from 'theme-ui'
import { Balancer } from 'react-wrap-balancer'
import Fade from 'react-reveal/Fade'
import { useInView } from 'react-intersection-observer'

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
  const { ref, inView } = useInView({ threshold: 0.95 })

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
          height: '100vh'
        }}
        ref={ref}
      >
        <Balancer>
          {isSmallScreen ? (
            <Text
              variant="subtitle"
              className="slackey"
              sx={{
                transition: 'opacity 0.3s ease-in-out',
                pt: 5,
                display: 'block'
              }}
            >
              {text}
            </Text>
          ) : (
            inView && (
              <Fade>
                <Text
                  variant="subtitle"
                  className="slackey"
                  sx={{
                    opacity: opacity,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                >
                  {text}
                </Text>
              </Fade>
            )
          )}
        </Balancer>

        <div ref={ref} sx={{ position: 'relative' }}>
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
