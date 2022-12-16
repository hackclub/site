import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import { useEffect, useState } from 'react'
import RelativeTime from 'react-relative-time'
import Fade from 'react-reveal/Fade'
/** @jsxImportSource theme-ui */

export default function GitHub({
  type,
  img,
  user,
  key,
  text,
  time,
  message,
  ...props
}) {
  return (
    <Box
      sx={{
        width: 'fit-content',
        position: ['relative', 'relative', 'absolute'],
        display: 'block',
        top: [0, '-40px', '-55px'],
        right: [null, '-40px', '-10px'],
        // left: [0, null, null],
        pb: ['42px', 4, 0]
      }}
    >
      <Text
        as="p"
        sx={{
          // transform: [null, null, 'rotate(3deg)'],
          fontSize: ['8px', '8px', '10px'],
          textAlign: ['left', 'right', 'right'],
          width: '100%'
        }}
      >
        Live from GitHub
      </Text>
      <Badge
        variant="pill"
        bg="snow"
        sx={{
          flexGrow: 1,
          color: 'black',
          fontWeight: '400 !important',
          textAlign: ['left', 'left', 'right'],
          zIndex: 4,
          // transform: [null, null, 'rotate(3deg)'],
          float: ['left', 'left', 'right']
        }}
        {...props}
      >
        <Fade appear spy={key}>
          <Link
            href="https://github.com/hackclub"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: '400 !important',
              display: 'flex',
              fontSize: ['11px', '11px', '14px'],
              height: ['15px', '15px', '25px'],
              position: 'relative',
              alignItems: 'center'
            }}
            target="_blank"
            rel="noopener"
          >
            {user != null ? (
              user != 'dependabot[bot]' ? (
                user != 'github-actions[bot]' ? (
                  <img
                    src={img}
                    sx={{ borderRadius: '100%', height: '90%', mr: 2 }}
                  />
                ) : (
                  <></>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {user != null ? (
              user != 'dependabot[bot]' ? (
                user != 'github-actions[bot]' ? (
                  <Text sx={{ mr: 2 }}>{user}</Text>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {user != null ? (
              user != 'dependabot[bot]' ? (
                user != 'github-actions[bot]' ? (
                  <Text
                    sx={{
                      textOverflow: 'ellipsis',
                      maxWidth: '150px',
                      display: 'inline-block',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {message}
                  </Text>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {user != null ? (
              user != 'dependabot[bot]' ? (
                user != 'github-actions[bot]' ? (
                  <Text
                    as="span"
                    sx={{
                      fontSize: ['8px', '8px', '10px'],
                      color: 'inherit',
                      mx: 2
                    }}
                  >
                    <RelativeTime value={time} titleformat="iso8601" />
                  </Text>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </Link>
        </Fade>
      </Badge>
    </Box>
  )
}
