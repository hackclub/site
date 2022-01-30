import {
  Box,
  Label,
  Input,
  Button,
  Select,
  Text,
  Container,
  Textarea,
  Divider,
  Link,
  Flex
} from 'theme-ui'
import { useRouter } from 'next/router'
import countries from '../../lib/countries'

export default function BankApplyForm() {
  const { query } = useRouter()
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <>
      <Link
        href="/bank"
        sx={{ textTransform: 'uppercase', textDecoration: 'none' }}
        passHref
      >
        <Button variant="outline" sx={{ py: 1, ml: 3, mb: 2 }}>
          &larr; Back
        </Button>
      </Link>
      <Flex sx={{ flexDirection: 'column', pl: 3 }}>
        <Text
          sx={{
            fontSize: [36, null, 48],
            fontWeight: 'bold',
            color: 'primary'
          }}
        >
          Sign up for Hack Club Bank!
        </Text>
        <Text>
          Hack Club Bank is open to all US-based Hack Clubs, hackathons, and
          student-led nonprofits.
          <br />
          There are three steps to getting on Hack Club Bank:
          <ol>
            <li>Fill out this form</li>
            <li>
              Have a 30 minute introductory call with a member of the Hack Club
              Bank team
            </li>
            <li>
              Sign the Hack Club Bank fiscal sponsorship agreement (sent right
              after the call)
            </li>
          </ol>
          If you have any questions, give us a shout at{' '}
          <Link as="a" href="mailto:bank@hackclub.com">
            bank@hackclub.com
          </Link>{' '}
          or in the <strong>#bank</strong> channel on the{' '}
          <Link href="/slack">Hack Club Slack</Link>!
        </Text>
      </Flex>
      <Base method="POST" action="/api/bank-apply">
        <Text variant="headline" sx={{ color: 'primary' }}>
          Your project
        </Text>
        <Divider sx={{ borderColor: 'slate', mt: -2 }} />
        <Field
          label="Project name"
          name="eventName"
          placeholder="Windy City Hacks"
          helperText="What's the name of your event or project?"
          value={query.eventName}
          onChange={e => setValues({ ...values, eventName: e.target.value })}
          required
        />
        <Field
          label="Project website"
          name="eventWebsite"
          placeholder="https://hackclub.com"
          type="url"
          helperText="If you don't have one yet, you can leave this blank."
          value={query.eventWebsite}
          onChange={e => setValues({ ...values, eventWebsite: e.target.value })}
        />
        <Field
          label="Project Location"
          name="eventLocation"
          placeholder="San Francisco, CA"
          type="text"
          helperText="If applicable, please format as: City, State."
          value={query.eventLocation}
          onChange={e =>
            setValues({ ...values, eventLocation: e.target.value })
          }
          required
        />

        <Label
          htmlFor="eventCountry"
          sx={{ color: 'smoke', fontSize: 18, pb: 2 }}
        >
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
          <HelperText>
            We're testing out limited support for international organizations,
            and want to know in advance if you're operating outside the US.
          </HelperText>
        </Label>

        <Label htmlFor="eventDescription" sx={{ color: 'smoke', fontSize: 18 }}>
          Tell us about your project!
          <Textarea name="eventDescription" sx={{ bg: 'dark' }} required />
          <HelperText>
            1-2 sentences summarizing what you'd like to use Hack Club Bank for.
            This is just to help us know what to expect during the call!
          </HelperText>
        </Label>

        <Text variant="headline" sx={{ color: 'primary' }}>
          Your profile
        </Text>
        <Divider sx={{ borderColor: 'slate', mt: -2 }} />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Field
            label="First name"
            name="firstName"
            placeholder="Fiona"
            value={query.firstName}
            onChange={e => setValues({ ...values, firstName: e.target.value })}
            required
          />
          <Field
            label="Last name"
            name="lastName"
            placeholder="Hackworth"
            value={query.lastName}
            onChange={e => setValues({ ...values, lastName: e.target.value })}
            required
          />
        </Box>
        <Field
          label="Email address"
          name="userEmail"
          placeholder="fiona@hackclub.com"
          type="email"
          value={query.userEmail}
          onChange={e => setValues({ ...values, userEmail: e.target.value })}
          required
        />
        <Field
          label="Phone"
          name="userPhone"
          placeholder="1-855-625-HACK"
          type="tel"
          helperText="We'll only use this if we need to get in touch with you urgently."
          value={query.userPhone}
          onChange={e => setValues({ ...values, userPhone: e.target.value })}
          required
        />
        <Field
          label="Birthday"
          name="userBirthday"
          type="date"
          width="20%"
          required
        />

        <Label htmlFor="returningUser" sx={{ color: 'smoke', fontSize: 18 }}>
          Have you used Hack Club Bank before?
          <Select
            name="returningUser"
            sx={{ bg: 'dark' }}
            value={query.returningUser}
            onChange={e =>
              setValues({ ...values, returningUser: e.target.value })
            }
          >
            <option value="No, first time!">No, first time!</option>
            <option value="Yes, I have used Hack Club Bank before">
              Yes, I have used Hack Club Bank before
            </option>
          </Select>
        </Label>

        <Text variant="subheadline" sx={{ mt: 3, mb: 0 }}>
          Mailing address
        </Text>
        <HelperText>
          This is so we can send you some swag and goodies if you ever request
          them!
        </HelperText>

        <Field
          label="Address (line 1)"
          name="addressLine1"
          placeholder="8605 Santa Monica Blvd"
          type="text"
          required
        />
        <Field
          label="Address (line 2)"
          name="addressLine2"
          placeholder="Suite 86294"
          type="text"
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 2
          }}
        >
          <Field
            label="City"
            name="addressCity"
            placeholder="West Hollywood"
            type="text"
            required
          />
          <Field
            label="State"
            name="addressState"
            placeholder="CA"
            type="text"
            required
          />
          <Field
            label="Zip Code"
            name="addressZip"
            placeholder="90069"
            type="text"
            required
          />
          <Field
            label="Country"
            name="addressCountry"
            placeholder="USA"
            type="text"
            required
          />
        </Box>

        <Button
          sx={{ bg: 'red', mt: [2, 3], py: 2, fontSize: 24 }}
          type="submit"
          onSubmit={handleSubmit}
        >
          Apply
        </Button>
      </Base>
    </>
  )
}

function Field({
  placeholder,
  label,
  name,
  type,
  helperText,
  width,
  value,
  onChange,
  required
}) {
  return (
    <Box sx={{ my: 2 }}>
      <Label htmlFor={name} sx={{ color: 'smoke', fontSize: 18 }}>
        {label}
        <Input
          id={name}
          placeholder={placeholder}
          name={name}
          type={type}
          sx={{
            bg: 'dark',
            width: `${width ? width : '100%'}`
          }}
          value={value}
          onChange={onChange}
          required={required}
        />
        {helperText && <HelperText>{helperText}</HelperText>}
      </Label>
    </Box>
  )
}

function HelperText({ children }) {
  return (
    <Text variant="caption" sx={{ color: 'muted', fontSize: 16 }}>
      {children}
    </Text>
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
