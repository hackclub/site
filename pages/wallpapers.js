import { Card, Box, Flex, Grid, Heading, Image, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import BGImg from '../components/background-image'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'

import fs from 'fs'
import path from 'path'
import { startCase } from 'lodash'

const color = '#EC37AD'

const WallpapersPage = ({ wallpapers = [] }) => [
  <Box as="main" key="main" sx={{ textAlign: 'center' }}>
    <ForceTheme theme="dark" />
    <Nav dark />
    <Meta
      as={Head}
      title="Wallpapers"
      description="Check out Hack Club’s wallpapers."
      //image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fstickers.png?v=1588012712143" // super cool image so we'll keep it for now
	  image="/wallpapers/wallpepper.png"
    />
    <Box
      as="article"
      sx={{ position: 'relative', overflow: 'hidden', py: [6, 7], px: 4 }}
    >
      <BGImg
        width={2732}
        height={1821}
        alt="Please replace the default wall pepper"
        src="/wallpapers/wallpepper.png"
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
            src="/wallpapers/wallpepper.png"
            alt="Please replace the default wall pepper"
            sx={{
              transform: 'rotate(-12deg)',
              width: '4.5rem',
              height: '6rem'
            }}
          />
          <Image
            src="/wallpapers/wallpepper.png"
            alt="Please replace the default wall pepper"
            sx={{
              transform: 'rotate(3deg)',
              width: ['4rem', '6rem'],
              height: ['4rem', '6rem']
            }}
          />
          <Image
            src="/wallpapers/wallpepper.png"
            alt="Please replace the default wall pepper"
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
          Hack Club Wallpapers.
        </Heading>
        <Text as="p" variant="lead" color="muted">
          High-quality wallpapers, made by Hack Clubbers.
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
        Spruce up your desktop.
      </Heading>
      <Grid columns={[2, 3]} gap={[3, 4]} mt={[3, 4]}>
        {wallpapers.map(wp => (
          <Flex
            key={wp}
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              img: {
                objectFit: 'contain',
                width: [256, 320],
                height: [256, 320],
                transition: '.25s transform ease-in-out',
                ':hover': {
                  transform: 'scale(1.5)',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))'
                }
              }
            }}
          >
			<a
			style={{ cursor: 'pointer', backgroundColor: 'transparent', border: 'none', padding: 0, textDecoration: 'none' }}
			href={`/wallpapers/${wp}`}
			download>
            <Image
              src={`/wallpapers/${wp}`}
              width={256}
              height={256}
              alt={wp.split('.')[0]}
			  
            />
            <Text as="span" variant="caption" sx={{ fontSize: 4, mt: [2, 3] }}>
              {startCase(wp.replace(/\.(svg|png|jpg)/, ''))}
            </Text>
			</a>
          </Flex>
        ))}
      </Grid>
    </Card>
  </Box>,
  <Footer dark key="footer" />
]

export default WallpapersPage

export const getStaticProps = () => {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers')
  const wallpapers = fs
    .readdirSync(wallpapersDir)
    .filter(wallpaper => wallpaper !== 'hero.jpg')
  return { props: { wallpapers } }
}
