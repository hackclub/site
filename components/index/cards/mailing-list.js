/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Box, Input, Button, Text, Grid } from 'theme-ui'

const MailingList = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <Box
      sx={{
        bg: 'cyberpunk.darkerBg',
        borderRadius: '12px',
        maxWidth: 'layout',
        mx: 'auto',
        mb: 5,
        p: [4, 5],
        boxShadow: 'rgba(0, 191, 255, 0.05) 0px 8px 24px'
      }}
    >
      <Grid columns={[1, null, 2]} gap={4}>
        <Box>
          <Text
            as="h2"
            variant="title"
            sx={{
              fontSize: ['32px', '40px'],
              background: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3
            }}
          >
            Join the newsletter
          </Text>
          <Text
            as="p"
            sx={{
              color: 'cyberpunk.text',
              fontSize: ['16px', '18px'],
              mb: 3
            }}
          >
            We'll send you an email no more than once a month, when we work on something cool for you.{' '}
            <Text
              as="a"
              href="/previous-issues"
              sx={{
                color: 'cyberpunk.electricBlue',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Check out our previous issues
            </Text>
            .
          </Text>
        </Box>

        <Box>
          <Box
            as="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3
            }}
          >
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                bg: 'rgba(5, 8, 26, 0.6)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                p: 3,
                '&:focus': {
                  outline: 'none',
                  bg: 'rgba(5, 8, 26, 0.8)'
                },
                '&::placeholder': {
                  color: 'rgba(224, 224, 224, 0.5)'
                }
              }}
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                bg: 'rgba(5, 8, 26, 0.6)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                p: 3,
                '&:focus': {
                  outline: 'none',
                  bg: 'rgba(5, 8, 26, 0.8)'
                },
                '&::placeholder': {
                  color: 'rgba(224, 224, 224, 0.5)'
                }
              }}
            />
            <Button
              type="submit"
              sx={{
                background: 'linear-gradient(90deg, #00BFFF 0%, #8A2BE2 100%)',
                color: 'white',
                py: 3,
                px: 4,
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            >
              SUBSCRIBE
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default MailingList
