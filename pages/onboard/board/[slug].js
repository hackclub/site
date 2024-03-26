import {Box, Button, Flex, Grid, Heading, Image, Link, Text} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../../../components/nav'
import usePrefersReducedMotion from '../../../lib/use-prefers-reduced-motion'
import {useEffect, useRef, useState} from 'react'
import { remark } from 'remark';
import html from 'remark-html';
import {useRouter} from "next/router";
import {FetchProject} from "../../api/board/[name]";

// example projects
const curated = [
    'Touch Capacitive Piano',
    'Small Stepper Motor Breakout',
    'ShawnsMultipurposeMacropad',
    'Hall-Effect Sensor Plate',
    'Gas_Smoke_Detector',
    'GPS Tracker for GOKART',
    'Ewoud\'s Desktop Clock PCB',
    'Connor Ender 3 Bed Leveler',
]

const BoardPage = ({ projectObj }) => {
    const prefersReducedMotion = usePrefersReducedMotion()

    // const router = useRouter()
    // get slug
    // const name = router.query.slug

    const spotlightRef = useRef()
    useEffect(() => {
        const handler = event => {
            spotlightRef.current.style.background = `radial-gradient(
				circle at ${event.pageX}px ${event.pageY}px,
				rgba(0, 0, 0, 0) 10px,
				rgba(0, 0, 0, 0.8) 80px
			)`
        }
        window.addEventListener('mousemove', handler)
        return () => window.removeEventListener('mousemove', handler)
    }, [])

    console.log(projectObj)

    const [project, setProject] = useState({})
    useEffect(() => {
        /*(async () => {
            const project = await (await fetch(`/api/board/${name}`)).json()
            console.log(project)
            setProject(project)
        })()*/
        setProject(projectObj)
    }, [projectObj])

    return (
        <>
            <Meta
                as={Head}
                title="Gallery"
                description="Check out the latest and greatest from the Onboard project."></Meta>
            <style>{`

				@font-face {
					font-family: 'Phantom Sans';
					src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Med.woff')
							format('woff'),
						url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Med.woff2')
							format('woff2');
					font-weight: 500;
					font-style: normal;
					font-display: swap;
				}

				html {
					scroll-behavior: smooth;
				}
			`}</style>
            <Head></Head>
            <Nav/>
            <Box
                as="header"
                sx={{
                    bg: '#000000',
                    backgroundImage: `
						linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
						url('https://cloud-dst3a9oz5-hack-club-bot.vercel.app/0image.png')
					`,
                    color: '#ffffff',
                    position: 'relative'
                }}
            >
                <Box
                    ref={spotlightRef}
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: '#000000',
                        pointerEvents: 'none'
                    }}
                />
                <Flex
                    sx={{
                        p: 4,
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 5,
                        position: 'relative'
                    }}
                >
                    <Flex
                        sx={{
                            p: 4,
                            flexDirection: 'column',
                            alignItems: 'center',
                            zIndex: 5,
                            margin: '3vh auto',
                            position: 'relative'
                        }}
                    >
                        <Heading as="h1" variant="title" sx={{ textAlign: 'center' }}>
                            Gallery
                        </Heading>
                        <Text as="p" variant="subtitle" sx={{ textAlign: 'center' }}>
                            Check out the latest and greatest from the OnBoard project.
                        </Text>
                        <Flex sx={{ mt: 16, gap: 10, flexDirection: ['column', 'row'] }}>
                            <Button
                                variant="ctaLg"
                                as="a"
                                href="https://hackclub.com/onboard"
                                target="_blank"
                                sx={{
                                    background: t => t.util.gx('#60cc38', '#113b11')
                                }}
                            >
                                Make your own!
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box
                sx={{
                    bg: 'white',
                    py: [4, 5],
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 'copyUltra',
                        mx: 'auto',
                        px: 3
                    }}
                >
                    {// two-column layout - image on left, title + desc on right
                    }
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 4,
                            gridTemplateColumns: ['1fr', 'repeat(2, 1fr)'],
                            color: 'black',
                        }}
                    >
                        <Image
                            src={project.image}
                            alt={project.project_name}
                            sx={{
                                borderRadius: 8,
                                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <Heading as="h2" variant="title" sx={{ textAlign: 'left' }}>
                                {project.project_name}
                            </Heading>
                            <Text as="p" variant="subtitle" sx={{ textAlign: 'left' }}>
                                {project.maker_name ? `by ${project.maker_name}` : ''} {project.slack_handle ? `(${project.slack_handle})` : ''}
                            </Text>
                            <Link
                                href={`https://github.com/hackclub/OnBoard/blob/main/projects/${project.project_name}/`}
                                sx={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    ':hover': {
                                        color: 'primary'
                                    },
                                    textAlign: 'left'
                                }}
                            >View on GitHub
                            </Link>
                            {/* custom innerHTML */}
                            <Box
                                sx={{
                                    textAlign: 'left',
                                }}
                                dangerouslySetInnerHTML={{ __html:
                                    // render with remark to parse markdown
                                        remark().use(html).processSync(project.description).toString()
                                            .replaceAll('h4', 'p')
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export async function getStaticPaths(context) {
    const res = await fetch(
        'https://api.github.com/repos/hackclub/OnBoard/contents/projects'
    )
    const data = (await res.json())/*.filter(project => curated.includes(project.name))*/
    //console.log(data)
    const projects = data.map(project => project.name)
    const paths = projects.map(name => ({
        params: {
            slug: name
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    let name = context.params.slug
    let project = await FetchProject(name)
    return {
        props: {
            projectObj: project
        }
    }
}

export default BoardPage;