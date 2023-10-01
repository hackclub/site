import { Box, Button, Flex, Text } from 'theme-ui'
import Icon from '../../icon'

export default function AlertModal({ formError, setFormError }) {
  if (!formError) return null

  const close = () => setFormError(null)

  return (
    <Box>
      <Box
        onClick={close}
        sx={{
          position: 'fixed',
          inset: 0,
          background: '#000000',
          opacity: 0.5,
          zIndex: 1000
        }}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          background: '#252429',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1001,
          padding: 4,
          borderRadius: 'default'
        }}
      >
        <Text variant="title">Oops!</Text>
        <Text variant="lead">{formError}</Text>
        <Button onClick={close}>Dismiss</Button>
      </Flex>
    </Box>
  )
}
