import CardModel from './card-model'
import { Box, Card, Flex, Grid, Heading, Text } from 'theme-ui'
import Buttons from './button'
import Image from 'next/image'
import Icon from '@hackclub/icons'
/** @jsxImportSource theme-ui */

function BreakdownBox({ icon, text, description, href }) {
  return (
    <Card
      sx={{
        position: 'relative',
        background: 'linear-gradient(145deg, #f6dbba 0%, #e6d4be 100%)',
        borderRadius: 'clamp(6px, 1.5vw, 10px)',
        boxShadow:
          '0 4px 15px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 3px 0 5px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        border: '2px solid rgba(89, 47, 49, 0.3)',
        overflow: 'hidden',
        color: 'black',
        height: '100%',
        cursor: href ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        p: [3, 3, '24px'],
        marginLeft: ['20px', 0, 0],
        marginRight: ['20px', 0, 0]
      }}
    >
      <Flex sx={{ alignItems: 'center', gap: '10px' }}>
        <Icon glyph={icon} size={32} color="#CC676D" />
        <Heading
          sx={{
            fontSize: ['16px', '16px', '24px', '26px']
          }}
          as="h4"
        >
          {text}
        </Heading>
      </Flex>
      <Text
        as="p"
        sx={{
          fontSize: ['14px !important', '16px !important', '18px !important'],
          lineHeight: 1.25,
          mt: [1, 2, 2]
        }}
      >
        {description}
      </Text>
    </Card>
  )
}

export default function Som() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#D1B290'
      }}
      background="/home/som-bg.png"
    >
      <Flex
        sx={{
          flexDirection: ['column', null, 'row'],
          gap: [3, 4, 5],
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'nowrap'
        }}
      >
        <Box
          sx={{
            maxWidth: ['100%', '100%', '50%'],
            margin: ['auto', 'auto', 'initial']
          }}
        >
          <Image src="/home/som.png" width={300} height={180} alt="Summer of making logo" />
          <Box>
            <Buttons
              id="13"
              link="https://summer.hackclub.com/"
              icon="enter"
              primary="#592F31"
              sx={{ color: '#f6dbba' }}
            >
              Start building
            </Buttons>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: ['100%', '100%', '50%'],
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            marginRight: [0, null, '20px']
          }}
        >
          <BreakdownBox
            icon="idea"
            text="Build Projects"
            description="Build websites, games, apps, or any other personal open-source coding projects to showcase your skills."
          />
          <BreakdownBox
            icon="plus-fill"
            text="Get Stuff"
            description="Get awesome prizes like Raspberry Pis, Server hosting credits, 3D printers, and more to fuel your next creation."
          />
        </Box>
      </Flex>
    </CardModel>
  )
}
