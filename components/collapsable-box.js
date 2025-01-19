import { useState, useRef } from 'react'
import { Box, Text } from 'theme-ui'

const CollapsableBox = ({ title, children, backroundColor }) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef(null)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Box
      bg={backroundColor}
      sx={{
        borderRadius: 'default',
        boxShadow: 'default',
        overflow: 'hidden'
      }}
      mb={2}
    >
      <div
        onClick={toggleOpen}
        style={{ cursor: 'pointer', fontWeight: 'bold' }}
      >
        <Text
          variant="headline"
          as="h4"
          sx={{ textAlign: 'center', fontSize: 3 }}
        >
          {title}
        </Text>
      </div>
      <div
        ref={contentRef}
        style={{
          height: isOpen ? `${contentRef.current.scrollHeight}px` : '0px',
          overflow: 'hidden',
          transition: 'height 0.3s ease',
          margin: '0 1rem',
          marginBottom: isOpen ? '1rem' : '0'
        }}
      >
        {children}
      </div>
    </Box>
  )
}

export default CollapsableBox
