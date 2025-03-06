import { Box, Button } from 'theme-ui'
import { useMultiStepContext } from './multi-step-context'
import { Children } from 'react'

export default function MultiStepForm({ children, submitButton }) {
  const { step, useStepper } = useMultiStepContext()
  const steps = Children.toArray(children)
  const { nextStep, previousStep } = useStepper(steps)

  return (
    <>
      {/* Render current step */}
      {steps[step]}

      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem',
          marginLeft: 'auto'
        }}
      >
        {step > 0 && (
          <Button type="button" variant="outline" onClick={previousStep}>
            Back
          </Button>
        )}

        {step < steps.length - 1 && (
          <Button type="button" variant="primary" onClick={nextStep}>
            Next
          </Button>
        )}

        {step === steps.length - 1 && submitButton}
      </Box>
    </>
  )
}
