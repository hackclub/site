import { Box, Flex, Text } from 'theme-ui'

/** @jsxImportSource theme-ui */

const Project = ({ img, name, projectName, playLink, country }) => {
  return (
    <Box
      as="a"
      href={playLink}
      sx={{
        backgroundColor: '#FFF7E5',
        borderRadius: '5px',
        display: 'flex',
        px: 2,
        py: 2,
        my: 2,
        mr: 3,
        color: '#35290F',
        width: '280px',
        height: '100%',
        transitionDuration: '0.3s',
        textDecoration: 'none',
        border: '#FFF7E5 dashed 1px',
        '&:hover': {
            border: '#09AFB4 dashed 1px',
            transform: 'scale(1.05)',
        }
      }}
    >
      <Box
        sx={{
          backgroundImage: `url('${img}')`,
          width: '50px',
          height: '50px',
          backgroundSize: 'cover',
          mr: 2
        }}
      ></Box>
      <Box>
        <Text sx={{ fontWeight: 'bold' }} as="p">
          {projectName}
        </Text>
        <Text as="p" sx={{ fontSize: 1 }}>
          {name.split(' ')[0]}
          {country != '' && country != undefined ? `, ${country}` : ''}
        </Text>
        {/* <Text>{name.split(" ")[0].length + (country != undefined ? country.length : 0)}</Text> */}
      </Box>
    </Box>
  )
}

export default Project
