import { forwardRef } from 'react'
import { Box } from 'theme-ui'

const formContainer = forwardRef(({ children }, ref) => {
  return (
    <Box
      ref={ref}
      as="form"
      sx={{
        height: '100%',
        width: ['100%', null, null, '50ch'],
        flex: '1',
        overflowY: ['none', null, null, 'auto'],
        pr: [0, null, '2ch'],
        pl: [0, null, 1],
        pb: [0, null, 3],
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }}
    >
      {children}
    </Box>
  )
})

// https://stackoverflow.com/a/67993106/10652680
formContainer.displayName = 'formContainer'
export default formContainer
