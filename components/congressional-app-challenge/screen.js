import { Box, Text, Image, Link } from 'theme-ui'

const Screen = ({ backgroundImage, title, sxProps, children, expand, expand2}) => {
  let color = backgroundImage ? '' : '#fff'
  let expan = expand2 ? ['100%', null, null, '68vh'] : (expand ? ['100%', null, null, '58vh'] : '58vh') // jank
  let props = Object.assign(
    {},
    {
      display: 'flex',
      flexDirection: 'column',
      width: ['100%', null, null, '55%']
    },
    sxProps
  )
  return (
    <Box sx={props}>
      <Box
        sx={{
          width: '100%',
          borderColor: 'black',
          border: '2px solid',
          borderRadius: '6px 6px 0 0',
          height: '7vh',
          backgroundColor: 'white',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 2,
              marginBottom: 2,
              marginLeft: 2
            }}
          >
            <Box className="circle" sx={{ backgroundColor: 'red' }} />
            <Box className="circle" sx={{ backgroundColor: 'yellow' }} />
            <Box className="circle" sx={{ backgroundColor: 'green' }} />
          </Box>
          <Box
            sx={{
              borderRadius: '10px',
              border: '1px solid',
              marginX: 'auto',
              marginY: 'auto',
              paddingX: 2,
              height: '80%',
              visibility: ['hidden', 'visible']
            }}
          >
            <Text variant="caption" sx={{ width: '80%', fontSize: '12px' }}>
              {title}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: ['100%'],
          borderColor: 'black',
          backgroundColor: color,
          borderBottom: '2px solid',
          borderLeft: '2px solid',
          borderRight: '2px solid',
          borderRadius: '0 0 6px 6px',
          padding: 3,
          height: expan,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Screen
