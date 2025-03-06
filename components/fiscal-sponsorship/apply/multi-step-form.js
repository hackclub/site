import { Box, Button } from 'theme-ui'
import { useMultiStepContext } from './multi-step-context'

export default function MultiStepForm({ isSubmitting, maxSteps, children }) {
  const { step, modifyStep } = useMultiStepContext()
  // TODO: it shows form validation errors whens switching to a new page

  return (
    <>
      {children}

      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem',
          marginLeft: 'auto'
        }}
      >
        {step > 1 && (
          <Button
            variant="outline"
            onClick={() => {
              modifyStep(-1)
            }}
          >
            Back
          </Button>
        )}

        {step < maxSteps && (
          <Button
            variant="primary"
            onClick={() => {
              modifyStep(1)
            }}
          >
            Next
          </Button>
        )}

        {step === maxSteps && (
          <Button
            variant="ctaLg"
            type="submit"
            disabled={isSubmitting}
            sx={{
              backgroundImage: theme => theme.util.gx('cyan', 'blue'),
              '&:disabled': {
                background: 'muted',
                cursor: 'not-allowed',
                transform: 'none !important'
              },
              width: 'fit-content'
            }}
          >
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </Button>
        )}
      </Box>
    </>
  )
}
