import { Checkbox, Input, Label, Text, Box } from 'theme-ui'
import useForm from '../../lib/use-form'
import Submit from '../submit'
import { Slide } from 'react-reveal'

export default function RsvpForm() {
  const { status, formProps, useField } = useForm('/api/bin/rsvp', null, {
    clearOnSubmit: 60000,
    method: 'POST',
    initData: {}
  })

  return (
    <>
      <form {...formProps}>
        <Label>
          <Text>Email</Text>
          <Input
            {...useField('email')}
            placeholder="fiona@hackclub.com"
            required
            sx={{ border: '1px solid', borderColor: 'muted', mb: 2 }}
          />
        </Label>
        <Label variant="labelHoriz" sx={{ fontSize: 1, pt: 2 }}>
          <Checkbox
            {...useField('high_schooler', 'checkbox')}
            defaultChecked={false}
          />
          I am a current high school student or younger.
        </Label>
        <Label variant="labelHoriz" sx={{ fontSize: 1, pt: 2 }}>
          <Checkbox {...useField('stickers', 'checkbox')} />I want a sticker
          sheet.
        </Label>
        <Box sx={{ display: useField('stickers', 'checkbox').checked ? 'block' : 'none' }}>
          <Slide left delay={20}>
            <Label mt={2}>
              Address (line 1)
              <Input
                {...useField('address_line_1')}
                placeholder="1 Hacker Way"
                sx={{ border: '1px solid', borderColor: 'muted' }}
              />
            </Label>
            <Label mt={2}>
              Address (zip code)
              <Input
                {...useField('address_zip')}
                placeholder="01337"
                sx={{ border: '1px solid', borderColor: 'muted' }}
              />
            </Label>
          </Slide>
        </Box>
        <Submit
          status={status}
          labels={{
            default: 'Submit',
            error: 'Something went wrong',
            success: 'Success!'
          }}
        />
      </form>
    </>
  )
}
