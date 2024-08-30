import React from 'react';
import { Text } from 'theme-ui'
/** @jsxImportSource theme-ui */

export default function Arcader({ quote, name, age, country, image, center }) {
  return (
    <div>
      <Text
        sx={{
          fontSize: [1, '16px'],
          maxWidth: '600px',
          display: 'block',
          textAlign: center ? 'center' : 'left'
        }}
      >
        {quote.split('<br>').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Text>
      <div sx={{ display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'start', mt: 3 }}>
        {/* <Text variant='subtitle' as="h1">- </Text> */}
        <img
          src={image}
          sx={{ borderRadius: '5px', width: '35px', height: '35px', mr: 2 }}
        />
        <div>
          <Text as="p" sx={{
          fontSize: [1, '25px'],
          display: 'block',
          textAlign: center ? 'center' : 'left',
          fontWeight: 'bold'
        }}>@{name}</Text>
          {(age || country) && (
            <Text as="p">
              {age && `${age}, `}{country}
            </Text>
          )}
        </div>
      </div>
    </div>
  )
}