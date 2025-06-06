import Icon from '@hackclub/icons'
import { useRef, useState } from 'react'
import { Box, Button, Card, Flex, Grid, Input, Text } from 'theme-ui'
import BGImg from '../../background-image'
import background from '../../../public/home/footer.png'
import MailCard from '../../mail-card'

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #ec3750',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      animation: 'spin 2s linear infinite',
      mr: '5px',
      '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' }
      }
    }}
  ></Box>
)

const MailingList = ({ posts }) => {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let res = await fetch('/api/mailing-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value
        })
      })

      formRef.current.reset()

      if (res.ok) {
        setSubmitted(true)
      } else {
        console.error('Submission failed:', await res.text())
        setSubmitted(false)
      }
    } catch (error) {
      console.error('Error during submission:', error)
      setSubmitted(false)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <Box sx={{ position: 'relative', py: 6, background: 'darker' }}>
      <Card
        sx={{
          maxWidth: '1050px',
          mx: 'auto',
          // mt: [3, 4],
          background: 'rgb(255,255,255, 0.45)',
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(8px)'
        }}
      >
        <Flex
          sx={{ flexDirection: ['column', 'column', 'row'], gridGap: [0, 5] }}
        >
          <Flex
            sx={{
              placeItems: 'center',
              justifyContent: 'center',
              alignItems: ['left', 'left', 'center'],
              flexDirection: 'column',
              gap: '10px',
              width: ['100%', '100%', '75%']
            }}
          >
            <Box>
              <Text
                variant="title"
                sx={{
                  fontSize: [4, '36px', '42px', 6],
                  zIndex: 2,
                  textAlign: 'left'
                }}
              >
                Join the newsletter
              </Text>
              <Text
                sx={{
                  color: 'darkless',
                  mt: 2,
                  fontSize: 3,
                  textAlign: 'left'
                }}
                as="p"
              >
                Join <i>Happenings</i>, our biweekly newsletter about all things Hack Club. No spam, we promise.
              </Text>
            </Box>
            <Grid
              as="form"
              ref={formRef}
              onSubmit={handleSubmit}
              gap={[2, 3]}
              sx={{
                textAlign: 'center',
                alignItems: 'end',
                input: { bg: 'sunken' },
                width: '100%'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Input
                  autofillBackgroundColor="highlight"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2
                  }}
                />
              </Box>
              <div>
                <Input
                  autofillBackgroundColor="highlight"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2
                  }}
                />
              </div>
              <Button type="submit" sx={{ mt: [2, 0], fontSize: 2 }}>
                {submitting ? (
                  <>
                    <Loading /> Subscribe
                  </>
                ) : submitted ? (
                  <>
                    <Icon glyph="send" /> Check your email!
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </Grid>
          </Flex>
          <Box
            sx={{
              display: 'grid',
              gridGap: 4,
              mt: [4, 0],
              width: '100%'
            }}
          >
            {posts
              .map((post, index) => (
                <MailCard
                  issue={index + 1}
                  body={post.title}
                  date={post.date}
                  link={post.link}
                  key={index}
                />
              ))
              .reverse()}
          </Box>
        </Flex>
      </Card>
      <BGImg
        width={2544}
        height={2048}
        gradient="linear-gradient(rgba(0,0,0,0.125), rgba(0,0,0,0.25))"
        src={background}
        placeholder="blur"
        alt="Globe with hundreds of Hack Clubs"
      />
    </Box>
  )
}

export default MailingList