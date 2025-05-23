/** @jsxImportSource theme-ui */

import { keyframes } from '@emotion/react';

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

const Landing = () => {
  const imagePaths = [
    '/home/juice-hotel.jpg',
    '/home/juice-airport.jpg',
    '/home/flagship_4.jpg',
    '/home/assemble-group.jpg'
  ];

  const animationStyle = {
    animation: `${riseIn} 0.9s ease-out both`,
  };

  return (
    <section
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        px: [3, 4],
        py: [4, 5],
        bg: 'background',
        backgroundImage: 'url(/textures/paper-fiber.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        position: 'relative',
      }}
    >
      <div
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          sx={{
            display: ['flex', 'flex', 'none'],
            width: '100%',
            justifyContent: 'center',
            gap: [2, 3],
            mb: 3,
          }}
        >
          {imagePaths.slice(0, 2).map((src, i) => (
            <div
              key={i}
              sx={{
                ...animationStyle,
                bg: 'white',
                p: [2, 3],
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transform: i === 0 ? 'rotate(-6deg)' : 'rotate(6deg)',
                border: '2px dashed #eee',
                position: 'relative',
                '--initial-rotate': i === 0 ? '-6deg' : '6deg',
              }}
            >
              <img
                src="/icons/pin.svg"
                alt="pin"
                sx={{
                  position: 'absolute',
                  top: '-12px',
                  left: 'calc(50% - 12px)',
                  width: '24px',
                  height: '24px',
                  zIndex: 2,
                }}
              />
              <img
                src={src}
                alt={`small-${i}`}
                sx={{
                  width: ['90px', '100px'],
                  height: ['90px', '100px'],
                  borderRadius: '8px',
                  objectFit: 'cover',
                  mx: 'auto',
                  display: 'block',
                }}
              />
              <div sx={{ mt: 2, fontSize: 1, textAlign: 'center' }}>Place</div>
            </div>
          ))}
        </div>
        <div
          sx={{
            width: ['100%', '80%', '600px'],
            height: ['280px', '340px', '450px'],
            borderRadius: 10,
            mb: [3, 0],
            bg: 'muted',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            border: '2px dashed #eee',
            position: 'relative',
            ...animationStyle,
            '--initial-rotate': '0deg',
          }}
        >
          <img
            src="/icons/pin.svg"
            alt="pin"
            sx={{
              position: 'absolute',
              top: '-12px',
              left: 'calc(50% - 12px)',
              width: '24px',
              height: '24px',
              zIndex: 2,
            }}
          />
          <img
            src="/home/assemble.jpg"
            alt="Center"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        <div
          sx={{
            display: ['flex', 'flex', 'none'],
            width: '100%',
            justifyContent: 'center',
            gap: [2, 3],
            mt: 3,
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
                transform: i === 0 ? 'rotate(4deg)' : 'rotate(-5deg)',
                border: '2px dashed #eee',
                position: 'relative',
                '--initial-rotate': i === 0 ? '4deg' : '-5deg',
              }}
            >
              <img
                src="/icons/pin.svg"
                alt="pin"
                sx={{
                  position: 'absolute',
                  top: '-12px',
                  left: 'calc(50% - 12px)',
                  width: '24px',
                  height: '24px',
                  zIndex: 2,
                }}
              />
              <img
                src={src}
                alt={`small-${i + 2}`}
                sx={{
                  width: ['90px', '100px'],
                  height: ['90px', '100px'],
                  borderRadius: '8px',
                  objectFit: 'cover',
                  mx: 'auto',
                  display: 'block',
                }}
              />
              <div sx={{ mt: 2, fontSize: 1, textAlign: 'center' }}>Place</div>
            </div>
          ))}
        </div>
        <div
          sx={{
            display: ['none', 'none', 'block'],
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {[
            { src: imagePaths[0], top: '-30px', left: '-30px', rotate: '-10deg' },
            { src: imagePaths[1], top: '30px', right: '-10px', rotate: '6deg' },
            { src: imagePaths[2], bottom: '30px', left: '60px', rotate: '5deg' },
            { src: imagePaths[3], bottom: '-20px', right: '80px', rotate: '-8deg' },
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
              }}
            >
              <div
                sx={{
                  bg: 'white',
                  p: 3,
                  borderRadius: '12px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  border: '2px dashed #eee',
                  position: 'relative',
                }}
              >
                <img
                  src="/icons/pin.svg"
                  alt="pin"
                  sx={{
                    position: 'absolute',
                    top: '-12px',
                    left: 'calc(50% - 12px)',
                    width: '24px',
                    height: '24px',
                    zIndex: 2,
                  }}
                />
                <img
                  src={img.src}
                  alt={`img-${i}`}
                  sx={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    mx: 'auto',
                    display: 'block',
                  }}
                />
                <div sx={{ mt: 2, fontSize: 1, textAlign: 'center' }}>
                  {i === 0 || i === 1 ? 'Juice, Shanghai' : i === 2 ? 'Assemble, SF' : 'Figma HQ, SF'}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          sx={{
            mt: [4, 5],
            fontSize: [4, 5, 6],
            fontWeight: 'bold',
            textAlign: 'center',
            maxWidth: '800px',
            color: 'text',
            zIndex: 1,
            textShadow: '1px 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          Smiling Faces and Open Minds are our Soul :D
        </div>
      </div>
    </section>
  );
};

export default Landing;
