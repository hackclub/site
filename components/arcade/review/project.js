import { Box, Flex, Text } from 'theme-ui'

/** @jsxImportSource theme-ui */

const Project = ({img, name, projectName, country}) => {
    return(
        <Box sx={{backgroundColor: '#FFF7E5', borderRadius: '5px', display: 'flex', px: 3, py: 2, my: 2, mr: 3, color: '#35290F', width: '250px'}}>
            <Box sx={{backgroundImage: `url('${img}')`, width: '50px', height: '50px', backgroundSize: 'cover', mr: 3}}></Box>
            <Box>
                <Text sx={{fontWeight: 'bold'}} as="p">{projectName}</Text>
                <Text as="p">{name.split(" ")[0]}{country != '' ? `, ${country}` : ''}</Text>
            </Box>
        </Box>
    )
}

export default Project