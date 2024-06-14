import JSConfetti from 'js-confetti'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'

/** @jsxImportSource theme-ui */
const Join = ({ fold, last, showForm, setForm, formSent, setFormSent }) => {
  const [email, setEmail] = useState('')
  const [highschool, setHighschool] = useState(false)

  let jsConfetti = useRef()

  useEffect(() => {
    jsConfetti.current = new JSConfetti()
  }, [])

  const handleFormSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch('/api/arcade/slack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: email
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error:', errorData)
        // Optionally handle the error here (e.g., show a message to the user)
        return
      }

      setEmail('')
      setFormSent(true)
      jsConfetti.current.addConfetti({
        confettiColors: [
          // Hack Club colours!
          '#09AFB4',
          '#FF5C00'
        ]
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: ['column', 'column', 'column', 'row'],
        gap: '10px',
        alignItems: ['center', 'center', 'center', 'start'],
        mt: 4,
        pb: last ? 5 : '0',
        justifyContent: fold ? 'flex-start' : last ? 'flex-start' : 'flex-end'
      }}
    >
      {showForm ? (
        formSent ? (
          fold ? (
            <Box
              className="slackey"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                border: '#09AFB4 2px dashed',
                color: '#09AFB4',
                width: 'fit-content',
                paddingX: ['8px', '10px', '15px'],
                paddingY: ['5px', '7px', '7px'],
                borderRadius: '5px',
                textAlign: 'center'
              }}
            >
              Email from The Arcade <br /> arriving in your inbox soon!
            </Box>
          ) : (
            <Flex
              as="a"
              href="https://hack.club/arcade-join"
              target="_blank"
              className="slackey"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                backgroundColor: '#FF5C00',
                color: '#FAEFD6',
                width: 'fit-content',
                paddingX: ['8px', '10px', '15px'],
                paddingY: ['5px', '7px', '10px'],
                fontSize: ['24px', '27px', '30px'],
                borderRadius: '5px',
                textAlign: 'center',
                // margin: 'auto',
                // mt: 3,
                zIndex: 2
              }}
            >
              Free Stickers
            </Flex>
          )
        ) : (
          <form
            onSubmit={handleFormSubmit}
            sx={{
              height: '100%'
            }}
          >
            <Flex
              sx={{
                height: '70px',
                gap: '10px',
                fontSize: ['18px', '20px', '22px'],
                flexDirection: [
                  'column',
                  'column',
                  'row',
                  'row'
                ]
              }}
            >
              <Box
                sx={{
                  position: 'relative'
                }}
              >
                <Text
                  as="subtitle"
                  htmlFor="email"
                  sx={{
                    position: 'absolute',
                    width: '150%',
                    top: '-30px',
                    color: last ? '#FAEFD6' : '#FF5C00'
                  }}
                  className="gaegu"
                >
                  Get your Slack invite to start.
                </Text>
                {/* <Label
                  variant="labelHoriz"
                  className="gaegu"
                  sx={{
                    m: 0,
                    fontSize: 1,
                    pt: 1,
                    position: 'absolute',
                    width: last ? '100%' : '150%',
                    bottom: last? '-50px' : '-30px',
                    color: last ? '#FAEFD6':'#FF5C00'
                  }}
                >
                  <Checkbox
                    name="age"
                    defaultChecked={false}
                    onClick={() => {setHighschool(!highschool)}}
                  />
                  Pinky promise! I am a high schooler (or younger).
                </Label> */}
                <Text
                  as="subtitle"
                  htmlFor="email"
                  sx={{
                    position: 'absolute',
                    width: ['100%', '100%', '180%', '200%'],
                    bottom: ['-120px', '-120px', '-40px', '-40px'],
                    color: '#FF5C00',
                    opacity: 0.4
                  }}
                  className="gaegu"
                >
                  Already in Slack? Join #arcade and you're in!
                </Text>
                <input
                  type="email"
                  id="email"
                  placeholder="your email here"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="gaegu"
                  sx={{
                    height: '70px',
                    pl: '10px',
                    border: '#FF5C00 2px solid',
                    color: '#FF5C00',
                    background: '#FAEFD6',
                    width: '100%',
                    borderRadius: '5px',
                    fontSize: ['24px', '27px', '30px']
                  }}
                />
              </Box>
              <button
                type="submit"
                sx={{
                  backgroundColor: '#FF5C00',
                  color: '#FAEFD6',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: ['24px', '27px', '25px'],
                  px: '20px',
                  // cursor: highschool ? 'pointer': 'not-allowed',
                  transitionDuration: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
                className="slackey"
              >
                Join ARCADE
              </button>
            </Flex>
          </form>
        )
      ) : (
        <Flex
          as="a"
          onClick={() => {
            setForm(true)
          }}
          target="_blank"
          className="slackey"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            backgroundColor: '#FF5C00',
            cursor: 'pointer',

            color: '#FAEFD6',
            width: 'fit-content',
            paddingX: ['8px', '10px', '15px'],
            paddingY: ['5px', '7px', '10px'],
            fontSize: ['24px', '27px', '30px'],
            borderRadius: '5px',
            textAlign: 'center',
            // margin: 'auto',
            // mt: 3,
            zIndex: 2,
            transitionDuration: '0.3s',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          Join ARCADE!
        </Flex>
      )}

      {fold ? (
        showForm ? (
          formSent ? (
            <Flex
              as="a"
              href="https://hack.club/arcade-join"
              target="_blank"
              className="slackey"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                backgroundColor: '#FF5C00',
                color: '#FAEFD6',
                width: 'fit-content',
                paddingX: ['8px', '10px', '15px'],
                paddingY: ['5px', '7px', '10px'],
                fontSize: ['24px', '27px', '30px'],
                borderRadius: '5px',
                textAlign: 'center',

                // margin: 'auto',
                // mt: 3,
                zIndex: 2
              }}
            >
              Free Stickers
            </Flex>
          ) : (
            <></>
          )
        ) : (
          <Flex
            as="a"
            href="https://hack.club/arcade-join"
            target="_blank"
            className="slackey"
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              border: '#FF5C00 2px solid',
              color: '#FF5C00',
              width: 'fit-content',
              paddingX: ['8px', '10px', '15px'],
              paddingY: ['5px', '7px', '10px'],
              fontSize: ['24px', '27px', '30px'],
              borderRadius: '5px',
              textAlign: 'center',
              // margin: 'auto',
              // mt: 3,
              zIndex: 2
            }}
          >
            Free Stickers
          </Flex>
        )
      ) : (
        <></>
      )}
    </Box>
  )
}

export default Join
