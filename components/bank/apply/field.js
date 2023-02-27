import { useEffect } from 'react'
import { Flex, Label, Text } from 'theme-ui'
import FlexCol from '../../flex-col'

export default function Field({ name, label, description, col = true, children }) {   
    /* Fill in the field input element with the value from sessionStorage.
    Note: the custom checkbox component does this in its own useEffect hook. */
    useEffect(() => {
        const value = sessionStorage.getItem('bank-signup-' + name)
        if (value) {
            const input = document.getElementById(name)
            if (input) {
                input.value = value
                input.checked = value === 'true'
            }
        }
    }, [])
    
    return (
        <FlexCol gap={2}>
            <Flex sx={{
                flexDirection: col ? 'column' : 'row',
                alignItems: col ? 'flex-start' : 'center',
                gap: 2,
            }}>
                <Label htmlFor={name} sx={{
                    textTransform: 'capitalize',
                    fontSize: 3,
                    width: 'fit-content',
                }}>
                    { label }
                </Label>
                { children }
            </Flex>
            { description && <Text sx={{ color: 'muted', fontSize: 1 }}>
                { description }
            </Text> }
        </FlexCol>
    )

    {/*
        FlexCol
            Flex(Col?)
                Label
                Children
            Description?
    */}
}