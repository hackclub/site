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
      <img src={imageTop} alt={name} />
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
