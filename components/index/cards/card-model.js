import Tilt from './tilt'
import Icon from '../../icon'
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
import Comma from '../../comma'

/** @jsxImportSource theme-ui */

const CardModel = ({
  background,
  children,
  link,
  highlight,
  github_link,
  color,
  stars,
  delay,
  position,
  ...props
}) => (
  // <Zoom delay={delay}>
  <Card
    sx={{
      position: 'relative',
      width: '100%',
      color: color,
      my: [3, 4, 5],
      p: 3,
      backgroundSize: 'cover',
      backgroundImage: `url(${background})` || '',
      backgroundPosition: 'center bottom',
      backgroundRepeat: 'no-repeat',
      '& p': {
        fontSize: [1, '16px', '20px']
      }
    }}
    {...props}
  >
    {github_link != null ? (
      <Box>
        {position == 'bottom' ? (
          <Flex
            sx={{
              position: 'absolute',
              left: 3,
              bottom: 2,
              alignItems: 'center',
              zIndex: 2
            }}
          >
            <Link
              href={github_link}
              sx={{ mr: 2 }}
              target="_blank"
              rel="noopener"
            >
              <Icon
                glyph="github"
                size={42}
                color="#2351fs"
                sx={{
                  color: '#000',
                  '&:hover': {
                    color: highlight || color
                  }
                }}
              />
            </Link>
            {stars != null ? (
              <Text as="h2">
                ⭐️ <Comma>{stars}</Comma>
              </Text>
            ) : (
              <></>
            )}
          </Flex>
        ) : (
          <Flex
            sx={{
              position: 'absolute',
              right: 2,
              top: 2,
              alignItems: 'center',
              zIndex: 2
            }}
          >
            {stars != null ? (
              <Text as="h2">
                ⭐️ <Comma>{stars}</Comma>
              </Text>
            ) : (
              <></>
            )}
            <Link href={github_link} sx={{ ml: 2 }}>
              <Icon
                glyph="github"
                size={42}
                sx={{
                  color: color,
                  transition: '0.4s',
                  '&:hover': {
                    color: highlight || color
                  }
                }}
              />
            </Link>
          </Flex>
        )}
      </Box>
    ) : (
      <></>
    )}
    {children}
    <ReactTooltip />
  </Card>
  // </Zoom>
)

export default CardModel
