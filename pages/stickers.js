import { Card, Box, Flex, Grid, Heading, Image, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import BGImg from '../components/background-image'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import StickerForm from '../components/stickers/request-form'

import fs from 'fs'
import path from 'path'
import { startCase } from 'lodash'

const color = '#EC37AD'

const StickersPage = ({ stickers = [] }) => [
  <Box as="main" key="main" sx={{ textAlign: 'center' }}>
    <ForceTheme theme="dark" />
    <Nav dark />
    <Meta
      as={Head}
      title="Stickers"
      description="Check out Hack Club’s stickers."
      image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fstickers.png?v=1588012712143"
    />
    <Box
      as="article"
      sx={{ position: 'relative', overflow: 'hidden', py: [6, 7], px: 4 }}
    >
      <BGImg
        width={2732}
        height={1821}
        alt="Students exchanging stickers"
        src="/stickers/hero.jpg"
        gradient
      />
      <Card
        sx={{
          variant: 'cards.translucentDark',
          bg: 'rgba(0, 0, 0, 0.5) !important',
          position: 'relative',
          overflow: 'visible',
          maxWidth: 'copy',
          mx: 'auto',
          my: [4, 5],
          py: 3
        }}
      >
        <Box
          as="aside"
          sx={{
            display: ['none', 'flex'],
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            width: '100%',
            img: {
              mx: 3,
              flexShrink: 0,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
            }
          }}
        >
          <Image
            src="/stickers/macintosh.svg"
            alt="Macintosh sticker"
            sx={{
              transform: 'rotate(-12deg)',
              width: '4.5rem',
              height: '6rem'
            }}
          />
          <Image
            src="/stickers/2020_progress.png"
            alt="Pride sticker"
            sx={{
              transform: 'rotate(3deg)',
              width: ['4rem', '6rem'],
              height: ['4rem', '6rem']
            }}
          />
          <Image
            src="/stickers/enjoy.svg"
            alt="Enjoy Hack Club Coca-Cola sticker"
            sx={{
              transform: 'rotate(-12deg)',
              width: ['6rem', '7.5rem'],
              height: ['4rem', '5rem']
            }}
          />
        </Box>
        <Heading
          as="h1"
          variant="ultratitle"
          sx={theme => ({
            color: 'primary',
            ...theme.util.gxText(color, 'red'),
            mt: [3, 4]
          })}
        >
          Unparalleled stickers.
        </Heading>
        <Text as="p" variant="lead" color="muted">
          Every Hack Club gets free, high-quality stickers.
        </Text>
      </Card>
    </Box>
    <Card
      as="section"
      sx={{
        bg: 'darkless',
        maxWidth: 'copyUltra',
        mx: 'auto',
        my: [4, 5],
        py: [3, 4],
        overflow: 'visible'
      }}
    >
      <Heading as="h2" variant="title" color="white">
        Gotta collect ‘em all.
      </Heading>
      <Grid columns={[2, 3]} gap={[3, 4]} mt={[3, 4]}>
        {stickers.map(st => (
          <Flex
            key={st}
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              img: {
                objectFit: 'contain',
                width: [128, 160],
                height: [128, 160],
                transition: '.25s transform ease-in-out',
                ':hover': {
                  transform: 'scale(1.5)',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))'
                }
              }
            }}
          >
            <Image
              src={`/stickers/${st}`}
              width={128}
              height={128}
              alt={st.split('.')[0]}
            />
            <Text as="span" variant="caption" sx={{ fontSize: 2, mt: [2, 3] }}>
              {startCase(st.replace(/\.(svg|png)/, ''))}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Card>
    {/*
    <Card
      as="section"
      sx={{
        bg: 'darkless',
        maxWidth: 'copy',
        mx: 'auto',
        my: [4, 5],
        py: [3, 4]
      }}
    >
      <Heading as="h2" variant="title" color="white" mb={4}>
        Request a free envelope
      </Heading>
      <StickerForm />
    </Card>
*/}
  </Box>,
  <Footer dark key="footer" />
]

export default StickersPage

export const getStaticProps = () => {
  const stickersDir = path.join(process.cwd(), 'public', 'stickers')
  const stickers = fs
    .readdirSync(stickersDir)
    .filter(sticker => sticker !== 'hero.jpg')
  return { props: { stickers } }
}
