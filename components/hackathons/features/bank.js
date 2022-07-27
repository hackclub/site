import { Box } from 'theme-ui'

export default function Bank() {
  return (
    <>
      <Box
        key="video"
        as="video"
        muted
        autoPlay
        playsInline
        loop
        sx={{
          width: '100%',
          maxWidth: 'layout',
          maxHeight: '66vh',
          left: '50%',
          transform: 'translateX(-50%)',
          // position: 'absolute',
          position: 'relative',
          bottom: 0,
          zIndex: 0,
          paddingTop: '16px'
        }}
      >
        {/* <source
          src="https://cdn.glitch.com/3899929b-9aed-4dae-b1e6-230ef0ed4d51%2Fcircuit.hevc.mp4?v=1590594547077"
          type="video/mp4; codecs=hevc"
        /> */}
        <source
          src="https://cloud-jqsdd934l-hack-club-bot.vercel.app/0simple_pass_0000-0059.webm"
          type="video/webm; codecs=vp9,opus"
        />
        {/* <source
          src="https://cdn.glitch.com/3899929b-9aed-4dae-b1e6-230ef0ed4d51%2Fcircuit.mov?v=1590594547333"
          type="video/mov"
        /> */}
        Video of 3D Bank render.
      </Box>
    </>
  )
}
