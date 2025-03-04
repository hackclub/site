import { useState, useRef, useEffect } from 'react'
import { Box, Text } from 'theme-ui'

// Not used atm, but keeping around in case we want to add back in
const CollapsableBox = ({
  title,
  children,
  backgroundColor,
  isOpen: isOpenProp
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp || false)
  const [height, setHeight] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <Box
      bg={backgroundColor}
      sx={{
        borderRadius: 'default',
        boxShadow: 'default',
        overflow: 'hidden'
      }}
      mb={2}
    >
      <div
        onClick={toggleOpen}
        onKeyDown={event => event.key === 'Enter' && toggleOpen()}
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
          height: `${height}px`,
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
