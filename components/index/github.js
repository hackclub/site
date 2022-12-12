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
    <Box style={{ width: 'fit-content', display: 'inline' }}>
      <Badge
        variant="pill"
        bg="black"
        sx={{
          flexGrow: 1,
          color: 'white',
          fontWeight: '400 !important',
          position: 'absolute',
          top: 0,
          right: 2,
          zIndex: 4,
          transform: 'rotate(3deg)'
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
              fontSize: '14px',
              height: '25px',
              position: 'relative',
              alignItems: 'center'
            }}
            target="_blank"
            rel="noopener"
          >
            {user != null ? (
              user != 'dependabot[bot]' ? (
                user != 'github-actions[bot]' ? (
                  <img src={img} sx={{ borderRadius: '100%', height: '90%', mr: 2 }} />
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
                    sx={{ fontSize: 'small', color: 'sunken', mx: 2 }}
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
