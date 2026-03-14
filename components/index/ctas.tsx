/** @jsxImportSource theme-ui */
import { Box, Text, Image, Card } from 'theme-ui'
import React, { useState } from 'react'
import PageVisibility from 'react-page-visibility'

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
            gap: 2,
            justifyContent: ['center', 'center', 'flex-start'],

            mt: 1,
            pt: 3
          }}>
          {cards.map((card, idx) => {
            const {
              background,
              backgroundImage,
              backgroundSize,
              gridBackground,
              stickerImage,
              stickerImageScale,

              description,
              descriptionColor,

              title,
              logo,
              logoScale,

              link
            } = card;

            return (
              <Box
                key={idx}
                as="a"
                href={link}
                target="_blank"
                rel="noreferrer"
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  width: ['100%', '100%', 'auto'],
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.125)',
                  transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
                  textDecoration: 'none',
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
                {stickerImage && (
                  <Image
                    src={stickerImage}
                    alt="Sticker"
                    sx={{
                      position: 'absolute',
                      bottom: '-30px',
                      right: '-30px',
                      width:
                        stickerImageScale !== null && stickerImageScale !== undefined
                          ? [
                              `${120 * stickerImageScale}px`,
                              `${140 * stickerImageScale}px`,
                              `${160 * stickerImageScale}px`
                            ]
                          : '120px',
                      height: 'auto',
                      zIndex: 10,
                      transform: 'rotate(15deg)',
                      pointerEvents: 'none'
                    }}
                  />
                )}
                <Card
                  // variant="interactive"
                  sx={{
                    background,
                    backgroundImage: gridBackground 
                      ? 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)'
                      : backgroundImage,
                    backgroundSize: gridBackground ? '50px 50px' : backgroundSize,
                    backgroundPosition: gridBackground ? '0 0, 0 0' : undefined,
                    position: 'relative',
                    color: 'white',
                    width: ['100%', '100%', '240px'],
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
                      height: '40px',
                      objectFit: 'contain',
                      transform: logoScale ? `scale(${logoScale})` : undefined,
                    }}
                  />
                  <Text
                    as="p"
                    sx={{
                      color: descriptionColor, 
                      fontSize: [1, '16px', '18px'],
                      my: 2,
                    }}
                  >
                    {description}
                  </Text>
                </Card>
              </Box>
            )
          })}
          
        </Box>
      )}
    </PageVisibility>
  )
}
