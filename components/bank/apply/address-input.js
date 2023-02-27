import { useEffect, useRef, useState } from 'react'
import { Box, Input, Text } from 'theme-ui'
import FlexCol from '../../flex-col'

function HiddenInput({ name }) {
    return <input aria-hidden='true' type='hidden' name={name} />
}

export default function AutoComplete({ name, isPersonalAddressInput, setValidationResult }) {
    const input = useRef()
    const [predictions, setPredictions] = useState([])

    const optionClicked = (e) => {
        input.current.value = e.target.innerText
        setPredictions([])
    }
    const clickOutside = (e) => {
        if (input.current && !input.current.contains(e.target)) {
            setPredictions([])
        }
    }

    //TODO: Close suggestions view when focus is lost via tabbing.
    //TODO: Navigate suggestions with arrow keys.

    useEffect(() => {
        if (!window.google || !input.current) return

        const service = new window.google.maps.places.AutocompleteService()
        
        const onInput = (e) => {
            if (!e.target.value) {
                setPredictions([])
            } else {
                service.getPlacePredictions(
                    { input: e.target.value },
                    (predictions, status) => {
                        setPredictions(predictions)
                        if (status !== window.google.maps.places.PlacesServiceStatus.OK) { //DEBUG
                            alert(status)
                        }
                    }
                )
            }
        }

        document.addEventListener('click', clickOutside)
        input.current.addEventListener('input', onInput)
        input.current.addEventListener('focus', onInput)
        
        return () => {
            document.removeEventListener('click', clickOutside)
            input.current?.removeEventListener('input', onInput)
            input.current?.removeEventListener('focus', onInput)
        }
    }, [])

    return (
        <FlexCol gap={2} position='relative' width='100%'>
            <Input
                ref={input}
                name={name}
                id={name}
                placeholder='Shelburne, VT'
                autoComplete="off"
            />
            { isPersonalAddressInput && (
                <>
                    <HiddenInput name='addressLine1' />
                    <HiddenInput name='addressLine2' />
                    <HiddenInput name='addressCity' />
                    <HiddenInput name='addressState' />
                    <HiddenInput name='addressZip' />
                    <HiddenInput name='addressCountry' />
                </>
            )}
            
            {
                predictions && predictions.length > 0 &&
                <Box sx={{
                    background: '#252429',
                    width: '100%',
                    p: 3,
                    borderRadius: '4px',
                        position: 'absolute',
                    top: '3em',
                }}>
                    <FlexCol gap={1}>
                        {predictions.map((prediction, idx) => (
                            <>
                                <Text
                                    as='button'
                                    onClick={optionClicked}
                                    sx={{
                                        cursor: 'pointer',
                                        border: 'none',
                                        background: 'none',
                                        color: 'muted',
                                        '&:hover': {
                                            color: 'white',
                                        },
                                        fontFamily: 'inherit',
                                        fontSize: 'inherit',
                                        textAlign: 'inherit',
                                    }}
                                    key={prediction.id}
                                >
                                    {prediction.description}
                                </Text>

                                {
                                    idx < predictions.length - 1 &&
                                    <hr
                                        style={{
                                            width: '100%',
                                            color: '#8492a6',
                                        }}
                                    />
                                }
                            </>
                        ))}
                    </FlexCol>
                </Box>
            }
        </FlexCol>
    )
}