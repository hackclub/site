/** @jsxImportSource theme-ui */
import Image from 'next/image'
import { Heading, Card } from 'theme-ui'

const Item = ({ project }) => {
  const { name, imageTop, galleryURL } = project
  return (
    <Card
      as="a"
      href={galleryURL}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Image src={imageTop} alt={name} width={400} height={300} style={{ width: '100%', height: 'auto' }} />
      <Heading
        as="h2"
        sx={{
          textAlign: 'center',
          mt: 3
        }}
      >
        {name}
      </Heading>
    </Card>
  )
}

export default Item
