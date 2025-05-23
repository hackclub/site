import Icon from '@hackclub/icons'
import { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, Flex, Grid, Input, Link, Text } from 'theme-ui'
import { format, parse } from 'date-fns'
import BGImg from '../../background-image'
import background from '../../../public/home/footer.png'
import MailCard from '../../mail-card'

const markdownToHtml = require('@hackclub/markdown')

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

const MailingList = () => {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState({ finalHtml: [], names: [] })
  const formRef = useRef(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

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
    }
    setSubmitting(false)
  }

  // This lovely concoction of JavaScript basically fetches the last two newsletters from the GitHub repo,
  // converts them to HTML, gets rid of those HTML tags, the sets all of that as the state of the component.
  // Then, It makes a second fetch request to get the filename, so that can be used to determine the link.
  // After that, it removes the file extension, so we can use that as the date.
  // Finally, it sets the state of data to the final HTML and the names of the files, so we can map that later on!

  useEffect(() => {
    Promise.all([
      fetch(
        'https://api.github.com/repos/hackclub/leaders-newsletter/contents/updates'
      )
        .then(response => response.json())
        .then(data => data.sort((a, b) => b.name.localeCompare(a.name))) // Makes sure we only get the latest two newsletters
        .then(data => data.slice(0, 2))
        .then(data => Promise.all(data.map(item => fetch(item.download_url)))) // Makes a separate fetch request for the content of each newsletter
        .then(responses =>
          Promise.all(responses.map(response => response.text()))
        )
        .then(markdown =>
          Promise.all(markdown.map(markdown => markdownToHtml(markdown)))
        )
        .then(html =>
          html.map(html =>
            html.replace(/<[^>]*>/g, '').replace(/The Hackening/g, '')
          )
        ), // Chucks out all html tags + 'The Hackening'

      fetch(
        'https://api.github.com/repos/hackclub/leaders-newsletter/contents/updates'
      )
        .then(response => response.json())
        .then(data => data.sort((a, b) => b.name.localeCompare(a.name)))
        .then(data => data.map(item => item.name.split('.')[0])) // Grabs the name and gets rid of the file extension
    ]).then(([finalHtml, names]) => setData({ finalHtml, names }))
  }, [])

  return (
    <Box sx={{ position: 'relative', py: 6, pt: 5, background: 'snow' }}>
      <Card
        sx={{
          maxWidth: '1050px',
          mx: 'auto',
          background: '#fdf6ee',
          position: 'relative',
          zIndex: 2,
          border: '5px solid #e4d6c3',
          borderRadius: '2.75rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)',
          overflow: 'hidden',
          transform: 'rotate(-0.5deg)',
          padding: [3, 4]
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
              gap: '15px',
              width: ['100%', '100%', '75%'],
              p: [3, 4],
              pt: "3px !important",
            }}
          >
            <Box>
              <Text
                variant="title"
                sx={{
                  fontSize: [4, '36px', '42px', 6],
                  zIndex: 2,
                  textAlign: 'left',
                  color: '#513f31',
                  fontWeight: 900,
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)'
                }}
              >
                Join the newsletter
              </Text>
              <Text
                sx={{
                  color: '#665040',
                  mt: 2,
                  fontSize: 3,
                  textAlign: 'left',
                  lineHeight: 1.5
                }}
                as="p"
              >
                We&apos;ll send you an email no more than once a month, when we
                work on something cool for you. Check out our{' '}
                <Link
                  href="https://workshops.hackclub.com/leader-newsletters/"
                  target="_blank"
                  rel="noopener norefferer"
                  sx={{
                    color: '#ec3750',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                    '&:hover': {
                      color: '#ff8c37',
                      textDecoration: 'none',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  previous issues
                </Link>
                .
              </Text>
            </Box>
            <Grid
              as="form"
              ref={formRef}
              onSubmit={handleSubmit}
              gap={[3, 4]}
              sx={{
                textAlign: 'center',
                alignItems: 'end',
                width: '100%',
                mt: 2
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
                    fontSize: 2,
                    bg: 'white',
                    border: '3px solid #e4d6c3',
                    borderRadius: '0.8rem',
                    py: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    '&:hover, &:focus': {
                      borderColor: '#ec3750',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }
                  }}
                />
              </Box>
              <Box>
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
                    fontSize: 2,
                    bg: 'white',
                    border: '3px solid #e4d6c3',
                    borderRadius: '0.8rem',
                    py: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    '&:hover, &:focus': {
                      borderColor: '#ec3750',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                    }
                  }}
                />
              </Box>
              <Button
                type="submit"
                sx={{
                  mt: [2, 2],
                  fontSize: 2,
                  borderRadius: '0.8rem',
                  py: 2,
                  px: 4,
                  fontWeight: 800,
                  bg: '#ec3750',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  '&:hover': {
                    transform: 'translateY(-2px) rotate(-1deg)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
                  },
                  '&:active': {
                    transform: 'translateY(1px)'
                  },
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                {submitting ? (
                  <>
                    <Loading /> Subscribe
                  </>
                ) : submitted ? (
                  <>
                    <Icon glyph="send" /> You're on the list!
                  </>
                ) : (
                  <>
                    <Icon glyph="email" size={24} />
                    Subscribe
                  </>
                )}
              </Button>
            </Grid>
          </Flex>
          <Box
            sx={{
              display: 'grid',
              gridGap: 4,
              mt: [4, 0],
              width: '100%',
              p: [3, 4]
            }}
          >
            {data.finalHtml
              .map((html, index) => (
                <MailCard
                  issue={index + 1}
                  body={html}
                  date={format(
                    parse('', '', new Date(data.names[index])),
                    'MMMM d, yyyy'
                  )}
                  link={data.names[index]}
                  key={index}
                  sx={{
                    border: '3px solid #e4d6c3',
                    borderRadius: '1.2rem',
                    bg: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-4px) rotate(1deg)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }
                  }}
                />
              ))
              .reverse()}
          </Box>
        </Flex>
      </Card>
    </Box>
  )
}

export default MailingList
