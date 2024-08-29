import { useState } from 'react'
import { Box, Button, Card, Link, Input, Text, Flex, Image } from 'theme-ui'
import Icon from '@hackclub/icons'

const ReplitForm = ({ cssDark }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({})

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const submitForm = () => {
    console.log('submitting')
  }

  const stickers = [
    '/stickers/orpheus-having-boba.png',
    '/stickers/find out.png',
    '/stickers/hackers,_assemble!.png',
    '/stickers/mo’ parts mo’ problems.png',
    '/stickers/orphmoji_peefest.png',
    '/stickers/skullpup_boba.png',
    '/stickers/hackers,_assemble!.png',
    '/stickers/orphmoji_yippee.png',
    '/replit/replit-fire.png'
  ]

  const fieldStyle = ({ disabled }) => ({
    border: '1px solid #0002',
    cursor: disabled ? 'not-allowed' : 'auto',
    opacity: disabled ? 0.5 : 1
  })

  const buttonStyle = ({ disabled }) => ({
    backgroundColor: cssDark,
    cursor: disabled ? 'not-allowed' : 'auto',
    opacity: disabled ? 0.5 : 1
  })

  const StepIndicator = ({ step }) => (
    <Box
      sx={{
        position: 'absolute',
        left: '-1rem',
        top: 0,
        bottom: 0,
        width: '0.2em',
        backgroundColor: cssDark,
        borderRadius: '999px',
        opacity: step > currentStep ? 0.25 : 1
      }}
    ></Box>
  )

  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '.5em',
    alignItems: 'flex-start',
    position: 'relative'
  }

  const step1 = () => {
    const fieldDisabled = currentStep !== 1 || isSubmitted
    const buttonDisabled = fieldDisabled || !formData.email

    return (
      <Box sx={boxStyle} className="step">
        <Text sx={{ fontWeight: '700', opacity: fieldDisabled ? 0.5 : 1 }}>
          Email
        </Text>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          disabled={fieldDisabled}
          onChange={handleInputChange}
          sx={fieldStyle({ disabled: fieldDisabled })}
        />{' '}
        <Button
          onClick={() => setCurrentStep(2)}
          disabled={buttonDisabled}
          sx={{
            width: '100%',
            ...buttonStyle({ disabled: buttonDisabled })
          }}
        >
          <Icon glyph="down-caret" />
          Next
        </Button>
        <StepIndicator step={1} />
      </Box>
    )
  }

  const step2 = () => {
    const fieldDisabled = currentStep !== 2 || isSubmitted
    const backButtonDisabled = fieldDisabled
    const submitButtonDisabled =
      fieldDisabled || !formData.email || !formData.token

    return (
      <Box sx={boxStyle} className="step">
        <Box
          sx={{
            display: 'flex',
            gap: '0.5em',
            alignItems: 'baseline',
            opacity: fieldDisabled ? 0.5 : 1
          }}
        >
          <Text sx={{ fontWeight: '700' }}>
            Replit <code>connect.sid</code> token{' '}
          </Text>
          <Link sx={{ fontSize: '0.8em' }} href="#instructions">
            How do I find this?
          </Link>
        </Box>
        <Input
          id="token"
          name="token"
          placeholder="Enter your replit token"
          required
          disabled={fieldDisabled}
          onChange={handleInputChange}
          sx={fieldStyle({ disabled: fieldDisabled })}
        />{' '}
        <Flex
          sx={{ width: '100%', justifyContent: 'space-between', gap: '1rem' }}
        >
          <Button
            onClick={() => setCurrentStep(1)}
            disabled={backButtonDisabled}
            sx={{
              flexShrink: '0',
              ...buttonStyle({ disabled: backButtonDisabled })
            }}
          >
            <Icon glyph="up-caret" /> Back
          </Button>
          <Button
            onClick={submitForm}
            disabled={submitButtonDisabled}
            sx={{
              width: '100%',
              ...buttonStyle({ disabled: submitButtonDisabled })
            }}
          >
            Submit
          </Button>
        </Flex>
        <StepIndicator step={2} />
      </Box>
    )
  }

  const step3 = () => (
    <Box
      sx={{
        ...boxStyle,
        opacity: currentStep === 3 ? 1 : 0.5
      }}
      className="step"
    >
      <Text sx={{ fontWeight: '700' }}>Stickers</Text>
      <Text>
        Get free stickers Get free stickers Get free stickers Get free stickers
        Get free stickers Get free stickers Get free stickers Get free stickers
        Get free stickers Get free stickers{' '}
      </Text>

      <style>
        {`
          .sticker {
          scale: 1;
          filter: drop-shadow(0 0 0.2rem #0008);
          transition: scale 0.1s, filter 0.1s;
          }

          .sticker:hover {
            scale: 1.2;
            filter: drop-shadow(0 0 0.6rem #0004);
          }
          `}
      </style>
      {stickers.map((sticker, idx) => {
        const pos = getRandomPointOnUnitSquare()
        return (
          <Image
            src={sticker}
            width="64"
            height="64"
            alt="orpheus dinosaur labelled 'hackers assemble'"
            className="sticker"
            sx={{
              position: 'absolute',
              rotate: `${(Math.random() - 0.5) * 80}deg`,
              left: `${pos[0] * 100}%`,
              top: `${pos[1] * 100}%`,
              translate: '-50% -50%'
            }}
            draggable="false"
            key={idx}
          />
        )
      })}
      <StepIndicator step={3} />
    </Box>
  )

  function getRandomPointOnUnitSquare() {
    const side = Math.floor(Math.random() * 4)
    const position = Math.random()
    const margin = 0.1

    switch (side) {
      case 0:
        return [-margin, position]
      case 1:
        return [position, 1 + margin]
      case 2:
        return [1 + margin, 1 - position]
      case 3:
        return [1 - position, -margin]
    }
  }

  return (
    <Card
      sx={{
        width: '30rem',
        marginX: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        overflow: 'initial'
      }}
    >
      <style>{`.step { transition: opacity 0.1s; }`}</style>
      {step1()}
      {step2()}
      {step3()}
    </Card>
  )
}

export default ReplitForm
