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
  img = 'https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png'
  // img="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/12020-07-25_hn13qhejqrzu4n1jy9yacxxgrgp3wf5u.png"
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
          poster="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png"
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
