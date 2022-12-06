import Icon from '@hackclub/icons'
import { useRef, useState } from 'react'
import {
  Box,
  Label,
  Input,
  Button,
  Text,
  Alert,
  Card,
  Heading,
  Grid
} from 'theme-ui'
import CardModel from './card-model'

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #ec3750',
      borderRadius: '50%',
      width: '10px',
      height: '10px',
      animation: 'spin 2s linear infinite',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    }}
  ></Box>
)

const MailingList = () => {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   setSubmitting(true)

  //   await fetch('/api/winter-rsvp', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       Name: e.target.name.value,
  //       Email: e.target.email.value
  //     })
  //   })

  //   formRef.current.reset()
  //   setSubmitting(false)

  //   setSubmitted(true)
  // }

  return (
    <CardModel sx={{height: '100%'}}>
      {/* <Card
      sx={{
        maxWidth: 'narrowPlus',
        mx: 'auto',
        mt: [3, 4],
        background: 'rgb(255,255,255, 0.45)',
        backdropFilter: 'blur(8px)'
      }}
    > */}
      <Text variant="title" sx={{ fontSize: [3, 4, 5], zIndex: 2 }}>
        Mailing List
      </Text>
      <Text sx={{ color: 'muted' }} as="p">
        We'll send you an email whenever we launch a new project, so you can get
        involved if you're interested. We never spam or sell your data.
      </Text>
      <Grid
        as="form"
        ref={formRef}
        // onSubmit={handleSubmit}
        gap={[2, 3]}
        sx={{
          mt: [null, 3],
          gridTemplateColumns: [null, '1fr 1fr auto'],
          textAlign: 'left',
          alignItems: 'end',
          input: { bg: 'sunken' }
        }}
      >
        <div>
          <Label htmlFor="location">Name</Label>
          <Input
            autofillBackgroundColor="highlight"
            type="text"
            name="name"
            id="name"
            placeholder="Fiona Hackworth"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            autofillBackgroundColor="highlight"
            type="email"
            name="email"
            id="email"
            placeholder="fiona@hackclub.com"
            required
          />
        </div>

        <Button type="submit" sx={{ mt: [2, 0] }}>
          {submitting ? (
            <>
              <Loading />
              &nbsp;Subscribe
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </Grid>

      {submitted && (
        <Alert variant="primary" sx={{ bg: 'green', mt: [2, 3] }}>
          <Icon glyph="send" />
          <Text sx={{ ml: 2 }}>Signed up!</Text>
        </Alert>
      )}
      {/* </Card> */}
    </CardModel>
  )
}

export default MailingList
