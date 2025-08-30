import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav'
import Image from 'next/image'
import Icon from '@hackclub/icons'
import { Box, Text } from 'theme-ui'
import Link from 'next/link'

//Desktop Mode
function DesktopMode({ billboardBottom }) {
  return (
    <>
      {/* First Section */}
      <Section bg="/sharkbank/firstSectionBG.png" minHeight="1100px">
        <Image
          src="/sharkbank/bgBuildingsFirstSection.png"
          layout="fill"
          objectFit="cover"
          alt="Buildings"
          priority
          style={{
            zIndex: '20',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
            overflow: 'hidden'
          }}
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
              src="/sharkbank/BILLBOARD_1.PNG"
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
                sx={{ marginTop: '-354px', fontSize: '60px', color: 'white' }}
              >
                Welcome to SharkBank!
              </Text>
              <Text
                as="p"
                sx={{
                  fontSize: '30px',
                  maxWidth: '850px',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                The Sharks (aka HCB) are ready to invest in YOUR nonprofit. Proposals are officially open to try and earn a spot 
                pitching your nonprofit mission to our panel of judges. Win up to $1000 in funds to propel your mission forward.
              </Text>
            </div>
          </div>
        </Box>
      </Section>

      {/* Second Section */}
      <Section bg="/sharkbank/secondSectionBG.png" minHeight="1100px">
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c32a26f584d572c67c00fbe2701c70afa7111261_red_desktop.png"
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/51b2111a5b362b93ddd2ffc677591105b01914a4_BANNER_2.png"
            alt="Banner-2"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
      </Section>

      {/* Third Section */}
      <Section bg="/sharkbank/thirdSectionBG.png" minHeight="1100px">
        {/* Text  */}
        <Box
          as={'div'}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: '200',
            bottom: '200px'
          }}
        >
          <Text
            as={'span'}
            sx={{
              fontSize: '30px',
              position: 'absolute',
              zIndex: '20',
              maxWidth: '750px',
              textAlign: 'center',
              transform: 'perspective(800px) rotateX(17deg)',
              transformStyle: 'preserve-3d',
              color: 'white'
            }}
          >
            <span style={{ display: 'block', transform: 'scaleX(1.0)', transformOrigin: 'top center' }}>
              HCB is hosting its first ever competition, SharkBank!  Win up to $1000 in funding to propel your mission out to sea!
            </span>
            <span style={{ display: 'block', transform: 'scaleX(1.1)', transformOrigin: 'top center' }}>
              Get ready for an exciting opportunity to pitch your organization’s 
              mission to a panel of HCB teen judges.
            </span>
            <span style={{ display: 'block', transform: 'scaleX(1.2)', transformOrigin: 'top center' }}>
              Win up to $1000 in funding to propel your mission out to sea!
            </span>
          </Text>
        </Box>
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
                src="/sharkbank/shark1.PNG"
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
                src="/sharkbank/SIGN.PNG"
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
              <Link href="https://forms.hackclub.com/sharkbank" passHref>
                <button
                  style={{
                    height: '65px',
                    width: '220px',
                    position: 'absolute',
                    bottom: '-326px',
                    left: '180px',
                    zIndex: 2,
                    rotate: '-5deg',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Phantom Sans',
                    fontWeight: 500,
                    fontSize: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '200',
                    background: 'transparent',
                  }}
                >
                  <img
                    src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/a0d39c115cee39b28bb47feada3728e543c4e3cc_sign-up-button.PNG"
                    alt="Button background"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Scale image to fill the button
                      position: 'absolute', // Position the image to fill the button
                      top: '0',
                      left: '0',
                      zIndex: '-1', // Place the image behind the text
                      borderRadius: '50px', // Apply the same border-radius as the button
                    }}
                  />
                  SIGN UP <Icon glyph="enter" size={35} />
                </button>
              </Link>
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
            src="/sharkbank/shark2.PNG"
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
      <Section bg="/sharkbank/row-1-column-1-tab.png" minHeight="950px">
        <Box
          as="div"
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-400px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ position: 'relative', minWidth: '780px' }}>
            <Image
              src="/sharkbank/billboardMobile.PNG"
              alt="Billboard"
              width={1200}
              height={2600}
              style={{ transform: 'scale(1.9)' }}
              objectFit="contain"
              priority
            />
            <div
              style={{
                position: 'absolute',
                top: '150px',
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
                  marginTop: '-290px',
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
                  maxWidth: isSmallScreen ? '400px' : '500px',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                The Sharks (aka HCB) are ready to invest in YOUR nonprofit. Proposals are officially open to try and earn a spot 
                pitching your nonprofit mission to our panel of judges. Win up to $1000 in funds to propel your mission forward.
              </Text>
            </div>
          </div>
        </Box>
      </Section>

      <Section bg="/sharkbank/row-2-column-1-tab.png" minHeight="1561px">
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/899512573085f07df33d298375e45ac1fd66c6b5_red_mobile.png"
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6b4aa76d177f19a351b222c9114eba5745df67a3_banner-1-mobile.png"
            alt="Banner-1"
            width="275px"
            height="800px"
            objectFit="contain"
            priority
          />
        </Box>
      </Section>

      <Section bg="/sharkbank/row-3-column-1-tab.png" minHeight="1560px">
        {/* Text  */}
        <Box
          as={'div'}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: '200',
            top: '-350px'
          }}
        >
          <Text
            as={'span'}
            sx={{
              fontSize: '25px',
              position: 'absolute',
              zIndex: '20',
              maxWidth: '600px',
              textAlign: 'center',
              transform: 'perspective(800px) rotateX(17deg)',
              transformStyle: 'preserve-3d',
              color: 'white'
            }}
          >
            <span style={{ display: 'block', transform: 'scaleX(1.0)', transformOrigin: 'top center' }}>
              HCB is hosting its first ever competition, SharkBank!  Win up to $1000 in funding to propel your mission out to sea!
            </span>
            <span style={{ display: 'block', transform: 'scaleX(1.1)', transformOrigin: 'top center' }}>
              Get ready for an exciting opportunity to pitch your organization’s 
              mission to a panel of HCB teen judges.
            </span>
            <span style={{ display: 'block', transform: 'scaleX(1.2)', transformOrigin: 'top center' }}>
              Win up to $1000 in funding to propel your mission out to sea!
            </span>
          </Text>
        </Box>
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
                src="/sharkbank/shark1.PNG"
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
                src="/sharkbank/SIGN.PNG"
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
              <Link href="https://forms.hackclub.com/sharkbank">
                <button
                  style={{
                    height: '65px',
                    width: '220px',
                    position: 'absolute',
                    bottom: '-326px',
                    left: '180px',
                    zIndex: 2,
                    rotate: '-5deg',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'Phantom Sans',
                    fontWeight: 500,
                    fontSize: '25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '200',
                    background: 'transparent',
                    border: 'none'
                  }}
                >
                  <img
                    src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/a0d39c115cee39b28bb47feada3728e543c4e3cc_sign-up-button.PNG"
                    alt="Button background"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Scale image to fill the button
                      position: 'absolute', // Position the image to fill the button
                      top: '0',
                      left: '0',
                      zIndex: '-1', // Place the image behind the text
                      borderRadius: '50px', // Apply the same border-radius as the button
                    }}
                  />
                  SIGN UP <Icon glyph="enter" size={35} />
                </button>
              </Link>
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
            src="/sharkbank/shark2.PNG"
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
      <Section bg="/sharkbank/row-1-column-1.png" minHeight="950px">
        <Box
          as="div"
          style={{
            position: 'absolute',
            left: 0,
            bottom: '220px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{ position: 'relative', minWidth: '500px', top: '200px' }}
          >
            <Image
              src="/sharkbank/billboardMobile.PNG"
              alt="Billboard"
              width={1200}
              height={2600}
              style={{ transform: 'scale(1.8)' }}
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
                  marginTop: '0px',
                  fontSize: '25px',
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
                The Sharks (aka HCB) are ready to invest in YOUR nonprofit. Proposals are officially open to try and earn a spot 
                pitching your nonprofit mission to our panel of judges. Win up to $1000 in funds to propel your mission forward.
              </Text>
            </div>
          </div>
        </Box>
      </Section>
      <Section bg="/sharkbank/row-2-column-1.png" minHeight="950px">
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/899512573085f07df33d298375e45ac1fd66c6b5_red_mobile.png"
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
            right: '-24%',
            bottom: '-25px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6b4aa76d177f19a351b222c9114eba5745df67a3_banner-1-mobile.png"
            alt="Banner-2"
            width={imgWidth}
            height={imgHeight}
            objectFit="contain"
            priority
          />
        </Box>
      </Section>
      <Section bg="/sharkbank/row-3-column-1.png" minHeight="950px">
        {/* Text  */}
        <Box
          as={'div'}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: '200',
            top: '-300px'
          }}
        >
          <Text
            as={'span'}
            sx={{
              fontSize: '20px',
              position: 'absolute',
              zIndex: '20',
              maxWidth: '300px',
              textAlign: 'center',
              transform: 'perspective(800px) rotateX(17deg)',
              transformStyle: 'preserve-3d',
              color: 'white'
            }}
          >
            <span style={{ display: 'block', transform: 'scaleX(0.9)', transformOrigin: 'top center' }}>
              HCB is hosting its first ever competition, SharkBank!  Win up to $1000 in funding to propel your mission out to sea!
            </span>
            <span style={{ display: 'block', transform: 'scaleX(1.0)', transformOrigin: 'top center' }}>
              Get ready for an exciting opportunity to pitch your organization’s 
              mission to a panel of HCB teen judges.
            </span>
            <span style={{ display: 'block', transform: 'scaleX(1.1)', transformOrigin: 'top center' }}>
              Win up to $1000 in funding to propel your mission out to sea!
            </span>
          </Text>
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '100px',
            right: '-70px',
            display: 'flex',
            justifyContent: 'center',
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
                top: '250px',
                left: '75px',
                position: 'absolute',
                zIndex: 2
              }}
            >
              <Image
                src="/sharkbank/shark1.PNG"
                alt="Shark"
                width="175px"
                height="500px"
                objectFit="contain"
                priority
              />
            </div>
            <div
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                left: '10px',
                top: '200px'
              }}
            >
              <Image
                src="/sharkbank/SIGN.PNG"
                alt="Sign"
                width="220px"
                height="400px"
                objectFit="contain"
                priority
              />
              <Text
                as="span"
                sx={{
                  position: 'absolute',
                  top: '145px',
                  left: '32px',
                  fontSize: '30px',
                  color: '#E8E5C8'
                }}
              >
                Sign up now!
              </Text>
              <Link href="https://forms.hackclub.com/sharkbank">
                <button
                  style={{
                    height: '65px',
                    width: '170px',
                    position: 'absolute',
                    bottom: '-55px',
                    left: '135px',
                    zIndex: 2,
                    rotate: '-5deg',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontFamily: 'Phantom Sans',
                    fontWeight: 500,
                    fontSize: '22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '200',
                    background: 'transparent',
                    border: 'none'
                  }}
                >
                  <img
                    src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/a0d39c115cee39b28bb47feada3728e543c4e3cc_sign-up-button.PNG"
                    alt="Button background"
                    style={{
                      width: '100%',
                      height: '75%',
                      objectFit: 'cover', // Scale image to fill the button
                      position: 'absolute', // Position the image to fill the button
                      top: '6px',
                      left: '0',
                      zIndex: '-1', // Place the image behind the text
                      borderRadius: '50px', // Apply the same border-radius as the button
                    }}
                  />
                  SIGN UP <Icon glyph="enter" size={35} />
                </button>
              </Link>
            </div>
          </div>
        </Box>
        <Box
          as="div"
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '-240px',
            right: '80px',
            display: 'flex',
            justifyContent: 'center',
            transform: 'scale(0.7)'
          }}
        >
          <Image
            src="/sharkbank/shark2.PNG"
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
      <Nav color="#bdd8e0ff" dark />

      {isDesktop && <DesktopMode billboardBottom={billboardBottom} />}
      {isTablet && <TabletMode />}
      {isMobile && <MobileMode />}
    </div>
  )
}
