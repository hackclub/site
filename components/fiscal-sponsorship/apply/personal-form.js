import { Input, Flex, Label, Radio, Grid, Select, Box, Text } from 'theme-ui'
import Field from './field'
import Checkbox from './checkbox'
import { useEffect, useState } from 'react'
import { useTeenagerLedContext } from './teenager-led-context'
import { getNames } from 'country-list'
import { getCookie } from 'cookies-next'

export default function PersonalInfoForm({ requiredFields }) {
  const [selectedContactOption, setSelectedContactOption] = useState('Email')
  const { teenagerLed } = useTeenagerLedContext()
  const [defaultReferralCode, setDefaultReferralCode] = useState('')

  useEffect(() => {
	const referralCode = getCookie('referral')
	if (referralCode) {
	  setDefaultReferralCode(referralCode)
	}
  }, [])

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

      {teenagerLed === 'true' ? (
        <Field
          name="contactOption"
          label="Preferred contact channel"
          requiredFields={requiredFields}
        >
          <Flex
            sx={{
              flexDirection: ['column', 'row'],
              rowGap: 2,
              columnGap: 4,
              width: '100%'
            }}
          >
            <Label
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: 'fit-content'
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
                gridTemplateColumns: 'auto 1fr',
                flexGrow: 1
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
                      placeholder="FionaH"
                      autocomplete="off"
                      data-1p-ignore
                      autoFocus
                    />
                  </Field>
                </>
              ) : null}
            </Grid>
          </Flex>
        </Field>
      ) : (
        // When not teenage-led, default to "email" as preferred contact channel
        <input name="contactOption" type="hidden" value="Email" />
      )}

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
        label="Birthday"
        requiredFields={requiredFields}
      >
        <Input type="date" name="userBirthday" id="userBirthday" />
      </Field>

      <Flex sx={{ flexDirection: 'column', gap: 1 }}>
        <Field
          name="userAddressLine1"
          label={'Your personal address'}
          requiredFields={requiredFields}
        >
          <Input
            name="userAddressLine1"
            id="userAddressLine1"
            placeholder="8605 Santa Monica Blvd, Suite 86294"
          />
        </Field>

        <Grid columns={2} gap={1}>
          <Field
            name="userAddressCity"
            label={<Text sx={{ fontSize: 1 }}>City</Text>}
            requiredFields={requiredFields}
          >
            <Input
              name="userAddressCity"
              placeholder="Santa Monica"
              id="userAddressCity"
            />
          </Field>
          <Field
            name="userAddressProvince"
            label={<Text sx={{ fontSize: 1 }}>State / Province</Text>}
            requiredFields={requiredFields}
          >
            <Input
              name="userAddressProvince"
              placeholder="California"
              id="userAddressProvince"
            />
          </Field>
          <Field
            name="userAddressPostalCode"
            label={<Text sx={{ fontSize: 1 }}>ZIP / Postal code</Text>}
            requiredFields={requiredFields}
          >
            <Input
              name="userAddressPostalCode"
              placeholder="90069"
              id="userAddressPostalCode"
            />
          </Field>
          <Field
            name="userAddressCountry"
            label={<Text sx={{ fontSize: 1 }}>Country</Text>}
            requiredFields={requiredFields}
          >
            <Select name="userAddressCountry" id="userAddressCountry">
              {getNames()
                .sort()
                .sort(item => (item === 'United States of America' ? -1 : 1))
                .map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
            </Select>
          </Field>
        </Grid>
      </Flex>

      <Field
        name="referredBy"
        label="How did you hear about HCB?"
        requiredFields={requiredFields}
      >
        <Input
          name="referredBy"
          id="referredBy"
          placeholder="Word of mouth, an event, etc. Be specific!"
        />
      </Field>

	  <Field
		name="referralCode"
		label="Referral code"
		description="Have a referral code? Enter it here!"
		requiredFields={requiredFields}
	  >
		<Input
			name="referralCode"
			id="referralCode"
			placeholder="rec123456789"
			value={defaultReferralCode}
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
