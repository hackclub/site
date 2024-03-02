import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Flex, Label, Text } from 'theme-ui'

export default function Field({
  name,
  label,
  description,
  col = true,
  requiredFields,
  children
}) {
  const router = useRouter()
  const isRequired = requiredFields.includes(name)

  /* Fill in the field input element with the value from sessionStorage.
    Note: the custom checkbox component does this in its own useEffect hook. */
  useEffect(() => {
    const value =
      router.query[name] || sessionStorage.getItem('bank-signup-' + name)
    if (value) {
      const input = document.getElementById(name)
      if (input) input.value = value
    }
  }, [router.query, name])

  return (
    <Flex
      aria-required={isRequired}
      sx={{
        flexDirection: col ? 'column' : 'row',
        alignItems: col ? 'flex-start' : 'center',
        gap: 1,
        width: '100%',
        // Wrapper around Select
        '> div': {
          width: '100%'
        },
        'input, select, textarea': {
          border: '1px solid',
          borderColor: 'smoke',
          outlineColor: 'blue',
          '&:-webkit-autofill': {
            boxShadow: '0 0 0 100px white inset !important',
            WebkitTextFillColor: 'black !important'
          }
        }
      }}
    >
      <Label
        htmlFor={name}
        sx={{
          fontSize: 2,
          flexDirection: 'row'
        }}
      >
        {label}
        {isRequired && (
          <Text
            as="span"
            sx={{
              color: 'red',
              fontWeight: 'bold',
              ml: 1
            }}
            title="Required"
          >
            *
          </Text>
        )}
      </Label>
      {children}
      {description && (
        <Text as="p" variant="caption">
          {description}
        </Text>
      )}
    </Flex>
  )
}
