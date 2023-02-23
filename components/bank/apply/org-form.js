import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Flex,
    Label,
    Input,
    Select,
    Text,
    Textarea,
    Radio,
    Checkbox,
    Slider,
} from 'theme-ui'
import FlexCol from '../../flex-col'
import Auto from './address-autocomplete'

function Field({ name, label, type, address=false }) {
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
            {
                address ?
                    <Auto name={name} />
                    :
                    <Input
                        name={name}
                        id={name}
                        type={type}
                        mb={3}
                        sx={{ width: '250px' }}
                    />
            }
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
            sx={{ width: '50ch', pl: 1 }}
            onSubmit={(e) => e.preventDefault()}
        >
            <Field name='eventName' label={`${org} name`} />
            <Field name='eventWebsite' label={`${org} website`} type='url' />
            <Field name='eventLocation' label={`${org} location`} address={true} />
            <Label>
                <Text sx={{ fontSize: 3 }}>Transparency mode</Text>
                <Text sx={{ color: 'muted', fontSize: 1 }}>
                        Transparent accounts’ balances and donations are public.
                        You choose who has access to personal details.
                        This can be changed later. 
                        As an example, Hack Club's finances are transparent.
                    </Text>
            </Label>
        </Box>
    )
}