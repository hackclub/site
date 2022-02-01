import Particles from 'react-tsparticles'
import React from 'react'

const Particle = React.memo(function Particle() {
  return (
    <Particles
      id="tsparticles"
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
              distance: 200,
              duration: 2,
              opacity: 0.5,
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
            opacity: 0.2
          },
          links: {
            color: '#82A9F9',
            distance: 200,
            enable: true,
            opacity: 0.2,
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
            speed: 1,
            straight: false
          },
          number: {
            density: {
              enable: true,
              area: 500
            },
            value: 50
          },
          opacity: {
            value: 0.25
          },
          shape: {
            type: 'circle'
          },
          size: {
            random: true,
            value: 1.5
          }
        },
        detectRetina: true
      }}
    />
  )
})

export default Particle
