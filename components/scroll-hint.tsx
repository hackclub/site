import { Box } from 'theme-ui'
import anime from 'animejs/lib/anime.es.js'

const handleClick = () => {
  const scroll = { x: document.scrollingElement.scrollTop }

  anime({
    targets: scroll,
    x: window.innerHeight,
    easing: 'easeOutExpo',
    duration: 800,
    update: () => {
      document.scrollingElement.scrollTop = scroll.x
    }
  })
}
const ScrollHint = ({ ...props }) => (
  <Box
    sx={{
      display: 'block',
      position: 'relative',
      height: '32px',
      width: '32px',
      margin: '0 auto',
      borderBottom: '2px solid #fff',
      borderRight: '2px solid #fff',
      transform: 'rotate(45deg)',
      opacity: '.6',
      cursor: 'pointer',
      transition: 'transform .3s',

      '&:hover': { transform: 'translateY(4px) rotate(45deg)' },
      '&:active': { transform: ' translateY(6px) rotate(45deg)' }
    }}
    onClick={handleClick}
    {...props}
  ></Box>
)

export default ScrollHint
