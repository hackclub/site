import { useState, useEffect } from 'react'
import {
    Box,
    Input,
    Textarea,
} from 'theme-ui'
import Checkbox from './checkbox'
import AddressInput from './address-input'
import Field from './field'

export default function OrganizationInfoForm() {
    const [org, setOrg] = useState('organization')

    useEffect(() => {
        if (navigator.language === 'en-GB') setOrg('organisation')
    }, [])

    return (
        <>
            <Field name='eventName' label={`${org} name`}>
                <Input name='eventName' id='eventName' placeholder='Shelburne School Hackathon' />
            </Field>
            <Field
                name='eventWebsite'
                label={`${org} website`}
                description='If you don’t have one yet, you can leave this blank.'
            >
                <Input name='eventWebsite' id='eventWebsite' type='url' placeholder='hackclub.com' />
            </Field>
            <Field name='eventLocation' label={`${org} location`}>
                <AddressInput isPersonalAddressInput={false} name='eventLocation' />
            </Field>
            <Field
                name='transparent'
                label='Transparency mode'
                col={false}
                description={`
                    Transparent accounts’ balances and donations are public.
                    You choose who has access to personal details.
                    This can be changed later.
                    As an example, Hack Club's finances are transparent!
                `}
            >
                <Checkbox defaultChecked={true} name='transparent' />
            </Field>
            <Field
                name='eventDescription'
                label={`Tell us about your ${org}!`}
                description='1 or 2 sentences will suffice'
            >
                <Textarea
                    name='eventDescription'
                    id='eventDescription'
                    rows={3}
                    sx={{
                        resize: 'vertical',
                        width: '100%'
                    }}
                />
            </Field>
        </>
    )
}