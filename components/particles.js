import Particles from 'react-tsparticles'
import React from 'react'

const Particle = React.memo(function Particle() {
  const particlesInit = main => {
    console.log(main)
  }

  const particlesLoaded = container => {
    console.log(container)
  }
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: true,
              mode: 'repulse'
            },
            resize: true
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40
            },
            push: {
              quantity: 2
            },
            repulse: {
              distance: 100,
              duration: 0.5
            }
          }
        },
        particles: {
          color: {
            value: '#CDAEFB',
            opacity: 0.4
          },
          links: {
            color: '#82A9F9',
            distance: 200,
            enable: true,
            opacity: 0.3,
            width: 1
          },
          collisions: {
            enable: false
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 2,
            straight: false
          },
          number: {
            density: {
              enable: true,
              area: 500
            },
            value: 80
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            random: true,
            value: 2
          }
        },
        detectRetina: true
      }}
    />
  )
})

export default Particle
