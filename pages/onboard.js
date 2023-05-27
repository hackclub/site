import {
	Box,
	Button,
	Grid,
	Heading,
	Image,
	Text,
	Flex,
	Link
} from 'theme-ui'
import Balancer from 'react-wrap-balancer'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import Footer from '../components/footer'
import FadeIn from '../components/fade-in'
import Sparkles from '../components/sparkles'
import Tilt from '../components/tilt'
import usePrefersReducedMotion from '../lib/use-prefers-reduced-motion'
import { useRef, useEffect, useState } from 'react'

/**
 * @type {import('theme-ui').ThemeUIStyleObject}
 */
const traceSx = {
	width: 6,
	bg: '#e2b747',
	alignSelf: 'stretch',
	mr: 100,
	position: 'relative'
}

const dimBg = '#151515'

// Beloved classic utility function :3
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// "LET'S RECAP" pixel art (exported from Piskel)
// Original: https://doggo.ninja/fiK0nk.piskel
const recapWidth = 71
const recapHeight = 10
const recapPixels = [
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 
	0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 
	0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0xffffffff, 0xffffffff, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0xffffffff, 0xffffffff
]

const slackLink = `/slack/?reason=${encodeURIComponent('I joined for OnBoard!')}`

const stickerButtonText = 'Click 4 Stickers'
const stickerButtonFont = 'Oleo Script'
const stickerButtonFontStylesheet = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(stickerButtonFont)}&display=swap&text=${encodeURIComponent(stickerButtonText)}`

const wandImgTraced = 'https://cloud-8lszi55ph-hack-club-bot.vercel.app/10frame_2.png'
const wandImgRendered = 'https://cloud-8lszi55ph-hack-club-bot.vercel.app/00frame_1.png'

const ShipPage = () => {
	const prefersReducedMotion = usePrefersReducedMotion()

	// Wand flicker animation
	const [ wandImg, setWandImg ] = useState(wandImgTraced)
	const wandAnimated = useRef(false)
	useEffect(() => {
		let canceled = false

		const flicker = async () => {
			if (canceled) return
			setWandImg(wandImgTraced)
			await sleep(Math.random() * 80 + 10); if (canceled) return
			setWandImg(wandImgRendered)
			setTimeout(flicker, Math.random() * 4000 + 500)
		}

		const animate = async () => {
			if (wandAnimated.current) return
			wandAnimated.current = true

			await sleep(1500); if (canceled) return
			
			setWandImg(wandImgRendered)
			await sleep(60); if (canceled) return
			setWandImg(wandImgTraced)
			await sleep(340); if (canceled) return

			setWandImg(wandImgRendered)
			await sleep(14); if (canceled) return
			setWandImg(wandImgTraced)
			await sleep(55); if (canceled) return

			setWandImg(wandImgRendered)
			await sleep(10); if (canceled) return
			setWandImg(wandImgTraced)
			await sleep(150); if (canceled) return

			setWandImg(wandImgRendered)
			setTimeout(flicker, 1200)
		}

		if (prefersReducedMotion) {
			setWandImg(wandImgRendered)
		} else {
			animate()
		}

		return () => canceled = true
	}, [ prefersReducedMotion ])

	// Spotlight effect
	const spotlightRef = useRef()
	useEffect(() => {
		const handler = (event) => {
			spotlightRef.current.style.background = `radial-gradient(
				circle at ${event.pageX}px ${event.pageY}px,
				rgba(0, 0, 0, 0) 10px,
				rgba(0, 0, 0, 0.85) 80px
			)`
		}
		window.addEventListener('mousemove', handler)
		return () => window.removeEventListener('mousemove', handler)
	}, [])

	// Calculating the bus height to match the bottom left of the first connector.
	const [ busHeight, setBusHeight ] = useState(null)
	const containerRef = useRef() // For ResizeObserver
	const connectorRef = useRef() // To get bottom left position
	const busRef = useRef() // To calculate height differential

	useEffect(() => {
	  const observer = new ResizeObserver(() => {
	    const connectorRect = connectorRef.current.getBoundingClientRect()
	    const busRect = busRef.current.getBoundingClientRect()
	    setBusHeight(busRect.bottom - connectorRect.bottom + 4.5)
	  })

	  observer.observe(containerRef.current)
	  return () => observer.disconnect()
	}, [])
	
	// Fancy lights animation
	const lightsScrollTrigger = useRef()
	const lightsAnimated = useRef(false)
	useEffect(() => {
		let canceled = false

		const setAtIndex = (i, color) => {
			if (canceled) return

			// Going outside of React for performance
			const el = document.getElementById(`pixel-${i}`)
			if (!el) return

			if (recapPixels[i]) {
				el.style.background = color
				el.style.boxShadow = `0 0 10px ${color}`
			} else {
				el.style.background = dimBg
				el.style.boxShadow = 'none'
			}
		}
		const setAll = (color) => {
			for (let i = 0; i < recapPixels.length; i++) setAtIndex(i, color)
		}

		const animate = async () => {
			if (lightsAnimated.current) return
			lightsAnimated.current = true

			// Illuminate lights in diagonal lines starting with only top left.
			for (let curColumn = 0; curColumn < recapWidth + recapHeight; curColumn++) {
				for (let offset = curColumn; offset >= Math.max(0, curColumn - recapHeight); offset--) {
					const i = curColumn * recapWidth + offset - offset * recapWidth
					setAtIndex(i, '#ffffff')
					if (!recapPixels[i]) await sleep(4); if (canceled) return
				}
				// await sleep(2); if (canceled) return
			}
			
			// Flash the lights twice
			await sleep(600); if (canceled) return

			setAll(dimBg)
			await sleep(80); if (canceled) return

			setAll('#aaaaaa')
			await sleep(20); if (canceled) return

			setAll(dimBg)
			await sleep(30); if (canceled) return

			setAll('#aaaaaa')
			await sleep(100); if (canceled) return

			setAll(dimBg)
			await sleep(200); if (canceled) return

			// Animate rainbow 2-column increments
			for (let x = 0; x < recapWidth; x++) {
				const color = `hsl(${x * 360 / recapWidth}, 100%, 65%)`
				for (let y = 0; y < recapHeight; y++) {
					const i = y * recapWidth + x
					setAtIndex(i, color)
				}
				if (x % 2 === 1) await sleep(35)
			}
		}
		
		if (prefersReducedMotion) {
			if (!lightsAnimated.current) setAll('#ffffff')
			return () => canceled = true
		} else {
			const observer = new IntersectionObserver(([ entry ]) => {
				if (entry.isIntersecting) animate()
			}, { threshold: 0.5 })
			observer.observe(lightsScrollTrigger.current)
			return () => {
				canceled = true
				observer.disconnect()
			}
		}
	}, [ prefersReducedMotion ])

	return (
		<>
			<Meta
				as={Head}
				name="OnBoard"
				description={`We'll pay manufacturing costs for any high schooler who designs a circuit board.`}
				image="https://cloud-ji9c1qxfx-hack-club-bot.vercel.app/03_card.png"
			/>

			<style>{`
				@import url('${stickerButtonFontStylesheet}');

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

			<Head>
				<link rel="preload" href={wandImgRendered} as="image" />
			</Head>

			<Nav />

			<Box
				as="header"
				sx={{
					bg: '#000000',
					backgroundImage: `
						linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
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

				<Flex sx={{ p: 4, flexDirection: 'column', alignItems: 'center', zIndex: 5, position: 'relative' }}>
					<Flex sx={{ pt: 80, width: '100%', maxWidth: 'layout', alignItems: 'center' }}>
						<Flex sx={{ flex: 1, flexDirection: 'column', gap: 25 }}>
							<Heading
								as="h1"
								sx={{
									fontSize: 80,
									maxWidth: 'copyPlus',
									textShadow: '0 0 30px rgba(42, 252, 88, 0.6)',
									color: '#87ffa1'
								}}
							>
								<Balancer ratio={.3}>OnBoard</Balancer>
							</Heading>

							<Heading as="div" sx={{ fontSize: 4, fontWeight: 400, maxWidth: 'copyPlus' }}>
								<Balancer ratio={.3}>
									Circuit boards are <Sparkles><Text sx={{ fontWeight: 400 }}>magical</Text></Sparkles>.{' '}
									You design one, we'll print it!
								</Balancer>
							</Heading>

							<Box sx={{ mt: 16 }}>
								<Button variant="ctaLg" as="a" href="#apply">
									How do I apply?
								</Button>
							</Box>
						</Flex>
						
						<Box sx={{ flex: 1, maxWidth: 230}}>
							<FadeIn duration={800} delay={100}>
								<Image
									src={wandImg}
									alt='A circuit board of a dino wizard with a light up wand.'
								/>
							</FadeIn>
						</Box>
					</Flex>

					<Heading as="h2" sx={{ pt: 60, pb: 35, fontSize: 36, fontWeight: 500, maxWidth: 'copy', textAlign: 'center' }}>
						<Balancer ratio={.6}>Join 1,000 others to create your own circuit board.</Balancer>
					</Heading>

					<Grid width={300} gap={4} sx={{ fontSize: 2, h3: { fontSize: 2 }, width: '100%', maxWidth: 'layout', pb: 40 }}>
						<Flex as="article" sx={{ flexDirection: 'column', gap: 2 }}>
							<Text as="h3">Community & Friends</Text>
							<Text as="p">
								Share your progress and ask for help with Hack Club teens who are designing their own circuit boards.
							</Text>
						</Flex>

						<Flex as="article" sx={{ flexDirection: 'column', gap: 2 }}>
							<Text as="h3">Free Manufacturing</Text>
							<Text as="p">
								We’ll pay $100 to cover manufacturing costs, enough for 2-3 iterations of your design.
							</Text>
						</Flex>
					</Grid>
				</Flex>
			</Box>

			<Flex as="section" sx={{ overflowX: 'hidden', px: 4, py: 5, bg: dimBg, color: '#ffffff', justifyContent: 'center' }}>
				<Flex sx={{ flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%', maxWidth: 'copyPlus' }}>
					<Heading as="h2" sx={{ fontSize: 36, fontWeight: 500, textAlign: 'center' }}>
						<Balancer>What have people made already?</Balancer>
					</Heading>

					<Grid
						width={350}
						gap={3}
						sx={{
							width: '100%',
							fontSize: 2,
							a: {
								display: 'block',
								position: 'relative',
								bg: '#000000',
								borderRadius: 'default',
								px: 3,
								py: 4,
								color: 'inherit',
								textDecoration: 'inherit',
								'.arrow': {
									position: 'relative',
									left: '0px',
									top: '1px', // Looks more aligned with text.
									display: 'inline-block',
									transition: 'left 80ms ease-in' 
								},
								'&:hover .arrow': {
									left: '4px'
								}
							},
							article: {
								flexDirection: 'column',
								gap: 3,
								justifyContent: 'center',
								height: '100%',
								zIndex: 1
							},
							img: {
								pointerEvents: 'none',
								zIndex: 2
							}
						}}
					>
						<a href="https://github.com/maggie-j-liu/orpheus-keychain" target="_blank">
							<Flex as="article">
								<Text as="p" sx={{ pr: 80 }}>
									Make a <strong>keychain</strong> that has a <strong>light up dino</strong> on it.
								</Text>
								<Text as="p" sx={{ pr: 100, color: 'gray' }}>
									See Maggie's designs&nbsp;<span className="arrow">&rarr;</span>
								</Text>
								<Image
									src='https://cloud-ahzzebs4i-hack-club-bot.vercel.app/0frame_1.png'
									alt='A circuit board of a dino wizard with a light up wand, the same image from the top of the page.'
									sx={{
										maxWidth: 120,
										position: 'absolute',
										top: 10,
										right: 15
									}}
								/>
							</Flex>
						</a>

						<a href="https://github.com/hackclub/sprig-hardware" target="_blank">
							<Flex as="article">
								<Text as="p" sx={{ pr: 100 }}>
									Design a <strong>movement sensor</strong> add-on to an open source <strong>game console</strong>.
								</Text>
								<Text as="p" sx={{ pr: 140, color: 'gray' }}>
									Read the source&nbsp;<span className="arrow">&rarr;</span>
								</Text>
								<Image
									src='https://cloud-6exi6bz1i-hack-club-bot.vercel.app/0rotatesprig.png'
									alt='A black circuit board for a game console with copper wiring.'
									sx={{
										maxWidth: 280,
										position: 'absolute',
										bottom: -50,
										right: -75
									}}
								/>
							</Flex>
						</a>

						<a href="https://github.com/Hugoyhu/Hack-Club-Zephyr-USB-Hub" target="_blank">
							<Flex as="article">
								<Text as="p" sx={{ pr: [ 100, 100, 100, 0 ] }}>
									Make a <strong>USB-C hub</strong> for the best <strong>hackathon swag</strong> ever.
								</Text>
								<Text as="p" sx={{ color: 'gray', pr: 150 }}>
									Build one for your event&nbsp;<span className="arrow">&rarr;</span>
								</Text>
								<Image
									src='https://cloud-c953eezuq-hack-club-bot.vercel.app/0hub.png'
									alt='A rectangular circuit board in the shape of a train car that acts as a USB type C hub.'
									sx={{
										flex: 1,
										right: -15,
										bottom: -10,
										maxWidth: 260,
										position: 'absolute',
										zIndex: 6
									}}
								/>
							</Flex>
						</a>
							
						<a href="https://github.com/maggie-j-liu/macropad" target="_blank">
							<Flex as="article">
								<Text as="p" sx={{ pr: 170 }}>
									Come up with your own custom <strong>keyboard layout</strong>.
								</Text>
								<Text as="p" sx={{ pr: 140, color: 'gray' }}>
									Check it out&nbsp;<span className="arrow">&rarr;</span>
								</Text>
								<Image
									src='https://cloud-8yyfro2sg-hack-club-bot.vercel.app/0keyboard.png'
									alt='A 3-key custom keyboard with colored glowing translucent keys.'
									sx={{
										position: 'absolute',
										bottom: 0,
										right: -20,
										maxWidth: 230
									}}
								/>
							</Flex>
						</a>
					</Grid>

					<Button variant="outlineLg" as="a" href="https://github.com/hackclub/OnBoard/blob/main/DIRECTIONS.md" target="_blank">
						Join the Party
					</Button>
				</Flex>
			</Flex>	

			{/* <Flex as="section" sx={{ px: 4, pt: 4, pb: 5, bg: dimBg, color: '#ffffff', justifyContent: 'center' }}>
				<Flex sx={{ flexDirection: 'column', gap: 4, width: '100%', maxWidth: 'copyPlus' }}>
					<Heading as="h2" sx={{ fontSize: 42, fontWeight: 500 }}>
						<Balancer ratio={0.3}>Never made a circuit board before? No problem.</Balancer>
					</Heading>
					<Text sx={{ fontSize: 3 }}>
						Learn from tutorials like Maggie’s intro to PCB design video below. Ask in the{' '}
						<Link href={slackLink} target="_blank">Hack Club Slack</Link>{' '}
						if you have any questions!
					</Text>
					<iframe
						style={{
							width: '100%',
							maxWidth: 600,
							alignSelf: 'center',
							aspectRatio: '16 / 9'
						}}
						src="https://www.youtube.com/embed/PnK4gzO6S3Q"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					/>
				</Flex>
			</Flex> */}

			<Flex as="section" id="apply" sx={{ px: 4, pt: 5, bg: '#ffffff', color: '#000000', justifyContent: 'center' }}>
				<Flex as="section" sx={{ flexDirection: 'column', gap: 4, width: '100%', maxWidth: 'layout' }} ref={containerRef}>
					<Heading as="h2" sx={{ fontSize: 5, fontWeight: 500, textAlign: 'center' }}>
						How to Qualify
					</Heading>

					<Flex>
						<Box sx={{
							...traceSx,
							alignSelf: 'flex-end',
							height: busHeight
						}} ref={busRef} />

						<Flex sx={{
							flexDirection: [ 'column', 'column', 'row' ],
							flex: 1,
							gap: 5,
							pb: 5
						}}>
							<Flex
								as="ul"
								sx={{
									flexDirection: 'column',
									fontSize: 24,
									listStyleType: 'none',
									gap: 4,
									flex: 1,
									p: 0
								}}
							>
								{[
									(<><strong>Design a PCB</strong> using any tool that can export Gerber files.</>),
									(<><strong>Upload your design</strong> to JLCPCB and take a screenshot.</>),
									(<>
										<strong>Open source your design</strong> on GitHub and{' '}
										<Link href="https://github.com/hackclub/OnBoard/blob/main/DIRECTIONS.md" target="_blank">apply for the grant</Link>!{' '}
										You must be a teenager in high school to apply.
									</>)
								].map((text, i) => (
									<Text as="li" key={i} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
										<Box sx={{
											width: 30,
											height: 30,
											borderWidth: traceSx.width,
											borderStyle: 'solid',
											borderColor: traceSx.bg,
											borderRadius: '50%',
											left: t => -60,
											position: 'absolute'
										}}>
											<Box
												ref={i === 0 ? connectorRef : null}
												sx={{
													// Yeah, yeah, it's a 45-45-90 triangle...
													// I'm too lazy to do math though, so I'm hardcoding
													// coords until there's actually a problem.
													width: traceSx.width,
													height: 69,
													bg: traceSx.bg,
													position: 'absolute',
													transform: 'rotate(45deg)',
													transformOrigin: 'top right',
													top: '20.5px',
													left: '-5px'
												}}
											/>
										</Box>

										<span>{text}</span>
									</Text>
								))}
							</Flex>

							<Tilt options={{ scale: 1 }}>
								<Image
									src='https://cloud-hy108iezt-hack-club-bot.vercel.app/0dinopcb.png'
									alt='A complex white circuit board in the shape of a cute leaping dinosaur.'
									loading='lazy'
									sx={{
										flex: 1,
										maxWidth: 350,
										objectFit: 'contain',
										mt: [ '-40px', '-40px', 0 ]
									}}
								/>
							</Tilt>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			<Flex sx={{ px: 4, bg: '#000000', color: '#ffffff', justifyContent: 'center' }}>
				<Flex as="section" sx={{ width: '100%', maxWidth: 'layout' }}>
					<Box sx={traceSx}>
						<Box sx={{
							height: traceSx.width,
							width: 40,
							bg: traceSx.bg,
							position: 'absolute',
							bottom: 0,
							left: -20 + traceSx.width/2
						}} />
					</Box>

					<Flex sx={{ flex: 1, flexDirection: 'column', gap: 4, py: 5 }}>
						<Heading as="h2" sx={{ fontSize: 36, fontWeight: 500 }}>
							<Balancer>Join the Hack Club Slack</Balancer>
						</Heading>
						<Text as="p" sx={{ fontSize: 24 }}>
							Meet others learning how to make their own circuit boards. Collaborate, get help, and support others as you take the leap.
						</Text>
						<Box sx={{ mt: 1 }}>
							<Button variant="lg" as="a" href={slackLink} target="_blank">
								Join the Slack
							</Button>
						</Box>
					</Flex>
				</Flex>
			</Flex>
			
			<Flex as="section" sx={{ overflowX: 'hidden', px: 4, py: 6, bg: '#000000', color: '#ffffff', justifyContent: 'center' }}>
				<Flex sx={{ flexDirection: 'column', alignItems: 'center', gap: 5, width: '100%', maxWidth: 'layout' }}>
					{/* For accessibility and screen readers: */}
					<Heading as="h2" sx={{
						position: 'absolute',
						width: '1px',
						height: '1px',
						margin: '-1px',
						overflow: 'hidden',
						clip: 'rect(0, 0, 0, 0)',
						whiteSpace: 'nowrap',
						borderWidth: 0
					}}>
						Let's Recap
					</Heading>

					<Grid ref={lightsScrollTrigger} gap='4px' columns={recapWidth} sx={{ width: '100%', maxWidth: 800 }}>
						{recapPixels.map((_, i) => (
							<Box id={`pixel-${i}`} key={i} sx={{ bg: dimBg, paddingTop: '100%' }} />
						))}
					</Grid>

					<Grid
						width={300}
						gap={4}
						sx={{
							width: '100%',
							article: {
								bg: dimBg,
								borderRadius: 'default',
								p: 4,
								flexDirection: 'column',
								boxShadow: 'inset 0px 0px 14px rgba(255, 255, 255, 0.15);'
							},
							h3: {
								fontSize: 3,
								mb: 3
							},
							p: {
								fontSize: 18,
								pb: 3,
								mb: '6px'
							}
						}}
					>
						<Flex as="article">
							<Text as="h3">$100 Grants</Text>
							<Text as="p">We’ll pay $100 to manufacture your boards, all components included.</Text>
							<Button variant="outline" as="a" href="https://github.com/hackclub/OnBoard#requirements" target="_blank">
								Read the Rules
							</Button>
						</Flex>

						<Flex as="article">
							<Text as="h3">Community</Text>
							<Text as="p">Share progress with fellow participants and ask for help in the Hack Club Slack.</Text>
							<Button variant="outline" as="a" href={slackLink} target="_blank">
								Join Slack
							</Button>
						</Flex>

						<Flex as="article">
							<Text as="h3">Free Stickers</Text>
							<Text as="p">Like stickers? Request below and we'll ship you an envelope full of stickers for free.</Text>
							<Button variant="outline" as="a" href="https://airtable.com/shrOOU2ZZFYtffUVz" target="_blank">
								Request Stickers
							</Button>
						</Flex>

						{/* <Flex as="article">
							<Text as="h3">Learn to PCB</Text>
							<Text as="p">Watch Maggie’s intro video to learn how to make a simple circuit board from start to end.</Text>
							<Button variant="outline" as="a" href="https://airtable.com/shrOOU2ZZFYtffUVz" target="_blank">
								Watch Tutorial
							</Button>
						</Flex> */}
					</Grid>

					<Flex sx={{ gap: 3, alignItems: 'center', textAlign: 'center', mt: '-16px' }}>
						<Text sx={{ fontSize: 3 }}>Get started now:</Text>
						<Button variant="ctaLg" as="a" href={slackLink} target="_blank">Join the Slack</Button>
					</Flex>
				</Flex>
			</Flex>

			<Box sx={{ position: 'relative' }}>
				<Image
					src='https://cloud-f4lij7sq1-hack-club-bot.vercel.app/0flowerpcb.png'
					alt='A big image of several pink flower-shaped PCBs.'
					loading='lazy'
					sx={{
						display: 'block',
						width: '100%',
						height: 500,
						objectFit: 'cover',
					}}
				/>

				{/* <Flex
					as="a"
					href="javascript:void(0)"
					target="_blank"
					sx={{
						bg: '#ff0000',
						color: '#ffffff',
						textDecoration: 'none',
						size: 160,
						flexDirection: 'column',
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						top: -80,
						right: '14vw',
						fontSize: 3,
						lineHeight: 1.3,
						fontWeight: 'bold',
						fontFamily: `'${stickerButtonFont}', cursive`,
						transform: 'rotate(-25deg)',
						borderRadius: '50%',
						boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.55), 0px 0px 10px rgba(0, 0, 0, 0.75), inset 0px 0px 60px rgba(255, 255, 255, 0.40)'
					}}
				>
					{stickerButtonText.split(' ').map((line, i) => <div key={i}>{line}</div>)}
				</Flex> */}
			</Box>

			<Footer dark />
		</>
	)
}

export default ShipPage