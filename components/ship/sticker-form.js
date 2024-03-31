import { Card, Input, Label, Text } from 'theme-ui'
import useForm from '../../lib/use-form'
import Submit from '../submit'

export default function StickerForm({}) {
  const { status, formProps, useField } = useForm('/api/ship/stickers', null, {
    clearOnSubmit: 60000,
    method: 'POST',
    initData: {}
  })

  return (
    <Card sx={{ maxWidth: 'narrow', mx: 'auto', label: { mb: 3 } }}>
      <form {...formProps}>
        <Text variant="subtitle" as="p" sx={{ mt: 0, fontWeight: 'bold' }}>
          To send you stickers, we need your address.
        </Text>
        <Text variant="caption" as="p" sx={{ mb: 2 }}>
          We'll delete it after we ship your package!
        </Text>
        <Label>
          Name
          <Input
            {...useField('name', 'text')}
            autoComplete="name"
            placeholder="Fiona Hackworth"
            required
            sx={{ border: '1px solid', borderColor: 'muted' }}
          />
        </Label>
        <Label>
          Address Line
          <Input
            {...useField('address_line_1')}
            autoComplete="street-address"
            placeholder="15 Falls Rd"
            required
            sx={{ border: '1px solid', borderColor: 'muted' }}
          />
        </Label>
        <Label>
          City
          <Input
            {...useField('address_city')}
            autoComplete="city"
            placeholder="Shelburne"
            required
            sx={{ border: '1px solid', borderColor: 'muted' }}
          />
        </Label>
        <Label>
          State / Province
          <Input
            {...useField('address_state')}
            autoComplete="state"
            placeholder="Vermont"
            required
            sx={{ border: '1px solid', borderColor: 'muted' }}
          />
        </Label>
        <Label>
          Country
          <Input
            {...useField('address_country')}
            autoComplete="country"
            placeholder="United States"
            required
            sx={{ border: '1px solid', borderColor: 'muted' }}
          />
        </Label>
        <Label>
          Zip / Postal Code
          <Input
            {...useField('address_zip')}
            autoComplete="postal-code"
            placeholder="12345"
            required
            sx={{ border: '1px solid', borderColor: 'muted' }}
          />
        </Label>
        <Label>
          Phone Number
          <Input
            {...useField('phone_number', 'tel')}
            placeholder="+1 802 210 3489"
            autoComplete="tel"
            required
            sx={{ border: '1px solid', borderColor: 'muted' }}
          />
        </Label>
        <Submit status={status} sx={{ mt: 0 }} />
      </form>
    </Card>
  )
}
