import { Input, Flex, Label, Radio, Grid, Select } from 'theme-ui'
import Field from './field'
import { useState } from 'react'

export default function PersonalInfoForm({ requiredFields }) {
  const [selectedContactOption, setSelectedContactOption] = useState('Email')

  return (
    <>
      <Flex sx={{ justifyContent: 'space-between', gap: 4 }}>
        <Field
          name="firstName"
          label="First name"
          requiredFields={requiredFields}
        >
          <Input name="firstName" id="firstName" placeholder="Fiona" />
        </Field>
        <Field
          name="lastName"
          label="Last name"
          requiredFields={requiredFields}
        >
          <Input name="lastName" id="lastName" placeholder="Hacksworth" />
        </Field>
      </Flex>
      <Field name="userEmail" label="Email" requiredFields={requiredFields}>
        <Input
          name="userEmail"
          id="userEmail"
          type="email"
          placeholder="fiona@hackclub.com"
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
                  description="For teenagers only!"
                  name="slackUsername"
                  requiredFields={requiredFields}
                >
                  <Input
                    name="slackUsername"
                    id="slackUsername"
                    placeholder="FionaH"
                    autocomplete="off"
                    data-1p-ignore
                    autoFocus
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
          placeholder="+1 (844) 237 2290"
        />
      </Field>
      <Field
        name="userBirthday"
        label="Birth year"
        requiredFields={requiredFields}
      >
        <Select name="userBirthday" id="userBirthday" defaultValue="">
          <option value="" disabled>
            Select a year
          </option>
          {/* show a century of years starting from 13 years ago */}
          {Array.from({ length: 98 }, (_, i) => {
            const year = new Date().getFullYear() - 13 - i
            return (
              <option key={year} value={year}>
                {year}
              </option>
            )
          })}
        </Select>
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
        description="Please specify any accommodations, accessibility needs, or other important information so we can support you during onboarding and while using HCB."
        requiredFields={requiredFields}
      >
        <Input
          name="accommodations"
          id="accommodations"
          placeholder="I use a screen reader/I need increased text size during onboarding"
        />
      </Field>
    </>
  )
}
