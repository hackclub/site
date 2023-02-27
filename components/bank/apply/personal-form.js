import { Input, Flex } from 'theme-ui'
import Checkbox from './checkbox'
import FlexCol from '../../flex-col'
import AddressInput from './address-input'
import Field from './field'

export default function PersonalInfoForm({ setValidationResult }) {
    return (
        <>
            <Flex sx={{ justifyContent: 'space-between', gap: 4 }}> {/* Name */}
                <Field name='firstName' label='First name'>
                    <Input name='firstName' id='firstName' placeholder='Fiona' />
                </Field>
                <Field name='lastName' label='Last name'>
                    <Input name='lastName' id='lastName' placeholder='Hacksworth' />
                </Field>
            </Flex>
            <Field name='userEmail' label='Email'>
                <Input name='userEmail' id='userEmail' type='email' placeholder='fiona@hackclub.com' />
            </Field>
            <Field
                name='userPhone'
                label='Phone'
                description='We’ll only use this if we need to get in touch with you urgently.'
            >
                <Input name='userPhone' id='userPhone' type='tel' placeholder='(123) 456-7890' />
            </Field>
            <Field name='userBirthday' label='Birthday'>
                <Input name='userBirthday' id='userBirthday' type='date' placeholder='dd/mm/yyyy' />
            </Field>
            <Field name='referredBy' label='Who were you referred by?'>
                <Input name='referredBy' id='referredBy' placeholder='Max' />
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