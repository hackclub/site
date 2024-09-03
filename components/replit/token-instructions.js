'use client'

import Icon from '@hackclub/icons'
import { useState } from 'react'
import { Box, Card, Text, Image, Heading, Button } from 'theme-ui'

const TokenInstructions = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const tokenSteps = [
    {
      image: '/replit/replit-homepage.png',
      desc: 'Go to replit.com, and sign in.'
    },
    {
      image: '/replit/aarc1.gif',
      desc: "Open your browser's developer tools. You can do this by right-clicking on the page and selecting 'Inspect' or by pressing F12 on your keyboard."
    },
    {
      image: '/replit/aarc2.gif',
      desc: 'Select the application tab in the devtools'
    },
    {
      image: '/replit/aarc3.gif',
      desc: "Make sure replit.com cookies are selected, then scroll down to find 'connect.sid'. Copy the entire token & paste it in the form at the top of this page."
    }
  ]

  return (
    <Card sx={{ maxWidth: '100%', mx: 'auto', p: 4 }}>
      <Box
        sx={{
          display: 'flex',
          // justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          mb: 3,
          marginX: 'auto',
          width: 'fit-content'
        }}
      >
        <Button
          onClick={() => {
            setCurrentStep(prev => Math.max(prev - 1, 0))
          }}
          sx={{
            bg: 'hsl(23, 94%, 32%)',
            opacity: currentStep === 0 ? 0.5 : 1,
            pointerEvents: currentStep === 0 ? 'none' : 'auto'
          }}
        >
          <Box sx={{ lineHeight: 0, marginRight: '-8px' }}>
            <Icon glyph="view-back" />
          </Box>
        </Button>

        <Heading as="h3">
          Step {currentStep + 1} of {tokenSteps.length}
        </Heading>

        <Button
          onClick={() =>
            setCurrentStep(prev => Math.min(prev + 1, tokenSteps.length - 1))
          }
          sx={{
            bg: 'hsl(23, 94%, 32%)',
            opacity: currentStep === tokenSteps.length - 1 ? 0.5 : 1,
            pointerEvents:
              currentStep === tokenSteps.length - 1 ? 'none' : 'auto'
          }}
        >
          <Box sx={{ rotate: '180deg', lineHeight: 0, marginLeft: '-8px' }}>
            <Icon glyph="view-back" />
          </Box>
        </Button>
      </Box>

      <Box>
        <Text
          as="p"
          sx={{
            marginY: '1rem',
            fontSize: '1.2rem',
            textAlign: 'center',
            textWrap: 'balance'
          }}
        >
          {tokenSteps[currentStep].desc}
        </Text>
        <Image
          src={tokenSteps[currentStep].image}
          alt={`Step ${currentStep + 1}`}
          sx={{ width: '100%', height: 'auto', borderRadius: '0.25rem' }}
        />
      </Box>
    </Card>
  )
}

export default TokenInstructions
