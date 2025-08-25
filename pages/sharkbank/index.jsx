import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav'
import Image from 'next/image'
import Icon from '@hackclub/icons'
import { Box, Text } from 'theme-ui'

// Desktop images
import firstSectionBG from '../../public/sharkbank/firstSectionBG.png'
import secondSectionBG from '../../public/sharkbank/secondSectionBG.png'
import thirdSectionBG from '../../public/sharkbank/thirdSectionBG.png'
import buildingsFirstSection from '../../public/sharkbank/bgBuildingsFirstSection.png'
import billboard from '../../public/sharkbank/BILLBOARD_1.png'
import banner1 from '../../public/sharkbank/BANNER_1.png'
import banner2 from '../../public/sharkbank/BANNER_2.png'
import shark1 from '../../public/sharkbank/shark1.png'
import shark2 from '../../public/sharkbank/shark2.png'
import sign1 from '../../public/sharkbank/SIGN.png'

// Tablet images
import firstSectionBGTab from '../../public/sharkbank/row-1-column-1-tab.png'
import secondSectionBGTab from '../../public/sharkbank/row-2-column-1-tab.png'
import thirdSectionBGTab from '../../public/sharkbank/row-3-column-1-tab.png'
import banner1Mobile from '../../public/sharkbank/banner-1-mobile.png'
import banner2Mobile from '../../public/sharkbank/banner-2-mobile.png'

// Mobile images
import firstSectionBGMobile from '../../public/sharkbank/row-1-column-1.png'
import secondSectionBGMobile from '../../public/sharkbank/row-2-column-1.png'
import thirdSectionBGMobile from '../../public/sharkbank/row-3-column-1.png'
import billboardMobile from '../../public/sharkbank/billboardMobile.png'

//Desktop Mode
function DesktopMode({ billboardBottom }) {
  return (
    <>
      {/* First Section */}
      <Section bg={firstSectionBG} minHeight="950px">
        <Image
          src={buildingsFirstSection}
          layout="fill"
          objectFit="cover"
          alt="Buildings"
          priority
          style={{ zIndex: '20' }}
        />

        {/* Billboard */}
        <Box
          as="div"
          style={{
            position: 'absolute',
            left: 0,
            bottom: `${billboardBottom}px`,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Image
              src={billboard}
              alt="Billboard"
              width={950}
              height={850}
              objectFit="contain"
              priority
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                textAlign: 'center'
              }}
            >
              <Text
                as="h4"
                sx={{ marginTop: '-354px', fontSize: '70px', color: 'white' }}
              >
                Welcome to SharkBank!
              </Text>
              <Text
                as="p"
                sx={{
                  fontSize: '30px',
                  maxWidth: '700px',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                HCB, the Sharks, are ready to invest, using their own money but
                only to the nonprofits with the most well thought out plan.
              </Text>
            </div>
          </div>
        </Box>
      </Section>

      {/* Second Section */}
      <Section bg={secondSectionBG} minHeight="950px">
        {/* Banners */}
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            left: '-228px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={banner1}
            alt="Banner-1"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '250px',
            right: '-162px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={banner2}
            alt="Banner-2"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
      </Section>

      {/* Third Section */}
      <Section bg={thirdSectionBG} minHeight="950px">
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '-50px',
            right: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '300px',
              width: '300px',
              bottom: '500px'
            }}
          >
            <div
              style={{
                height: '300px',
                width: '300px',
                position: 'absolute',
                zIndex: 2
              }}
            >
              <Image
                src={shark1}
                alt="Shark"
                width="275px"
                height="800px"
                objectFit="contain"
                priority
              />
            </div>
            <div
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                bottom: '150px',
                left: '-77px'
              }}
            >
              <Image
                src={sign1}
                alt="Sign"
                width="275px"
                height="800px"
                objectFit="contain"
                priority
              />
              <Text
                as="span"
                sx={{
                  position: 'absolute',
                  top: '332px',
                  left: '46px',
                  fontSize: '35px',
                  color: '#E8E5C8'
                }}
              >
                Sign up now!
              </Text>
              <button
                style={{
                  height: '50px',
                  width: '220px',
                  position: 'absolute',
                  bottom: '-326px',
                  left: '180px',
                  zIndex: 2,
                  rotate: '-5deg',
                  border: '2px solid black',
                  borderRadius: '50px',
                  background: '#E8E5C8',
                  cursor: 'pointer',
                  fontFamily: 'Phantom Sans',
                  fontWeight: 500,
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                SIGN UP <Icon glyph="enter" size={35} />
              </button>
            </div>
          </div>
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '-210px',
            right: '420px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={shark2}
            alt="Shark"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
      </Section>
    </>
  )
}

// Tablet Mode
function TabletMode() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 815)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Section bg={firstSectionBGTab} minHeight="950px">
        <Box
          as="div"
          style={{
            position: 'absolute',
            left: 0,
            bottom: isSmallScreen ? `-100px` : `-110px`,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'relative' }}>
            <Image
              src={billboard}
              alt="Billboard"
              width={isSmallScreen ? 600 : 800}
              height={isSmallScreen ? 700 : 900}
              objectFit="contain"
              priority
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                textAlign: 'center'
              }}
            >
              <Text
                as="h4"
                sx={{
                  marginTop: isSmallScreen ? '-250px' : '-320px',
                  fontSize: isSmallScreen ? '40px' : '50px',
                  color: 'white'
                }}
              >
                Welcome to SharkBank!
              </Text>
              <Text
                as="p"
                sx={{
                  fontSize: isSmallScreen ? '20px' : '25px',
                  maxWidth: '700px',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                HCB, the Sharks, are ready to invest, using their own money but
                only to the nonprofits with the most well thought out plan.
              </Text>
            </div>
          </div>
        </Box>
      </Section>

      <Section bg={secondSectionBGTab} minHeight="1561px">
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            left: '-145px',
            bottom: '700px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={banner1Mobile}
            alt="Banner-1"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            right: '-100px',
            bottom: '290px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={banner2Mobile}
            alt="Banner-1"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
      </Section>

      <Section bg={thirdSectionBGTab} minHeight="1535px">
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '200px',
            right: '-100px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '300px',
              width: '300px',
              bottom: '500px'
            }}
          >
            <div
              style={{
                height: '300px',
                width: '300px',
                position: 'absolute',
                zIndex: 2
              }}
            >
              <Image
                src={shark1}
                alt="Shark"
                width="275px"
                height="800px"
                objectFit="contain"
                priority
              />
            </div>
            <div
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                bottom: '150px',
                left: '-77px'
              }}
            >
              <Image
                src={sign1}
                alt="Sign"
                width="275px"
                height="800px"
                objectFit="contain"
                priority
              />
              <Text
                as="span"
                sx={{
                  position: 'absolute',
                  top: '332px',
                  left: '46px',
                  fontSize: '35px',
                  color: '#E8E5C8'
                }}
              >
                Sign up now!
              </Text>
              <button
                style={{
                  height: '50px',
                  width: '220px',
                  position: 'absolute',
                  bottom: '-326px',
                  left: '180px',
                  zIndex: 2,
                  rotate: '-5deg',
                  border: '2px solid black',
                  borderRadius: '50px',
                  background: '#E8E5C8',
                  cursor: 'pointer',
                  fontFamily: 'Phantom Sans',
                  fontWeight: 500,
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                SIGN UP <Icon glyph="enter" size={35} />
              </button>
            </div>
          </div>
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '-80px',
            right: '220px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={shark2}
            alt="Shark"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
      </Section>
    </>
  )
}

function MobileMode() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 472)
    checkScreen() // run on mount
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Sizes based on screen width
  const imgWidth = isSmallScreen ? 220 : 275
  const imgHeight = isSmallScreen ? 640 : 800

  return (
    <>
      <Section bg={firstSectionBGMobile} minHeight="950px">
        <Box
          as="div"
          style={{
            position: 'absolute',
            left: 0,
            bottom: '20px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'relative', minWidth: '500px' }}>
            <Image
              src={billboardMobile}
              alt="Billboard"
              width={1200}
              height={1600}
              objectFit="contain"
              priority
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                textAlign: 'center'
              }}
            >
              <Text
                as="h4"
                sx={{
                  marginTop: '-400px',
                  fontSize: '30px',
                  color: 'white'
                }}
              >
                Welcome to SharkBank!
              </Text>
              <Text
                as="p"
                sx={{
                  fontSize: '15px',
                  maxWidth: '300px',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                HCB, the Sharks, are ready to invest, using their own money but
                only to the nonprofits with the most well thought out plan.
              </Text>
            </div>
          </div>
        </Box>
      </Section>
      <Section bg={secondSectionBGMobile} minHeight="950px">
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            left: '-26%',
            bottom: '100px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={banner1Mobile}
            alt="Banner-1"
            width={imgWidth}
            height={imgHeight}
            objectFit="contain"
            priority
          />
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            right: '-26%',
            bottom: '290px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={banner2Mobile}
            alt="Banner-2"
            width={imgWidth}
            height={imgHeight}
            objectFit="contain"
            priority
          />
        </Box>
      </Section>
      <Section bg={thirdSectionBGMobile} minHeight="950px">
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '200px',
            right: '-100px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '300px',
              width: '300px',
              right: '80px',
              bottom: '450px'
            }}
          >
            <div
              style={{
                height: '300px',
                width: '300px',
                position: 'absolute',
                zIndex: 2
              }}
            >
              <Image
                src={shark1}
                alt="Shark"
                width="275px"
                height="800px"
                objectFit="contain"
                priority
              />
            </div>
            <div
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                bottom: '150px',
                left: '-77px'
              }}
            >
              <Image
                src={sign1}
                alt="Sign"
                width="275px"
                height="800px"
                objectFit="contain"
                priority
              />
              <Text
                as="span"
                sx={{
                  position: 'absolute',
                  top: '332px',
                  left: '46px',
                  fontSize: '35px',
                  color: '#E8E5C8'
                }}
              >
                Sign up now!
              </Text>
              <button
                style={{
                  height: '50px',
                  width: '220px',
                  position: 'absolute',
                  bottom: '-326px',
                  left: '180px',
                  zIndex: 2,
                  rotate: '-5deg',
                  border: '2px solid black',
                  borderRadius: '50px',
                  background: '#E8E5C8',
                  cursor: 'pointer',
                  fontFamily: 'Phantom Sans',
                  fontWeight: 500,
                  fontSize: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                SIGN UP <Icon glyph="enter" size={35} />
              </button>
            </div>
          </div>
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '-150px',
            right: '80px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src={shark2}
            alt="Shark"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
      </Section>
    </>
  )
}

// Section Component
function Section({ bg, minHeight, minWidth, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        as="div"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
          minWidth,
          minHeight,
          maxWidth: '1900px',
          backgroundColor: '#000000',
          boxShadow: 'inset 0 0 4rem 1rem rgba(0, 0, 0, 0.5)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Image
          src={bg}
          layout="fill"
          objectFit="cover"
          alt="Section background"
          priority
        />
        {children}
      </Box>
    </div>
  )
}

// Main
export default function SharkBank() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth <= 570
  const isTablet = windowWidth > 570 && windowWidth <= 914
  const isDesktop = windowWidth > 914
  const billboardBottom = windowWidth > 1200 ? -80 : windowWidth > 800 ? 0 : 100

  return (
    <div
      style={{
        background: 'linear-gradient(#344750, #4A7072)',
        userSelect: 'none'
      }}
      className="main-sharkbank-page"
    >
      <Nav color="rgba(240, 240, 240, 1)" dark />

      {isDesktop && <DesktopMode billboardBottom={billboardBottom} />}
      {isTablet && <TabletMode />}
      {isMobile && <MobileMode />}
    </div>
  )
}
