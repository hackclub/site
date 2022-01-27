import BankApplyForm from '../../components/bank/apply/Form'
import Retrowave from '../../components/bank/apply/Retrowave'
import { Box, Container, Card } from 'theme-ui'
import ForceTheme from '../../components/force-theme'

export default function Apply() {
  return (
    <Box sx={{ bg: '#000' }}>
      <ForceTheme theme="dark" />
      <Retrowave>
        <Card sx={{ mx: 'auto', w: '100vw' }}>
          <BankApplyForm />
        </Card>
      </Retrowave>
    </Box>
  )
}
