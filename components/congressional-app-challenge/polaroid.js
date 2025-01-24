import { Box, Text, Image } from 'theme-ui';

export default function Polaroid({
    image,
    caption,
    sxProps
}){
    return (
        <Box sx = {sxProps}>
            <Box sx = {{margin: 2, backgroundColor: "#fff", border: "2px", width: 190, boxShadow: "1px 1px 1px 1px #9E9E9E"}}>
                <Image src = {image} sx= {{paddingX: 3, paddingTop: 3, objectFit: "cover"}}/>
                <Box variant="caption" sx={{width: "100%", textAlign: "center", padding: 2}}>{caption}</Box>
            </Box>
        </Box>
    )
}