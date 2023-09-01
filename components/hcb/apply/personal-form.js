import { Input, Flex, Label, Radio } from 'theme-ui'
import Checkbox from './checkbox'
import AddressInput from './address-input'
import Field from './field'
import AutofillColourFix from './autofill-colour-fix'
import { useState } from 'react'

export default function PersonalInfoForm({
  setValidationResult,
  requiredFields
}) {
  const [selectedContactOption, setSelectedContactOption] = useState('Email')
  const [email, setEmail] = useState(
    window.sessionStorage.getItem('bank-signup-userEmail')
  ) // For display only, is not used for data submission.

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
        name="userPhone"
        label="Phone"
        description="We’ll only use this if we need to get in touch with you urgently."
        requiredFields={requiredFields}
      >
        <Input
          name="userPhone"
          id="userPhone"
          type="tel"
          placeholder="(123) 456-7890"
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
      <Field
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

      <Field
        name="contactOption"
        label="Preferred contact channel"
        description="So we know where to message you about your application!"
        requiredFields={requiredFields}
      >
        <Flex sx={{ gap: 4 }}>
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
          <Label
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Radio
              name="contactOption"
              value="Slack"
              onInput={() => setSelectedContactOption('Slack')}
            />
            Slack
          </Label>
        </Flex>
        {selectedContactOption === 'Slack' ? (
          <Field name="slackUsername" requiredFields={requiredFields}>
            <Input
              name="slackUsername"
              id="slackUsername"
              placeholder="Your name in the Hack Club Slack"
              sx={{ ...AutofillColourFix }}
            />
          </Field>
        ) : selectedContactOption === 'Email' ? (
          <div>
            We'll use {email ?? 'whatever you put for your email above!'}
          </div>
        ) : null}
      </Field>
      <Field
        name="accommodations"
        label="Accessability needs"
        description="Please specify any accommodations or accessability needs you have so we can support you during onboarding and while using HCB"
        requiredFields={requiredFields}
      >
        <Input
          name="accommodations"
          id="accommodations"
          placeholder="I need a screen reader"
          sx={{ ...AutofillColourFix }}
        />
      </Field>
    </>
  )
}
