import { Card, Label, Input, Checkbox, Textarea } from 'theme-ui'
import useForm from '../../lib/use-form'
import Submit from '../submit'

const RequestForm = () => {
  const { status, formProps, useField } = useForm('/api/join')

  return (
    <form {...formProps}>
      <Label>
        Full name
        <Input {...useField('name')} placeholder="Fiona Hackworth" required />
      </Label>
      <Label>
        Email address (for tracking)
        <Input
          {...useField('email')}
          placeholder="fiona@hackclub.com"
          required
        />
      </Label>
      <Submit status={status} />
    </form>
  )
}

export default RequestForm
