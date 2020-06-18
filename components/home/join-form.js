import { Card, Label, Input, Checkbox, Textarea } from 'theme-ui'
import useForm from '../../lib/use-form'
import Submit from '../submit'

const JoinForm = ({ sx = {} }) => {
  const { status, formProps, useField } = useForm('https://v3.hackclub.com/api/som-join/')

  return (
    <Card sx={{ maxWidth: 'narrow', mx: 'auto', ...sx }}>
      <form {...formProps}>
        <Label>
          Full name
          <Input {...useField('name')} placeholder="Fiona Hackworth" required />
        </Label>
        <Label>
          Email address
          <Input
            {...useField('email')}
            placeholder="fiona@hackclub.com"
            required
          />
        </Label>
        <Label variant="labelCheckbox">
          <Checkbox {...useField('teen', 'checkbox')} />
          Are you a teenager?
        </Label>
        <Label>
          Why do you want to join Hack Club?
          <Textarea
            {...useField('reason')}
            placeholder="Write a few sentences."
            required
          />
        </Label>
        <Submit
          status={status}
          labels={{
            default: 'Request invitation',
            error: 'Something went wrong',
            success: 'Check your email!'
          }}
        />
      </form>
    </Card>
  )
}

export default JoinForm
