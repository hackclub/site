import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'
import ForceTheme from '../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import FlexCol from '../../components/flex-col'
import Progress from '../../components/bank/apply/progress'
import NavButton from '../../components/bank/apply/nav-button'
import Watermark from '../../components/bank/apply/watermark'
import BankInfo from '../../components/bank/apply/bank-info'

function generateFadeKeyframes(resolution = 20) {
  let maskFade = {}
  let maskFadeOut = {}
  for (let i = 0; i <= resolution; i++) {
    let t1 = (i / resolution).toFixed(1)
    let t2 = (1 - i / resolution).toFixed(1)
    
    maskFade[`${i / resolution * 100 }%`] = {
      maskImage: `linear-gradient(rgba(0,0,0,${t1}) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,${t2}) 100%)`
    }

    maskFadeOut[`${i / resolution * 100 }%`] = {
      maskImage: `linear-gradient(rgba(0,0,0,${t2}) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,${t1}) 100%)`
    }
  }

  maskFade = keyframes(maskFade)
  maskFadeOut = keyframes(maskFadeOut)

  return { maskFade, maskFadeOut }
}

export default function Apply() {
  const router = useRouter()
  const scrollView = useRef()
  const { maskFade, maskFadeOut } = generateFadeKeyframes()

  const handleScroll = () => {
    const scroll = scrollView.current.scrollTop
    const scrollMax = scrollView.current.scrollTopMax
    
    if (scroll >= scrollMax) {
      scrollView.current.classList.remove('gradient')
    } else {
      scrollView.current.classList.add('gradient')
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    
    const step = parseInt(router.query.step)

    if (!step || step < 1) {
      router.query.step = 1
      router.replace(router)
    }

    handleScroll()
    scrollView.current.addEventListener('scroll', handleScroll)
    return () => scrollView.current.removeEventListener('scroll', handleScroll)
  }, [router.isReady])

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
          <FlexCol justifyContent='space-between' height='100%' gap={3}>
            <Box // Variable content
              ref={scrollView}
              sx={{
                flex: 1,
                overflowY: 'auto',
                pr: '1ch',
                position: 'relative',
                animation: `${maskFadeOut} 0.2s forwards`,
                '&.gradient': {
                  animation: `${maskFade} 0.2s forwards`,
                },
              }}
            >
              <BankInfo />
            </Box>
            <NavButton isBack={false} />
          </FlexCol>
        </Flex>
      </Box>
      <Watermark />
    </>
  )
}
