import { Button, Box, Text} from 'theme-ui';
export default function CustomButton({
    text, 
    link,
    color, 
    textColor, // 🤓
    sxProps
}){ return (
    <Box sx= {sxProps}>
    <Button as="a" className="gaegu" href={link} sx = {{
        marginTop: 2,
        padding: 1,
        height: 60,
        width: "100%",
        color: textColor,
        fontSize: "150",
        borderRadius: 0,
        textAlign: "center",
        itemsAlign: "center",
        alignContent: "center",
        backgroundColor: color,
        border: "1px solid",
        borderColor: "#000"
        }}>
                {text}
        </Button>
    </Box>

)}