/** @jsxImportSource theme-ui */

export default function Supporters({img}) {
    return(
        <div sx={{backgroundColor: '#FAEFD6', display: 'flex', justifyContent: 'center', alignItems: 'center',  borderRadius: '5px', px: 3, py: 2}}>
            <img src={img} alt={img} sx={{height: '40px', width: 'auto'}}/>
        </div>
    )
}