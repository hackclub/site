import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Box, Flex, Label, Text } from 'theme-ui'
import FlexCol from '../../flex-col'

export default function Field({
  name,
  label,
  description,
  col = true,
  requiredFields,
  children
}) {
  const router = useRouter()
  const isRequired =
    requiredFields[parseInt(router.query.step) - 1].includes(name)

  /* Fill in the field input element with the value from sessionStorage.
    Note: the custom checkbox component does this in its own useEffect hook. */
  useEffect(() => {
    const value = sessionStorage.getItem('bank-signup-' + name)
    if (value) {
      const input = document.getElementById(name)
      if (input) input.value = value
    }
  }, [name])

  return (
    <FlexCol gap={2} width={'100%'}>
      <Flex
        sx={{
          flexDirection: col ? 'column' : 'row',
          alignItems: col ? 'flex-start' : 'center',
          gap: 2
        }}
      >
        <Flex sx={{ alignItems: 'center', gap: 2 }}>
          <Label
            htmlFor={name}
            sx={{
              textTransform: 'capitalize',
              fontSize: 3,
              width: 'fit-content'
            }}
          >
            {label}
          </Label>
          {isRequired && (
            <Box
              sx={{
                backgroundColor: 'muted',
                padding: '4px 6px',
                borderRadius: '999px',
                lineHeight: '1',
                fontSize: 14
              }}
            >
              Required
            </Box>
          )}
        </Flex>
        {children}
      </Flex>
      {description && (
        <Text sx={{ color: 'muted', fontSize: 1 }}>{description}</Text>
      )}
    </FlexCol>
  )
}
