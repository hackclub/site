import { Text, Heading, Box, Container, Input, Label, Button } from 'theme-ui'
import { withFormik } from 'formik'

function Base() {
  return (
    <Box
      as="form"
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}
    ></Box>
  )
}

function Field() {
  return (
    <Box>
      <Label>hi</Label>
      <Input placeholder="hi" />
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
      <Field
        label="Email address"
        name="prefill_Email Address"
        placeholder="fiona@hackclub.com"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button
        bg="info"
        width={1}
        mt={[2, 3]}
        value={`Finish ${
          10 - Object.values(values).filter(n => n !== '').length
        } fields to apply`}
      />
    </Base>
  )
}

const Signup = withFormik({
  enableReinitialize: true,
  displayName: 'Signup'
})(InnerForm)
export default Signup
