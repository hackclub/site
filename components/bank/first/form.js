import { Box, Input, Label, Button, Select } from 'theme-ui'
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
    locationState: '',
    locationCountry: '',
    teamType: '',
    teamNumber: '',
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
        {/* <Field
          label="Team type"
          name="teamType"
          placeholder="FLL"
          value={values.teamType}
          onChange={e => setValues({ ...values, teamType: e.target.value })}
        /> */}

        <Box sx={{ my: 2 }}>
          <Label htmlFor="teamType" sx={{ color: 'muted', fontSize: 18 }}>
            Team type
            <Select
              name="eventCountry"
              defaultValue="Select"
              sx={{ bg: 'dark' }}
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
          label="Team number"
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
      />
      <Button sx={{ bg: 'blue', mt: [2, 3], py: 3 }} type="submit">
        Create demo account
      </Button>
    </Base>
  )
}
