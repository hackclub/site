import { forwardRef } from 'react'
import { Box, Container } from 'theme-ui'
import { TeenagerLedProvider } from './teenager-led-context'

const formContainer = forwardRef<HTMLElement, React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>>(({ children, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      as="form"
      sx={{
        bg: 'snow',
        px: [3, 5],
        py: [1, 5],
        pb: 5,
        minHeight: [null, null, '100dvb'],
        '&.has-errors div[aria-required="true"] input:placeholder-shown': {
          borderColor: 'primary'
        },
        '&.has-errors div[aria-required="true"] input[type="date"]': {
          borderColor: 'primary'
        },
        '&.has-errors div[aria-required="true"] textarea:placeholder-shown': {
          borderColor: 'primary'
        }
      }}
      {...props}
    >
      <Container
        variant="copy"
        sx={{
          ml: 0,
          px: 0
        }}
      >
        <TeenagerLedProvider>{children}</TeenagerLedProvider>
      </Container>
    </Box>
  )
})

// https://stackoverflow.com/a/67993106/10652680
formContainer.displayName = 'formContainer'
export default formContainer
