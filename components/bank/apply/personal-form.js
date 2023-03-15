import { Input, Flex } from 'theme-ui'
import Checkbox from './checkbox'
import AddressInput from './address-input'
import Field from './field'
import AutofillColourFix from './autofill-colour-fix'

export default function PersonalInfoForm({ setValidationResult, requiredFields }) {
    return (
        <>
            <Flex sx={{ justifyContent: 'space-between', gap: 4 }}>
                <Field name='firstName' label='First name' requiredFields={requiredFields}>
                    <Input
                        name='firstName'
                        id='firstName'
                        placeholder='Fiona'
                        sx={{...AutofillColourFix}}

                    />
                </Field>
                <Field name='lastName' label='Last name' requiredFields={requiredFields}>
                    <Input
                        name='lastName'
                        id='lastName'
                        placeholder='Hacksworth'
                        sx={{...AutofillColourFix}}
                    />
                </Field>
            </Flex>
            <Field name='userEmail' label='Email' requiredFields={requiredFields}>
                <Input
                    name='userEmail'
                    id='userEmail'
                    type='email'
                    placeholder='fiona@hackclub.com'
                    sx={{...AutofillColourFix}}
                />
            </Field>
            <Field
                name='userPhone'
                label='Phone'
                description='We’ll only use this if we need to get in touch with you urgently.'
                requiredFields={requiredFields}
            >
                <Input
                    name='userPhone'
                    id='userPhone'
                    type='tel'
                    placeholder='(123) 456-7890'
                    sx={{...AutofillColourFix}} 
                />
            </Field>
            <Field name='userBirthday' label='Birthday' requiredFields={requiredFields}>
                <Input
                    name='userBirthday'
                    id='userBirthday'
                    type='date'
                    sx={{...AutofillColourFix}}
                />
            </Field>
            <Field name='referredBy' label='Who were you referred by?' requiredFields={requiredFields}>
                <Input
                    name='referredBy'
                    id='referredBy'
                    placeholder='Max'
                    sx={{...AutofillColourFix}}
                />
            </Field>
            <Field
                name='returningUser'
                label='Have you used Bank before?'
                col={false}
                requiredFields={requiredFields}
            >
                <Checkbox name='returningUser' />
            </Field>
            <Field
                name='userAddress'
                label='Address'
                description='This is so we can send you some swag and goodies if you ever request them!'
                requiredFields={requiredFields}
            >
                <AddressInput
                    name='userAddress'
                    isPersonalAddressInput={true}
                    setValidationResult={setValidationResult}
                />
            </Field>
        </>
    )
}