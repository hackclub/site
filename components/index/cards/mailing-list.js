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
    <Box sx={{ 
      position: 'relative', 
      py: 6, 
      background: 'darker',
      backgroundImage: theme => 
        `linear-gradient(45deg, 
          ${theme.colors.darker} 0%, 
          ${theme.colors.black} 100%)`,
      borderTop: '1px solid',
      borderColor: 'rgba(255, 140, 55, 0.2)'
    }}>
      <Card
        sx={{
          maxWidth: '1050px',
          mx: 'auto',
          background: 'rgba(0, 0, 0, 0.6)',
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(8px)',
          borderRadius: 'extra',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
          border: '1px solid',
          borderColor: 'rgba(255, 140, 55, 0.3)',
          color: 'white',
          p: 4
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
                  textAlign: 'left',
                  color: 'white',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    width: '80px',
                    height: '4px',
                    background: theme => theme.util.gx('orange', 'red')
                  }
                }}
              >
                Join our newsletter
              </Text>
              <Text
                sx={{
                  color: 'muted',
                  mt: 4,
                  fontSize: 3,
                  textAlign: 'left'
                }}
                as="p"
              >
                Get the latest Hack Club updates, new projects, and upcoming events sent to your inbox.
                Check out our{' '}
                <Link
                  href="https://workshops.hackclub.com/leader-newsletters/"
                  target="_blank"
                  rel="noopener norefferer"
                  sx={{ color: 'orange' }}
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
              gap={[2, 3]}
              sx={{
                textAlign: 'center',
                alignItems: 'end',
                input: { 
                  bg: 'black',
                  border: '1px solid',
                  borderColor: 'rgba(255, 140, 55, 0.3)',
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)'
                  },
                  '&:focus': {
                    borderColor: 'orange',
                    outline: 'none'
                  }
                },
                width: '100%',
                mt: 3
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Input
                  autofillBackgroundColor="darker"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2,
                    py: 2
                  }}
                />
              </Box>
              <div>
                <Input
                  autofillBackgroundColor="darker"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2,
                    py: 2
                  }}
                />
              </div>
              <Button 
                type="submit" 
                sx={{ 
                  mt: [2, 0], 
                  fontSize: 2,
                  backgroundImage: theme => theme.util.gx('orange', 'red'),
                  color: 'white',
                  transition: 'transform 0.2s ease-in-out',
                  py: 2,
                  '&:hover': {
                    transform: 'translateY(-2px)'
                  }
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
                    <Icon glyph="email" size={20} sx={{ mr: 2 }} /> Subscribe
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
              width: '100%'
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
                />
              ))
              .reverse()}
          </Box>
        </Flex>
      </Card>
      <BGImg
        width={2544}
        height={2048}
        gradient="linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))"
        src={background}
        placeholder="blur"
        alt="Globe with hundreds of Hack Clubs"
      />
    </Box>
  )
}

export default MailingList
