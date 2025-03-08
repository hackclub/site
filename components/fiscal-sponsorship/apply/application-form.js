import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Alert, Button, Text } from 'theme-ui'
import FormContainer from './form-container'
import OrganizationInfoForm from './org-form'
import PersonalInfoForm from './personal-form'
import { onSubmit } from './submit'
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
    eventTeenagerLed: 'are you a teenager?',
    eventName: 'project name',
    eventPostalCode: 'project zip/postal code',
    eventDescription: 'project description',
    eventIsPolitical: "project's political activity",
    eventPoliticalActivity: "project's political activity",
    eventHasWebsite: 'project website',
    eventWebsite: 'project website',
    eventAnnualBudget: 'project annual budget',
    firstName: 'first name',
    lastName: 'last name',
    userEmail: 'email',
    userPhone: 'phone number',
    userBirthday: 'birthday',
    userAddressLine1: 'address line 1',
    userAddressCity: 'city',
    userAddressProvince: 'state/province',
    userAddressPostalCode: 'ZIP/postal code',
    userAddressCountry: 'country',

    referredBy: 'how did you hear about HCB?'
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
      <MultiStepForm
        submitButton={submitButton}
        validationErrors={
          formError && (
            <Alert bg="primary" sx={{ mt: 4 }}>
              {formError}
            </Alert>
          )
        }
      >
        {/* Step 1 */}
        <MultiStepForm.Step title="Let's get started">
          <Text as="p" variant="caption" sx={{ marginBottom: '1rem' }}>
            Fill out this quick application to run your project on HCB. If you
            are a teenager, there is a very high likelihood we will accept your
            project. We just need to collect a few pieces of information first.
          </Text>
          <TeenagerOrAdultForm requiredFields={requiredFields} />
        </MultiStepForm.Step>
        {/* Step 2 */}
        <MultiStepForm.Step>
          <OrganizationInfoForm requiredFields={requiredFields} />
        </MultiStepForm.Step>
        {/* Step 3 */}
        <MultiStepForm.Step title="Personal details">
          <PersonalInfoForm requiredFields={requiredFields} />
        </MultiStepForm.Step>
      </MultiStepForm>
    </FormContainer>
  )
}
