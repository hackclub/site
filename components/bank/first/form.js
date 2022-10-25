import { Box, Input, Label, Button } from 'theme-ui'
import { useState } from 'react'
import { useRouter } from 'next/router'

function Base({ children, action, target, method, onSubmit }) {
  return (
    <Box
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: '1fr' }}
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
        required
      />
    </Box>
  )
}

export default function Signup() {
  const router = useRouter()

  const [values, setValues] = useState({
    eventName: '',
    firstName: '',
    lastName: '',
    userEmail: ''
  })

  const handleSubmit = e => {
    e.preventDefault()

    // submit does nothing for now
  }

  return (
    <Base method="get" action="/bank/apply" onSubmit={handleSubmit}>
      <Field
        label="Team Name"
        name="eventName"
        placeholder="Poseidon Robotics"
        value={values.eventName}
        onChange={e => setValues({ ...values, eventName: e.target.value })}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Field
          label="First name"
          name="firstName"
          placeholder="Fiona"
          value={values.firstName}
          onChange={e => setValues({ ...values, firstName: e.target.value })}
        />
        <Field
          label="Last name"
          name="lastName"
          placeholder="Hackworth"
          value={values.lastName}
          onChange={e => setValues({ ...values, lastName: e.target.value })}
        />
      </Box>
      <Field
        label="Email address"
        name="userEmail"
        placeholder="fiona@hackclub.com"
        type="email"
        value={values.userEmail}
        onChange={e => setValues({ ...values, userEmail: e.target.value })}
      />
      <Button sx={{ bg: 'blue', mt: [2, 3], py: 3 }} type="submit">
        Create demo account
      </Button>
    </Base>
  )
}
