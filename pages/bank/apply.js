import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Text } from 'theme-ui'
import ForceTheme from '../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import FlexCol from '../../components/flex-col'
import Progress from '../../components/bank/apply/progress'
import NavButton from '../../components/bank/apply/nav-button'
import Watermark from '../../components/bank/apply/watermark'
import FormContainer from '../../components/bank/apply/form-container'
import BankInfo from '../../components/bank/apply/bank-info'
import OrganizationInfoForm from '../../components/bank/apply/org-form'
import PersonalInfoForm from '../../components/bank/apply/personal-form'

export default function Apply() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const formContainer = useRef()
  const [validationResult, setValidationResult] = useState()

  useEffect(() => {
    if (!router.isReady) return
    setStep(parseInt(router.query.step))

    // Set the query url parameter to 1 if it's not present
    if (!step || step < 1) {
      router.push({ 
        pathname: router.pathname,
        query: { ...router.query, step: 1 } }, 
        undefined, 
        {}
      )
    }
  })

  return (
    <>
      <script
        async
        src='https://maps.googleapis.com/maps/api/js?key=AIzaSyApxZZ8-Eh_6RgHUu8-BAOpx3xhfF2yK9U&libraries=places&mapInit=foo'
      ></script>
      
      <Meta as={Head} title="Apply for Hack Club Bank" />
      <ForceTheme theme="dark" />

      <Box
        sx={{
          display: 'grid',
          gap: 5,
          gridTemplateAreas: [
            '"title" "form" "form" "nav"',
            null,
            null,
            '"title form" "title form" "nav form"',
          ],
          height: ['auto', null, null, '100vh'],
          p: [4, 5]
        }}
      >
        <Box sx={{ gridArea: 'title' }}>
          <FlexCol gap={[4, null, null, '20vh']}>
            <Text variant='title'>Let's get you<br />set up on bank.</Text>
            <Progress />
          </FlexCol>
        </Box>
        <Box sx={{ gridArea: 'form' }}>
          <FormContainer ref={formContainer}>
            { step === 1 && <BankInfo /> }
            { step === 2 && <OrganizationInfoForm /> }
            { step === 3 && <PersonalInfoForm
                setValidationResult={setValidationResult}
              />
            }
          </FormContainer>
        </Box>
        <Flex
          sx={{
            gridArea: 'nav',
            alignSelf: 'end',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            // mt: 5
          }}
        >
          <NavButton isBack={true} form={formContainer} />
          <NavButton
            isBack={false}
            form={formContainer}
            clickHandler={async () => {
              // Validate the address
              if (step === 3) {
                // Get the raw personal address input
                const userAddress = sessionStorage.getItem('bank-signup-userAddress')
                if (!userAddress) return false

                //#region Address Validation API
                const key = atob('QUl6YVN5QXB4Wlo4LUVoXzZSZ0hVdTgtQkFPcHgzeGhmRjJ5SzlV')
                const res = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${key}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    address: {
                      addressLines: userAddress
                    },
                  }),
                })
                const resJson = await res.json()
                const { result } = resJson
                //#endregion
                setValidationResult(result)

                const addrComp = (type) =>
                    result.address.addressComponents.find(el => el.componentType === type)?.componentName.text
                const streetNumber = addrComp('street_number')
                const road = addrComp('route')
                const city = addrComp('postal_town') || addrComp('locality')
                const state = addrComp('administrative_area_level_1')
                const postalCode = addrComp('postal_code')
                const country = addrComp('country')

                sessionStorage.setItem('bank-signup-addressLine1', streetNumber ?? '' + (streetNumber && road ? ' ' : '') + road ?? '')
                sessionStorage.setItem('bank-signup-addressCity', city ?? '')
                sessionStorage.setItem('bank-signup-addressState', state ?? '')
                sessionStorage.setItem('bank-signup-addressZip', postalCode ?? '')
                sessionStorage.setItem('bank-signup-addressCountry', country ?? '')
              }

              return true
            }}
          />
        </Flex>
      </Box>
      {/* <Flex
        p={[32, null, 100]}
        sx={{
          flexDirection: 'column',
          // justifyContent: 'space-around',
          gap: 5,
          height: '100vh'
        }}
      >
        <Flex
          sx={{
            flexDirection: ['column', null, null, 'row'],
            gap: 64,
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <FlexCol gap={[4, null, null, '20vh']}>
            <Text variant='title'>Let's get you<br />set up on bank.</Text>
            <Progress />
          </FlexCol>
          <FlexCol height={'65vh'} gap={3} >
            <FormContainer ref={formContainer}>
              { step === 1 && <BankInfo /> }
              { step === 2 && <OrganizationInfoForm /> }
              { step === 3 && <PersonalInfoForm

                  setValidationResult={setValidationResult}
                />
              }
            </FormContainer>
          </FlexCol>
        </Flex>
        <Flex
          sx={{
            alignItems: 'flex-end',
            gap: 6
          }}
        >
          <NavButton isBack={true} form={formContainer} />
          <NavButton
            isBack={false}
            form={formContainer}
            clickHandler={async () => {
              // Validate the address
              if (step === 3) {
                const key = atob('QUl6YVN5QXB4Wlo4LUVoXzZSZ0hVdTgtQkFPcHgzeGhmRjJ5SzlV')
          
                // Get the raw personal address input
                const userAddress = sessionStorage.getItem('bank-signup-userAddress')
                if (!userAddress) return false

                const res = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${key}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    address: {
                      addressLines: userAddress
                    },
                  }),
                })
                const resJson = await res.json()
                const { result } = resJson
                setValidationResult(result)

                if (!result) return false
                console.info(result)

                if (result.address.missingComponentTypes || result.verdict.hasUnconfirmedComponents) {
                  setShouldShowAddressAlert(true)
                  return false
                } else {
                  /* If the address is valid, the returned address can be 
                  inserted into the hidden fields. Let's change the backend 
                  so that the user address is just a string? */

                  /*TODO: Replace null with the returned address components.
                  This could be tricky since the returned address components
                  could not always be in the same order or format,
                  so doing addressLine1=result[0]; addressLine2=result[1] ..etc
                  would be unreliable. One workaround to simply accepting a string
                  for the whole address would be using the address component types
                  provided in the result to work out which to concat and in which
                  fields to put the components. */
                  /*sessionStorage.setItem('bank-signup-addressLine1', null)
                  sessionStorage.setItem('bank-signup-addressLine2', null)
                  sessionStorage.setItem('bank-signup-addressCity', null)
                  sessionStorage.setItem('bank-signup-addressState', null)
                  sessionStorage.setItem('bank-signup-addressZip', null)
                  sessionStorage.setItem('bank-signup-addressCountry', null)

                  setShouldShowAddressAlert(false)
                  return true
                }
              }

              return true
            }}
          />
        </Flex>


      </Flex> */}
      <Watermark />
    </>
  )
}
