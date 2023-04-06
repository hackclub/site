import { Box, Card, Container, Flex, Link, Text } from 'theme-ui'
import { useEffect, useRef, useState } from 'react'
import { keyframes } from '@emotion/react'
import FlexCol from '../../components/flex-col'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Icon from '../../components/icon'
import Tilt from '../../components/tilt'

function Bullet({ glow=true, icon, href, children }) {
    let effectColours = [
        '#ec3750',
        '#ff8c37',
        '#f1c40f',
        '#33d6a6',
        '#5bc0de',
        '#338eda',
        '#a633d6',
    ]

    // Raw doggen this trig, no AI this is natty
    function keyframeGenerator(spread, blur, colours, opacity = 0.5) {
        let hexOpacity =
            Math.max(Math.min(Math.round(opacity * 255), 255), 0).toString(16).padStart(2, '0');

        let final = {}
        for (let i = 0; i <= 100; i++) {
            let baseX = Math.sin(i * Math.PI / 50) // 50 keyframes for each pi radians
            let baseY = -Math.cos(i * Math.PI / 50)

            // Ensure no scientific notation
            const roundFactor = 1_000_000
            baseX = Math.round(baseX * roundFactor) / roundFactor
            baseY = Math.round(baseY * roundFactor) / roundFactor

            let boxShadow = ''
            for (let c = 0; c < colours.length; c++) {
                // Rotate by 2pi / colours.length * c radians
                let x = baseX * Math.cos(2 * Math.PI * c / colours.length) - baseY * Math.sin(2 * Math.PI * c / colours.length)
                let y = baseX * Math.sin(2 * Math.PI * c / colours.length) + baseY * Math.cos(2 * Math.PI * c / colours.length)

                boxShadow += `${x * spread}px ${y * spread}px ${blur}px ${colours[c]}${hexOpacity},`
            }

            // Remove trailing comma
            boxShadow = boxShadow.slice(0, -1)

            final[i + '%'] = { boxShadow }
        }

        return final
    }

    const shadowSpread = glow ? 5 : 0
    const shadowBlur = glow ? 10 : 0
    const animatedBoxShadow = keyframes(keyframeGenerator(shadowSpread, shadowBlur, effectColours))

    const borderWidth = '2px'

    return (
        <Tilt>
            <Flex
                as='a'
                {...href && { href }}
                target='_blank'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,

                    width: '20rem',

                    borderWidth,
                    borderRadius: '8px !important',
                    p: '8px !important',

                    textDecoration: 'none',
                    color: 'inherit',

                    backgroundColor: 'var(--theme-ui-colors-darkless)',
        
                    '&:hover::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        boxShadow: `linear-gradient(60deg, ${effectColours[0]}, ${effectColours[1]}, ${effectColours[2]}, ${effectColours[3]}, ${effectColours[4]})`,
                        borderRadius: 'inherit',
                        zIndex: -1,
                        animation: `${animatedBoxShadow} 5s ease infinite`,
                    }
                }}
            >
                <Icon glyph={icon} size={42} sx={{ color: 'red', flexShrink: 0 }} />
                <Box sx={{ textAlign: 'left' }}>{children}</Box>
                { href &&
                    <Icon glyph='external-fill' size={32} sx={{ position: 'absolute', top: 0, right: 0, translate: '50% -50%', color: 'muted' }} />
                }
            </Flex>
        </Tilt>
    )
}

function BulletBox({ padding = '2rem', children }) {
    return (
        <Box
            as='ul'
            sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gridGap: '2rem',
                padding,
            }}
        >
            { children }
        </Box>
    )
}

function Section({ id, children }) {
    return (
        <Flex as='section' id={id} sx={{ flexDirection: 'column', pt: 5 }}>
            { children }
        </Flex>
    )
}

export default function FiscalSponsorship() {
    const gridRef = useRef()
    const glowRef = useRef()

    const scrollPos = 0
    const mousePos = [0, 0]

    const setGlowMaskPosition = () => {
        const finalPos = [-mousePos[0], -mousePos[1] + scrollPos]
        glowRef.current.style.maskPosition = `${finalPos[0]}px ${finalPos[1]}px`;
    }

    useEffect(() => {
        const handleScroll = (e) => {
            const s = -window.scrollY

            gridRef.current.style.transform = `translateY(${s}px)`

            scrollPos = s
            setGlowMaskPosition()
        }

        const handleMouseMove = (e) => {
            const x = e.clientX
            const y = e.clientY
            glowRef.current.style.left = x + 'px'
            glowRef.current.style.top = y + 'px'

            mousePos = [x, y]
            setGlowMaskPosition()
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    return (
        <Box as="main" key="main" sx={{ position: 'relative' }}>
            <style>
                {`*{
                    scroll-behavior: smooth;
                }`}
            </style>
            <Box
                ref={gridRef}
                sx={{
                    position: 'fixed',
                    inset: 0,
                    height: '1000%',
                    zIndex: -5,
                    backgroundSize: '20px 20px',
                    backgroundImage: `linear-gradient(to right,  #23262D 1px, transparent 1px), 
                                      linear-gradient(to bottom, #23262D 1px, transparent 1px) `,
                    backgroundPosition: 'top center',
                    maskImage: `linear-gradient(180deg, transparent 0%, white 3%)`,
                }}
            />
            <Box
                ref={glowRef}
                sx={{
                    pointerEvents: 'none',
                    zIndex: -2,
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '20rem',
                    height: '20rem',
                    background: 'red',
                    opacity: 0.2,
                    borderRadius: '50%',
                    filter: 'blur(2rem)',
                    translate: '-50% -50%',
                    // Mask it to the grid background
                    maskImage: `linear-gradient(to right, #23262D 1px, transparent 1px), 
                                linear-gradient(to bottom, #23262D 1px, transparent 1px) `,
                    maskSize: '20px 20px, 20px 20px, cover',
                    maskPosition: '0px 0px',
                }}
            />
            <Nav dark />
            <ForceTheme theme="dark" />
            <Meta
                as={Head}
                title="Fiscal Sponsorship"
                description="What is fiscal sponsorship?"
                image="/bank/og-image.png"
            >
                <title>Fiscal Sponsorship — Hack&nbsp;Club&nbsp;Bank</title>
            </Meta>
            
            <Container sx={{ textAlign: 'center', mt: 6 }}>
                <FlexCol gap={4} alignItems='center'>
                    <FlexCol gap={4} alignItems='center'>
                        <Text variant='ultratitle'>Fiscal sponsorship</Text>
                        <Text variant='title'>
                            The fast track to <Text sx={{ color: 'red', textShadow: '0 0 50px var(--theme-ui-colors-red)' }}>501(c)(3)&nbsp;nonprofit </Text>
                            status for your startup
                        </Text>
                    </FlexCol>
                    <Text variant='headline'>
                        Building a project, event, or organization on a
                        mission to serve the public good or your community?
                        Obtaining 501(c)(3) public charity status in the U.S.
                        just got easier through fiscal sponsorship.
                    </Text>

                    <FlexCol gap={1} alignItems='center'>
                        <Text variant='headline'>Jump to:</Text>
                        <BulletBox padding='0'>
                            <Link sx={{fontSize: 2 }} href='#what-is'>What’s Fiscal Sponsorship?</Link>
                            <Link sx={{fontSize: 2 }} href='#requirements'>Requirements for Fiscal Sponsorship</Link>
                            <Link sx={{fontSize: 2 }} href='#partner'>Partner with Hack&nbsp;Club&nbsp;Bank</Link>
                        </BulletBox>
                    </FlexCol>
                    <>
                        <Text variant='lead'>
                            Every year, thousands of organizations from around
                            the world apply through the IRS to become a U.S. 501(c)(3)
                            for charitable recognition and tax exemptions.
                            The process for obtaining legal status can take anywhere
                            from 2-12 months, and as a nonprofit organizer,
                            it’s important to know that this can mean:
                        </Text>
                        <BulletBox>
                            <Bullet glow={false} icon='sad'>
                                $3,000 in up-front costs, from filing different
                                applications and forms to support from legal counsel.
                            </Bullet>
                            <Bullet glow={false} icon='sad'>
                                The potential for the IRS to reject an application
                                (and not return your money).
                            </Bullet>
                            <Bullet glow={false} icon='sad'>
                                An annual filing fee of $2,500. 
                            </Bullet>
                            <Bullet glow={false} icon='sad'>
                                Hiring bookkeepers and accountants to prepare
                                taxes and provide upkeep to stay in good standing.
                            </Bullet>
                            <Bullet glow={false} icon='sad'>
                                Up to $5,000 to close down shop if you lose or terminate status.
                            </Bullet>
                        </BulletBox>
                    </>
                    <Text variant='lead'>
                        Unfortunately, between the price and time needed to
                        organize a nonprofit, these barriers prevent many
                        charitable initiatives from exiting an idea phase
                        to go on to making a valuable impact throughout the world.
                    </Text>
                    <Text variant='lead'>
                        So 501(c)(3) status is cool and all,
                        but why go through the hassle of applying
                        when it’s so expensive and time consuming?
                    </Text>

                    <Text variant='headline'>
                        As a legally recognized 501(c)(3) nonprofit
                        in the U.S., there are loads of legal tax
                        benefits that make the status worth it, like:
                    </Text>
                    <BulletBox>
                        <Bullet icon='payment'>
                            The ability to receive <b>tax deductible
                            donations</b> from sponsors.
                        </Bullet>
                        <Bullet icon='member-add'>
                            Reduced taxable income for your U.S.
                            supporters, which <b>incentivizes giving</b>.
                        </Bullet>
                        <Bullet icon='leader'>
                            <b>Exemption</b> from U.S. federal
                            income tax and unemployment tax.
                        </Bullet>
                        <Bullet icon='bolt'>
                            Potential exemption from state
                            income, sales, and employment taxes.
                        </Bullet>
                        <Bullet icon='email'>
                            Potential for reduced rates on postage,
                            marketing, advertising, legal counsel, and more.
                        </Bullet>
                    </BulletBox>
                    <Text variant='lead'>
                        As it turns out, there’s an alternative route
                        for startups, student-led initiatives,
                        or anyone looking to avoid a headache
                        with the IRS to obtain all the benefits of
                        501(c)(3) status. To avoid the traditional
                        filing route, go for fiscal sponsorship.
                    </Text>

                    <Section id='what-is'>
                        <Text variant='title'>
                            What’s Fiscal Sponsorship?
                        </Text>
                        <Text variant='lead'>
                            By legally partnering with an existing 
                            nonprofit offering fiscal sponsorship, 
                            projects and events can claim all the 
                            legal benefits of individual 501(c)(3) 
                            status. Piggy-backing off this existing 
                            status, organizations also gain access 
                            to resources from their fiscal sponsor like:
                        </Text>
                        <BulletBox>
                            <Bullet icon='docs'>
                                Bookkeeping and administration ensuring
                                that all paperwork and taxes are filed.
                            </Bullet>
                            <Bullet icon='bag'>
                                Fully established HR and benefits,
                                which can vary by the fiscal sponsor.
                            </Bullet>
                            <Bullet icon='admin'>
                                A board of directors - you 
                                don’t have to organize your own! 
                            </Bullet>
                            <Bullet icon='payment'>
                                Fully transparent operational fees,
                                typically ranging from 7-12% that
                                prevent you from paying operating costs.
                            </Bullet>
                            <Bullet icon='door-leave'>
                                The ability to terminate your fiscal 
                                sponsorship agreement and file for 
                                separate tax-exempt status at any point. 
                            </Bullet>
                        </BulletBox>
                        <Text variant='lead'>
                            If you’re brand new to nonprofit organizing
                            or unsure where your project will take you,
                            fiscal sponsorship is a great tool to help
                            manage your finances and gauge whether becoming
                            an independent nonprofit down the line is
                            practical or financially feasible.
                        </Text>
                        <Text variant='lead'>
                            Fiscal sponsorship makes it so that hacks 
                            aren’t just for folding that stubborn fitted 
                            sheet or sending an email to hundreds of 
                            people in seconds; they’re also for obtaining 
                            nonprofit status. 
                        </Text>
                    </Section>
                    
                    <Section id='requirements'>
                        <Text variant='title'>
                            Requirements for Fiscal Sponsorship
                        </Text>
                        <Text variant='lead'>
                            Depending on the fiscal sponsor you choose, 
                            requirements for working together can vary. 
                            Fiscal sponsors generally ask that your 
                            nonprofit’s goals be similar to theirs. 
                            They usually also ask that your organization 
                            or event commits to remaining charitable in 
                            nature and refrains from activites that may 
                            result in loss of 501(c)(3) status. 
                        </Text>
                    </Section>

                    <Section id='partner'>
                        <Text variant='title'>
                            Partner with Hack&nbsp;Club&nbsp;Bank
                        </Text>
                        <Text variant='lead'>
                            While many fiscal sponsors require that their 
                            partners relate to their mission in similar ways, 
                            at Hack&nbsp;Club&nbsp;Bank, we’ve built our infrastructure 
                            to support hundreds of causes in all areas of 
                            charitability. Check out some of the resources 
                            we’ve built our fiscal sponsorship foundation on:
                        </Text>
                        <BulletBox>
                            <Bullet icon='bank-account'>
                                A web interface that looks and operates
                                just like a bank account
                            </Bullet>
                            <Bullet icon='card'>
                                Fee-free invoicing, ACH or check
                                transfers, and reimbursements
                            </Bullet>
                            <Bullet icon='link'>
                                A customizable and embeddable
                                donations URL
                            </Bullet>
                            <Bullet icon='google'>
                                Perks like Google Workspace,
                                PVSA certification, and 1Password credits
                            </Bullet>
                            <Bullet icon='purse' href='https://bank.hackclub.com/hq'>
                                Optional transparency mode to show
                                off finances to donors and the public
                            </Bullet>
                            <Bullet icon='friend'>
                                24 hour weekday turnaround time from a
                                full-time support team for all queries
                            </Bullet>
                            <Bullet icon='everything' href='http://hackclub.com/bank'>
                                ...and more!
                            </Bullet>
                        </BulletBox>
                        <Text variant='lead'>
                            Looking for nonprofit status and not a religious or
                            political organization? We’d love to meet you and
                            chat about working together. Feel free to apply
                            here or email our team if you have more questions
                            about fiscal sponsorship!
                        </Text>
                    </Section>
                    
                    <Text variant='lead'>
                        At its core, Hack Club is a nonprofit encouraging
                        students to learn how to code by building and making
                        cool things. Hack&nbsp;Club&nbsp;Bank was built out by teenagers
                        at Hack Club and continues to be a real-world space
                        that teens can hack on every day.
                    </Text>
                </FlexCol>
            </Container>
            <Box sx={{
                height: '100px',
                position: 'relative',
                width: '100%',
                overflow: 'hidden',

                '&::after': {
                    content: '""',
                    width: '500%',
                    height: '100%',

                    position: 'absolute',
                    translate: '-50% 100%',
                    boxShadow: '0 -64px 64px #17171d',
                }
            }}/>
            <Footer dark />
        </Box>
    )
}