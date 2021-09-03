import { Box } from 'theme-ui'
import AnimatedValue from 'animated-value'

const handleClick = () => {
  const scrollValue = new AnimatedValue({
    start: document.scrollingElement.scrollTop,
    end: window.innerHeight,
    ease: AnimatedValue.CURVES.EXPO_OUT,
  })
  scrollValue.play(800, () => {
    document.scrollingElement.scrollTop = scrollValue.value()
  })

}
const ScrollHint = () => (
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
  ></Box>
)

export default ScrollHint