import { Box, Label, Input, Button, Select } from 'theme-ui'
import countries from '../../../lib/countries'
export default function BankApplyForm() {
  return (
    <Base method="POST" action="/api/bank-apply">
      <Field
        label="Project name"
        name="eventName"
        placeholder="Windy City Hacks"
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Field label="First name" name="firstName" placeholder="Fiona" />
        <Field label="Last name" name="lastName" placeholder="Hackworth" />
      </Box>
      <Field
        label="Email address"
        name="userEmail"
        placeholder="fiona@hackclub.com"
        type="email"
      />
      <Field
        label="Phone"
        name="userPhone"
        placeholder="12323120234-234234"
        type="tel"
      />
      <Field
        label="Birthday"
        name="userBirthday"
        type="date" // FIXME
      />
      <Field
        label="Event website"
        name="eventWebsite"
        placeholder="https://hackclub.com"
        type="url"
      />
      <Field
        label="Tell us about your project"
        name="eventDescription"
        placeholder=""
        type="textarea"
      />

      <Label htmlFor="eventCountry" sx={{ color: 'muted', fontSize: 18 }}>
        Country
        <Select
          name="eventCountry"
          defaultValue="Choose a country"
          sx={{ bg: 'dark' }}
        >
          <option value="" selected disabled>
            Choose a country
          </option>
          {countries.countries.map(country => (
            <option value={country} key={country}>
              {country}
            </option>
          ))}
        </Select>
      </Label>
      <Field
        label="Event Location"
        name="eventLocation"
        placeholder="San Francisco, CA"
        type="text"
      />
      <Label htmlFor="returningUser" sx={{ color: 'muted', fontSize: 18 }}>
        Have you used Hack Club Bank before?
        <Select name="returningUser" sx={{ bg: 'dark' }}>
          <option value="No, first time!">No, first time!</option>
          <option value="Yes, I have used Hack Club Bank before">
            Yes, I have used Hack Club Bank before
          </option>
        </Select>
      </Label>
      <Button sx={{ bg: 'red', mt: [2, 3], py: 3 }} type="submit">
        Apply
      </Button>
    </Base>
  )
}

function Field({ placeholder, label, name, type }) {
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
        required
      />
    </Box>
  )
}

function Base({ children, action, method }) {
  return (
    <Box
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: '1fr' }}
      action={action}
      method={method}
    >
      {children}
    </Box>
  )
}
