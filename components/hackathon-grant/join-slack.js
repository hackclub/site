import { Card, Label, Input, Textarea, Select, Grid } from 'theme-ui'
import { useRouter } from 'next/router'
import useForm from '../../lib/use-form'
import Submit from '../submit'

const JoinForm = ({ sx = {} }) => {
  const router = useRouter()
  const { status, formProps, useField } = useForm('/api/join/', null, {
    clearOnSubmit: 5000,
    method: 'POST',
    initData: router.query.continent
      ? { continent: router.query.continent }
      : {}
  })
  return (
    <Card
      sx={{ maxWidth: 'narrow', mx: 'auto', mt: 5, label: { mb: 3 }, ...sx }}
    >
      <form {...formProps}>
        <Grid columns={[1, 2]} gap={1} sx={{ columnGap: 3 }}>
          <Label>
            Full name
            <Input
              {...useField('name')}
              placeholder="Fiona Hackworth"
              required
            />
          </Label>
          <Label>
            Email address
            <Input
              {...useField('email')}
              placeholder="fiona@hackclub.com"
              required
            />
          </Label>
          <Label>
            Your home continent
            <Select
              {...useField('continent')}
              required
              sx={{ color: useField('continent').value == '' ? 'muted' : '' }}
            >
              <option value="" selected disabled hidden>
                Select a continent...
              </option>
              <option>Africa</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>North America</option>
              <option value="Australia">Oceania / Australia</option>
              <option>South America</option>
            </Select>
          </Label>
          <Label>
            Current education level
            <Select
              {...useField('educationLevel')}
              required
              sx={{
                color: useField('educationLevel').value == '' ? 'muted' : ''
              }}
            >
              <option value="" selected disabled hidden>
                Select a level...
              </option>
              <option value="middle">
                Middle School (approx. 11 to 14)&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              </option>
              <option value="high">High School (approx. 14 to 18)</option>
              <option value="tertiary">Tertiary Education (18+)</option>
            </Select>
          </Label>
        </Grid>
        <Label>
          Why do you want to join the Hack Club Slack?
          <Textarea
            {...useField('reason')}
            defaultValue="Application for the high-school hackathon grant"
            // placeholder="Write a few sentences."
            required
          >
            Hackathon Grant
          </Textarea>
        </Label>
        <Submit
          status={status}
          mt={'0px!important'}
          labels={{
            default:
              process.env.NEXT_PUBLIC_OPEN == 'true'
                ? 'Get Invite'
                : 'Join Waitlist',
            error: 'Something went wrong',
            success:
              process.env.NEXT_PUBLIC_OPEN == 'true'
                ? 'Email coming soon!'
                : "We'll be in touch soon!"
          }}
        />
      </form>
    </Card>
  )
}

export default JoinForm
