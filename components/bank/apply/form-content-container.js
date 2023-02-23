import { useRef, useEffect } from 'react'
import { Box } from 'theme-ui'
import { keyframes } from '@emotion/react'
import BankInfo from './bank-info'
import OrganizationInfoForm from './org-form'

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

export default function FormContentContainer({ children }) {
  const scrollView = useRef()
  const { maskFade, maskFadeOut } = generateFadeKeyframes()

  const handleScroll = () => {
    if (!scrollView.current) return
    const scroll = scrollView.current.scrollTop
    const scrollMax = scrollView.current.scrollTopMax
    
    if (scroll >= scrollMax) {
    scrollView.current.classList.remove('gradient')
    } else {
    scrollView.current.classList.add('gradient')
    }
  }

  useEffect(() => {
    handleScroll()
    scrollView.current.addEventListener('scroll', handleScroll)
    return () => scrollView.current.removeEventListener('scroll', handleScroll)
  })

  return (
    <Box
      ref={scrollView}
      sx={{
        flex: 1,
        overflowY: 'auto',
        pr: '2ch',
        pb: 3,
        position: 'relative',
        animation: `${maskFadeOut} 0.2s forwards`,
        '&.gradient': {
            animation: `${maskFade} 0.2s forwards`,
        },  
      }}
    >
      { children }
    </Box>   
    )
}