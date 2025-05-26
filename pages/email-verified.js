/** @jsxImportSource theme-ui */
import { Box, Text, Link as ThemeLink, Container, Button } from 'theme-ui'
import Head from 'next/head'
import NextLink from 'next/link'

const EmailVerifiedPage = () => {
    return (
        <>
            <Head>
                <title>Email Verified! - Hack Club Happenings</title>
            </Head>
            <Container sx={{ textAlign: 'center', py: [4, 5, 6], px: 3 }}>
                <Box
                    sx={{
                        bg: 'cyberpunk.inputBackground', // Using a theme color
                        p: [4, 5],
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        maxWidth: '600px',
                        mx: 'auto',
                        border: '1px solid',
                        borderColor: 'cyberpunk.gridLine'
                    }}
                >
                    <Text
                        as="h1"
                        variant="title"
                        sx={{
                            color: 'cyberpunk.electricBlue',
                            fontSize: ['36px', '48px', '56px'],
                            mb: 3
                        }}
                    >
                        🎉 Email verified
                    </Text>
                    <Text
                        as="p"
                        sx={{
                            color: 'cyberpunk.text',
                            fontSize: [2, 3],
                            lineHeight: 'body',
                            mb: 4
                        }}
                    >
                        Welcome to Happenings! Expect cool projects, inspiring stories, and opportunities to get involved, delivered to your inbox.
                    </Text>
                    <Text
                        as="p"
                        sx={{
                            color: 'cyberpunk.textMuted',
                            fontSize: [1, 2],
                            mb: 4
                        }}
                    >
                        Keep an eye out for our next issue! In the meantime, why not explore what else is going on at Hack Club?
                    </Text>
                    <NextLink href="/" passHref legacyBehavior>
                        <Button
                            as="a"
                            sx={{
                                background: 'cyberpunk.ctaGradient',
                                color: 'cyberpunk.textHighlight',
                                py: 3,
                                px: 4,
                                fontSize: 2,
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0,191,255,0.3)'
                                }
                            }}
                        >
                            BACK TO HOMEPAGE
                        </Button>
                    </NextLink>
                </Box>
            </Container>
        </>
    )
}

export default EmailVerifiedPage 
