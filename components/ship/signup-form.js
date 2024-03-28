import { Card, Input, Label } from "theme-ui"
import useForm from "../../lib/use-form"
import Submit from "../submit"

export default function SignupForm({ t, email }) {
  const { status, formProps, useField } = useForm('/api/ship/subscribe', null, {
    clearOnSubmit: 60000,
    method: 'POST',
    initData: { t }
  })
  const tReferrer = useField('t').value
  return (
    <Card sx={{ maxWidth: 'narrow', mx: 'auto', label: { mb: 3 } }}>
      <form {...formProps}>
        {tReferrer && (
          <Input {...useField('t', 'hidden')} />
        )}
        <Label>Email
          <Input
            {...useField('email')}
            placeholder="fiona@hackclub.com"
            required
          />
        </Label>
        <Submit
          status={status}
        />
      </form>
    </Card>
  )
}