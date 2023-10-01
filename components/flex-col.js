import { Flex } from 'theme-ui'

export default function FlexCol({ children, ...props }) {
  return <Flex sx={{ flexDirection: 'column', ...props }}>{children}</Flex>
}
