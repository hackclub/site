import { Box, Text, Image } from 'theme-ui'

export default function Polaroid({ image, alt, caption, sxProps, children }) {
  return (
    <Box sx={sxProps}>
      <Box
        sx={{
          margin: 2,
          backgroundColor: '#fff',
          border: '2px',
          width: '100%',
          boxShadow: '1px 1px 1px 1px #9E9E9E'
        }}
      >
        <Image
          src={image}
          alt={alt}
          sx={{
            paddingX: [2, null, 3, null],
            paddingTop: [2, null, 3, null],
            objectFit: 'cover'
          }}
        />
        <Box
          variant="caption"
          className="gaegu"
          sx={{ width: '100%', textAlign: 'center', padding: [1, null, 2, 2] }}
        >
          {caption}
        </Box>
      </Box>
      {children}
    </Box>
  )
}
