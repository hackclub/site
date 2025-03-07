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

  const requiredFields = {
    // Key: form field name
    // Value: humanize field name used in error message
    eventName: 'organization name',
    eventLocation: 'organization country',
    eventPostalCode: 'organization zip/postal code',
    eventDescription: 'organization description',
    eventTeenagerLed: 'are you a teenager?',
    eventPoliticalActivity: "organization's political activity",
    eventAnnualBudget: 'organization annual budget',
    firstName: 'first name',
    lastName: 'last name',
    userEmail: 'email',
    userPhone: 'phone number',
    userBirthday: 'birthday'
  }

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
        <MultiStepForm.Step title="Let's get started">
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
