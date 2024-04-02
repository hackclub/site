import { useState, useEffect } from 'react'
import { Input, Select, Textarea } from 'theme-ui'
import Checkbox from './checkbox'
import Field from './field'
// This is using country-list instead of country-list-js as it has a smaller bundle size
import { getNames } from 'country-list'

export default function OrganizationInfoForm({ requiredFields }) {
  const [org, setOrg] = useState('Organization')

  useEffect(() => {
    if (navigator.language === 'en-GB') setOrg('Organisation')
  }, [])

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
        name="eventWebsite"
        label={`${org} website`}
        description="If you don’t have one yet, you can leave this blank."
        requiredFields={requiredFields}
      >
        <Input
          name="eventWebsite"
          id="eventWebsite"
          inputMode="url"
          placeholder="hackclub.com"
        />
      </Field>
      <Field
        name="eventLocation"
        label={`Primary country of operations`}
        requiredFields={requiredFields}
      >
        <Select name="eventLocation" id="eventLocation">
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
      <Field
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
      </Field>
      <Field
        name="eventDescription"
        label={`Tell us about your ${org.toLowerCase()}`}
        description="2–4 sentences will suffice."
        requiredFields={requiredFields}
      >
        <Textarea
          name="eventDescription"
          id="eventDescription"
          rows={3}
          sx={{
            resize: 'vertical'
          }}
        />
      </Field>
    </>
  )
}
