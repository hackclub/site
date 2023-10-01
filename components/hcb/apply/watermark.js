import React, { useRef, useEffect } from 'react'
import { Box } from 'theme-ui'

export default function Watermark() {
  /* This is going to come back to haunt me one day.
    It's an abomination but it works ... for now */

  const shineRef = useRef()
  const svgRef = useRef()

  // Mouse move event
  const handleMouseMove = ({ clientX, clientY }) => {
    if (!shineRef.current || !svgRef.current) return

    const svgWidth = svgRef.current.clientWidth / 100
    const svgFromTop = svgRef.current.getBoundingClientRect().top
    const svgFromLeft = svgRef.current.getBoundingClientRect().left

    shineRef.current.style.top = `${clientY / svgWidth + 6.2}px`
    shineRef.current.style.left = `${clientX / svgWidth + 9.2}px`
  }

  // Bind event
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: -1,
        top: -330,
        left: -480
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'fixed',
          width: '4600px',
          overflow: 'hidden'
        }}
      >
        <defs>
          <clipPath id="my-clip-path">
            <path d="M16.194 8.096A2.397 2.397 0 0 0 16 8.018V6c.358 0 .735.149.997.264.297.13.676.326 1.077.555a37.817 37.817 0 0 1 2.878 1.864c2.15 1.518 2.548 1.817 4.755 3.61a.999.999 0 1 1-1.414 1.414C22 12 21.9 11.799 19.798 10.317a35.088 35.088 0 0 0-2.716-1.761 9.091 9.091 0 0 0-.888-.46zM15.806 8.096c.09-.04.153-.064.194-.078V6c-.358 0-.735.149-.997.264-.297.13-.676.326-1.077.555a37.817 37.817 0 0 0-2.878 1.864C8.9 10.201 8.5 10.5 6.293 12.293a.999.999 0 1 0 1.414 1.414c2.294-1.707 2.394-1.908 4.495-3.39a35.088 35.088 0 0 1 2.716-1.761c.365-.209.65-.357.888-.46zM7 24a1 1 0 0 1 1-1h16a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1z"></path>
            <path d="M16 22a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM21 22a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM11 22a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z"></path>
          </clipPath>
        </defs>
        <g id="clip-container">
          <foreignObject id="clip-content" width="100%" height="100%">
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#1d181f',
                clipPath: 'url(#my-clip-path)'
              }}
            >
              <Box
                ref={shineRef}
                sx={{
                  position: 'absolute',
                  width: '2px',
                  height: '2px',
                  borderRadius: '50%',
                  backgroundColor: 'red',
                  filter: 'blur(2px)'
                }}
              />
            </Box>
          </foreignObject>
        </g>
      </svg>
    </Box>
  )
}
