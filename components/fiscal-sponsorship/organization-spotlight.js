import Tilt from '../tilt'
import { Card, Heading, Text } from 'theme-ui'
import Image from "next/legacy/image"
import { Balancer } from 'react-wrap-balancer'

export default function OrganizationSpotlight({ organization }) {
  return (
    <Tilt>
      <Card
        as="a"
        href={`https://hcb.hackclub.com/${organization.slug}`}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 128,
          color: 'white',
          cursor: 'pointer',
          textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
          textDecoration: 'none',
          backgroundColor: 'black',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: 'extra',
          overflow: 'hidden',
          position: 'relative',
          p: 3,
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '64px 1fr',
          columnGap: 3,
          rowGap: 2
        }}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.5) 75%), url('${organization.background_image}')`
        }}
      >
        <Image
          src={organization.logo}
          alt={`${organization.name} logo`}
          loading="lazy"
          width={64}
          height={64}
          style={{
            borderRadius: '16px'
          }}
        />
        <div>
          <Heading
            as="h3"
            sx={{
              fontSize: [3, 4],
              m: 0,
              overflowWrap: 'anywhere',
              width: '100%',
              display: 'block'
            }}
          >
            {organization.name}
          </Heading>
          <Text
            variant="caption"
            sx={{
              color: 'white',
              opacity: 0.875
            }}
          >
            {organization.location.readable}
          </Text>
        </div>
        <Text as="p" sx={{ gridColumn: ['span 2', '2'] }}>
          <Balancer>{organization.description}</Balancer>
        </Text>
      </Card>
    </Tilt>
  )
}
