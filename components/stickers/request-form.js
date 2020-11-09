import { Grid, Card, Label, Input, Select } from 'theme-ui'
import useForm from '../../lib/use-form'
import { countries } from '../../lib/countries'
import Submit from '../submit'

const RequestForm = () => {
  const { status, formProps, useField } = useForm('/api/stickers')

  return (
    <Grid
      as="form"
      columns={2}
      gap={3}
      {...formProps}
      sx={{
        label: { gridColumn: ['span 2', 'auto'] },
        button: { gridColumn: 'span 2', maxWidth: '75%', mx: 'auto' },
        'input, select': { bg: 'dark' }
      }}
    >
      <Label>
        Full name
        <Input {...useField('name')} placeholder="Fiona Hackworth" required />
      </Label>
      <Label>
        Email address (for tracking)
        <Input
          {...useField('email')}
          placeholder="fiona@hackclub.com"
          required
        />
      </Label>
      <Label>
        Address (first line)
        <Input
          {...useField('addressFirst')}
          placeholder="8605 Santa Monica Blvd"
          autoComplete="address-line1"
          required
        />
      </Label>
      <Label>
        Address (second line) (optional)
        <Input
          {...useField('addressSecond')}
          autoComplete="address-line2"
          placeholder="#86294"
        />
      </Label>
      <Label sx={{ gridColumn: 'span 1 !important' }}>
        City
        <Input {...useField('city')} placeholder="West Hollywood" required />
      </Label>
      <Label sx={{ gridColumn: 'span 1 !important' }}>
        State/Province
        <Input {...useField('state')} placeholder="CA" required />
      </Label>
      <Label sx={{ gridColumn: 'span 1 !important' }}>
        Zip Code
        <Input {...useField('zipCode')} placeholder="90069" />
      </Label>
      <Label sx={{ gridColumn: 'span 1 !important' }}>
        Country
        <Select {...useField('country')} defaultValue="Choose a country">
          <option value="" selected disabled>
            Choose a country
          </option>
          {Object.entries(countries).map(country => (
            <option value={country.slice(1)}>{country.slice(1)}</option>
          ))}
        </Select>
      </Label>
      <Submit
        status={status}
        labels={{
          default: 'Request stickers',
          error: 'Something went wrong',
          success: 'Coming your way!'
        }}
      />
    </Grid>
  )
}

export default RequestForm
