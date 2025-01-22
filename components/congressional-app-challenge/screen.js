import { Box, Text, Image, Link } from 'theme-ui'

const Screen = ({ backgroundImage }) => {
    let color = backgroundImage ? "" : "#fff"
    return (
              <Box sx  = {{display: "flex", flexDirection: "column", width: ["100%", null, null, "55%"]}}>
                  <Box sx = {{
                    width: ['100%'], 
                    borderColor: "black", 
                    border: "2px solid", 
                    borderRadius: "6px 6px 0 0", 
                    height:'7vh',
                    backgroundColor: "white"}}>
                    <Box sx = {{margin: "2", display: "flex", flexDirection: "row"}}>
                      <Box className="circle" sx = {{backgroundColor: "red"}}/>
                      <Box className="circle" sx = {{backgroundColor: "yellow"}}/>
                      <Box className="circle" sx = {{backgroundColor: "green"}}/>
                    </Box>
                </Box>
                <Box sx = {{
                      width: ["100%"],
                      borderColor: "black", 
                      backgroundColor: color,
                      borderBottom: "2px solid",
                      borderLeft: "2px solid",
                      borderRight: "2px solid", 
                      borderRadius: "0 0 6px 6px", 
                      height:'58vh',
                      backgroundImage: `url(${backgroundImage})`,
                      backgroundSize: "cover"}}/>
                </Box>
    )
}

export default Screen;