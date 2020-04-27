import { Button } from 'theme-ui'
import theme from '../lib/theme'

const bg = {
  default: {
    bg: 'blue',
    backgroundImage: theme.util.gradient('cyan', 'blue')
  },
  success: {
    bg: 'green',
    backgroundImage: theme.util.gradient('green', 'cyan')
  },
  error: {
    bg: 'orange',
    backgroundImage: theme.util.gradient('orange', 'red'),
    boxShadow: `0 0 0 1px ${theme.colors.white}, 0 0 0 4px ${theme.colors.primary}`
  }
}

const Submit = ({
  status,
  labels = { default: 'Submit', error: 'Error!', success: 'Submitted!' },
  width = '100%',
  sx,
  ...props
}) => (
  <Button
    as="button"
    type="submit"
    sx={{
      py: 2,
      px: 3,
      mt: 3,
      fontSize: 2,
      width,
      ...bg[status],
      ...sx
    }}
    children={labels[status]}
    {...props}
  />
)

export default Submit
