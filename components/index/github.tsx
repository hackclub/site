import { Badge, Image, Text } from 'theme-ui'
import RelativeTime from 'react-relative-time'

type GitHubProps = {
  type: 'commit' | 'issue' | 'pull_request'
  img: string
  user: string
  time: string
  message: string
  opacity?: number
  url?: string
}

export default function GitHub({
  type,
  img,
  user,
  time,
  message,
  opacity,
  url,
  ...props
}: GitHubProps) {
  return (
    <Badge
      variant="pill"
      bg="snow"
      as="a"
      {...({href: url || 'https://github.com/hackclub'} as any)}
      target="_blank"
      rel="noopener"
      sx={{
        color: 'black',
        textDecoration: 'none',
        fontWeight: '400',
        zIndex: 4,
        px: '4px !important',
        py: '2px !important',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height: '2rem',
        width: ['fit-content', null, null, '100%'],
        maxWidth: '30rem',
        opacity: opacity
      }}
      {...props}
    >
      <Image
        alt="GitHub user avatar"
        src={img}
        sx={{ borderRadius: '100%', height: '90%', mr: 2, flexShrink: 0 }}
      />
      <Text
        sx={{
          mr: 2,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          display: ['none', 'inline-block', 'inline-block', 'inline-block']
        }}
      >
        {user}
      </Text>
      <Text
        sx={{
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          flexShrink: 1
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
          flexShrink: 0,
          ml: 'auto'
        }}
      >
        <RelativeTime value={time} titleformat="iso8601" />
      </Text>
    </Badge>
  )
}
