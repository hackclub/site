import { AnimatedValue } from 'animated-value'
const ScrollCaret = styled(Box)`
  display: block;
  position: relative;
  z-index: 500;
  height: 32px;
  width: 32px;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
  opacity: 0.6;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(4px) rotate(45deg);
  }

  &:active {
    transform: translateY(6px) rotate(45deg);
  }
`

export default function ScrollHint() {
  return (
    <ScrollCaret
      onClick={() => {
        const scrollValue = new AnimatedValue({
          start: document.scrollingElement.scrollTop,
          end: window.innerHeight,
          ease: AnimatedValue.CURVES.EXPO_OUT
        })
        scrollValue.play(800, () => {
          document.scrollingElement.scrollTop = scrollValue.value()
        })
      }}
    />
  )
}
