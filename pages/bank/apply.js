import BankApplyForm from '../../components/bank/Form'
import { Box, Container, Card } from 'theme-ui'
import ForceTheme from '../../components/force-theme'

export default function Apply() {
  return (
    <Box sx={{ bg: 'dark', py: 4 }}>
      <ForceTheme theme="dark" />
      <Container variant="copy">
        <Card variant="primary">
          <BankApplyForm />
        </Card>
      </Container>
    </Box>
  )
}
