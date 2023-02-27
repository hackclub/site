import { forwardRef } from 'react'
import { Box } from 'theme-ui'

export default forwardRef(({ children }, ref) => {
    return (
        <Box
            ref={ref}
            as='form'
            sx={{
                width: '50ch',
                flex: '1',
                overflowY: 'auto',
                pr: '2ch',
                pl: 1,
                pb: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
            }}
        >
            { children }
        </Box>
    )
})
