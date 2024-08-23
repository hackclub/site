import { useEffect, useState, useRef } from 'react'
import { Button, Heading, Text, Box, Close } from 'theme-ui'
import Icon from '@hackclub/icons'
import { Balancer } from 'react-wrap-balancer'
import Fade from 'react-reveal/Fade'

/** @jsxImportSource theme-ui */

const styled = `
@import url('https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap');
body, html {
  overflow-x: hidden;
  }
.slackey {
  font-family: "Slackey", sans-serif;
 }
 .emblema {
    font-family: "Emblema One", system-ui;
 }

 .gaegu {
    font-family: "Gaegu", sans-serif;
 }

 body {
    background-color: #FAEFD6;
    min-height: 100vh;
 }

@keyframes float {

  from,
  to {
      transform: translate(0%, -37%) rotate(-2deg);
  }

  25% {
      transform: translate(-2%, -40%) rotate(2deg);
  }

  50% {
      transform: translate(0%, -43%) rotate(-1deg);
  }

  75% {
      transform: translate(-1%, -40%) rotate(-1deg);
  }
}

a {
  color: inherit;
}
`

const Review = () => {
  return (
    <body className="gaegu">
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '2fr 1fr', '3fr 1fr']
        }}
      >
        <div sx={{ px: 5, py: 4 }}>
          <Fade>
            <Text
              as="h3"
              variant="subtitle"
              className="slackey"
              sx={{ color: '#FF5C00' }}
            >
              Hack Club x GitHub
            </Text>
          </Fade>
          <Fade delay={100}>
            <img
              src="https://cloud-677i45opw-hack-club-bot.vercel.app/0arcade_1.png"
              sx={{
                width: ['90vw', '60vw', '40vw'],
                maxWidth: '400px',
                display: 'block',
                mt: 3
              }}
            />
          </Fade>
          <Fade delay={200}>
            <Balancer>
              <Text
                as="p"
                variant="subtitle"
                sx={{ color: '#09AFB4', maxWidth: '400px' }}
              >
                One Summer. 10,000 students. The ultimate hackathon.
              </Text>
            </Balancer>
          </Fade>
          <Fade>
          <Button
              as="a"
              sx={{
                backgroundColor: '#FF5C00',
                color: '#ebebeb',
                textSizeAdjust: '16px',
                borderRadius: '10px'
              }}
              href="/arcade/showcase"
              target="_blank"
              rel="noopener"
            >
              See all projects
            </Button>
          </Fade>
        </div>
        <div id="projects"></div>
      </div>

      <style>{styled}</style>
    </body>
  )
}

export default Review
