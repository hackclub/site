import { Image, useColorMode } from 'theme-ui'

const Signatures = ({ fileName, width }) => {
  // enforce a sane color mode (typescript should do this in the future)
  let [colorMode] = useColorMode()
  colorMode = colorMode === 'dark' ? 'light' : 'dark'
  return (
    <Image
      src={`/signatures/${fileName}-${colorMode}.png`.toLowerCase()}
      width={width || 96}
      alt={`${fileName}'s signature`}
      sx={{ '+ p': { mt: 0 } }}
    />
  )
}

export default Signatures
