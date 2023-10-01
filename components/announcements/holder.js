import { Container, BaseStyles } from 'theme-ui'

export default function AnnouncementHolder({ children }) {
  return (
    <Container
      as={BaseStyles}
      variant="copy"
      sx={{
        py: [4, 5],
        fontSize: [2, 3],
        h1: {
          textAlign: ['left', 'center'],
          color: 'cyan',
          my: 4,
          a: { color: 'inherit' }
        }
      }}
    >
      {children}
    </Container>
  )
}
