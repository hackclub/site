import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Text } from 'theme-ui'
import ForceTheme from '../../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import FlexCol from '../../../components/flex-col'
import Progress from '../../../components/hcb/apply/progress'
import NavButton from '../../../components/hcb/apply/nav-button'
import Watermark from '../../../components/hcb/apply/watermark'
import FormContainer from '../../../components/hcb/apply/form-container'
import HCBInfo from '../../../components/hcb/apply/hcb-info'
import OrganizationInfoForm from '../../../components/hcb/apply/org-form'
import PersonalInfoForm from '../../../components/hcb/apply/personal-form'
import AlertModal from '../../../components/hcb/apply/alert-modal'
import { geocode } from '../../../lib/hcb/apply/address-validation'

const valiadateAddress = async step => {
  // Validate the address
  if (step === 3) {
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
}

export default function Apply() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const formContainer = useRef()
  const [formError, setFormError] = useState(null)

  const requiredFields = [
    [],
    ['eventName', 'eventLocation'],
    ['firstName', 'lastName', 'userEmail', 'userBirthday', 'contactOption']
  ]

  useEffect(() => {
    console.error(`Form error: ${formError}`)
    if (!router.isReady) return
    setStep(parseInt(router.query.step))

    // Set the query url parameter to 1 if it's not present
    if (!step || step < 1) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, step: 1 }
        },
        undefined,
        {}
      )
    }
  }, [formError, router, step])

  return (
    <>
      <Meta as={Head} title="Apply for HCB" />
      <ForceTheme theme="dark" />

      <Box
        sx={{
          display: 'grid',
          gap: 5,
          gridTemplateAreas: [
            '"title" "form" "form" "nav"',
            null,
            null,
            '"title form" "title form" "nav form"'
          ],
          height: ['auto', null, null, '100vh'],
          p: [4, 5]
        }}
      >
        <Box sx={{ gridArea: 'title' }}>
          <FlexCol gap={[4, null, null, '20vh']}>
            <Text variant="title">
              Let's get you
              <br />
              set up on HCB.
            </Text>
            <Progress />
          </FlexCol>
        </Box>
        <Box sx={{ gridArea: 'form', overflowY: 'auto' }}>
          <FormContainer ref={formContainer}>
            {step === 1 && <HCBInfo />}
            {step === 2 && (
              <OrganizationInfoForm requiredFields={requiredFields} />
            )}
            {step === 3 && <PersonalInfoForm requiredFields={requiredFields} />}
          </FormContainer>
        </Box>
        <Flex
          sx={{
            gridArea: 'nav',
            alignSelf: 'end',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}
        >
          <NavButton isBack={true} form={formContainer} />
          <NavButton
            isBack={false}
            form={formContainer}
            setFormError={setFormError}
            requiredFields={requiredFields}
            clickHandler={() => valiadateAddress(step)}
          />
        </Flex>
      </Box>
      <AlertModal formError={formError} setFormError={setFormError} />
      <Watermark />
    </>
  )
}
