import { Button } from 'theme-ui'
import theme from '../lib/theme'

const bg = {
  default: {
    bg: 'blue',
    backgroundImage: theme.util.gx('cyan', 'blue')
  },
  submitting: {
    bg: 'blue',
    backgroundImage: theme.util.gx('cyan', 'blue')
  },
  success: {
    bg: 'green',
    backgroundImage: theme.util.gx('yellow', 'green')
  },
  error: {
    bg: 'orange',
    backgroundImage: theme.util.gx('orange', 'red'),
    boxShadow: `0 0 0 1px ${theme.colors.white}, 0 0 0 4px ${theme.colors.primary}`
  }
}

const submitting = {
  ...bg.default,
  opacity: 0.5,
  pointerEvents: 'none',
  cursor: 'not-allowed'
}

const Submit = ({
  status,
  labels = {
    default: 'Submit',
    error: 'Error!',
    success: 'Check your email!'
  },
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
      ...(status === 'submitting' ? submitting : bg[status]),
      ...sx
    }}
    disabled={status === 'submitting'}
    children={status === 'submitting' ? 'Submitting…' : labels[status]}
    {...props}
  />
)

export default Submit
