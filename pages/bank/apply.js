import BankApplyForm from '../../components/bank/form'
import { Box, Container, Card } from 'theme-ui'
import ForceTheme from '../../components/force-theme'

export default function Apply() {
  return (
    <Box
      sx={{
        backgroundImage:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25) 25%,rgba(0, 0, 0, 0.625) 50%, rgba(0, 0, 0, 0.75) 100%), url("/bank/bg.webp")',
        py: 4,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* TODO: fix this image here; it's broken */}
      <ForceTheme theme="dark" />
      <Container variant="copy">
        <Card variant="primary">
          <BankApplyForm />
        </Card>
      </Container>
    </Box>
  )
}
