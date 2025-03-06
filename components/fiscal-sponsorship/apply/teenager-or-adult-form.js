import { useEffect } from 'react'
import { Select } from 'theme-ui'
import Field from './field'
import useOrganizationI18n from '../organizationI18n'
import { useTeenagerLedContext } from './teenager-led-context'

export default function TeenagerOrAdultForm({ requiredFields }) {
  const org = useOrganizationI18n()
  const { teenagerLed, setTeenagerLed } = useTeenagerLedContext()

  const onTeenagerLedChange = e => {
    const newValue = e.target.value
    setTeenagerLed(newValue)

    if (newValue === 'true') {
      // Clear cache of removed fields
      sessionStorage.removeItem('bank-signup-eventPoliticalActivity')
      sessionStorage.removeItem('bank-signup-eventAnnualBudget')
    }
  }

  useEffect(() => {
    // [@garyhtou] welp... this exists because the Field component will cache
    // input values and set them on page load. It does it by directly setting
    // `input.value` with JavaScript; bypassing React. Because of that, the
    // `teenagerLed` state may not be synced with the DOM input value. This code
    // syncs `teenagerLed` with the DOM input value.
    // NOTE: This depends on Field's useEffect hook to run first.
    const eventTeenagerLedElm = document.getElementById('eventTeenagerLed')
    setTeenagerLed(eventTeenagerLedElm.value)
  }, [])

  return (
    <>
      <Field
        name="eventTeenagerLed"
        label={'Are you a teenager?'}
        col={true}
        description={'18 and under'}
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
    </>
  )
}
