import { Card, Label, Input, Checkbox, Textarea } from 'theme-ui'
import { useRouter } from 'next/router'
import useForm from '../../lib/use-form'
import Submit from '../submit'

const JoinForm = ({ sx = {} }) => {
  const router = useRouter()
  const { status, formProps, useField } = useForm('/api/join/', null, { clearOnSubmit: 5000, method: 'POST', initData: router.query.c ? {club: router.query.c} : (router.query.C ? {club: router.query.C} : {}) })

  return (
    <Card sx={{ maxWidth: 'narrow', mx: 'auto', label: { mb: 3 }, ...sx }}>
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
        <Label variant="labelHoriz">
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
            success: 'Email coming soon!'
          }}
        />
      </form>
    </Card>
  )
}

export default JoinForm
