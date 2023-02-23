import { useState, useEffect } from 'react'
import {
    Box,
    Label,
    Input,
    Text,
    Textarea,
    Checkbox,
} from 'theme-ui'
import FlexCol from '../../flex-col'
import Auto from './address-autocomplete'

function Field({ name, label, children }) {
    return (
        <FlexCol gap={3}>
            <Label
                htmlFor={name}
                sx={{
                    textTransform: 'capitalize',
                    fontSize: 3,
                }}
            >
                {label}
            </Label>
            { children }
        </FlexCol>       
    )
}

export default function OrganizationInfoForm() {
    const [org, setOrg] = useState('organization')

    useEffect(() => {
        if (navigator.language === 'en-GB') setOrg('organisation')
    }, [])

    return (
        <Box
            as="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                width: '50ch',
                pl: 1
            }}
            onSubmit={(e) => e.preventDefault()}
        >
            <Field name='eventName' label={`${org} name`}>
                <Input name='eventName' id='eventName' placeholder='Shelburne School Hackathon' />
            </Field>
            <Field name='eventWebsite' label={`${org} website`}>
                <Input name='eventWebsite' id='eventWebsite' type='url' placeholder='hackclub.com' />
            </Field>
            <Field name='eventLocation' label={`${org} location`}>
                <Auto name='eventLocation' />
            </Field>
            <FlexCol gap={3}>   
                <Label
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 3,
                        width: 'fit-content',
                        fontSize: 3,
                    }}>
                    Transparency mode
                    <Checkbox defaultChecked />
                </Label>
                <Text sx={{ color: 'muted', fontSize: 1 }}>
                        Transparent accounts’ balances and donations are public.
                        You choose who has access to personal details.
                        This can be changed later. 
                        As an example, Hack Club's finances are transparent.
                    </Text>
            </FlexCol>

            <Field name='eventDescription' label={`Tell us about your ${org}!`}>
                <Textarea
                    name='eventDescription'
                    id='eventDescription'
                    placeholder='1 or 2 sentences will suffice'
                    rows={4}
                    sx={{
                        resize: 'vertical',
                        width: '100%'
                    }}
                />
            </Field>
        </Box>
    )
}