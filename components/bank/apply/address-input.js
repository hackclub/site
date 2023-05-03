import { useEffect, useRef, useState } from 'react'
import { Box, Flex, Input, Text } from 'theme-ui'
import FlexCol from '../../flex-col'
import AutofillColourFix from './autofill-colour-fix'
import { geocode } from '../../../lib/bank/apply/address-validation'
import Icon from '../../icon'

const approvedCountries = ['US', 'CA', 'MX']

export default function AutoComplete({ name, isPersonalAddressInput }) {
  const input = useRef()
  const base = useRef()
  const [predictions, setPredictions] = useState(null)
  const [countryCode, setCountryCode] = useState(null)

  const performGeocode = async address => {
    if (isPersonalAddressInput) return
    geocode(address)
      .then(res => {
        const country = res?.results[0]?.country
        const countryCode = res?.results[0]?.countryCode

        setCountryCode(countryCode)

        sessionStorage.setItem('bank-signup-eventCountry', country)
        sessionStorage.setItem('bank-signup-eventCountryCode', countryCode)
      })
      .catch(err => console.error(err))
  }

  const optionClicked = async prediction => {
    input.current.value = prediction.description
    performGeocode(prediction.description)
    setPredictions(null)
  }
  const clickOutside = e => {
    if (input.current && !input.current.contains(e.target)) {
      setPredictions(null)
    }
  }

  //TODO: Close suggestions view when focus is lost via tabbing.
  //TODO: Navigate suggestions with arrow keys.

  useEffect(() => {
    const inputEl = input.current

    if (!window.google || !inputEl) return

    const service = new window.google.maps.places.AutocompleteService()

    const onInput = async e => {
      if (!e.target.value) {
        setPredictions(null)
      } else {
        service.getPlacePredictions(
          { input: e.target.value },
          (predictions, status) => {
            setPredictions(predictions)
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
              //DEBUG
              setPredictions([])
            }
          }
        )
      }
    }

    document.addEventListener('click', clickOutside)
    inputEl.addEventListener('input', onInput)
    inputEl.addEventListener('focus', onInput)

    return () => {
      document.removeEventListener('click', clickOutside)
      inputEl.removeEventListener('input', onInput)
      inputEl.removeEventListener('focus', onInput)
    }
  }, [])

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <FlexCol flexDirection="column" position="relative" width="100%" gap="2">
        <Input
          ref={input}
          name={name}
          id={name}
          placeholder="Shelburne, VT"
          autoComplete="off"
          sx={{ ...AutofillColourFix }}
          onInput={async e => performGeocode(e.target.value)}
        />
        <Box>
          {/* {String(countryCode)} */}
          {countryCode && !approvedCountries.includes(countryCode) && (
            <Flex sx={{ alignItems: 'center' }}>
              <Icon
                glyph="sad"
                size="2.5rem"
                sx={{ color: 'red', mr: 1, flexShrink: 0 }}
              />
              <Text
                as="label"
                htmlFor={name}
                sx={{
                  color: 'red'
                  // fontWeight: 'medium',
                }}
              >
                Currently, we only have first-class support for organizations in
                the United States, Canada, and Mexico.
                <br />
                If you're somewhere else, you can still use bank!
                <br />
                Please contact us at bank@hackclub.com
              </Text>
            </Flex>
          )}
        </Box>
      </FlexCol>
      {predictions && (
        <Box
          sx={{
            background: '#47454f',
            border: '1px solid #696675',
            width: '100%',
            p: 3,
            borderRadius: '4px',
            position: 'absolute',
            bottom: 'calc(100% + 0.5em)'
          }}
        >
          <FlexCol gap={1}>
            {predictions.map((prediction, idx) => (
              <>
                <Text
                  as="button"
                  onClick={() => optionClicked(prediction)}
                  sx={{
                    cursor: 'pointer',
                    border: 'none',
                    background: 'none',
                    color: '#d1cbe7',
                    '&:hover': {
                      color: 'white'
                    },
                    fontFamily: 'inherit',
                    fontSize: 'inherit',
                    textAlign: 'inherit'
                  }}
                  key={prediction.id}
                >
                  {prediction.description}
                </Text>

                {idx < predictions.length - 1 && (
                  <hr
                    style={{
                      width: '100%',
                      color: '#8492a6'
                    }}
                  />
                )}
              </>
            ))}
          </FlexCol>
        </Box>
      )}
    </Box>
  )
}
