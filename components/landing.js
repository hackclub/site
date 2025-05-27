/** @jsxImportSource theme-ui */
import { keyframes } from '@emotion/react';
import { Text, Box, Button, Heading } from 'theme-ui';
import { useState, useEffect } from 'react';
import Comma from './comma';

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95) rotate(var(--initial-rotate, 0deg));
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(var(--initial-rotate, 0deg));
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Landing = () => {
  const [reveal, setReveal] = useState(false);
  const [criticalImagesLoaded, setCriticalImagesLoaded] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  

  const LAYOUT_CONFIG = {
    imageVerticalOffset: {
      mobile: '80px',     
      tablet: '100px',   
      laptop: '120px',   
      laptop15: '-50px',   
      desktop: '140px',  
    },

    containerMaxWidth: {
      mobile: '100%',
      tablet: '600px', 
      laptop: '900px',   
      laptop15: '900px',   
      desktop: '1200px'  
    },

    mainImageHeight: {
      mobile: '220px',
      tablet: '270px',
      laptop: '360px',    
      laptop15: '220px',   
      desktop: '400px'   
    },

    contentMaxWidth: {
      mobile: '100%',
      tablet: '500px',
      laptop: '800px',     
      laptop15: '600px',  
      desktop: '900px'     
    },

    typography: {
      subtitle: {
        mobile: '12px',
        tablet: '16px',
        laptop: '24px',      
        laptop15: '18px',   
        desktop: '28px'      
      },
      heading: {
        mobile: '36px',
        tablet: '40px',
        laptop: '48px',      
        laptop15: '38px',    
        desktop: '52px'      
      }
    },

    floatingImageSize: {
      laptop: '140px',     
      laptop15: '110px',   
      desktop: '140px'   
    }
  };
  
  const slackData = {
    total_members_count: 69235
  };
  
  const imagePaths = [
    '/home/juice-hotel.jpg',
    '/home/juice-airport.jpg',
    '/home/flagship-4.jpg',
    '/home/assemble-group.jpg'
  ];

  const locations = [
    'Juice, Shanghai',
    'Juice, Shanghai', 
    'Assemble, SF',
    'Figma HQ, SF'
  ];

  useEffect(() => {
    const criticalImages = [
      '/home/outernet-110.jpg', 
      '/home/assemble.jpg'      
    ];

    const criticalPromises = criticalImages.map((src, index) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        if (index === 0) {
          img.fetchPriority = 'high';
          img.loading = 'eager';
        }
        
        img.onload = () => {
          if (src.includes('assemble.jpg')) {
            setBackgroundLoaded(true);
          }
          resolve(src);
        };
        img.onerror = () => {
          console.warn(`Failed to load critical image: ${src}`);
          if (src.includes('assemble.jpg')) {
            setBackgroundLoaded(true);
          }
          resolve(src); 
        };
        img.src = src;
      });
    });

    Promise.all(criticalPromises)
      .then(() => {
        setCriticalImagesLoaded(true);
        
        const secondaryPromises = imagePaths.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.fetchPriority = 'low';
            img.loading = 'lazy';
            img.onload = () => resolve(src);
            img.onerror = () => {
              console.warn(`Failed to load secondary image: ${src}`);
              resolve(src); 
            };
            img.src = src;
          });
        });

        return Promise.all(secondaryPromises);
      })
      .then(() => {
        setAllImagesLoaded(true);
      })
      .catch(err => {
        console.warn('Image loading error:', err);
        setCriticalImagesLoaded(true);
        setAllImagesLoaded(true);
      });
  }, []);

  useEffect(() => {
    const preloadLinks = [
      '/home/outernet-110.jpg',
      '/home/assemble.jpg'
    ].map(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      return link;
    });

    preloadLinks.forEach(link => {
      document.head.appendChild(link);
    });

    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  const animationStyle = {
    animation: `${riseIn} 0.9s ease-out both`,
  };

  return (
    <section
      sx={{
        width: '100%',

        minHeight: [
          `calc(100vh - ${LAYOUT_CONFIG.imageVerticalOffset.mobile})`,   
          `calc(100vh - ${LAYOUT_CONFIG.imageVerticalOffset.tablet})`,   
          `calc(100vh - ${LAYOUT_CONFIG.imageVerticalOffset.laptop})`,   
          `calc(100vh - ${LAYOUT_CONFIG.imageVerticalOffset.laptop15})`, 
          `calc(100vh - ${LAYOUT_CONFIG.imageVerticalOffset.desktop})`   
        ],
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        bg: '#1a1a1a',
        backgroundImage: backgroundLoaded ? 'url(/home/assemble.jpg)' : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        pt: [2, 3, 3], 
        pb: [3, 4, 4],
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 1,
          opacity: backgroundLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        },
        
        '& > *': {
          zIndex: 2,
        }
      }}
    >

      {!criticalImagesLoaded && (
        <div
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '18px',
            zIndex: 3,
          }}
        >
          Loading...
        </div>
      )}

      <div
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: [
            LAYOUT_CONFIG.containerMaxWidth.mobile,
            LAYOUT_CONFIG.containerMaxWidth.tablet,
            LAYOUT_CONFIG.containerMaxWidth.laptop,   
            LAYOUT_CONFIG.containerMaxWidth.laptop15, 
            LAYOUT_CONFIG.containerMaxWidth.desktop
          ],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          opacity: criticalImagesLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >

        <div
          sx={{
            width: '100%',
            maxWidth: [
              '100%', 
              '500px', 
              '700px', 
              LAYOUT_CONFIG.contentMaxWidth.laptop15, 
              LAYOUT_CONFIG.contentMaxWidth.desktop 
            ],
            textAlign: 'center',
            mb: 3, 
            px: [2, 3, 4],
          }}
        >

          <div
            sx={{
              width: '100%',
              height: [
                LAYOUT_CONFIG.mainImageHeight.mobile, 
                LAYOUT_CONFIG.mainImageHeight.tablet, 
                LAYOUT_CONFIG.mainImageHeight.laptop, 
                LAYOUT_CONFIG.mainImageHeight.laptop15,
                LAYOUT_CONFIG.mainImageHeight.desktop
              ],
              borderRadius: '16px',
              mb: [4, 4, 4, 2, 4],
              bg: '#f0f0f0',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              ...animationStyle,
              '--initial-rotate': '0deg',
              position: 'relative',
              transform: 'translateZ(0)', 
              backfaceVisibility: 'hidden',
              perspective: '1000px',
            }}
          >
            <img
              src="/home/outernet-110.jpg"
              alt="Hack Club Community"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                transform: [
                  'scale(1.4) translateZ(0)',
                  'scale(1.4) translateZ(0)',
                  'scale(1.4) translateZ(0)',
                  'scale(1.5) translateZ(0)',
                  'scale(1.4) translateZ(0)'
                ],
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                imageRendering: 'optimizeQuality',
                transition: 'none',
              }}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
            />
          </div>

          <Box sx={{ width: '100%' }}>
            <Text
              sx={{
                color: '#e0e6ed',
                fontSize: [
                  LAYOUT_CONFIG.typography.subtitle.mobile,
                  LAYOUT_CONFIG.typography.subtitle.tablet, 
                  LAYOUT_CONFIG.typography.subtitle.laptop, 
                  LAYOUT_CONFIG.typography.subtitle.laptop15,
                  LAYOUT_CONFIG.typography.subtitle.desktop
                ],
                fontWeight: '600',
                mb: 3,
                display: 'block',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
              as="h4"
            >
              Welcome to Hack Club
            </Text>
            
            <Heading>
              <Text
                as="h1"
                sx={{
                  color: 'white',
                  mb: 3, 
                  fontSize: [
                    LAYOUT_CONFIG.typography.heading.mobile,
                    LAYOUT_CONFIG.typography.heading.tablet, 
                    LAYOUT_CONFIG.typography.heading.laptop, 
                    LAYOUT_CONFIG.typography.heading.laptop15, 
                    LAYOUT_CONFIG.typography.heading.desktop
                  ],
                  lineHeight: 1.2,
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                We are <Comma>{slackData.total_members_count}</Comma>{' '}
                <Text
                  sx={{
                    color: 'transparent',
                    ml: 2,
                    mr: 3,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Text
                    onClick={() => {
                      !reveal ? setReveal(true) : setReveal(false)
                    }}
                    sx={{
                      px: 2,
                      backgroundColor: 'red',
                      position: 'absolute',
                      borderRadius: 10,
                      transform: 'rotate(-3deg) translateY(-5px)',
                      color: 'white',
                      whiteSpace: 'nowrap',
                      textDecoration: 'none',
                      willChange: 'transform',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                    aria-hidden="true"
                  >
                    teen hackers
                  </Text>
                  teen hackers
                </Text>
                <br />
                from around the world who code together
              </Text>
              
              <div sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                gap: [2, 2, 2, 2, 3],
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3 
              }}>
                <Button
                  variant="ctaLg"
                  as="a"
                  mt={[3, 0, 0]}
                  mr={3}
                  sx={{ 
                    transformOrigin: 'center left',
                    fontSize: ['14px', '16px', '16px', '20px', '24px'],
                    px: [2, 3, 3, 3, 3],
                    py: [2, 3, 3, 3, 3]
                  }}
                >
                  Join Slack
                </Button>
                <Button
                  as="a"
                  href="https://shipwrecked.hack.club/3"
                  sx={{
                    px: [2, 2, 2, 3, 2],
                    py: [2, 3, 3, 3, 3],
                    fontSize: ['16px', '18px', '18px', '20px', '24px'],
                    transformOrigin: 'left',
                    backgroundImage: t => t.util.gx('green', 'blue'),
                    color: 'white',
                    textDecoration: 'none',
                    cursor: 'pointer', 
                    border: 'none',
                  }}
                >
                  Sign Up: Private Island Hackathon
                </Button>
              </div>
            </Heading>
          </Box>                      
        </div>

        <div
          sx={{
            display: ['flex', 'flex', 'flex', 'none', 'none'],
            width: '100%',
            justifyContent: 'center',
            gap: [2, 3],
            mt: 2,
            flexWrap: 'wrap',
            opacity: allImagesLoaded ? 1 : 0.7,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {imagePaths.slice(2, 4).map((src, i) => (
            <div
              key={i}
              sx={{
                ...animationStyle,
                bg: 'white',
                p: [2, 3],
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transform: i === 0 ? 'rotate(2deg)' : 'rotate(-2deg)',
                border: '2px dashed #e0e0e0',
                '--initial-rotate': i === 0 ? '2deg' : '-2deg',
                maxWidth: ['140px', '160px'],
                willChange: 'transform',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={src}
                alt={`Event ${i + 3}`}
                sx={{
                  width: ['100px', '120px'],
                  height: ['100px', '120px'],
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
                loading="lazy"
                fetchPriority="low"
              />
              <div sx={{ 
                mt: 2, 
                fontSize: ['12px', '14px'], 
                textAlign: 'center',
                fontWeight: '600',
                color: '#666'
              }}>
                {locations[i + 2]}
              </div>
            </div>
          ))}
        </div>
      </div>


      <div
        sx={{
          display: ['none', 'none', 'none', 'block', 'block'],
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: allImagesLoaded ? 1 : 0.7,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {[
          { src: imagePaths[0], top: '10%', left: '5%', rotate: '-8deg' },
          { src: imagePaths[1], top: '15%', right: '5%', rotate: '6deg' },
          { src: imagePaths[2], bottom: '15%', left: '8%', rotate: '4deg' },
          { src: imagePaths[3], bottom: '10%', right: '8%', rotate: '-6deg' },
        ].map((img, i) => (
          <div
            key={i}
            sx={{
              position: 'absolute',
              top: img.top,
              bottom: img.bottom,
              left: img.left,
              right: img.right,
              transform: `rotate(${img.rotate})`,
              ...animationStyle,
              '--initial-rotate': img.rotate,
              willChange: 'transform',
            }}
          >
            <div
              sx={{
                bg: 'white',
                p: [2, 3],
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                border: '2px dashed #e0e0e0',
                position: 'relative',
                maxWidth: [
                  LAYOUT_CONFIG.floatingImageSize.laptop15,
                  LAYOUT_CONFIG.floatingImageSize.desktop   
                ],
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                sx={{
                  position: 'absolute',
                  top: '-8px',
                  left: 'calc(50% - 8px)',
                  width: '16px',
                  height: '16px',
                  bg: '#ff4757',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
              <img
                src={img.src}
                alt={`Event ${i + 1}`}
                sx={{
                  width: [
                    `calc(${LAYOUT_CONFIG.floatingImageSize.laptop15} - 20px)`, 
                    `calc(${LAYOUT_CONFIG.floatingImageSize.desktop} - 20px)`   
                  ],
                  height: [
                    `calc(${LAYOUT_CONFIG.floatingImageSize.laptop15} - 20px)`, 
                    `calc(${LAYOUT_CONFIG.floatingImageSize.desktop} - 20px)`   
                  ],
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
                loading="lazy"
                fetchPriority="low"
              />
              <div sx={{ 
                mt: 2, 
                fontSize: ['11px', '13px'], 
                textAlign: 'center',
                fontWeight: '600',
                color: '#666'
              }}>
                {locations[i]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Landing;