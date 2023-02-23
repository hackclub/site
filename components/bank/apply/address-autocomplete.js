import { useEffect, useRef, useState } from 'react'
import { Box, Input, Text } from 'theme-ui'
import FlexCol from '../../flex-col'

export default function AutoComplete({ name }) {
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
                        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
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
            input.current.removeEventListener('input', onInput)
            input.current.removeEventListener('focus', onInput)
            document.removeEventListener('click', clickOutside)
        }
    }, [])

    return (
        <>
            <script
                async
                src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAFRkv4LUuUGZOWbPGjX4ksMHSOrRTjHjo&libraries=places'
            ></script>

            <FlexCol gap={2} position='relative'>
                <Input
                    ref={input}
                    name={name}
                    id={name}
                    placeholder='Shelburne, VT'
                    autoComplete="off"
                />
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
        </>
    )
}