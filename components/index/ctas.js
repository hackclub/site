import { Box, Link, Text, Image, Card, Button } from 'theme-ui'
import Icon from '../icon'
import CarouselCards from './carousel-cards'
import { keyframes } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { Fade } from 'react-reveal'
/** @jsxImportSource theme-ui */

export default function CTAS({ cards }) {
  const [pageIsVisible, setPageIsVisible] = useState(true)

  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  return (
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        <Box
          as="div"
          sx={{
            //1 row flexbox of cards
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',

            gap: [3, 4, 4],

            justifyContent: ['center', 'center', 'flex-start'],

            mt: 1,
            py: [3, 3, 3]
          }}>
          {cards.slice(cards.length - 3).reverse().map((card, idx) => {
            const {
              background,
              backgroundImage,
              backgroundSize,

              description,
              descriptionColor,

              title,
              logo,

              buttonText,
              buttonColor,
              link
            } = card;

            return (
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  width: ['100%', '100%', 'auto'],
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.125)',
                  transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
                  '&:hover': { transform: 'scale(1.0625)' },
                  '.icon': {
                    transition: 'transform 0.25s ease-in-out, opacity 0.43s ease-in-out'
                  },
                  ':hover,:focus': {
                    '.icon': {
                      transform: 'translateX(28px) translateY(-28px)',
                      opacity: 0
                    }
                  }
                }}
              >
                <Card
                  // variant="interactive"
                  sx={{
                    background,
                    backgroundImage,
                    backgroundSize,
                    position: 'relative',
                    color: 'white',
                    width: ['100%', '100%', '300px'],
                    minWidth: ['100%', '100%', 'initial'],
                    padding: ['12px !important', '16px !important', '20px !important'],
                    paddingTop: [
                      '14px !important',
                      '20px !important',
                      '24px !important'
                    ],
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    '&:hover': { cursor: 'pointer' },
                    '&:hover svg': { opacity: 0.5 }
                  }}
                >
                  <Image
                    src={logo}
                    alt={title}
                    sx={{
                      zIndex: 2,
                      height: ['42px', '50px', '58px'],
                    }}
                  />
                  <Text
                    as="p"
                    sx={{
                      color: descriptionColor, 
                      fontSize: [1, '16px', '20px'],
                      my: 2
                    }}
                  >
                    {description}
                  </Text>
                  <Button
                    sx={{
                      backgroundColor: buttonColor,
                      color: 'white',
                      mt: 'auto'
                    }}
                    as="a"
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {buttonText}
                  </Button>
                </Card>
              </Box>
            )
          })}
          
        </Box>
      )}
    </PageVisibility>
  )
}
