async function sendApplication() {
  // Get the form data from sessionStorage
  const data = {}
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    if (key.startsWith('bank-signup-')) {
      data[key.replace('bank-signup-', '')] = sessionStorage.getItem(key)
    }
  }
  console.dir('Sending data:', data)

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
  /* Don't return from inside the loop since
        we want all input values to be saved every time */
  let wasError = false

  const formData = new FormData(form.current)

  // Save form data
  formData.forEach((value, key) => {
    sessionStorage.setItem('bank-signup-' + key, value)

    // Check if there are empty required fields.
    if (
      ((!value || value.trim() === '') && requiredFields.includes(key)) ||
      (formData.get('contactOption') === 'slack' &&
        (!formData.get('slackUsername') != null ||
          formData.get('slackUsername') === '')) // I'm so sorry for this
    ) {
      setFormError('Please fill out all required fields.')
      wasError = true
    }
  })
  if (wasError) return

  if (!formError) {
    setIsSubmitting(true)
    sendApplication().then(() => {
      router.push('/fiscal-sponsorship/apply/success')
    })
  }
  return
}
