import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Alert, Heading } from 'theme-ui'
import FormContainer from './form-container'
import OrganizationInfoForm from './org-form'
import PersonalInfoForm from './personal-form'
import { onSubmit } from './submit'
import Callout from './callout'
import TeenagerOrAdultForm from './teenager-or-adult-form'
import { useMultiStepContext } from './multi-step-context'
import MultiStepForm from './multi-step-form'

export default function ApplicationForm() {
  const router = useRouter()
  const formContainer = useRef()
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { step } = useMultiStepContext()

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
      <MultiStepForm maxSteps={3} isSubmitting={isSubmitting}>
        {step === 1 ? (
          <>
            <Callout />
            <TeenagerOrAdultForm requiredFields={requiredFields} />
          </>
        ) : step === 2 ? (
          <>
            <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
              Your organization
            </Heading>
            <OrganizationInfoForm requiredFields={requiredFields} />
          </>
        ) : (
          <>
            <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
              Personal details
            </Heading>
            <PersonalInfoForm requiredFields={requiredFields} />
            {formError && <Alert bg="primary">{formError}</Alert>}
          </>
        )}
      </MultiStepForm>
    </FormContainer>
  )
}
