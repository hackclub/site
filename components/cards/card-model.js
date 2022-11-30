import Tilt from './tilt'
import Icon from '@hackclub/icons'
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
/** @jsxImportSource theme-ui */

const CardModel = ({ children, link, github_link, color, ...props }) => (
      <Card
        sx={{ position: 'relative', width: '100%', color: color, my: 5}}
        {...props}
      >
        {github_link != null ? (
          <Link href={github_link}>
            <Icon
              glyph="github"
              size={64}
              color={color}
              sx={{ position: 'absolute', right: 2, top: 2 }}
            />
          </Link>
        ) : (
          <></>
        )}
        {children}
      </Card>
)

export default CardModel
