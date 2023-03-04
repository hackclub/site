import { Input, Flex } from 'theme-ui'
import Checkbox from './checkbox'
import AddressInput from './address-input'
import Field from './field'
import AutofillColourFix from './autofill-colour-fix'

export default function PersonalInfoForm({ setValidationResult }) {
    return (
        <>
            <Flex sx={{ justifyContent: 'space-between', gap: 4 }}>
                <Field name='firstName' label='First name'>
                    <Input
                        name='firstName'
                        id='firstName'
                        placeholder='Fiona'
                        sx={{...AutofillColourFix}}

                    />
                </Field>
                <Field name='lastName' label='Last name'>
                    <Input
                        name='lastName'
                        id='lastName'
                        placeholder='Hacksworth'
                        sx={{...AutofillColourFix}}
                    />
                </Field>
            </Flex>
            <Field name='userEmail' label='Email'>
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
            >
                <Input
                    name='userPhone'
                    id='phone'
                    type='tel'
                    placeholder='(123) 456-7890'
                    sx={{...AutofillColourFix}} 
                />
            </Field>
            <Field name='userBirthday' label='Birthday'>
                <Input
                    name='userBirthday'
                    id='date'
                    type='date'
                    placeholder='4 Mar 2023'
                    sx={{...AutofillColourFix}}
                />
            </Field>
            <Field name='referredBy' label='Who were you referred by?'>
                <Input
                    name='referredBy'
                    id='referredBy'
                    placeholder='Max'
                    sx={{...AutofillColourFix}}
                />
            </Field>
            <Field name='returningUser' label='Have you used Bank before?' col={false}>
                <Checkbox name='returningUser' />
            </Field>
            <Field
                name='userAddress'
                label='Address'
                description='This is so we can send you some swag and goodies if you ever request them!'
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