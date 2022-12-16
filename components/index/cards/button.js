import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import ReactTooltip from 'react-tooltip'
import Icon from '@hackclub/icons'
/** @jsxImportSource theme-ui */

export default function Buttons({ children, icon, id, content, link, primary, ...props }) {
  let fontWeight = primary != null ? '700' : '400'

  return (
    <Box
      py={1}
    >
      <Button
        data-place="right"
        data-for={id}
        data-effect="solid"
        data-tip
        sx={{
          background: primary || 'rgb(255, 255, 255, 0.3)',
          borderRadius: '100px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          color: 'inherit',
          px: 3,
          py: primary != null ? 2 : 1,
          width: 'fit-content',
          textTransform: 'none',
          fontWeight: '400',
          fontSize: primary != null ? ['18px', '20px', '22px'] : [1, '16px', '18px'],
          backdropFilter: 'blur(2px)',
          fontWeight: fontWeight
        }}
        as={"a"}
        href={link || '/'}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        <Icon
          glyph={icon || 'plus-fill'}
          sx={{ color: 'inherit', marginRight: 2 }}
          size={24}
          mr={2}
        />
        <Text sx={{ fontFamily: 'Phantom Sans', textAlign: 'left' }}>{children}</Text>
      </Button>
      <ReactTooltip
        id={id}
        delayShow={150}
        delayHide={100}
        delayUpdate={500}
        clickable={true}
        getContent={() => {
          return null
        }}
        className="custom-tooltip-radius custom-arrow-radius"
        arrowRadius="2"
        tooltipRadius="4"
      >
        {content}
      </ReactTooltip>
    </Box>
  )
}
