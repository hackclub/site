import { Button } from 'theme-ui';
export default function CustomButton({
    text, 
    link,
    color, 
    textColor // 🤓
}){ return (
    <Button as="a" className="gaegu" href={link} sx = {{
        marginTop: 2,
        padding: 2,
        width: "100%",
        color: textColor,
        fontSize: "40",
        borderRadius: 0,
        textAlign: "center",
        itemsAlign: "center",
        backgroundColor: color,
        border: "1px solid",
        borderColor: "#000"
        }}>
            {text}
        </Button>

)}