import BankApplyForm from '../../components/bank/Form'
import { Box, Container, Card } from 'theme-ui'
import ForceTheme from '../../components/force-theme'

export default function Apply() {
  return (
    <Box
      sx={{
        backgroundImage:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25) 25%,rgba(0, 0, 0, 0.625) 50%, rgba(0, 0, 0, 0.75) 100%), url("/bank/bg.jpg")',
        py: 4,
        backgroundAttachment: 'fixed'
      }}
    >
      <ForceTheme theme="dark" />
      <Container variant="copy">
        <Card variant="primary">
          <BankApplyForm />
        </Card>
      </Container>
    </Box>
  )
}
