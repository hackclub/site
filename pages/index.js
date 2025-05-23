import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from 'theme-ui'
import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import BGImg from '../components/background-image'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Stage from '../components/stage'
import Carousel from '../components/index/carousel'
import Sprig from '../components/index/cards/sprig'
import Sinerider from '../components/index/cards/sinerider'
import SprigConsole from '../components/index/cards/sprig-console'
import Clubs from '../components/index/cards/clubs'
import Workshops from '../components/index/cards/workshops'
import HCB from '../components/index/cards/hcb'
import Hackathons from '../components/index/cards/hackathons'
import OuternetImgFile from '../public/home/outernet-110.jpg'
import Announcement from '../components/announcement'
import Konami from 'react-konami-code'
import JSConfetti from 'js-confetti'
import Secret from '../components/secret'
import MailingList from '../components/index/cards/mailing-list'
import Slack from '../components/index/cards/slack'
import Icon from '../components/icon'
import GitHub from '../components/index/github'
import Photo from '../components/photo'
import Comma from '../components/comma'
import Haxidraw from '../components/index/cards/haxidraw'
import Onboard from '../components/index/cards/onboard'
import Trail from '../components/index/cards/trail'
import Scrapyard from '../components/index/cards/scrapyard'
import Neighborhood from '../components/index/cards/neighborhood'
/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Button, Flex, Grid, Heading, Text, Link as ThemeLink, Image, useColorMode } from "theme-ui";
import NextLink from "next/link";

// --------- NAV LINKS ----------
const navLinks = [
  { href: "https://hackclub.com/clubs/", label: "Clubs" },
  { href: "https://workshops.hackclub.com/", label: "Workshops" },
  { href: "https://hackclub.com/hackathons/", label: "Hackathons" },
  { href: "https://hackclub.com/philosophy/", label: "Philosophy" },
];

// --------- FEATURED PROJECTS ----------
// I'll replace this with new projects frequently!
const FEATURED_PROJECTS = [
  {
    image: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/96ead81a7069ff06ad0c206883fa29b9fd4b4e41_image.png",
    title: "Lucas 11 Personal Website",
    description: "An personal website for Lucas11 that it has all of their personal projects!",
    link: "https://lucas11.dev/",
    linkLabel: "Check it out →"
  },
  {
    image: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/160c7c66b5509c2c4297a60336ccaab163499552_image.png",
    title: "AgaTool",
    description: "A multitool bookmarklet that you can use to do... anything!",
    link: "http://hacklet.hackclub.com",
    linkLabel: "Learn how to make your own bookmarklet →"
  },
  {
    image: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/4cf116ff6ce6c5dc8329fba8ee36123b1b815341_image.png",
    title: "Hackatime Badge",
    description: "An API that takes in a Hackatime username and project name (Hackatime is how Hack Clubbers track their coding time!), and outputs a Shields.io badge with the time spent on that project, with lots of customization options!",
    link: "https://github.com/pbhak/hackatime-badge",
    linkLabel: "Check it out →"
  },
  {
    image: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/33954a9dcbc95476ecf5776e5f4687694bf0d0df_image.png",
    title: "TBHandheld",
    description: "A ESP8266 based Gaming Handheld that has support for IoT applications too!",
    link: "https://highway.hackclub.com/",
    linkLabel: "Learn how to make your own hardware projects →"
  },
];

// --------- ANIMATION ----------
function HackClubTypeAnimation({ onDone }) {
  const text = "Hack Club";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setTyped("");
    let idx = 0;
    const interval = setInterval(() => {
      setTyped(text.slice(0, idx + 1));
      idx++;
      if (idx === text.length) {
        clearInterval(interval);
        setTimeout(onDone, 900);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [onDone, text]);

  return (
    <Heading
      as="h1"
      sx={{
        fontSize: [5, 7, 8],
        mb: [3, 4],
        fontWeight: 900,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        color: "primary",
        minHeight: "1.3em",
        transition: "color 0.2s"
      }}
    >
      {typed}
    </Heading>
  );
}

// --------- HERO BUTTON STYLE ----------
const heroButtonSx = {
  bg: "background",
  color: "primary",
  fontWeight: "bold",
  fontSize: [3, 4],
  px: [4, 5],
  py: [3, 3],
  borderRadius: 999,
  boxShadow: "0 2px 12px #0001",
  border: "2px solid",
  borderColor: "primary",
  transition: "transform 0.14s, background 0.2s, color 0.2s, border-color 0.2s",
  "&:hover": {
    bg: "primary",
    color: "background",
    borderColor: "primary",
    transform: "scale(1.06)"
  }
};

// --------- DARK MODE TOGGLE ----------
function DarkModeToggle() {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <Button
      aria-label="Toggle dark mode"
      sx={{
        bg: "muted",
        color: "text",
        borderRadius: 999,
        fontSize: 3,
        px: 3,
        py: 2,
        ml: [2, 3],
        border: "none",
        boxShadow: "0 2px 12px #0001",
        cursor: "pointer",
        "&:hover": { bg: "primary", color: "background" }
      }}
      onClick={() => setColorMode(colorMode === "dark" ? "light" : "dark")}
      title="Toggle dark mode"
    >
      {colorMode === "dark" ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}

// --------- FEATURED PROJECT COMPONENT ----------
function FeaturedProject({ project }) {
  return (
    <Box
      as="section"
      sx={{
        py: [6, 7],
        bg: "background",
        color: "text",
        textAlign: "center",
        borderTop: "1px solid #f2f2f5",
        borderBottom: "1px solid #f2f2f5"
      }}
    >
      <Heading as="h2" sx={{
        fontSize: [5, 6],
        fontWeight: 900,
        mb: [3, 4],
        mt: 0,
        letterSpacing: "-0.04em"
      }}>
        Featured Project
      </Heading>
      <Text sx={{
        fontSize: [3, 4],
        mb: [5, 6],
        display: "block",
        fontFamily: "serif"
      }}>
        Check out one of the awesome things built by Hack Clubbers!
      </Text>
      <Flex sx={{
        flexDirection: ["column", "row"],
        alignItems: "center",
        justifyContent: "center",
        gap: [5, 6],
        maxWidth: 1100,
        mx: "auto",
        px: [3, 4],
        py: [2, 3]
      }}>
        <Box sx={{
          width: ["100%", 440],
          height: ["auto", 280],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bg: "#06081c",
          borderRadius: 18,
          boxShadow: "0 8px 48px #0001",
          overflow: "hidden",
          minHeight: [220, 280],
          mb: [4, 0]
        }}>
          <Image
            src={project.image}
            alt={project.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "none"
            }}
          />
        </Box>
        <Box sx={{ textAlign: "left", maxWidth: 500, ml: [0, 4] }}>
          <Heading as="h3" sx={{
            fontSize: [3, 4],
            fontWeight: 700,
            mb: 3,
            color: "text"
          }}>
            {project.title}
          </Heading>
          <Text sx={{ fontSize: [2, 3], mb: 0, lineHeight: 1.6, display: "block" }}>
            {project.description}
          </Text>
          <br />
          <ThemeLink
            href={project.link}
            target="_blank"
            rel="noopener"
            sx={{
              color: "primary",
              fontWeight: "bold",
              textDecoration: "underline",
              fontSize: [2, 3],
              transition: "color 0.2s, border-color 0.2s",
              ":hover": {
                color: "text",
                borderColor: "text"
              }
            }}
          >
            {project.linkLabel}
          </ThemeLink>
        </Box>
      </Flex>
    </Box>
  );
}

// --------- COMMUNITY STATS COMPONENT ----------
function CommunityStats() {
  return (
    <Box
      as="section"
      sx={{
        py: [6, 7],
        bg: "primary",
        color: "background",
        textAlign: "center"
      }}
    >
      <Heading as="h2" sx={{
        fontSize: [4, 5, 6],
        fontWeight: 900,
        mb: [3, 4]
      }}>
        Join Our Vibrant Community
      </Heading>
      <Text sx={{
        fontSize: [2, 3],
        mb: [5, 5, 6],
        display: "block"
      }}>
        Connect with fellow hackers, share your projects, and learn together
      </Text>
      <Grid
        columns={[1, 3, 3]}
        gap={[4, 5]}
        sx={{
          maxWidth: 900,
          mx: "auto",
          alignItems: "center"
        }}
      >
        <Box>
          <Text as="div" sx={{
            fontWeight: 900,
            fontSize: [5, 6],
            lineHeight: 1.1
          }}>
            600<span sx={{ fontSize: [4, 5] }}>+</span>
          </Text>
          <Text sx={{ fontSize: [2, 3], mt: 2, fontWeight: 500 }}>
            Active Clubs
          </Text>
        </Box>
        <Box>
          <Text as="div" sx={{
            fontWeight: 900,
            fontSize: [5, 6],
            lineHeight: 1.1
          }}>
            30,000<span sx={{ fontSize: [4, 5] }}>+</span>
          </Text>
          <Text sx={{ fontSize: [2, 3], mt: 2, fontWeight: 500 }}>
            Members
          </Text>
        </Box>
        <Box>
          <Text as="div" sx={{
            fontWeight: 900,
            fontSize: [5, 6],
            lineHeight: 1.1
          }}>
            10k<span sx={{ fontSize: [4, 5] }}>+</span>
          </Text>
          <Text sx={{ fontSize: [2, 3], mt: 2, fontWeight: 500 }}>
            Projects Created
          </Text>
        </Box>
      </Grid>
    </Box>
  );
}

// --------- FOOTER COMPONENT ----------
function Footer() {
  return (
    <Box
      as="footer"
      sx={{
        bg: "#18181d",
        color: "#fff",
        pt: [5, 6],
        pb: 4,
        mt: 0,
        fontSize: 2
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto", px: [3, 4] }}>
        <Grid columns={[1, 3, 3]} gap={5} sx={{ mb: 4 }}>
          <Box>
            <Heading as="h3" sx={{ fontSize: 3, fontWeight: 700, mb: 3, color: "#fff" }}>
              Hack Club
            </Heading>
            <Text sx={{ color: "#fff", fontSize: 2 }}>
              A nonprofit network of high school coding clubs<br />
              and makers around the world.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" sx={{ fontSize: 3, fontWeight: 700, mb: 3, color: "#fff" }}>
              Links
            </Heading>
            <Box as="ul" sx={{ listStyle: "none", p: 0, m: 0, color: "#b6bac1" }}>
              <li>
                <ThemeLink href="https://jobs.hackclub.com" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>Jobs</ThemeLink>
              </li>
              <li>
                <ThemeLink href="https://hackclub.com/slack" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>Slack</ThemeLink>
              </li>
              <li>
                <ThemeLink href="https://hackclub.com/donate" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>Donate</ThemeLink>
              </li>
              <li>
                <ThemeLink href="https://hcb.hackclub.com/" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>HCB</ThemeLink>
              </li>
            </Box>
          </Box>
          <Box>
            <Heading as="h3" sx={{ fontSize: 3, fontWeight: 700, mb: 3, color: "#fff" }}>
              Connect
            </Heading>
            <Box as="ul" sx={{ listStyle: "none", p: 0, m: 0, color: "#b6bac1" }}>
              <li>
                <ThemeLink href="https://github.com/hackclub" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>GitHub</ThemeLink>
              </li>
              <li>
                <ThemeLink href="https://youtube.com/hackclub" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>Youtube</ThemeLink>
              </li>
              <li>
                <ThemeLink href="https://twitter.com/hackclub" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>Twitter</ThemeLink>
              </li>
              <li>
                <ThemeLink href="https://instagram.com/hackclub" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>Instagram</ThemeLink>
              </li>
              <li>
                <ThemeLink href="https://www.figma.com/@hackclub" target="_blank" rel="noopener" sx={{ color: "#b6bac1", textDecoration: "none", ":hover": { color: "#fff" } }}>Figma</ThemeLink>
              </li>
            </Box>
          </Box>
        </Grid>
        <Box
          sx={{
            borderTop: "1px solid #31313a",
            pt: 3,
            textAlign: "center",
            color: "#b6bac1",
            fontSize: 2
          }}
        >
          © {new Date().getFullYear()} Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
        </Box>
      </Box>
    </Box>
  );
}

// --------- MAIN PAGE ----------
export default function HomePage() {
  const [showHero, setShowHero] = useState(false);

  // Pick a random featured project on each reload
  const randomProject = FEATURED_PROJECTS[Math.floor(Math.random() * FEATURED_PROJECTS.length)];

  return (
    <>
      <Head>
        <title>Hack Club - A Home For High School Hackers</title>
      </Head>

      {/* Navbar */}
      <Box as="nav" sx={{
        bg: "background",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
        position: "fixed",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}>
        <Flex
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: 3,
            height: 80,
            alignItems: "center",
            justifyContent: "space-between"
          }}>
          <ThemeLink as={NextLink} href="/" sx={{ display: "flex", alignItems: "center" }}>
            <img src="https://assets.hackclub.com/icon-rounded.png" alt="Hack Club Logo" style={{ height: 48 }} />
          </ThemeLink>
          <Flex as="ul" sx={{ gap: 4, listStyle: "none", alignItems: "center", m: 0, p: 0 }}>
            {navLinks.map(link => (
              <li key={link.href}>
                <ThemeLink href={link.href} sx={{
                  textDecoration: "none",
                  color: "text",
                  fontWeight: 600,
                  fontSize: 3,
                  "&:hover": { color: "primary" }
                }}>
                  {link.label}
                </ThemeLink>
              </li>
            ))}
            <li>
              <ThemeLink
                href="https://hackclub.com/slack"
                sx={{
                  bg: "primary",
                  color: "background",
                  px: 4,
                  py: 2,
                  borderRadius: 999,
                  fontWeight: "bold",
                  ml: 3,
                  textDecoration: "none",
                  fontSize: 3,
                  transition: "background 0.2s",
                  "&:hover": { bg: "#c72d43" }
                }}>
                Join Slack
              </ThemeLink>
            </li>
            <li>
              <DarkModeToggle />
            </li>
          </Flex>
        </Flex>
      </Box>

      {/* Hero Section with Typing Animation */}
      <Box
        as="section"
        sx={{
          width: "100%",
          minHeight: ["60vh", "70vh", "70vh"],
          pt: [120, 140, 180],
          pb: [5, 6],
          bg: "linear-gradient(120deg, #ec3750 0%, #ff8c37 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "background",
          textAlign: "center",
          position: "relative",
        }}
      >
        {!showHero ? (
          <HackClubTypeAnimation onDone={() => setShowHero(true)} />
        ) : (
          <Box sx={{ width: "100%" }}>
            <Heading
              as="h1"
              sx={{
                fontSize: [5, 7, 8],
                mb: [3, 4],
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "primary",
                textShadow: "0 2px 8px #fff8",
              }}
            >
              Welcome to the world of teenage hackers
            </Heading>
            <Text
              as="p"
              sx={{
                fontSize: [3, 4],
                mb: [4, 5],
                fontWeight: 500,
                color: "text",
                opacity: 0.95
              }}
            >
              Join a worldwide community of high school makers, creators, and developers
            </Text>
            <Flex
              sx={{
                gap: 4,
                justifyContent: "center",
                flexWrap: "wrap",
                mb: 2
              }}
            >
              <Button
                as="a"
                href="https://hackclub.com/slack"
                sx={heroButtonSx}
              >
                Join the Slack
              </Button>
              <Button
                as="a"
                href="https://apply.hackclub.com/"
                sx={heroButtonSx}
              >
                Start a Club
              </Button>
            </Flex>
          </Box>
        )}
      </Box>

      {/* About Section */}
      <Box as="section" id="about" sx={{ py: [5, 6], bg: "muted" }}>
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
          <Heading as="h2" sx={{
            textAlign: "center",
            fontSize: [4, 5],
            mb: 5,
            fontWeight: 900,
            color: "text",
            letterSpacing: "-0.01em",
            textShadow: "0 2px 16px #ff8c3722, 0 1px 2px #ec375033"
          }}>
            For teenagers, by teenagers
          </Heading>
          <Grid
            columns={[1, 2, 3]}
            gap={4}
            className="features-grid"
            sx={{
              boxShadow: "0 8px 32px #ec375008",
              justifyItems: "center"
            }}
          >
            <Box sx={{
              bg: "background",
              p: [3, 4],
              borderRadius: 12,
              boxShadow: "0 8px 32px #ec375022, 0 2px 4px #ff8c3722",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "0 12px 48px #ff8c3755, 0 4px 8px #ec375044",
                transform: "translateY(-4px) scale(1.03)"
              },
              minHeight: 180,
              maxWidth: 320,
              textAlign: "left",
              border: "1.5px solid #f9fafc",
            }}>
              <Heading as="h3" sx={{ fontSize: 3, fontWeight: 700, mb: 2, color: "primary" }}>Start a Club</Heading>
              <Text sx={{ color: "text", fontSize: 2 }}>
                Build a coding club at your high school with support from the Hack Club community.
              </Text>
            </Box>
            <Box sx={{
              bg: "background",
              p: [3, 4],
              borderRadius: 12,
              boxShadow: "0 8px 32px #ec375022, 0 2px 4px #ff8c3722",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "0 12px 48px #ff8c3755, 0 4px 8px #ec375044",
                transform: "translateY(-4px) scale(1.03)"
              },
              minHeight: 180,
              maxWidth: 320,
              textAlign: "left",
              border: "1.5px solid #f9fafc",
            }}>
              <Heading as="h3" sx={{ fontSize: 3, fontWeight: 700, mb: 2, color: "primary" }}>Global Community</Heading>
              <Text sx={{ color: "text", fontSize: 2 }}>
                Join thousands of students worldwide in making, learning, and building together.
              </Text>
            </Box>
            <Box sx={{
              bg: "background",
              p: [3, 4],
              borderRadius: 12,
              boxShadow: "0 8px 32px #ec375022, 0 2px 4px #ff8c3722",
              transition: "box-shadow 0.2s, transform 0.2s",
              "&:hover": {
                boxShadow: "0 12px 48px #ff8c3755, 0 4px 8px #ec375044",
                transform: "translateY(-4px) scale(1.03)"
              },
              minHeight: 180,
              maxWidth: 320,
              textAlign: "left",
              border: "1.5px solid #f9fafc",
            }}>
              <Heading as="h3" sx={{ fontSize: 3, fontWeight: 700, mb: 2, color: "primary" }}>Resources & Workshops</Heading>
              <Text sx={{ color: "text", fontSize: 2 }}>
                Access creative workshops, events, and resources to level up your skills.
              </Text>
            </Box>
          </Grid>
        </Box>
      </Box>

      <FeaturedProject project={randomProject} />

      <CommunityStats />

      <Footer />
    </>
  );
}
