import Sparkles from '../sparkles'

const Amount = ({ amount }) => (
  <Sparkles
    sx={{
      WebkitTextStroke: 'currentColor',
      WebkitTextStrokeWidth: ['2px', '3px'],
      WebkitTextFillColor: 'transparent'
    }}
  >
    {amount}
  </Sparkles>
)

export default Amount
