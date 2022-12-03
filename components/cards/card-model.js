import Tilt from './tilt'
import Icon from '@hackclub/icons'
import {
  Box,
  Button,
  Card,
  Flex,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import { Zoom } from 'react-reveal'
import ReactTooltip from 'react-tooltip'

/** @jsxImportSource theme-ui */

const CardModel = ({
  background,
  children,
  link,
  github_link,
  color,
  stars,
  delay,
  ...props
}) => (
  // <Zoom delay={delay}>
  <Card
    sx={{
      position: 'relative',
      width: '100%',
      color: color,
      my: 5,
      backgroundSize: 'cover',
      backgroundImage: `url(${background})` || '',
      backgroundPosition: 'center bottom',
      backgroundRepeat: 'no-repeat'
    }}
    {...props}
  >
    {github_link != null ? (
      <Flex
        sx={{ position: 'absolute', right: 2, top: 2, alignItems: 'center' }}
      >
        <Text as="h2">{stars} ⭐️</Text>
        <Link href={github_link}>
          <Icon glyph="github" size={64} color={color} />
        </Link>
      </Flex>
    ) : (
      <></>
    )}
    {children}
    <ReactTooltip />
  </Card>
  // </Zoom>
)

export default CardModel
