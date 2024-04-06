import {
  Box,
  Card,
  Grid,
  Input,
  Label,
  Link,
  Select,
  Text,
  Textarea
} from 'theme-ui'
import useForm from '../../lib/use-form'
import Submit from '../submit'
import { getCookie, hasCookie } from 'cookies-next'

import { withRouter } from 'next/router'

const JoinForm = ({ sx = {}, router }) => {
  const useWaitlist = process.env.NEXT_PUBLIC_OPEN !== 'true'

  const { status, formProps, useField } = useForm('/api/join/', null, {
    clearOnSubmit: 60000,
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
        <Grid columns={[1, 3]} gap={1} sx={{ columnGap: 2 }}>
          <Label>
            Full name
            <Input
              {...useField('name')}
              placeholder="Fiona Hackworth"
              required
              id="joiner_full_name"
            />
          </Label>
          <Label sx={{ width: '100%' }}>
            Email address
            <Input
              {...useField('email')}
              placeholder="fiona@hackclub.com"
              required
            />
          </Label>
          <Label>
            Education level
            <Select
              {...useField('year')}
              required
              sx={{ color: useField('continent').value === '' ? 'muted' : '' }}
            >
              <option value="" selected disabled hidden>
                Select a level...
              </option>
              <option value="middle">Middle School</option>
              <option value="high">High School</option>
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
        {/*{isAdult && (
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
        )}*/}
        <Box>
          <Submit
            status={status}
            mt={'0px!important'}
            labels={{
              default: useWaitlist ? 'Join Waitlist' : 'Get Invite',
              error: 'Something went wrong',
              success: useWaitlist
                ? "You're on the Waitlist!"
                : 'Check your email for invite!'
            }}
            disabled={status === 'loading' || status === 'success'}
          />
          {status === 'success' && !useWaitlist && (
            <Text
              variant="caption"
              color="secondary"
              as="div"
              sx={{
                maxWidth: '600px',
                textAlign: 'center',
                mt: 3
              }}
            >
              Search for "Slack" in your mailbox! Not there?{' '}
              <Link href="mailto:slack@hackclub.com" sx={{ ml: 1 }}>
                Send us an email
              </Link>
            </Text>
          )}
        </Box>
      </form>
    </Card>
  )
}

function AdultChecker() {
  return (
    <Label>
      Birthday
      <Select
        required
        onChange={handleYearChange}
        sx={{ color: useField('continent').value === '' ? 'muted' : '' }}
      >
        <option value="" selected disabled hidden>
          Year
        </option>
        <option value="middle" disabled hidden>
          Hi, I'm hidden!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        </option>
        {years
          .map(year => (
            <option key={year} value={year}>
              {year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </option>
          ))
          .reverse()}
      </Select>
    </Label>
  )
}

export default withRouter(JoinForm)
