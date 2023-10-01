import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Flex, Text, Spinner } from 'theme-ui'

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
    const res = await fetch('/api/hcb/apply', {
      method: 'POST',
      cors: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error(error)
  }
}

function NavIcon({ isBack }) {
  const style = {
    height: '1em',
    fill: 'white',
    margin: 0,
    flexShrink: 0
  }

  return isBack ? (
    <svg style={style} viewBox="10.73 7.72 9.27 16.53">
      <g>
        <path d="M19.768,23.89c0.354,-0.424 0.296,-1.055 -0.128,-1.408c-1.645,-1.377 -5.465,-4.762 -6.774,-6.482c1.331,-1.749 5.1,-5.085 6.774,-6.482c0.424,-0.353 0.482,-0.984 0.128,-1.408c-0.353,-0.425 -0.984,-0.482 -1.409,-0.128c-1.839,1.532 -5.799,4.993 -7.2,6.964c-0.219,0.312 -0.409,0.664 -0.409,1.054c0,0.39 0.19,0.742 0.409,1.053c1.373,1.932 5.399,5.462 7.2,6.964l0.001,0.001c0.424,0.354 1.055,0.296 1.408,-0.128Z"></path>
      </g>
    </svg>
  ) : (
    <svg style={style} viewBox="12.75 7.72 9.25 16.53">
      <g>
        <path d="M12.982,23.89c-0.354,-0.424 -0.296,-1.055 0.128,-1.408c1.645,-1.377 5.465,-4.762 6.774,-6.482c-1.331,-1.749 -5.1,-5.085 -6.774,-6.482c-0.424,-0.353 -0.482,-0.984 -0.128,-1.408c0.353,-0.425 0.984,-0.482 1.409,-0.128c1.839,1.532 5.799,4.993 7.2,6.964c0.219,0.312 0.409,0.664 0.409,1.054c0,0.39 -0.19,0.742 -0.409,1.053c-1.373,1.932 -5.399,5.462 -7.2,6.964l-0.001,0.001c-0.424,0.354 -1.055,0.296 -1.408,-0.128Z"></path>
      </g>
    </svg>
  )
}

export default function NavButton({
  isBack,
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

  const minStep = 1
  const maxStep = 3

  const click = async () => {
    setSpinner(true)

    let step = parseInt(router.query.step)

    async function setStep(s) {
      await router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, step: s }
        },
        undefined,
        {}
      )
    }

    if (!step) {
      // Set the step query param to minStep if it's not there.
      await setStep(minStep)
    } else if (step === minStep && isBack) {
      await router.push('/hcb')
      return
    } else if (step < minStep) {
      // Set the step query param to minStep if it's lower than that.
      await setStep(minStep)
    }

    /* Don't return from inside the loop since 
        we want all input values to be saved every time */
    let wasError = false

    const formData = new FormData(form.current)

    // Save form data
    formData.forEach((value, key) => {
      sessionStorage.setItem('bank-signup-' + key, value)

      // Check if there are empty required fields.
      if (
        (!isBack &&
          (!value || value.trim() === '') &&
          requiredFields[step - 1].includes(key)) ||
        (!isBack &&
          formData.get('contactOption') === 'slack' &&
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

    if (step >= maxStep && !isBack) {
      await sendApplication()
      await router.push('/hcb/apply/success')
      return
    } else {
      step += isBack ? -1 : 1
    }
    await setStep(step)
  }

  return (
    <Button
      variant={isBack ? 'outline' : 'ctaLg'}
      sx={{
        color: 'white',
        width: '100%',
        maxWidth: isBack ? '8rem' : '10rem',
        position: 'relative'
      }}
      onClick={click}
    >
      <Flex
        sx={{
          flexDirection: isBack ? 'row' : 'row-reverse',
          justifyContent: 'center',
          placeItems: 'center',
          fontSize: isBack ? 2 : 4,
          gap: [2, null, null, 3]
        }}
      >
        <NavIcon isBack={isBack} />
        <Text
          sx={{
            textTransform: 'none',
            fontWeight: 'bold'
          }}
        >
          {isBack ? 'Back' : 'Next'}
        </Text>
      </Flex>
      {!isBack && spinner && (
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
