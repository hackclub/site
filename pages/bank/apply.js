import BankApplyForm from '../../components/bank/apply/Form'
import Retrowave from '../../components/bank/apply/Retrowave'
import { Box, Container, Card } from 'theme-ui'
import ForceTheme from '../../components/force-theme'

export default function Apply() {
  return (
    <Box sx={{ bg: 'dark', py: 4 }}>
      <ForceTheme theme="dark" />
      {/* <Retrowave> */}
      <Container variant="copy">
        <Card variant="primary">
          <BankApplyForm />
        </Card>
      </Container>
      {/* </Retrowave> */}
    </Box>
  )
}
