import {Box, Button, Flex, Grid, Heading, Text} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../../components/nav'
import usePrefersReducedMotion from '../../lib/use-prefers-reduced-motion'
import {useEffect, useRef, useState} from 'react'
import Item from '../../components/onboard/item'
import { getUrl } from 'nextjs-current-url/server';
import {getURL} from "next/dist/shared/lib/utils";

/*import pcbStackup from "pcb-stackup";
import JSZip     from "jszip";
import JSZipUtils from "jszip-utils";*/

async function get_fallback_image(project) {
    /*const fileNamesBlobs = {}
    // load the zip file
    const zip = new JSZip();
    await JSZipUtils.getBinaryContent(project, async (err, data) => {
        if (err) {
            console.error(err)
        }
        try {
            const zipData = await zip.loadAsync(data)
            // get the file names and blobs
            for (const [fileName, file] of Object.entries(zipData.files)) {
                fileNamesBlobs[fileName] = await file.async('blob')
            }
        } catch (e) {
            console.error(e)
        }
    })
    const layers = []
    for (const [fileName, blob] of Object.entries(fileNamesBlobs)) {
        if (!fileName.includes('.txt')) { // filter out the text files
            layers.push({
                fileName,
                gerber: blob.stream()
            })
        }
    }
    return (await pcbStackup(layers)).top.svg*/
    return 'https://cloud-2jz3jz3jz-hack-club-bot.vercel.app/0image.png'
}

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

const GalleryPage = ({ projects }) => {
    const prefersReducedMotion = usePrefersReducedMotion()

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

    // fetch all folders in the https://github.com/hackclub/OnBoard/tree/main/projects directory
    /*const [projects, setProjects] = useState([])
    useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch(
                'https://api.github.com/repos/hackclub/OnBoard/contents/projects'
            )
            const data = (await res.json()).filter(project => curated.includes(project.name))
            console.log(data)
            const projectData = data.map(async project => {
                return await (await fetch(`/api/board/${project.name}`)).json()
            })
            let projects = await Promise.all(projectData)
            //console.log(projects)
            setProjects(projects)
        }
        fetchProjects()
    }, [])*/
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
                    textAlign: 'center'

                }}
            >
                <Grid
                    gap={4}
                    columns={[null, 2]}
                    sx={{
                        p: 4,
                        maxWidth: 'copyPlus',
                        mx: 'auto',
                        mt: 4,
                        mb: 5,
                        textAlign: 'center',
                    }}
                >
                    {projects.map(project => (
                        <Item
                            key={project.project_name}
                            title={project.project_name}
                            author_name={project.maker_name}
                            author_slack={project.slack_handle}
                            image={project.image}
                            project={project}
                        />
                    ))}
                </Grid>
            </Box>
        </>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(
        'https://api.github.com/repos/hackclub/OnBoard/contents/projects'
    )
    const data = (await res.json())/*.filter(project => curated.includes(project.name))*/
    console.log(data)
    const projectData = data.map(async project => {
        const url = getUrl({ req: context.req })
        console.log(url)
        return await (await fetch(encodeURI(`${url.origin}/api/board/${project.name}`))).json()
    })
    let projects = await Promise.all(projectData)
    return {
        props: {
            projects
        }
    }
}

export default GalleryPage