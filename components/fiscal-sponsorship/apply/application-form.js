import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Alert, Button, Heading } from 'theme-ui'
import FormContainer from './form-container'
import OrganizationInfoForm from './org-form'
import PersonalInfoForm from './personal-form'
import { onSubmit } from './submit'
import Callout from './callout'
import TeenagerOrAdultForm from './teenager-or-adult-form'

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
      <Callout />

      <TeenagerOrAdultForm requiredFields={requiredFields} />

      <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
        Your organization
      </Heading>
      <OrganizationInfoForm requiredFields={requiredFields} />
      <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
        Personal details
      </Heading>
      <PersonalInfoForm requiredFields={requiredFields} />
      {formError && <Alert bg="primary">{formError}</Alert>}
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
    </FormContainer>
  )
}
