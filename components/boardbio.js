import Icon from '@hackclub/icons'
import { useState } from 'react'
import { Avatar, Box, Card, Flex, Text } from 'theme-ui'

export default function BoardBox({ popup = true, ...props }) {
  const { img, name, teamRole, pronouns, text, subrole, email, href, video } = props
  const [expand, setExpand] = useState(false)

  if (subrole) {
    console.log("yes subrole")
  }

  return (
    <>
      <Card
        bg="#d9f7ed"
        sx={{
          display: 'flex',
          flexDirection: popup ? 'column' : 'row',
          alignItems: popup ? 'center' : 'flex-start',
          justifyContent: popup ? 'center' : 'flex-start',
          transition: 'transform 0.125s ease-in-out',
          '&:hover': { transform: 'scale(1.025)' },
          cursor: (text && popup) || href ? 'pointer' : null,
          textDecoration: 'none',
          maxWidth: popup ? 'auto' : '600px',
          zIndex: !popup ? 1003 : 5,
          maxHeight: popup ? 'auto' : '90vh',
          overflowY: 'hidden',
          overscrollBehavior: 'contain',
          position: 'relative'
        }}
        as={href && !text ? 'a' : 'div'}
        href={href}
        target="_blank"
        onClick={() => {
          if (text && popup) {
            setExpand(true)
          }
        }}
      >
        {popup ? (
          <>
            <Text
              variant="headline"
              sx={{ fontSize: subrole ? 3 : 4, textAlign: 'center', mb: subrole ? 0 : 1, mt: subrole ? -3: -2 }}
              color="black"
            >
              {name}
            </Text>
            <Text
              color="#24B5A5"
              variant="subheadline"
              sx={{ fontSize: subrole ? 1 : 3, textAlign: 'center', mb: subrole ? 0 : 2 }}
            >
              {teamRole}
            </Text>
            {subrole && (
              <Text
                color="#24B5A5"
                sx={{
                  fontSize: 1,
                  textAlign: 'center',
                  mb: 2,
                  fontWeight: 400
                }}
              >
                {subrole}
              </Text>
            )}
            <Box
              as="img"
              src={img}
              alt={name}
              sx={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                mb: subrole ? -3: -2
              }}
            />
          </>
        ) : (
          <>
            <Avatar
              size={64}
              width={64}
              height={64}
              mr={3}
              src={img}
              alt={name}
              sx={{
                overflow: 'hidden',
                objectFit: 'cover',
                transition: 'transform 0.125s ease-in-out',
                '&:hover': { transform: 'rotate(-8deg) scale(1.25)' },
                flexShrink: 0,
                width: '64px',
                height: '64px'
              }}
            />
            <Box>
              <Text sx={{ fontSize: [3, 3, 3] }} variant="headline" color="black">
                {name}
              </Text>
              <Flex>
                <Text>
                  <Text
                    color="#24B5A5"
                    variant="subheadline"
                    fontSize={2}
                    sx={{
                      mb: ['0px', '0px', '0px'],
                      fontSize: '1.1em',
                      width: 'fit-content'
                    }}
                  >
                    {teamRole}
                  </Text>
                  {subrole && (
                    <>
                      <br />
                      <Text
                        color="#24B5A5"
                        sx={{
                          mb: ['0px', '0px', '0px'],
                          fontSize: 1,
                          fontWeight: 400,
                          width: 'fit-content'
                        }}
                      >
                        {subrole}
                      </Text>
                    </>
                  )}
                  {pronouns && (
                    <Text fontSize={1} ml={1} color="muted" align="center">
                      ({pronouns})
                    </Text>
                  )}
                </Text>
              </Flex>
              {email &&
                (email.includes('@') ? (
                  <Text color="muted" as={'a'} href={`mailto:${email}`}>
                    {email}
                    <br />
                  </Text>
                ) : (
                  <Text
                    color="muted"
                    as={'a'}
                    href={`mailto:${email}@hackclub.com`}
                  >
                    {email}@hackclub.com
                    <br />
                  </Text>
                ))}
              <Text mt={2} mb={0} color="black">
                {text}
              </Text>
              {video && (
                <Flex
                  sx={{
                    marginTop: 4,
                    marginX: 5,
                    justifyContent: 'center',
                    aspectRatio: 4 / 3
                  }}
                >
                  <iframe
                    width="100%"
                    src={video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </Flex>
              )}
              {href && (
                <Flex sx={{ alignItems: 'center' }}>
                  <Text
                    sx={{
                      transform: 'translateX(-4px) translateY(2px)',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    <Icon glyph="external-fill" size={24} />
                  </Text>
                  <Text
                    mt={1}
                    mb={0}
                    color="black"
                    as={'a'}
                    target="_blank"
                    href={href}
                    sx={{ transform: 'translateX(-2px)' }}
                  >
                    {href}
                  </Text>
                </Flex>
              )}
            </Box>
          </>
        )}
      </Card>
      {popup && expand && (
        <Flex
          sx={{
            position: 'fixed',
            zIndex: 1004,
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            pb: 4
          }}
        >
          <BoardBox {...props} popup={false} />
          <Flex
            sx={{
              position: 'fixed',
              zIndex: 1002,
              top: 0,
              left: 0,
              height: '100vh',
              width: '100vw',
              alignItems: 'center',
              justifyContent: 'center',
              pb: 4
            }}
            onClick={() => setExpand(false)}
          />
        </Flex>
      )}
    </>
  )
}
