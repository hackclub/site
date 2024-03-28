import { Card, Input, Label, Text } from "theme-ui"
import useForm from "../../lib/use-form"
import Submit from "../submit"

export default function StickerForm({ }) {
  const { status, formProps, useField } = useForm('/api/ship/stickers', null, {
    clearOnSubmit: 60000,
    method: 'POST',
    initData: { }
  })

  return (
    <Card sx={{ maxWidth: 'narrow', mx: 'auto', label: { mb: 3 } }}>
      <form {...formProps}>
        <Text variant="subtitle" as="p">
          To send you stickers, we need your address.
        </Text>
        <Text variant="caption" as="p">
          We'll delete it after we ship your package!
        </Text>
        <Label>Name
          <Input
            {...useField('name', 'text')}
            autoComplete="name"
            placeholder="Fiona Hackworth"
            required
          />
        </Label>
        <Label>Line 1
          <Input
            {...useField('address_line_1')}
            autoComplete="street-address"
            placeholder="15 Falls Rd"
            required
          />
        </Label>
        <Label>City
          <Input
            {...useField('address_city')}
            autoComplete="city"
            placeholder="Shelburne"
            required
          />
        </Label>
        <Label>State / Province
          <Input
            {...useField('address_state')}
            autoComplete="state"
            placeholder="Vermont"
            required
          />
        </Label>
        <Label>Country
          <Input
            {...useField('address_country')}
            autoComplete="country"
            placeholder="United States"
            required
          />
        </Label>
        <Label>Zip / Postal Code
          <Input
            {...useField('address_zip')}
            autoComplete="postal-code"
            placeholder="12345"
            required
          />
        </Label>
        <Label>Phone Number
          <Input
            {...useField('phone_number', 'tel')}
            placeholder="+1 802 210 3489"
            autoComplete="tel"
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
