import { Box, Heading, Text } from 'theme-ui'
import Icon from '../icon'

export default function Features() {
  return (
    <>
      <Box>
        <Heading variant="title">
          A full-stack toolkit for organizing anything.
        </Heading>
        <Text
          variant="lead"
          fontSize={[3, 4]}
          sx={{ color: 'muted', maxWidth: '48', marginX: '0' }}
        >
          Invoice sponsors, issue debit cards to your team, and view history.
          <br />
          Ongoing support so you can focus on organizing, not the paperwork.
        </Text>
      </Box>
      <Box>
        <Module
          icon="bank-account"
          name="Bank account"
          body="Backed by Silicon Valley Bank with a custom, beautiful dashboard."
        />
      </Box>
    </>
  )
}

function Module({ icon, name, body }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'start' }}>
      <Icon
        size={48}
        mr={3}
        glyph={icon}
        color="primary"
        style={{ flexShrink: 0 }}
      />
      <Box>
        <Heading sx={{ color: 'snow' }}>{name}</Heading>
        <Text sx={{ color: 'muted', lineHeight: '1.375' }} children={body} />
      </Box>
    </Box>
  )
}

function ModuleDetails({ children }) {
  return (
    <Box
      sx={{
        bg: '#252429',
        color: 'smoke',
        mt: 2,
        ml: 3,
        py: 3,
        px: 2,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.0625)'
      }}
    >
      {children}
    </Box>
  )
}

function Document({ name, cost }) {
  return (
    <Box>
      <Icon
        size={28}
        mr={1}
        glyph="payment"
        color="success"
        style={{ flexShrink: 0 }}
      />
      <Box>
        <Text fontSize={2} children={name} />
        {cost && (
          <Text
            fontSize={1}
            color="muted"
            style={{ lineHeight: '1.375' }}
            children={cost}
          />
        )}
      </Box>
    </Box>
  )
}
