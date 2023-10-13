import Icon from '@hackclub/icons'
import {useRef, useState} from 'react'
import { Box, Input, Button, Text, Card, Flex, Grid, Link } from 'theme-ui'
import MailCard from '../../mail-card'
import BGImg from '../../background-image'

import background from '../../../public/home/footer.png'

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
        '100%': { transform: 'rotate(360deg)' },
      },
    }}
  ></Box>
)

const MailingList = () => {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
    const [letters, setLetters] = useState([])
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    let res = await fetch('/api/mailing-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
      }),
    })

    formRef.current.reset()

    if (res.ok) {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

 /* useEffect(() => {
      const newsletters = async () => {
          const res = await fetch('https://api.github.com/repositories/313119644/contents/updates', {
              headers: {
                  'Content-Type': 'application/json',
              }
          })

            const data = await res.json()
            setLetters(data)
      }

      newsletters()
  }, [])*/


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
          backdropFilter: 'blur(8px)',
        }}
      >
        <Flex sx={{ flexDirection: ['column', 'column', 'row'], gridGap: [0, 5] }}>
          <Flex
            sx={{
              placeItems: 'center',
              justifyContent: 'center',
              alignItems: ['left', 'left', 'center'],
              flexDirection: 'column',
              gap: '10px',
              width: ['100%', '100%', '75%'],
            }}
          >
            <Box>
              <Text
                variant='title'
                sx={{
                  fontSize: [4, '36px', '42px', 6],
                  zIndex: 2,
                  textAlign: 'left',
                }}
              >
                Join the newsletter
              </Text>
              <Text
                sx={{
                  color: 'darkless',
                  mt: 2,
                  fontSize: 3,
                  textAlign: 'left',
                }}
                as='p'
              >
                We&apos;ll send you an email no more than once a month, when we work
                on something cool for you. Check out our{' '}
                <Link href='/leader-newsletters/'>previous issues</Link>.
              </Text>
            </Box>
            <Grid
              as='form'
              ref={formRef}
              onSubmit={handleSubmit}
              gap={[2, 3]}
              sx={{
                textAlign: 'center',
                alignItems: 'end',
                input: { bg: 'sunken' },
                width: '100%',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Input
                  autofillBackgroundColor='highlight'
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Your Name'
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2,
                  }}
                />
              </Box>
              <div>
                <Input
                  autofillBackgroundColor='highlight'
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Your Email'
                  required
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 2,
                  }}
                />
              </div>
              <Button type='submit' sx={{ mt: [2, 0], fontSize: 2 }}>
                {submitting ? (
                  <>
                    <Loading /> Subscribe
                  </>
                ) : submitted ? (
                  <>
                    <Icon glyph='send' /> You're on the list!
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
              width: '100%',
            }}
          >
            <MailCard
              date='August 2023'
              issue={18}
              body='Bring your club on an epic adventure in code this semester! Jams are 18 brand new coding workshops created by Hack Clubbers ESPECIALLY for you to use in your meetings, complete with pre-made slide decks and even some videos!'
              link='/leader-newsletters/2023-08-18'
            />
            <MailCard
              date='September 2023'
              issue={20}
              body='📆📣 Leader meeting tomorrow! Join club leaders Sahiti, Zayn and Ronnit tomorrow 8:00am PST/11:00am EST/8:30pm IST. Bring questions and advice to share about maintaining your club after the first meeting!!'
              link='/leader-newsletters/2023-09-29'
            />
              {/*<Link href='/leader-newsletters/' sx={{ justifySelf: 'center', cursor: 'pointer',  }} as='h3'>
                  Read more
              </Link>*/}
          </Box>
        </Flex>
      </Card>
      <BGImg
        width={2544}
        height={2048}
        gradient='linear-gradient(rgba(0,0,0,0.125), rgba(0,0,0,0.25))'
        src={background}
        placeholder='blur'
        alt='Globe with hundreds of Hack Clubs'
      />
    </Box>
  )
}

export default MailingList
