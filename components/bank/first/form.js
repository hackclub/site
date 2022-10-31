import { Box, Input, Label, Button, Select, Text } from 'theme-ui'
import { useState } from 'react'
import { useRouter } from 'next/router'
import theme from '@hackclub/theme'
import Icon from '../../icon'
import AirtablePlus from 'airtable-plus'

// const applicationsTable = new AirtablePlus({
//   baseID: 'apppALh5FEOKkhjLR',
//   apiKey: process.env.AIRTABLE_API_KEY,
//   tableName: 'Events'
// })

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

    // returns a slug that we can use to redirect to the new bank org
    await fetch(
      'https://bc78-65-183-145-85.ngrok.io/api/v1/events/create_demo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.HCB_API_TOKEN}`
        },
        body: JSON.stringify({
          name: e.target.teamName.value,
          email: e.target.userEmail.value
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })

    setSubmitted(true)

    // clear form
    setValues({
      locationState: '',
      locationCountry: '',
      teamName: '',
      teamType: '',
      teamNumber: '',
      userEmail: ''
    })
  }

  return (
    <Base method="get" action="/bank/apply" onSubmit={handleSubmit}>
      <Field
        label="Team Name"
        name="teamName"
        placeholder="Poseidon Robotics"
        value={values.teamName}
        onChange={e => setValues({ ...values, teamName: e.target.value })}
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
            alignItems: 'start'
          }}
        >
          <Icon glyph="send" size={24} />
          <Text>Submitted! Check your email for a sign in link.</Text>
        </Box>
      )}
    </Base>
  )
}
