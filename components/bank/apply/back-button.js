import { Button, Flex, Text } from 'theme-ui'
import Icon from '../../icon'

export default function BackButton({ onClick }) {
    return (
        <Button
            variant="outline"
            sx={{
                color: 'white',
                borderColor: 'muted',
                width: 'fit-content',
            }}
            onClick={onClick}
        >
            <Flex sx={{
                alignItems: 'center',
                mx: 2
            }}>
                <Icon glyph="view-back" />
                <Text>Back</Text>
            </Flex>
        </Button>
    )
}