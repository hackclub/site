import { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'theme-ui'
import { keyframes } from '@emotion/react'
import BankInfo from './bank-info'


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

export default function FormContentContainer() {
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

        handleScroll()
        scrollView.current.addEventListener('scroll', handleScroll)
        return () => scrollView.current.removeEventListener('scroll', handleScroll)
    }, [router.isReady])

    return (
       <Box
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
    )
}