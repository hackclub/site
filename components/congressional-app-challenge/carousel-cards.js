import { Box, Text, Image, Link } from 'theme-ui'

export default function Carousel({ 
    title,
    user,
    description,
    link,
    img
 }){
    return (
      <Box id={user} sx={{width:['80%'], m:'3'}}>
        <Image src={img} sx={{ borderRadius: '10px 10px 0 0', width: '100%', height: '15em'}}></Image>
        <Box sx={{alignItems:'left', textAlign:'left', display:'flex', flexDirection:'column', background:'white', color:'black', p:'2', borderRadius: '0 0 10px 10px', marginBottom: '2', padding: '3', height: '8em'}}>
          <Link href = {link} target="_blank" rel="noopener">
            <Text as="h3" sx={{}}>{title}</Text> 
          </Link>
          <Text as="i" sx={{}}>{description}</Text>
        </Box>
      </Box>
    )
}