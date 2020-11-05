import { Button, Box, Card, Text, Grid, Avatar, Flex } from 'theme-ui'
import { formatDate } from '../../lib/dates'
import { Fragment, memo } from 'react'
import { last, filter } from 'lodash'
import Masonry from 'react-masonry-css'
import Image from 'next/image'
import Mention from './mention'
import Emoji from './emoji'

const dataDetector = /(<.+?\|?\S+>)|(@\S+)|(`{3}[\S\s]+`{3})|(`[^`]+`)|(_[^_]+_)|(\*[^\*]+\*)|(:[^ .,;`\u2013~!@#$%^&*(){}=\\:"<>?|A-Z]+:)/

export const formatText = text =>
  text.split(dataDetector).map((chunk, i) => {
    if (chunk?.startsWith(':') && chunk?.endsWith(':')) {
      return <Emoji name={chunk} key={i} />
    }
    if (chunk?.startsWith('@') || chunk?.startsWith('<@')) {
      const punct = /([,!:.'"’”]|’s|'s|\))+$/g
      const username = chunk.replace(/[@<>]/g, '').replace(punct, '')
      return (
        <Fragment key={i}>
          <Mention username={username} />
          {chunk.match(punct)}
        </Fragment>
      )
    }
    if (chunk?.startsWith('<')) {
      const parts = chunk.match(/<(([^\|]+)\|)?([^>]+?)>/)
      const url = parts?.[2] || last(parts)
      const children = last(parts)
        ?.replace(/https?:\/\//, '')
        .replace(/\/$/, '')
      return (
        <a href={url} target="_blank" rel="noopener" key={i}>
          {children}
        </a>
      )
    }
    if (chunk?.startsWith('```')) {
      return <pre key={i}>{chunk.replace(/```/g, '')}</pre>
    }
    if (chunk?.startsWith('`')) {
      return <code key={i}>{chunk.replace(/`/g, '')}</code>
    }
    if (chunk?.startsWith('*')) {
      return <strong key={i}>{chunk.replace(/\*/g, '')}</strong>
    }
    if (chunk?.startsWith('_')) {
      return <i key={i}>{chunk.replace(/_/g, '')}</i>
    }
    return <Fragment key={i}>{chunk?.replace(/&amp;/g, '&')}</Fragment>
  })

const Post = ({
  id = new Date().toISOString(),
  profile = false,
  user = {
    username: 'abc',
    avatar: '',
    streakDisplay: false,
    streakCount: 0
  },
  text,
  attachments = [],
  postedAt
}) => (
  <Card className="post" sx={{ p: [3, 3], width: '100%', bg: 'elevated' }}>
    <Flex
      as="a"
      href={`https://scrapbook.hackclub.com/${user.username}`}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        alignItems: 'center',
        mb: 2
      }}
    >
      <Avatar loading="lazy" src={user.avatar} alt={user.username} mr={2} />
      <Box>
        <Text variant="subheadline" my={0} fontSize={[1, 1]}>
          @{user.username}
        </Text>
        <Text as="time" variant="caption" fontSize={0}>
          {formatDate(postedAt)}
        </Text>
      </Box>
    </Flex>
    <Text
      as="p"
      sx={{
        fontSize: 2,
        a: {
          color: 'primary',
          wordBreak: 'break-all',
          wordWrap: 'break-word'
        },
        '> div': { width: 18, height: 18 }
      }}
    >
      {formatText(text)}
    </Text>
    {attachments.length > 0 && (
      <>
        <Grid
          gap={2}
          columns={2}
          sx={{
            alignItems: 'center',
            textAlign: 'center',
            mt: 2,
            '> div': {
              maxWidth: '100%',
              maxHeight: 256,
              bg: 'sunken',
              gridColumn: attachments.length === 1 ? 'span 2' : null
            },
            img: { objectFit: 'contain' }
          }}
        >
          {filter(attachments, a => a.type.startsWith('image')).map(img => (
            <Image
              key={img.url}
              alt={img.filename}
              src={img.thumbnails?.large?.url || img.url}
              width={img.thumbnails?.large?.width}
              height={img.thumbnails?.large?.height}
              layout="responsive"
            />
          ))}
        </Grid>
      </>
    )}
  </Card>
)

const Posts = ({ data = [] }) => (
  <Box as="section" sx={{ position: 'relative' }}>
    <Masonry
      breakpointCols={{
        10000: 4,
        1024: 3,
        640: 2,
        480: 1,
        default: 1
      }}
      className="masonry-posts"
      columnClassName="masonry-posts-column"
    >
      {data.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </Masonry>
    <Box
      sx={{
        paddingBottom: '30px',
        textAlign: 'center'
      }}
    >
      <Text as="p" variant="headline" sx={{ color: 'white', mb: 3 }}>
        These are just a few posts…
      </Text>
      <Button as="a" variant="cta" href="https://scrapbook.hackclub.com/">
        Keep exploring →
      </Button>
    </Box>
    <style>{`
      .masonry-posts {
        display: flex;
        width: 100%;
        max-width: 100%;
      }

      .masonry-posts-column {
        background-clip: padding-box;
      }

      .post {
        margin-bottom: 16px;
      }

      @media (max-width: 32em) {
        .post:nth-child(8) ~ .post {
          display: none;
        }
      }

      @media (min-width: 32em) {
        .masonry-posts {
          padding-right: 12px;
        }

        .masonry-posts-column {
          padding-left: 12px;
        }

        .post {
          border-radius: 12px;
          margin-bottom: 12px;
        }
      }

      @media (min-width: 64em) {
        .masonry-posts {
          padding-right: 24px;
        }

        .masonry-posts-column {
          padding-left: 24px;
        }

        .post {
          margin-bottom: 24px;
        }
      }
    `}</style>
  </Box>
)

export default Posts
