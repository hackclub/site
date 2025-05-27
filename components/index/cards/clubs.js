import React from 'react'
import Buttons from './button'
import CardModel from './card-model'
import { Box, Grid, Flex, Image, Text, Badge, useColorMode } from 'theme-ui'
import Icon from '../../icon'

/** @jsxImportSource theme-ui */

export default function Clubs() {
  const [colorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <>
      <Box
        sx={{
          mt: 1,
          mb: 5,
          position: 'relative',
          mx: [0, -2, -3],
          mb: [1, 2, 4],
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: isDark
            ? '0 4px 12px rgba(0,0,0,0.3)'
            : '0 4px 12px rgba(0,0,0,0.1)',
          border: isDark ? '4px solid #333' : '4px solid white',
          height: ['180px', '220px', '240px']
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            bg: isDark ? 'rgba(51, 51, 51, 0.9)' : 'rgba(255,255,255,0.9)',
            color: isDark ? '#eee' : '#513f31',
            borderRadius: '8px',
            px: 2,
            py: 1,
            fontSize: ['12px', '14px'],
            fontWeight: 'bold',
            boxShadow: isDark
              ? '0 2px 4px rgba(0,0,0,0.3)'
              : '0 2px 4px rgba(0,0,0,0.15)',
            zIndex: 10,
            fontFamily:
              '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
            transform: 'rotate(-2deg)'
          }}
        >
          Summer Creek Hack Club
        </Box>
        <Image
          src="https://cloud-5pdwvchgm-hack-club-bot.vercel.app/05851864a.jpg"
          alt="Summer Creek Hack Club meeting, February 2020"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            filter: isDark
              ? 'contrast(0.95) brightness(0.85)'
              : 'contrast(1.05) brightness(1.05)',
            transition: 'transform 0.5s ease-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            height: '50%',
            pointerEvents: 'none'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            bg: isDark ? '#333' : 'white',
            color: isDark ? '#ddd' : '#513f31',
            px: 2,
            py: 1,
            fontSize: '12px',
            borderRadius: '8px',
            fontStyle: 'italic',
            opacity: 0.9
          }}
        >
          February 2020
        </Box>
      </Box>

      <CardModel
        color="white"
        sx={{
          backgroundColor: isDark ? '#222' : '#fdf6ee',
          borderRadius: '24px',
          border: isDark ? '6px solid #444' : '6px solid #e4d6c3',
          boxShadow: isDark
            ? '0 12px 24px rgba(0,0,0,0.3)'
            : '0 12px 24px rgba(0,0,0,0.1)',
          padding: '0 !important',
          overflow: 'visible',
          position: 'relative',
          transform: 'rotate(-1deg)',
          transition: 'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)',
          '&:hover': {
            transform: 'rotate(0deg) translateY(-8px)'
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#ec3750',
            border: '2px solid #d23040',
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
            zIndex: 10
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#33d6a6',
            border: '2px solid #d23040',
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
            zIndex: 10
          }}
        />

        <Box
          sx={{
            bg: '#ec3750',
            borderRadius: '16px 16px 0 0',
            py: [2, 3],
            px: [3, 4],
            color: 'white',
            overflow: 'hidden',
            position: 'relative',
            borderBottom: '4px solid #d23040'
          }}
        >
          <Flex
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Text
              variant="title"
              as="h3"
              sx={{
                fontSize: ['24px', '26px', '30px'],
                fontFamily:
                  '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
                position: 'relative',
                zIndex: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.25)',
                mb: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Icon
                glyph="clubs"
                size={32}
                sx={{
                  mr: 2,
                  color: 'white',
                  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.25))'
                }}
              />
              Hack Clubs
            </Text>

            <Badge
              variant="pill"
              sx={{
                bg: 'white',
                color: '#ec3750',
                fontWeight: 'bold',
                fontSize: ['14px', '16px'],
                px: 2,
                py: 1,
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                zIndex: 2,
                position: 'relative'
              }}
            >
              400+ worldwide!
            </Badge>
          </Flex>

          <Box
            sx={{
              position: 'absolute',
              top: '-40px',
              right: '-30px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 1
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              bottom: '-20px',
              left: '-10px',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 1
            }}
          />
        </Box>

        <Grid
          columns={1}
          sx={{
            p: [3, 4],
            pb: '0px !important',
            bg: isDark ? '#222' : '#fdf6ee',
            position: 'relative',
            gap: [3, 4]
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              bg: '#ffca38',
              color: '#513f31',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #e4b62d',
              boxShadow: isDark
                ? '0 4px 8px rgba(0,0,0,0.3)'
                : '0 4px 8px rgba(0,0,0,0.15)',
              fontFamily:
                '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
              fontWeight: 'bold',
              fontSize: '14px',
              transform: 'rotate(-5deg)',
              zIndex: 5,
              padding: '2px'
            }}
          >
            <Text sx={{ lineHeight: 1.2, fontSize: '12px' }}>Free</Text>
            <Text sx={{ lineHeight: 1.2, fontSize: '16px' }}>Stickers!</Text>
          </Box>
          <Box>
            <Text
              as="p"
              sx={{
                fontSize: ['16px', '18px'],
                color: isDark ? '#ddd' : '#513f31',
                lineHeight: 1.5,
                mb: 3
              }}
            >
              Join a community of students building coding clubs at schools
              around the world. Learn to code by making and sharing real
              projects in a supportive community.
            </Text>

            <Buttons
              content="we'll help with meeting content, stickers, & more"
              id="2"
              icon="welcome"
              link="https://apply.hackclub.com/"
              primary="red"
              sx={{
                borderRadius: '12px',
                boxShadow: isDark
                  ? '0 4px 8px rgba(0,0,0,0.3)'
                  : '0 4px 8px rgba(0,0,0,0.15)',
                py: [2, 2],
                px: [3, 3],
                fontSize: ['16px', '18px'],
                mt: 2,
                mb: 4,
                transition: 'all 0.2s cubic-bezier(.68,-0.55,.27,1.55)',
                '&:hover': {
                  transform: 'scale(1.05) rotate(-1deg)',
                  boxShadow: isDark
                    ? '0 6px 12px rgba(0,0,0,0.4)'
                    : '0 6px 12px rgba(0,0,0,0.2)'
                }
              }}
            >
              Start a club
            </Buttons>
          </Box>
        </Grid>

        <Box
          sx={{
            bg: isDark ? '#333' : '#f6e9d8',
            borderTop: isDark ? '2px dashed #444' : '2px dashed #e4d6c3',
            borderRadius: '0 0 16px 16px',
            py: 2,
            px: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily:
              '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
            color: isDark ? '#aaa' : '#7c644c',
            fontSize: ['14px', '16px']
          }}
        >
          <Icon glyph="welcome" size={24} sx={{ mr: 2, color: '#ec3750' }} />
          Join 15,000+ students in the global Hack Club community
        </Box>
      </CardModel>
    </>
  )
}
