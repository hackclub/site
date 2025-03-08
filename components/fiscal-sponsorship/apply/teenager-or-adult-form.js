import { useEffect } from 'react'
import { Flex, Input, Label, Radio, Select } from 'theme-ui'
import Field from './field'
import { useTeenagerLedContext } from './teenager-led-context'

export default function TeenagerOrAdultForm({ requiredFields }) {
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
    const eventTeenagerLedElm = document.querySelector(
      'input[name="eventTeenagerLed"]:checked'
    )
    if (eventTeenagerLedElm) setTeenagerLed(eventTeenagerLedElm.value)
  })

  return (
    <Field
      name="eventTeenagerLed"
      label={'Are you a teenager?'}
      col={true}
      description={'18 and under'}
      requiredFields={requiredFields}
    >
      <Flex columns={2} sx={{ gap: 3 }}>
        <Label
          sx={{
            alignItems: 'center',
            backgroundColor: ' rgba(91,192,222,.25)',
            borderRadius: '.75rem',
            color: '#338eda',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: '1.25',
            padding: '1rem',
            textAlign: 'center',
            boxShadow:
              teenagerLed === 'true' ? '0 0 0 1px #fff,0 0 0 3px #338eda' : null
          }}
        >
          <Radio
            name="eventTeenagerLed"
            value="true"
            onChange={onTeenagerLedChange}
            sx={{ display: 'none!important' }}
          />
          Yes, I'm a teenager
        </Label>
        <Label
          sx={{
            alignItems: 'center',
            backgroundColor: ' rgba(91,192,222,.25)',
            borderRadius: '.75rem',
            color: '#338eda',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: '1.25',
            padding: '1rem',
            textAlign: 'center',
            boxShadow:
              teenagerLed === 'false'
                ? '0 0 0 1px #fff,0 0 0 3px #338eda'
                : null
          }}
        >
          <Radio
            name="eventTeenagerLed"
            value="false"
            onChange={onTeenagerLedChange}
            sx={{ display: 'none!important' }}
          />
          I'm an adult
        </Label>
      </Flex>
    </Field>
  )
}
