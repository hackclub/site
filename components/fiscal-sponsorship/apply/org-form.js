import { useState, useEffect } from 'react'
import { Input, Link, Select, Text, Textarea } from 'theme-ui'
import Checkbox from './checkbox'
import Field from './field'
// This is using country-list instead of country-list-js as it has a smaller bundle size
import useOrganizationI18n from '../organizationI18n'
import OrganizationAdultForm from './org-adult-form'
import { useTeenagerLedContext } from './teenager-led-context'

export default function OrganizationInfoForm({ requiredFields }) {
  const org = useOrganizationI18n()

  const { teenagerLed } = useTeenagerLedContext()

  const [hasWebsite, setHasWebsite] = useState(true)
  const onHasWebsiteChange = e => {
    const newValue = e.target.value === 'true'
    setHasWebsite(newValue)
  }

  const [isPolitical, setIsPolitical] = useState(null)
  const onIsPoliticalChange = e => {
    const newValue = e.target.value === 'true'
    setIsPolitical(newValue)
  }

  const politicalActivityTextarea = admittedToActivity => (
    <Field
      name="eventPoliticalActivity"
      label={`Please describe ${admittedToActivity ? 'the' : 'any'} political activity your ${org.toLowerCase()} is involved in${admittedToActivity ? '.' : ', if any.'}`}
      requiredFields={requiredFields}
    >
      <Textarea
        name="eventPoliticalActivity"
        id="eventPoliticalActivity"
        placeholder="We are involved in..."
        rows={3}
        sx={{
          resize: 'vertical'
        }}
      />
    </Field>
  )

  const noPoliticalActivity = (
    <input type="hidden" name="eventPoliticalActivity" value="None." />
  )

  return (
    <>
      <Field
        name="eventName"
        label={`${org} name`}
        requiredFields={requiredFields}
      >
        <Input
          name="eventName"
          id="eventName"
          placeholder="Shelburne School Hackathon"
        />
      </Field>

      <Field
        name="eventDescription"
        label={`Tell us about your ${org.toLowerCase()}`}
        requiredFields={requiredFields}
      >
        <Text variant="caption">
          Are you running a hackathon, robotics team, organizing a nonprofit,
          building a project, etc.?
        </Text>
        <Textarea
          name="eventDescription"
          id="eventDescription"
          rows={3}
          sx={{
            resize: 'vertical'
          }}
        />
      </Field>

      <Field
        label="Does your project have a website?"
        name="eventHasWebsite"
        requiredFields={requiredFields}
      >
        <Select
          onChange={onHasWebsiteChange}
          value={hasWebsite ? 'true' : 'false'}
        >
          {Object.entries({ Yes: 'true', No: 'false' }).map(([name, value]) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </Field>

      {hasWebsite ? (
        <Field
          name="eventWebsite"
          label={`${org} website`}
          requiredFields={requiredFields}
        >
          <Input
            name="eventWebsite"
            id="eventWebsite"
            inputMode="url"
            placeholder="hackclub.com"
          />
        </Field>
      ) : (
        <>
          {/* No website */}
          <input type="hidden" name="eventWebsite" value="" />

          {teenagerLed === 'true' && (
            /* don't show Boba Drops to adult-led orgs lol*/
            <Text variant="caption">
              A website is not required to apply for HCB. However, most
              successful projects that raise money have a custom-build website.
              If you've never built a website before, checkout{' '}
              <Link href="https://boba.hackclub.com/">Boba Drops</Link>, a Hack
              Club workshop on how to build a website.
            </Text>
          )}
        </>
      )}

      {teenagerLed === 'true' ? (
        <>
          <Field
            name="eventIsPolitical"
            label="Is your project involved with political activity?"
            requiredFields={requiredFields}
          >
            <Select
              name="eventIsPolitical"
              onChange={onIsPoliticalChange}
              value={isPolitical ? 'true' : 'false'}
            >
              {Object.entries({ Yes: 'true', No: 'false' }).map(
                ([name, value]) => (
                  <option key={name} value={value}>
                    {name}
                  </option>
                )
              )}
            </Select>
          </Field>
          {isPolitical ? politicalActivityTextarea(true) : noPoliticalActivity}
        </>
      ) : (
        // Adults always get the text area
        politicalActivityTextarea(false)
      )}
      <Text variant="caption">
        This includes but is not limited to protests, public demonstrations,
        political education, and lobbying.
      </Text>

      {/* Move transparency mode prompt to HCB onboarding */}
      {/* <Field
        name="transparent"
        label="Transparency mode"
        col={true}
        description={`
                    Transparent accounts’ balances and donations are public.
                    You choose who has access to personal details.
                    This can be changed later.
                    As an example, Hack Club's finances are transparent!
                `}
        requiredFields={requiredFields}
      >
        <Checkbox defaultChecked={true} name="transparent" />
      </Field> */}

      <OrganizationAdultForm requiredFields={requiredFields} />
    </>
  )
}
