import { useRef } from 'react'
import { Text, Close } from 'theme-ui'
import styles from './cohort-card.module.css'
import { useState } from 'react'
import { Button } from 'theme-ui'
import Icon from '@hackclub/icons'
import randomNotFoundImg from './random-not-found-img'
/** @jsxImportSource theme-ui */

const SmallView = ({
  id,
  title = 'Title Not Found',
  desc = 'Description Not Found'
}) => {
  return (
      <div
        sx={{
          border: '2px dashed #09AFB4',
          borderRadius: '10px',
          px: 3,
          color: '#35290F',
          height: '100%'
        }}
        id={id}
      >
        <h1 sx={{ mt: 2, mb: 0, wordBreak: 'break-all' }}>{title}</h1>

        <p sx={{ mt: 0 }}>{desc}</p>
      </div>
  )
}

export default SmallView
