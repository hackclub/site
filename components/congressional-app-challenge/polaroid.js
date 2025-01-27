import { Box, Text, Image } from 'theme-ui';

export default function Polaroid({
    image,
    caption,
    sxProps
}){
    return (
        <Box sx = {sxProps}>
            <Box sx = {{margin: 2, backgroundColor: "#fff", border: "2px", width: "100%", boxShadow: "1px 1px 1px 1px #9E9E9E"}}>
                <Image src = {image} sx= {{paddingX: [2, null, 3, null], paddingTop: [2, null, 3, null], objectFit: "cover"}}/>
                <Box variant="caption" sx={{width: "100%", textAlign: "center", padding: [1, null, 2, 2]}}>{caption}</Box>
            </Box>
        </Box>
    )
}