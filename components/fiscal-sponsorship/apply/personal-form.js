import { Input, Flex, Label, Radio, Box, Grid } from 'theme-ui'
import Field from './field'
import AutofillColourFix from './autofill-colour-fix'
import { useEffect, useState } from 'react'

export default function PersonalInfoForm({
  setValidationResult,
  requiredFields
}) {
  const [selectedContactOption, setSelectedContactOption] = useState('Email')
  const [email, setEmail] = useState('') // For display only, is not used for data submission.

  useEffect(() => {
    setEmail(window.sessionStorage.getItem('bank-signup-userEmail'))
  }, [])

  return (
    <>
      <Flex sx={{ justifyContent: 'space-between', gap: 4 }}>
        <Field
          name="firstName"
          label="First name"
          requiredFields={requiredFields}
        >
          <Input
            name="firstName"
            id="firstName"
            placeholder="Fiona"
            sx={{ ...AutofillColourFix }}
          />
        </Field>
        <Field
          name="lastName"
          label="Last name"
          requiredFields={requiredFields}
        >
          <Input
            name="lastName"
            id="lastName"
            placeholder="Hacksworth"
            sx={{ ...AutofillColourFix }}
          />
        </Field>
      </Flex>
      <Field name="userEmail" label="Email" requiredFields={requiredFields}>
        <Input
          name="userEmail"
          id="userEmail"
          type="email"
          placeholder="fiona@hackclub.com"
          onInput={e => setEmail(e.target.value)}
          sx={{ ...AutofillColourFix }}
        />
      </Field>

      <Field
        name="contactOption"
        label="Preferred contact channel"
        requiredFields={requiredFields}
      >
        <Grid
          columns={[null, 2]}
          sx={{
            rowGap: 2,
            columnGap: 4,
            width: '100%'
          }}
        >
          <Label
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Radio
              name="contactOption"
              value="Email"
              defaultChecked={true}
              onInput={() => setSelectedContactOption('Email')}
            />
            Email
          </Label>
          <Grid
            sx={{
              columnGap: 0,
              rowGap: 2,
              gridTemplateColumns: 'auto 1fr'
            }}
          >
            <Label
              sx={{
                display: 'contents',
                '~ div > label': { fontSize: 1 }
              }}
            >
              <Radio
                name="contactOption"
                value="Slack"
                onInput={() => setSelectedContactOption('Slack')}
              />
              Hack Club Slack
            </Label>
            {selectedContactOption === 'Slack' ? (
              <>
                <div />
                <Field
                  label="Your Hack Club Slack username"
                  name="slackUsername"
                  requiredFields={requiredFields}
                >
                  <Input
                    name="slackUsername"
                    id="slackUsername"
                    autoFocus
                    sx={{ ...AutofillColourFix }}
                  />
                </Field>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Field>
      <Field
        name="userPhone"
        label="Phone"
        description="We’ll only use this if we need to get in touch with you urgently."
        requiredFields={requiredFields}
      >
        <Input
          name="userPhone"
          id="userPhone"
          type="tel"
          placeholder="1-855-625-HACK"
          sx={{ ...AutofillColourFix }}
        />
      </Field>
      <Field
        name="userBirthday"
        label="Birthday"
        requiredFields={requiredFields}
      >
        <Input
          name="userBirthday"
          id="userBirthday"
          type="date"
          sx={{ ...AutofillColourFix }}
        />
      </Field>

      {/* <Field
        name="referredBy"
        label="Who were you referred by?"
        requiredFields={requiredFields}
      >
        <Input
          name="referredBy"
          id="referredBy"
          placeholder="Max"
          sx={{ ...AutofillColourFix }}
        />
      </Field>
      <Field
        name="returningUser"
        label="Have you used HCB before?"
        col={false}
        requiredFields={requiredFields}
      >
        <Checkbox name="returningUser" />
      </Field>
      <Field
        name="userAddress"
        label="Address"
        description="This is so we can send you some swag and goodies if you ever request them!"
        requiredFields={requiredFields}
      >
        <AddressInput
          name="userAddress"
          isPersonalAddressInput={true}
          setValidationResult={setValidationResult}
        />
      </Field>

      */}
      <Field
        name="accommodations"
        label="Accessibility needs"
        description="Please specify any accommodations, accessibility needs, or other important information so we can support you during onboarding and while using HCB"
        requiredFields={requiredFields}
      >
        <Input
          name="accommodations"
          id="accommodations"
          placeholder="I use a screen reader/I need increased text size during onboarding"
          sx={{ ...AutofillColourFix }}
        />
      </Field>
    </>
  )
}
