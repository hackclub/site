import { Box, Button, Card, Text } from 'theme-ui'

export default function AddressAlert({ validationResult, setShouldShowAddressAlert }) {
    // TODO: Handle unsupported countries in this component
    
    let missingComponents
    if (validationResult.address.missingComponentTypes) {
        missingComponents = validationResult.address.missingComponentTypes
    } else if (validationResult.verdict.hasUnconfirmedComponents) {
        missingComponents = validationResult.address.unconfirmedComponentTypes
    } else {
        setShouldShowAddressAlert(false)
        return
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                bg: 'rgba(0, 0, 0, 0.5)',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 2,
                    }}
                >
                    <Text sx={{ fontSize: 3 }}>
                        Oops! We need a full shipping address.
                    </Text>
                    <Text>
                        Please try adding a&nbsp;
                        { missingComponents.join(', ').replace(/, ((?:.(?!, ))+)$/, ' and/or $1') }!
                    </Text>
                    <Text color='muted'>
                        //TODO:<br />
                        Make the missing component names human friendly.<br/>
                        postal_code -&gt; postcode/zip code<br />
                        route -&gt; road<br />
                        etc...<br />
                        (/components/bank/apply/address-alert.js)
                    </Text>
                </Box>
                <Button
                    onClick={() => setShouldShowAddressAlert(false)}
                >Ok!</Button>
            </Card>
        </Box>
    )
}
