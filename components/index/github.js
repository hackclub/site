import { Badge, Flex, Link, Image, Text, Box } from 'theme-ui'
import RelativeTime from 'react-relative-time'

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
  if (!user) return null

  return (
    <Badge
      variant="pill"
      bg="snow"
      sx={{
        color: 'black',
        fontWeight: '400',
        zIndex: 4,
        px: '4px !important',
        py: '2px !important',
        // my: [1, 1, 2],
        height: 'fit-content',
        width: ['fit-content', '100%'],
      }}
      {...props}
    >
      <Link
        href='https://github.com/hackclub'
        target='_blank'
        rel='noopener'
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'flex',
          fontSize: ['11px', '11px', '14px'],
          height: ['15px', '15px', '25px'],
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {!user.endsWith('[bot]') && (
          <>
            <Image
              alt='GitHub user avatar'
              src={img}
              sx={{ borderRadius: '100%', height: '90%', mr: 2 }}
            />
            <Text
              sx={{
                mr: 2,
                textOverflow: 'ellipsis',
                maxWidth: '80px',
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: [
                  'none',
                  'inline-block',
                  'inline-block',
                  'inline-block'
                ]
              }}
            >
              {user}
              </Text>

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

          <Text
            as="span"
            sx={{
              fontSize: ['8px', '8px', '10px'],
              color: 'inherit',
              mx: 2,
              ml: 'auto',
            }}
          >
            <RelativeTime value={time} titleformat="iso8601" />
          </Text>
        </>)}
      </Link>
    </Badge>
  )
}
