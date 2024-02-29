import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Spinner } from 'theme-ui'

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
    const res = await fetch('/api/fiscal-sponsorship/apply', {
      method: 'POST',
      cors: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error(error)
  }
}

export default function NavButton({
  form,
  clickHandler,
  requiredFields,
  setFormError
}) {
  const router = useRouter()
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    setSpinner(false)
  }, [router.query.step])

  const click = async () => {
    setSpinner(true)

    /* Don't return from inside the loop since
        we want all input values to be saved every time */
    let wasError = false

    const formData = new FormData(form.current)

    // Save form data
    formData.forEach((value, key) => {
      sessionStorage.setItem('bank-signup-' + key, value)

      // Check if there are empty required fields.
      if (
        ((!value || value.trim() === '') &&
          requiredFields[step - 1].includes(key)) ||
        (formData.get('contactOption') === 'slack' &&
          !formData.get('slackUsername')) // I'm so sorry for this
      ) {
        setFormError('Please fill all required fields')
        wasError = true
        setSpinner(false)
      }
    })
    if (wasError) return

    // Run the parent's click handler for this button.
    if (clickHandler) await clickHandler()

    await sendApplication()
    await router.push('/fiscal-sponsorship/apply/success')
    return
  }

  return (
    <Button variant="ctaLg" sx={{ width: 'fit-content' }} onClick={click}>
      Submit
      {spinner && (
        <Spinner
          sx={{
            height: '32px',
            color: 'white',
            position: 'absolute',
            right: '-0.3rem',
            margin: '0 !important'
          }}
        />
      )}
    </Button>
  )
}
