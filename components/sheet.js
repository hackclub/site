import { Card, Container } from '@theme-ui'
import PropTypes from 'prop-types'

export default function Sheet({ children}) {
  return (
    <Card
      sx={{ position: 'relative', overflow: 'hidden', borderRadius: 'extra'}}
	  style={{ ${props => !props.flat && `boxShadow: "0 8px 32px rgba(0, 0, 0, 0.0625)"` } }}
    >
      <Container
	  {children}></Container>
    </Card>
  )
}

Sheet.defaultProps = {
  bg: 'rgba(255, 255, 255, 0.875)',
  p: [3, 4],
  color: 'black',
  width: 1,
  mb: 4
}
Sheet.propTypes = {
  flat: PropTypes.bool
}
