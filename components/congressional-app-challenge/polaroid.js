import { Box, Text, Image } from 'theme-ui';

export default function Polaroid({
    image,
    caption,
    sxProps
}){
    return (
        <Box sx = {sxProps}>
            <Box sx = {{margin: 2, backgroundColor: "#fff", border: "2px", width: 200, boxShadow: "1px 1px 1px 1px #9E9E9E"}}>
                <Image src = {image} sx= {{paddingX: 3, paddingTop: 3}}/>
                <Box variant = "caption" sx={{width: "100%", textAlign: "center", paddingBottom: 4, marginBottom: 3}}>{caption}</Box>
            </Box>
        </Box>
    )
}