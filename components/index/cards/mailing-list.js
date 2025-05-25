/** @jsxImportSource theme-ui */
import { useState, useEffect, useRef } from 'react'
import { Box, Input, Button, Text, Grid, Card, Flex, Link } from 'theme-ui'
import Icon from '@hackclub/icons'
import Tilt from '../../tilt'
import dynamic from 'next/dynamic'

const RelativeTime = dynamic(() => import('react-relative-time'), {
  ssr: false
})

const Loading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '2px solid',
      borderColor: 'cyberpunk.gridLine',
      borderTop: '2px solid',
      borderTopColor: 'cyberpunk.electricBlue',
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

const MailingList = () => {
  const [posts, setPosts] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/SkyfallWasTaken/Clippings/refs/heads/main/happenings.json'
        )
        const data = await response.json()
        const latestPosts = data.slice(-3).reverse()
        setPosts(latestPosts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    }
    fetchPosts()
  }, [])

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
    setSubmitting(false)
  }

  return (
    <Box sx={{ position: 'relative', py: [4, 5, 6], bg: 'cyberpunk.darkerBg' }}>
      <Card
        sx={{
          maxWidth: '1050px',
          mx: 'auto',
          background: 'rgba(49, 50, 68, 0.75)',
          border: '1px solid',
          borderColor: 'cyberpunk.gridLine',
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(12px)',
          p: [3, 4],
          borderRadius: '12px'
        }}
      >
        <Flex
          sx={{ flexDirection: ['column', null, 'row'], gap: [4, null, 5] }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              gap: [3, 4],
              width: ['100%', null, '50%']
            }}
          >
            <Box>
              <Text
                variant="title"
                sx={{
                  fontSize: [4, '36px', '42px'],
                  color: 'cyberpunk.textHighlight',
                  textAlign: 'left',
                  mb: 2
                }}
              >
                Join the newsletter
              </Text>
              <Text
                sx={{
                  color: 'cyberpunk.textMuted',
                  fontSize: [2, 3],
                  textAlign: 'left',
                  lineHeight: 'body'
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
                input: {
                  bg: 'cyberpunk.inputBackground',
                  border: '1px solid',
                  borderColor: 'cyberpunk.gridLine',
                  borderRadius: '8px',
                  color: 'cyberpunk.textHighlight',
                  p: 3,
                  '&:focus': {
                    outline: 'none',
                    borderColor: 'cyberpunk.electricBlue'
                  },
                  '&::placeholder': {
                    color: 'cyberpunk.textMuted',
                    opacity: 0.7
                  }
                },
                width: '100%'
              }}
            >
              <Input
                autofillBackgroundColor="highlight"
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                required
              />
              <Input
                autofillBackgroundColor="highlight"
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                required
              />
              <Button type="submit" sx={{
                mt: [2, 0], fontSize: 2, width: '100%', py: 3,
                background: 'cyberpunk.ctaGradient',
                color: 'cyberpunk.textHighlight',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,191,255,0.3)'
                }
              }}>
                {submitting ? (
                  <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Loading /> Subscribe
                  </Flex>
                ) : submitted ? (
                  <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Icon glyph="send" size={24} style={{ marginRight: '8px' }} /> You&apos;re on the list!
                  </Flex>
                ) : (
                  'Subscribe'
                )}
              </Button>

              {/* Testimonial Section */}
              <Box sx={{ mt: 4, p: 3, bg: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid', borderColor: 'cyberpunk.gridLine' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <Box>
                    <Text as="p" sx={{ fontStyle: 'italic', color: 'cyberpunk.text', fontSize: [1, 2], mb: 1 }}>
                      &quot;Happenings is genuinely the one newsletter I actually look forward to reading&quot;
                    </Text>
                    <Text as="p" sx={{ color: 'cyberpunk.textMuted', fontSize: [0, 1], textAlign: 'right' }}>
                      - Nihaal, 16
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Grid>
          </Flex>

          {posts.length > 0 && (
            <Box sx={{ width: ['100%', null, '50%'], mt: [4, null, 0] }}>
              <Text
                as="h3"
                variant="title"
                sx={{
                  mb: [3, 4],
                  color: 'cyberpunk.textHighlight',
                  fontSize: ['30px', '32px'],
                  fontWeight: 'bold',
                  textAlign: ['center', null, 'left']
                }}
              >
                Latest Happenings:
              </Text>
              <Box sx={{ display: 'grid', gridGap: [3, 4] }}>
                {posts.map((post, index) => (
                  <Tilt key={index} options={{ max: 8, perspective: 1000, scale: 1.03 }}>
                    <Box
                      sx={{
                        p: 3,
                        bg: 'cyberpunk.inputBackground',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: 'cyberpunk.gridLine',
                        minHeight: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'border-color 0.3s ease',
                        '&:hover': {
                          borderColor: 'cyberpunk.electricBlue'
                        }
                      }}
                    >
                      <div>
                        <Text as="h4" sx={{ color: 'cyberpunk.electricBlue', mb: 1, fontSize: ['18px', '20px'], fontWeight: 'bold' }}>
                          {post.title}
                        </Text>
                        {post.date && (
                          <Text as="p" sx={{ color: 'cyberpunk.textMuted', fontSize: ['12px', '14px'], mb: 2 }}>
                            <RelativeTime value={post.date + " 16:00"} />
                          </Text>
                        )}
                      </div>
                      <Link
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'cyberpunk.textMuted',
                          fontSize: ['14px', '16px'],
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'cyberpunk.electricBlue'
                          },
                          alignSelf: 'flex-start'
                        }}
                      >
                        Read on the Slack <Icon glyph="external" size={16} style={{ verticalAlign: 'middle' }} />
                      </Link>
                    </Box>
                  </Tilt>
                ))}
              </Box>
            </Box>
          )}
        </Flex>
      </Card>
    </Box>
  )
}

export default MailingList
