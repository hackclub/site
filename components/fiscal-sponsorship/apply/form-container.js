import { forwardRef } from 'react'
import { Box, Container } from 'theme-ui'
import { TeenagerLedProvider } from '../../../components/fiscal-sponsorship/apply/teenager-led-context'
import { MultiStepProvider } from './multi-step-context'

const formContainer = forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      as="form"
      sx={{
        bg: 'snow',
        px: [3, 5],
        py: 5,
        minHeight: '100dvb',
        '&.has-errors div[aria-required="true"] input:placeholder-shown': {
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
          display: 'flex',
          flexDirection: 'column',
          columnGap: 4,
          rowGap: 3,
          px: 0
        }}
      >
        <MultiStepProvider>
          <TeenagerLedProvider>{children}</TeenagerLedProvider>
        </MultiStepProvider>
      </Container>
    </Box>
  )
})

// https://stackoverflow.com/a/67993106/10652680
formContainer.displayName = 'formContainer'
export default formContainer
