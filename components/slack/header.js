import { Box, Grid, Heading } from 'theme-ui'
import SlideUp from '../slide-up'
import JoinForm from './join-form'
import usePrefersMotion from '../../lib/use-prefers-motion'
import useHasMounted from '../../lib/use-has-mounted'

const Content = () => (
  <Grid gap={3} pt={[5, '100px']} pb={[3, 4]}>
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        textShadow: 'text',
        textAlign: ['center', 'center']
      }}
    >
      <Heading
        as="h1"
        variant="title"
        sx={{
          color: 'white',
          fontSize: [5, 6, 7],
          lineHeight: 'limit',
          mb: [2, 3]
        }}
      >
        Hack Club Slack
      </Heading>
    </Box>
    <SlideUp sx={{ zIndex: 5, display: 'flex', alignItems: 'center' }}>
      <JoinForm
        sx={{
          variant: 'cards.translucent',
          position: 'relative',
          zIndex: 3,
          maxWidth: 'null'
        }}
      />
    </SlideUp>
  </Grid>
)

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage: t => t.util.gx('cyan', 'purple'),
      opacity: 0.625,
      zIndex: 1
    }}
  />
)

const Static = ({
  img = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/0358c4d6f73cbaae3e19b31c3fbb9f3543daf014_6_4a40e958929f3c8150a18b55400d15db94da46f1_02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.webp'
  // img="https://hc-cdn.hel1.your-objectstorage.com/s/v3/8a0ab0def6a2af5793e3fd0ee82a572a985a5a6e_7_1e44085854dc063a0a9df004fe6df9cb82cf7b84_12020-07-25_hn13qhejqrzu4n1jy9yacxxgrgp3wf5u.webp"
}) => (
  <Box
    as="section"
    id="slack"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover'
    }}
  >
    <Cover />
    <Content />
  </Box>
)

const Slack = () => {
  const hasMounted = useHasMounted()
  const prefersMotion = usePrefersMotion()
  if (hasMounted && prefersMotion) {
    return (
      <Box
        as="section"
        id="slack"
        sx={{ overflow: 'hidden', position: 'relative' }}
      >
        <Box
          as="video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://hc-cdn.hel1.your-objectstorage.com/s/v3/0358c4d6f73cbaae3e19b31c3fbb9f3543daf014_6_4a40e958929f3c8150a18b55400d15db94da46f1_02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.webp"
          duration={2000}
          sx={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            zIndex: -1,
            width: '100vw',
            objectFit: 'cover'
          }}
        >
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/8aa6f2ba210919fdb64e73592853f49071ff9261_2d637c98-ed35-417a-bf89-cecc165d7398_2Foutput-no-duplicate-frames.hecv.mp4_v_1590780967658"
            type="video/mp4; codecs=hevc"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/79f106465e5b7829753808d8578aa3da2a58f870_2d637c98-ed35-417a-bf89-cecc165d7398_2Foutput-no-duplicate-frames.webm_v_1590781698834"
            type="video/webm; codecs=vp9,opus"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/ca334a239fe7ef2e814dc2bdc9f46a4569e4c009_2d637c98-ed35-417a-bf89-cecc165d7398_2Foutput-no-duplicate-frames.mov_v_1590781491717"
            type="video/quicktime"
          />
        </Box>
        <Cover />
        <Content nameInputRef />
      </Box>
    )
  } else {
    return <Static />
  }
}

export default Slack
