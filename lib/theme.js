import base from '@hackclub/theme'

const theme = base

theme.buttons.primary = {
  fontSize: 3,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  px: 4,
  py: 3,
  letterSpacing: 'headline',
  borderRadius: 'circle',
  backgroundImage: (theme) =>
    `linear-gradient(${theme.colors.orange}, ${theme.colors.red})`,
  boxShadow: 'card',
  WebkitTapHighlightColor: 'transparent',
  transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
  willChange: 'transform',
  ':focus,:hover': {
    boxShadow: 'elevated',
    transform: 'scale(1.0625)'
  }
}

export default theme
