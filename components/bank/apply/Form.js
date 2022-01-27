import {
  Box,
  Label,
  Input,
  Button,
  Select,
  Text,
  Container,
  Textarea
} from 'theme-ui'
import countries from '../../../lib/countries'
export default function BankApplyForm() {
  return (
    <Base method="POST" action="http://localhost:3000/api/bank-apply">
      <Text sx={{ fontSize: 48, fontWeight: 'bold' }}>
        Sign up for Hack Club Bank!
      </Text>
      <Text sx={{ pl: 2 }}>
        Hack Club Bank is open to all US-based Hack Clubs, hackathons, and
        student-led nonprofits.
        <br />
        There are three steps to getting on Hack Club Bank:
        <ol>
          <li>Fill out this form</li>
          <li>
            Have a 20 minute introductory call with a member of the Hack Club
            Bank team
          </li>
          <li>
            Sign the Hack Club Bank fiscal sponsorship agreement (which will be
            sent right after the call)
          </li>
        </ol>
        If you have any questions, give us a shout at bank@hackclub.com or in
        the #bank channel on the Hack Club Slack!
      </Text>
      <hr />
      <Text variant="headline">Your project</Text>
      <Field
        label="Project name"
        name="eventName"
        placeholder="Windy City Hacks"
        helperText="What's the name of your event or project?"
      />
      <Field
        label="Project website"
        name="eventWebsite"
        placeholder="https://hackclub.com"
        type="url"
        helperText="If you don't have one yet, you can leave this blank."
      />
      <Field
        label="Project Location"
        name="eventLocation"
        placeholder="San Francisco, CA"
        type="text"
        helperText="If applicable, please format as: City, State."
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
      <hr />
      <Label htmlFor="eventDescription" sx={{ color: 'smoke', fontSize: 18 }}>
        Tell us about your project!
        <Textarea name="eventDescription" sx={{ bg: 'dark' }} />
        <Text variant="caption" sx={{ color: 'muted', fontSize: 16 }}>
          1-2 sentences summarizing what you'd like to use Hack Club Bank for.
          This is just to help us know what to expect during the call!
        </Text>
      </Label>

      <hr />
      <Text variant="headline">Your profile</Text>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
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
        placeholder="1-855-625-HACK"
        type="tel"
        helperText="We'll only use this if we need to get in touch with you urgently."
      />
      <Field label="Birthday" name="userBirthday" type="date" />

      <Field
        label="Mailing Address"
        name="mailingAddress"
        placeholder="FIXME - separate this field into fieldssss"
        type="text"
        helperText="This is so we can send you some swag and goodies if you ever request them!"
      />

      <Label htmlFor="returningUser" sx={{ color: 'smoke', fontSize: 18 }}>
        Have you used Hack Club Bank before?
        <Select name="returningUser" sx={{ bg: 'dark' }}>
          <option value="No, first time!">No, first time!</option>
          <option value="Yes, I have used Hack Club Bank before">
            Yes, I have used Hack Club Bank before
          </option>
        </Select>
      </Label>
      <Button sx={{ bg: 'red', mt: [2, 3], py: 2, fontSize: 24 }} type="submit">
        Apply
      </Button>
    </Base>
  )
}

function Field({ placeholder, label, name, type, helperText }) {
  return (
    <Box sx={{ my: 2 }}>
      <Label htmlFor={name} sx={{ color: 'smoke', fontSize: 18 }}>
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
      {helperText && (
        <Text variant="caption" sx={{ color: 'muted' }}>
          {helperText}
        </Text>
      )}
    </Box>
  )
}

function Base({ children, action, method }) {
  return (
    <Container
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: '1fr' }}
      action={action}
      method={method}
      variant="copy"
    >
      {children}
    </Container>
  )
}
