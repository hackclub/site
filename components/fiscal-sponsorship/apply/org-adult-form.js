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
