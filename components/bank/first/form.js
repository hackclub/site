import { Box, Input, Label, Button, Select, Text } from 'theme-ui'
import { useState } from 'react'
import { useRouter } from 'next/router'
import theme from '@hackclub/theme'
import Icon from '../../icon'
import { keyframes } from '@emotion/react'

const hideAnimation = keyframes({
  from: { display: 'flex' },
  to: { display: 'none', opacity: 0, padding: 0, position: 'absolute' }
})

function Base({ children, action, target, method, onSubmit, id }) {
  return (
    <Box
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: '1fr' }}
      id={id}
      action={action}
      target={target}
      method={method}
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  )
}

function Field({ placeholder, label, name, type, value, onChange }) {
  return (
    <Box sx={{ my: 2 }}>
      <Label htmlFor={name} sx={{ color: 'muted', fontSize: 18 }}>
        {label}
      </Label>
      <Input
        id={name}
        placeholder={placeholder}
        name={name}
        type={type}
        sx={{
          bg: 'dark'
        }}
        onChange={onChange}
        value={value}
      />
    </Box>
  )
}

export default function Signup() {
  const { query } = useRouter()
  const [submitted, setSubmitted] = useState(false)

  const [values, setValues] = useState({
    locationState: '',
    locationCountry: '',
    teamName: '',
    teamType: '',
    teamNumber: '',
    userEmail: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    fetch('/api/bank/demo', {
      method: 'POST',
      body: JSON.stringify(values)
    })

    // clear form
    setValues({
      locationState: '',
      locationCountry: '',
      eventName: '',
      teamType: '',
      teamNumber: '',
      userEmail: ''
    })
  }

  return (
    <>
      <Base
        id="form"
        method="POST"
        action="/api/bank/demo"
        onSubmit={handleSubmit}
      >
        <Field
          label="Team Name"
          name="eventName"
          placeholder="Poseidon Robotics"
          value={values.eventName}
          onChange={e => setValues({ ...values, eventName: e.target.value })}
          required
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, w: '100%' }}>
          <Box sx={{ my: 2 }}>
            <Label htmlFor="teamType" sx={{ color: 'muted', fontSize: 18 }}>
              Level
              <Select
                name="teamType"
                defaultValue="Select"
                sx={{ bg: 'dark' }}
                onChange={e =>
                  setValues({ ...values, teamType: e.target.value })
                }
              >
                <option value="Select" selected disabled>
                  Select
                </option>
                <option value="FLL">FLL</option>
                <option value="FTC">FTC</option>
                <option value="FRC">FRC</option>
              </Select>
            </Label>
          </Box>

          <Field
            label="Team number (optional)"
            name="teamNumber"
            placeholder="12345"
            value={values.teamNumber}
            onChange={e => setValues({ ...values, teamNumber: e.target.value })}
          />
        </Box>
        <Field
          label="Email address"
          name="userEmail"
          placeholder="fiona@hackclub.com"
          type="email"
          value={values.userEmail}
          onChange={e => setValues({ ...values, userEmail: e.target.value })}
          required
        />
        <Button
          sx={{
            backgroundImage: theme.util.gx('orange', 'red'),
            mt: [2, 3],
            py: 2
          }}
          type="submit"
        >
          Create new account
        </Button>
      </Base>
      {submitted && (
        <Box
          sx={{
            mt: 2,
            px: 2,
            py: 2,
            borderRadius: 'default',
            color: 'white',
            bg: 'green',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            animation: `${hideAnimation} 0s ease-in 15s`,
            animationFillMode: 'forwards'
          }}
        >
          <Icon glyph="send" size={24} />
          <Text>Submitted! Check your email for a sign in link.</Text>
        </Box>
      )}
    </>
  )
}
