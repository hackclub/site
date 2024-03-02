import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex, Heading, Grid, Alert, Button } from 'theme-ui'
import ForceTheme from '../../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import { onSubmit } from '../../../components/fiscal-sponsorship/apply/submit'
import Watermark from '../../../components/fiscal-sponsorship/apply/watermark'
import FormContainer from '../../../components/fiscal-sponsorship/apply/form-container'
import HCBInfo from '../../../components/fiscal-sponsorship/apply/hcb-info'
import OrganizationInfoForm from '../../../components/fiscal-sponsorship/apply/org-form'
import PersonalInfoForm from '../../../components/fiscal-sponsorship/apply/personal-form'
import Icon from '@hackclub/icons'
import Link from 'next/link'

export default function Apply() {
  const router = useRouter()
  const formContainer = useRef()
  const [formError, setFormError] = useState(null)

  const requiredFields = [
    'eventName',
    'eventLocation',
    'eventDescription',
    'firstName',
    'lastName',
    'userEmail',
    'userBirthday'
  ]

  return (
    <>
      <Meta as={Head} title="Apply for HCB" />
      <ForceTheme theme="light" />

      <Grid
        columns={[null, null, 2]}
        sx={{
          gap: 0,
          width: '100%',
          minHeight: '100vh',
          alignItems: 'start'
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            px: [3, 5],
            py: 5,
            gap: [4, 5],
            height: [null, '100svh'],
            position: [null, null, 'sticky'],
            top: 0,
            overflowY: [null, null, 'auto']
          }}
        >
          <header>
            <Link href="/fiscal-sponsorship" passHref legacyBehavior>
              <Text
                as="a"
                variant="subheadline"
                sx={{
                  mb: 3,
                  gap: 2,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'muted',
                  textDecoration: 'none',
                  ':hover': { color: 'primary' }
                }}
              >
                <Icon
                  size={24}
                  glyph="inserter"
                  style={{ transform: 'rotate(180deg)' }}
                />
                Back
              </Text>
            </Link>
            <Heading as="h1" variant="title">
              Apply to join
              <br />
              <Flex sx={{ alignItems: 'center', gap: 3 }}>
                <img
                  src="/fiscal-sponsorship/hcb-icon-small.png"
                  width={48}
                  height={48}
                  alt="HCB logo"
                  style={{
                    width: '1em',
                    height: '1em',
                    verticalAlign: 'baseline'
                  }}
                />{' '}
                HCB
              </Flex>
            </Heading>
          </header>
          <HCBInfo />
        </Flex>
        <FormContainer
          ref={formContainer}
          onSubmit={event =>
            onSubmit({
              event,
              router,
              form: formContainer,
              setFormError,
              requiredFields
            })
          }
        >
          <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
            Your organization
          </Heading>
          <OrganizationInfoForm requiredFields={requiredFields} />
          <Heading as="h2" variant="headline" sx={{ mb: -2 }}>
            Personal details
          </Heading>
          <PersonalInfoForm requiredFields={requiredFields} />
          {formError && <Alert bg="primary">{formError}</Alert>}
          <Button
            variant="ctaLg"
            type="submit"
            sx={{
              backgroundImage: theme => theme.util.gx('cyan', 'blue'),
              width: 'fit-content'
            }}
          >
            Submit
          </Button>
        </FormContainer>
      </Grid>
      <Watermark />
    </>
  )
}
