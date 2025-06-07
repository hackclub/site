import React, { useState } from 'react'
import { Box, Text, useColorMode } from 'theme-ui'
import Icon from '../icon'

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [colorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Box
      as="span"
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        borderBottom: '1.5px dotted',
        borderColor: isDark ? '#999' : '#665040',
        cursor: 'help'
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
      role="tooltip"
    >
      {children}
      <Icon
        glyph="rep"
        size={24}
        sx={{
          ml: '2px',
          color: isDark ? '#aaa' : '#665040',
          opacity: 0.8
        }}
      />
      {isVisible && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '240px',
            backgroundColor: isDark ? '#444' : '#fdf6ee',
            border: '3px solid',
            borderColor: isDark ? '#555' : '#e4d6c3',
            borderRadius: '16px',
            padding: 2,
            zIndex: 10,
            boxShadow: isDark
              ? '0 4px 12px rgba(0,0,0,0.3)'
              : '0 4px 12px rgba(0,0,0,0.15)',
            '&:after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: '-10px',
              width: '0',
              height: '0',
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: isDark ? '10px solid #444' : '10px solid #fdf6ee',
            }
          }}
        >
          <Text
            sx={{
              fontSize: '14px',
              fontFamily: '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
              color: isDark ? '#eee' : '#513f31',
              textAlign: 'center',
              lineHeight: 1.4
            }}
          >
            {content}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default Tooltip
