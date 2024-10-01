import { Box, Flex, Text } from 'theme-ui'

/** @jsxImportSource theme-ui */

const Project = ({img, name, projectName, country}) => {
    return(
        <Box sx={{backgroundColor: '#FFF7E5', borderRadius: '5px', display: 'flex', px: 2, py: 2, my: 2, mr: 3, color: '#35290F', width: '280px', height: 'auto'}}>
            <Box sx={{backgroundImage: `url('${img}')`, width: '50px', height: '50px', backgroundSize: 'cover', mr: 2}}></Box>
            <Box>
                <Text sx={{fontWeight: 'bold'}} as="p">{projectName}</Text>
                <Text as="p" sx={{fontSize: 1}}>{name.split(" ")[0]}{(country != '' && country != undefined) ? `, ${country}` : ''}</Text>
                {/* <Text>{name.split(" ")[0].length + (country != undefined ? country.length : 0)}</Text> */}
            </Box>
        </Box>
    )
}

export default Project