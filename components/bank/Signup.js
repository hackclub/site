import { Text, Heading, Box, Container, Input, Label, Button } from 'theme-ui'
import { withFormik } from 'formik'

function Base({ children, action, target, method }) {
  return (
    <Box
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: '1fr' }}
      action={action}
      target={target}
      method={method}
    >
      {children}
    </Box>
  )
}

function Field({
  placeholder,
  label,
  name,
  type,
  value,
  handleChange,
  handleBlur
}) {
  return (
    <Box sx={{ my: 2 }}>
      <Label htmlFor={name} sx={{ color: 'muted', fontSize: 18 }}>
        {label}
      </Label>
      <Input
        id={name}
        placeholder={placeholder}
        name={name}
        type={type}
        sx={{ bg: 'dark' }}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        required
      />
    </Box>
  )
}

function InnerForm({ values, errors, touched, handleChange, handleBlur }) {
  return (
    <Base
      method="get"
      target="_blank"
      action="https://airtable.com/shrW33gWaPnSDBhYj"
    >
      <Field
        label="Project name"
        name="prefill_Event Name"
        placeholder="Windy City Hacks"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Field
          label="First name"
          name="prefill_First Name"
          placeholder="Fiona"
          value={values.first_name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Field
          label="Last name"
          name="prefill_Last Name"
          placeholder="Hackworth"
          value={values.last_name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
      <Field
        label="Email address"
        name="prefill_Email Address"
        placeholder="fiona@hackclub.com"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button sx={{ bg: 'blue', mt: [2, 3], py: 3 }} type="submit">{`Finish ${
        10 - Object.values(values).filter(n => n !== '').length
      } fields to apply`}</Button>
    </Base>
  )
}

const Signup = withFormik({
  enableReinitialize: true,
  displayName: 'Signup'
})(InnerForm)
export default Signup
