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

export default function Buttons({ children, icon, id, content, link }) {
  return (
    <Box
      py={1}
      // onClick={() => {
      //   if (toggle) {
      //     setToggle(false)
      //     console.log(toggle)
      //   } else {
      //     setToggle(true)
      //     console.log(toggle)
      //   }
      // }}
    >
      <Button
        // ref={ref => (fooRef = ref)}
        data-place="right"
        data-for={id}
        data-effect="solid"
        data-tip
        // data-event="click"
        sx={{
          background: 'rgb(255, 255, 255, 0.3)',
          borderRadius: '100px',
          border: 'none',
          display: 'flex',
          alignItems: 'start',
          color: 'inherit',
          px: 3,
          py: 1,
          width: 'fit-content',
          textTransform: 'none',
          fontWeight: '400',
          fontSize: [1, '14px', '16px'],
          backdropFilter: 'blur(2px)'
        }}
        as="a"
        href={link || '/'}
        target="_blank"
        rel="noreferrer"
      >
        <Icon
          glyph={icon || 'plus-fill'}
          sx={{ color: 'inherit', marginRight: 2 }}
          size={24}
          mr={2}
        />
        <Text sx={{ fontFamily: 'Phantom Sans' }}>{children}</Text>
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
