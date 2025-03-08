import _ from 'lodash'

async function sendApplication() {
  // Get the form data from sessionStorage
  const data = {}
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    if (key.startsWith('bank-signup-')) {
      data[key.replace('bank-signup-', '')] = sessionStorage.getItem(key)
    }
  }
  console.log({ data })

  // Send the data
  try {
    return fetch('/api/fiscal-sponsorship/apply', {
      method: 'POST',
      cors: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error(error)
  }
}

const isBlank = string => !string || string.trim() === ''

export function onSubmit({
  event,
  router,
  form,
  requiredFields,
  formError,
  setFormError,
  setIsSubmitting
}) {
  event.preventDefault()
  const formData = new FormData(form.current)
  const missingFields = []

  const conditionalRequiredFields = _.cloneDeep(requiredFields) // Deep clone to prevent modification from leaking
  if (formData.get('contactOption') === 'Slack') {
    // If contact option is Slack, they must provide a Slack username
    conditionalRequiredFields.slackUsername = 'slack username'
  }

  formData.forEach((value, key) => {
    // Save form data
    sessionStorage.setItem('bank-signup-' + key, value)

    // Check if there are empty required fields.
    if (
      isBlank(value) &&
      Object.keys(conditionalRequiredFields).includes(key)
    ) {
      missingFields.push(conditionalRequiredFields[key])
    }
  })

  if (missingFields.length !== 0) {
    setFormError(
      `Please fill out all required fields: ${missingFields.join(', ')}`
    )
    return // Don't submit application
  }

  if (!formError) {
    setIsSubmitting(true)
    sendApplication().then(() => {
      const isAdult = formData.get('eventTeenagerLed') !== 'true'
      const acceptanceEta = isAdult
        ? 'within two weeks'
        : 'within 24 hours on weekdays and 48 hours on weekends'

      router.push(`/fiscal-sponsorship/apply/success?eta=${acceptanceEta}`)
    })
  }
  return
}
