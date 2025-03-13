import { Box, Button, Heading } from 'theme-ui'
import { useMultiStepContext } from './multi-step-context'
import { Children } from 'react'

export default function MultiStepForm({
  children,
  submitButton,
  validationErrors
}) {
  const { step, useStepper } = useMultiStepContext()
  const steps = Children.toArray(children)
  const { nextStep, previousStep } = useStepper(steps)

  return (
    <>
      {/*
        We must render all form fields to DOM so that they can be submitted
        with the form. So, we simple hide all non-current steps.
      */}
      {steps.map((stepComponent, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3,
            ...(step !== index ? { display: 'none' } : {})
          }}
        >
          {stepComponent}
        </Box>
      ))}

      {validationErrors}

      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          marginTop: '2rem',
          justifyContent: 'flex-end'
        }}
      >
        {step > 0 && (
          <Button type="button" variant="outline" onClick={previousStep}>
            Back
          </Button>
        )}

        {step < steps.length - 1 && (
          <Button type="button" variant="primary" onClick={nextStep}>
            Continue
          </Button>
        )}

        {step === steps.length - 1 && submitButton}
      </Box>
    </>
  )
}

function Step({ children, title }) {
  return (
    <>
      {title && (
        <Heading as="h2" variant="headline">
          {title}
        </Heading>
      )}
      {children}
    </>
  )
}
MultiStepForm.Step = Step
