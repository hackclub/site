import { useEffect, useState } from 'react'
import Icon from '../../icon'

export default function Checkbox({ name, defaultChecked = false, size = 38 }) {
  const [checked, setChecked] = useState(defaultChecked)
  const toggle = () => setChecked(!checked)

  /* Fill in the field with the value from sessionStorage.
    For other input elements, the value is set in the Field component,
    but these checkboxes hold their state in useState rather than in the DOM. */
  useEffect(() => {
    const value = sessionStorage.getItem('bank-signup-' + name)
    if (value) {
      const input = document.getElementById(name)
      input && setChecked(value === 'true')
    }
  }, [name])

  return (
    <>
      <input aria-hidden="true" type="hidden" value={checked} name={name} />
      <Icon
        glyph={checked ? 'checkmark' : 'checkbox'}
        size={size}
        id={name}
        name={name}
        aria-checked={checked}
        role="checkbox"
        tabindex="0"
        onClick={() => toggle()}
        onKeyDown={e => e.key === 'Enter' && toggle()}
      />
    </>
  )
}
