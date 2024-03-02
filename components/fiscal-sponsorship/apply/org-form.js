import { useState, useEffect } from 'react'
import { Input, Textarea } from 'theme-ui'
// import Checkbox from './checkbox'
import Field from './field'
import AutofillColourFix from './autofill-colour-fix'

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
          sx={AutofillColourFix}
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
          type="url"
          placeholder="hackclub.com"
          sx={{ ...AutofillColourFix }}
        />
      </Field>
      <Field
        name="eventLocation"
        label={`${org} location`}
        description="If your organization runs online, put the city, state, & country you live in."
        requiredFields={requiredFields}
      >
        <Input
          name="eventLocation"
          id="eventLocation"
          placeholder="Shelburne, Vermont, USA"
          sx={AutofillColourFix}
        />
      </Field>
      {/* <Field
        name="transparent"
        label="Transparency mode"
        col={false}
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
      <Field
        name="eventDescription"
        label={`Tell us about your ${org.toLowerCase()}!`}
        description="1 or 2 sentences will suffice"
        requiredFields={requiredFields}
      >
        <Textarea
          name="eventDescription"
          id="eventDescription"
          rows={2}
          sx={{
            resize: 'vertical',
            width: '100%',
            ...AutofillColourFix
          }}
        />
      </Field>
    </>
  )
}
