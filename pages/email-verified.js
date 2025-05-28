/** @jsxImportSource theme-ui */
import { Box, Text, Link as ThemeLink, Container, Button } from 'theme-ui'
import Head from 'next/head'
import NextLink from 'next/link'

const EmailVerifiedPage = () => {
    return (
        <>
            <Head>
                <title>You're In! - Hack Club Happenings</title>
            </Head>
            <Container sx={{ textAlign: 'center', py: [4, 5, 6], px: 3 }}>
                <Box
                    sx={{
                        bg: 'white',
                        p: [4, 5],
                        borderRadius: '12px',
                        boxShadow: 'card',
                        maxWidth: '600px',
                        mx: 'auto',
                        border: '2px solid',
                        borderColor: 'red'
                    }}
                >
                    <Text
                        as="h1"
                        variant="title"
                        sx={{
                            color: 'red',
                            fontSize: ['36px', '48px', '56px'],
                            mb: 3,
                            lineHeight: 1.1
                        }}
                    >
                        🎉 You're in!
                    </Text>
                    <Text
                        as="p"
                        sx={{
                            color: 'blue',
                            fontSize: [2, 3],
                            lineHeight: 'heading',
                            mb: 4,
                            fontWeight: 'bold'
                        }}
                    >
                        Get ready for an incredible journey! You'll be the first to know about amazing projects, hackathons, and opportunities at Hack Club.
                    </Text>
                    <Text
                        as="p"
                        sx={{
                            fontSize: [1, 2],
                            mb: 4,
                            color: 'muted'
                        }}
                    >
                        While you wait for your first issue, why not dive into the Hack Club community? There's always something exciting happening!
                    </Text>
                    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
                        <NextLink href="/" passHref legacyBehavior>
                            <Button
                                as="a"
                                sx={{
                                    bg: 'red',
                                    color: 'white',
                                    py: 3,
                                    px: 4,
                                    fontSize: 2,
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'elevated',
                                        bg: 'red'
                                    }
                                }}
                            >
                                Return Home
                            </Button>
                        </NextLink>
                        <NextLink href="https://hackclub.com/slack" passHref legacyBehavior>
                            <Button
                                as="a"
                                variant="outline"
                                sx={{
                                    py: 3,
                                    px: 4,
                                    fontSize: 2,
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 'elevated'
                                    }
                                }}
                            >
                                Join our Slack
                            </Button>
                        </NextLink>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default EmailVerifiedPage 
