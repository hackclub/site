import { Button, Text, Image, Flex } from 'theme-ui'
import Icon from '../icon'

export default function ApplyButton() {
    return (
        <Button
            // color='red'
            variant='ctaLg'
            sx={{
                width: '20rem',
                height: '4.2rem',
                // borderRadius: '1.5rem',
            }}
        >
            <Flex sx={{
                alignItems: 'center',
                gap: 3,
                mr: '-28px' // Man...
            }}>
                <Text
                    color='white'
                    sx={{ fontWeight: 'bold', fontSize: 4 }}
                >Apply now</Text>
                <Icon glyph='view-forward' size={46} color='white' />
                </Flex>
            </Button>
    )
}