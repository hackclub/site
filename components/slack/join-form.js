import {
  Card,
  Label,
  Input,
  Textarea,
  Select,
  Grid,
  Text,
  Link,
  Box
} from 'theme-ui'
import { useRouter } from 'next/router'
import useForm from '../../lib/use-form'
import Submit from '../submit'
import { getCookie, hasCookie } from 'cookies-next'

const JoinForm = ({ sx = {} }) => {
  const router = useRouter()
  const { status, formProps, useField } = useForm('/api/join/', null, {
    clearOnSubmit: 5000,
    method: 'POST',
    initData: hasCookie('continent')
      ? {
          continent: getCookie('continent'),
          reason: router.query.reason,
          event: router.query.event
        }
      : { reason: router.query.reason, event: router.query.event }
  })

  const eventReferrer = useField('event').value
  const isAdult = useField('educationLevel').value === 'tertiary'
  const useWaitlist = process.env.NEXT_PUBLIC_OPEN !== 'true'

  return (
    <Card sx={{ maxWidth: 'narrow', mx: 'auto', label: { mb: 3 }, ...sx }}>
      <form {...formProps}>
        {eventReferrer && (
          <Box
            sx={{
              bg: 'purple',
              color: 'white',
              p: 2,
              mb: 3,
              borderRadius: 5,
              textAlign: 'center'
            }}
          >
            <Text variant="headline" sx={{ fontSize: 3 }}>
              {eventReferrer === 'onboard'
                ? "We can't wait to see your PCB!"
                : `We can't wait to see you at ${eventReferrer}!`}
            </Text>

            <br />
            <Text variant="subtitle" sx={{ fontSize: 2 }}>
              <i> In the meantime, we'll be hanging around in the Slack </i>
            </Text>
          </Box>
        )}
        <Grid columns={[1, 2]} gap={1} sx={{ columnGap: 2 }}>
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
              sx={{ color: useField('continent').value === '' ? 'muted' : '' }}
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
                color: useField('educationLevel').value === '' ? 'muted' : ''
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
            sx={{ maxWidth: '600px', textAlign: 'center', mb: 2 }}
          >
            Hold your horses! <b>Our Slack community is for minors</b>! To find
            out more about what all we do, check out our{' '}
            <Link href="https://github.com/hackclub"> Github </Link>. If you're
            a parent or educator & want to talk to a member of our team, send us
            a email at{' '}
            <Link href="mailto:team@hackclub.com">team@hackclub.com</Link>.
          </Text>
        )}

        {!isAdult && (
          <Submit
            status={status}
            mt={'0px!important'}
            labels={{
              default: useWaitlist ? 'Join Waitlist' : 'Get Invite',
              error: 'Something went wrong',
              success: useWaitlist
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
