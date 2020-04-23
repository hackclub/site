import { Link as A, Image } from 'theme-ui'

const Flag = () => (
  <A
    href="https://hackclub.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hack Club homepage"
    sx={{ ineHeight: 0, position: 'absolute', top: 0, left: 3 }}
  >
    <Image
      src="https://assets.hackclub.com/flag-orpheus-top.svg"
      alt="Hack Club flag"
      sx={{ width: [96, 128] }}
    />
  </A>
)

export default Flag
