import Icon from '@hackclub/icons'
import { useRef, useState } from 'react'
import { Box, Label, Input, Button, Text } from 'theme-ui'

const Form = () => {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async e => {
    e.preventDefault()

    await fetch(
      'https://airtable-forms-proxy.hackclub.dev/api/appEzv7w2IBMoxxHe/Hackathon%20Grant%20Waitlist',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Email: e.target.email.value
        })
      }
    )

    formRef.current.reset()

    setSubmitted(true)
  }

  return (
    <Box
      sx={{ textAlign: 'center', maxWidth: '24rem', mx: 'auto' }}
      as="form"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <Label htmlFor="email" sx={{ color: 'smoke', fontSize: 18 }}>
        Your email
        <Input
          id="email"
          placeholder="orpheus@hackclub.com"
          name="email"
          type="email"
          sx={{
            bg: 'darkless',
            my: 0,
            mt: 1,
            mb: 2
          }}
          required
        />
      </Label>

      {submitted ? (
        <Text color="smoke" sx={{ display: 'block', mt: 3 }}>
          <Box color="green">
            <Icon glyph="checkmark" />
          </Box>
          Thanks! We'll send you an email in the coming weeks when applications
          have opened.
        </Text>
      ) : (
        <>
          <Button variant="outline">Get notified</Button>
          <Text
            variant="caption"
            sx={{ color: 'muted', fontSize: 16, display: 'block', mt: 3 }}
          >
            We'll send you an email when grant applications are open— no spam or
            unexpected marketing emails.
          </Text>
        </>
      )}
    </Box>
  )
}

export default Form
