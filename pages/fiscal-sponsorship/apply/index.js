import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Heading, Grid } from 'theme-ui'
import ForceTheme from '../../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import NavButton from '../../../components/fiscal-sponsorship/apply/nav-button'
import Watermark from '../../../components/fiscal-sponsorship/apply/watermark'
import FormContainer from '../../../components/fiscal-sponsorship/apply/form-container'
import HCBInfo from '../../../components/fiscal-sponsorship/apply/hcb-info'
import OrganizationInfoForm from '../../../components/fiscal-sponsorship/apply/org-form'
import PersonalInfoForm from '../../../components/fiscal-sponsorship/apply/personal-form'
import AlertModal from '../../../components/fiscal-sponsorship/apply/alert-modal'
import { geocode } from '../../../lib/fiscal-sponsorship/apply/address-validation'

const validateAddress = async () => {
  // Validate the address
  // Get the raw personal address input
  const userAddress = sessionStorage.getItem('bank-signup-userAddress')

  if (!userAddress) return

  const result = await geocode(userAddress)

  const addrComp = type => result.results[0]?.structuredAddress[type] ?? ''

  sessionStorage.setItem(
    'bank-signup-addressLine1',
    addrComp('fullThoroughfare')
  )
  sessionStorage.setItem('bank-signup-addressCity', addrComp('locality'))
  sessionStorage.setItem(
    'bank-signup-addressState',
    addrComp('administrativeArea')
  )
  sessionStorage.setItem('bank-signup-addressZip', addrComp('postCode'))
  sessionStorage.setItem(
    'bank-signup-addressCountry',
    result.results[0]?.country ?? ''
  )
  sessionStorage.setItem(
    'bank-signup-addressCountryCode',
    result.results[0]?.countryCode ?? ''
  )
}

export default function Apply() {
  const router = useRouter()
  const formContainer = useRef()
  const [formError, setFormError] = useState(null)

  const requiredFields = [
    'eventName',
    'eventLocation',
    'firstName',
    'lastName',
    'userEmail',
    'userBirthday'
  ]

  useEffect(() => {
    console.error(`Form error: ${formError}`)
  }, [formError])

  return (
    <>
      <Meta as={Head} title="Apply for HCB" />
      <ForceTheme theme="light" />

      <Grid
        columns={[null, null, 2]}
        sx={{
          gap: 0,
          width: '100%',
          minHeight: '100vh',
          alignItems: 'start'
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: [3, 5],
            py: 5,
            gap: [3, 5],
            height: [null, '100dvh'],
            position: [null, null, 'sticky'],
            top: 0,
            overflowY: [null, null, 'auto']
          }}
        >
          <Heading as="h1" variant="title">
            Let’s get you
            <br />
            set up on HCB.
          </Heading>
          <HCBInfo />
        </Flex>
        <FormContainer ref={formContainer}>
          <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
            Your organization
          </Heading>
          <OrganizationInfoForm requiredFields={requiredFields} />
          <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
            Personal details
          </Heading>
          <PersonalInfoForm requiredFields={requiredFields} />
          <NavButton
            form={formContainer}
            setFormError={setFormError}
            requiredFields={requiredFields}
            clickHandler={validateAddress}
          />
        </FormContainer>
      </Grid>
      <AlertModal formError={formError} setFormError={setFormError} />
      <Watermark />
    </>
  )
}
