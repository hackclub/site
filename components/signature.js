import { Image, useColorMode } from 'theme-ui'

const Signature = ({ fname, lname, width }) => {
  // enforce a sane color mode (typescript should do this in the future)
  let [colorMode] = useColorMode()
  colorMode = colorMode === 'dark' ? 'light' : 'dark'
  return (
    <Image
      src={`/signatures/${fname}_${lname}-${colorMode}.png`.toLowerCase()}
      width={width || 96}
      alt={`${fname} ${lname}'s signature`}
      sx={{ '+ p': { mt: 0 } }}
    />
  )
}

export default Signature
