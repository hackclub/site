import { useState } from 'react'
import { Input, Select, Textarea } from 'theme-ui'
import Field from './field'
import useOrganizationI18n from '../organizationI18n'

export default function OrganizationAdultForm({ requiredFields }) {
  const org = useOrganizationI18n()
  const [teenagerLed, setTeenagerLed] = useState('true')

  const onTeenagerLedChange = e => setTeenagerLed(e.target.value)

  return (
    <>
      <Field
        name="eventTeenagerLed"
        label={`Is your ${org.toLowerCase()} led by teenagers?`}
        col={true}
        description={`This means your ${org.toLowerCase()} was founded and is being led exclusively by teenagers.`}
        requiredFields={requiredFields}
      >
        <Select
          name="eventTeenagerLed"
          id="eventTeenagerLed"
          onChange={onTeenagerLedChange}
          value={teenagerLed}
        >
          {Object.entries({ Yes: 'true', No: 'false' }).map(([name, value]) => (
            <option key={name} value={value}>
              {name}
            </option>
          ))}
        </Select>
      </Field>

      {teenagerLed === 'false' && (
        <>
          <Field
            name="eventPoliticalActivity"
            label={`Please describe any political activity your ${org.toLowerCase()} is involved in`}
            description="This includes but is not limited to protests, public demonstrations, political education, and lobbying."
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

          <Field
            name="eventAnnualBudget"
            label="What is your estimated annual budget (USD) for this year?"
            requiredFields={requiredFields}
          >
            <Input
              name="eventAnnualBudget"
              id="eventAnnualBudget"
              type="number"
              min={0}
              step={1}
              placeholder="10,000"
            />
          </Field>
        </>
      )}
    </>
  )
}
