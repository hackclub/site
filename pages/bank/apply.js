import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Text } from 'theme-ui'
import ForceTheme from '../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import FlexCol from '../../components/flex-col'
import Progress from '../../components/bank/apply/progress'
import NavButton from '../../components/bank/apply/nav-button'
import Watermark from '../../components/bank/apply/watermark'
import FormContentContainer from '../../components/bank/apply/form-content-container'
import BankInfo from '../../components/bank/apply/bank-info'
import OrganizationInfoForm from '../../components/bank/apply/org-form'

export default function Apply() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!router.isReady) return
    setStep(parseInt(router.query.step))

    if (!step || step < 1) {
      router.query.step = 1
      router.replace(router)
    }
  })

  return (
    <>
      <Meta as={Head} title="Apply for Hack Club Bank" />
      <ForceTheme theme="dark" />

      <Box p={100} pb={0} sx={{ height: '100vh' }}>
        <Flex
          sx={{
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <FlexCol justifyContent='space-between' height='100%' >
            <Text variant='title'>Let's get you<br />set up on bank.</Text>
            <Progress />
            <NavButton isBack={true} />
          </FlexCol>
          <FlexCol justifyContent='space-between' height='100%' gap={3} width='fit-content'>
            <FormContentContainer>
              { step === 1 && <BankInfo />}
              { step === 2 && <OrganizationInfoForm />}
            </FormContentContainer>
            <NavButton isBack={false} />
          </FlexCol>
        </Flex>
      </Box>
      <Watermark />
    </>
  )
}
