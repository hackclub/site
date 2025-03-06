import { Input, Textarea } from 'theme-ui'
import Field from './field'
import useOrganizationI18n from '../organizationI18n'
import { useTeenagerLedContext } from './teenager-led-context'

export default function OrganizationAdultForm({ requiredFields }) {
  const org = useOrganizationI18n()
  const { teenagerLed } = useTeenagerLedContext()

  return (
    <>
      {teenagerLed !== 'true' && (
        <>
          <Field
            name="eventPoliticalActivity"
            label={`Please describe any political activity your ${org.toLowerCase()} is involved in, if any`}
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
