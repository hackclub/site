import { Box, Input, Label, Button } from 'theme-ui'
import { useState } from 'react'

function Base({ children, action, target, method }) {
  return (
    <Box
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: '1fr' }}
      action={action}
      target={target}
      method={method}
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
        sx={{ bg: 'dark' }}
        onChange={onChange}
        value={value}
        required
      />
    </Box>
  )
}

export default function Signup() {
  const [values, setValues] = useState({})
  return (
    <Base
      method="get"
      target="_blank"
      action="https://airtable.com/shrW33gWaPnSDBhYj"
    >
      <Field
        label="Project name"
        name="prefill_Event Name"
        placeholder="Windy City Hacks"
        value={values.name}
        onChange={e => setValues({ ...values, name: e.target.value })}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Field
          label="First name"
          name="prefill_First Name"
          placeholder="Fiona"
          value={values.first_name}
          onChange={e => setValues({ ...values, first_name: e.target.value })}
        />
        <Field
          label="Last name"
          name="prefill_Last Name"
          placeholder="Hackworth"
          value={values.last_name}
          onChange={e => setValues({ ...values, last_name: e.target.value })}
        />
      </Box>
      <Field
        label="Email address"
        name="prefill_Email Address"
        placeholder="fiona@hackclub.com"
        type="email"
        value={values.email}
        onChange={e => setValues({ ...values, email: e.target.value })}
      />
      <Button sx={{ bg: 'blue', mt: [2, 3], py: 3 }} type="submit">{`Finish ${
        10 - Object.values(values).filter(n => n !== '').length
      } fields to apply`}</Button>
    </Base>
  )
}
