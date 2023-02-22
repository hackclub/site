import { Card, Label, Input, Textarea, Select, Grid, Text, Link } from 'theme-ui'
import { useRouter } from 'next/router'
import useForm from '../../lib/use-form'
import Submit from '../submit'

const JoinForm = ({ sx = {} }) => {
  const router = useRouter()
  const { status, formProps, useField } = useForm('/api/join/', null, {
    clearOnSubmit: 5000,
    method: 'POST',
    initData: router.query.continent
      ? { continent: router.query.continent, reason: router.query.reason }
      : { reason: router.query.reason }
  })

  const isAdult = useField('educationLevel').value == 'tertiary'
  const useWaitlist = process.env.NEXT_PUBLIC_OPEN != 'true'

  return (
    <Card sx={{ maxWidth: 'narrow', mx: 'auto', label: { mb: 3 }, ...sx }}>
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
            placeholder="Write a few sentences."
            required
          />
        </Label>
        {isAdult && (
          <Text
            variant="caption"
            color="secondary"
            as="div"
            sx={{ maxWidth: "600px", textAlign: 'center', mb: 2 }}
          >
              Hold your horses! <b>Our Slack community for teenagers</b>, and as such
              we're really careful about letting adults join. If you feel you'd
              have a place here, reach out to <Link href="mailto:conduct@hackclub.com">conduct@hackclub.com</Link>.
          </Text>
        )}
        {!isAdult && (
          <Submit
            status={status}
            mt={'0px!important'}
            labels={{
              default:
                useWaitlist
                  ? 'Join Waitlist'
                  : 'Get Invite',
              error: 'Something went wrong',
              success:
                useWaitlist
                  ? "We'll be in touch soon!"
                  : 'Email coming soon!'
            }}
          />
        )}
      </form>
    </Card>
  )
}

export default JoinForm
