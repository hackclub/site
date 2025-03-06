import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Alert, Heading, Button } from 'theme-ui'
import FormContainer from './form-container'
import OrganizationInfoForm from './org-form'
import PersonalInfoForm from './personal-form'
import { onSubmit } from './submit'
import Callout from './callout'
import TeenagerOrAdultForm from './teenager-or-adult-form'
import MultiStepForm from './multi-step-form'

export default function ApplicationForm() {
  const router = useRouter()
  const formContainer = useRef()
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const requiredFields = [
    'eventName',
    'eventLocation',
    'eventPostalCode',
    'eventDescription',
    'eventTeenagerLed',
    'eventPoliticalActivity',
    'eventAnnualBudget',
    'firstName',
    'lastName',
    'userEmail',
    'userPhone',
    'userBirthday',
    'slackUsername'
  ]

  const submitButton = (
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
  )

  return (
    <FormContainer
      ref={formContainer}
      className={formError ? 'has-errors' : null}
      onSubmit={event =>
        onSubmit({
          event,
          router,
          form: formContainer,
          setFormError,
          setIsSubmitting,
          requiredFields
        })
      }
    >
      <MultiStepForm submitButton={submitButton}>
        {/* Step 1 */}
        <MultiStepForm.Step>
          <Callout />
          <TeenagerOrAdultForm requiredFields={requiredFields} />
        </MultiStepForm.Step>
        {/* Step 2 */}
        <MultiStepForm.Step title="Your organization">
          <OrganizationInfoForm requiredFields={requiredFields} />
        </MultiStepForm.Step>
        {/* Step 3 */}
        <MultiStepForm.Step title="Personal details">
          <PersonalInfoForm requiredFields={requiredFields} />
        </MultiStepForm.Step>
      </MultiStepForm>
      {formError && <Alert bg="primary">{formError}</Alert>}
    </FormContainer>
  )
}
