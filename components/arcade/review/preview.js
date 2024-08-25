import { Text } from "theme-ui"
import { Balancer } from "react-wrap-balancer"
/** @jsxImportSource theme-ui */

export default function Preview({
  text,
  img,
  imgAlt,
  ref,
  opacity,
  elementRef
}) {
  return (
    <section
      sx={{
        scrollSnapAlign: 'start',
        height: '100vh'
      }}
      ref={elementRef}
    >
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          px: '10vw',
          height: '100vh'
        }}
      >
        <Balancer>
          <Text
            variant="subtitle"
            className="slackey"
            sx={{ opacity: opacity, transition: 'opacity 0.3s ease-in-out' }}
          >
            {text}
          </Text>
        </Balancer>
        <div ref={ref} sx={{ position: 'relative' }}>
          <img src={img} alt={imgAlt} sx={{ width: '400px', height: 'auto' }} />
        </div>
      </div>
    </section>
  )
}
