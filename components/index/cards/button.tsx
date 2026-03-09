/** @jsxImportSource theme-ui */
import { Box, Button, Text } from 'theme-ui'
import ReactTooltip from '../../react-tooltip'
import Icon from '@hackclub/icons'

type ButtonsProps = {
  children: React.ReactNode
  icon?: string
  customIcon?: React.ReactNode
  id: string
  content?: React.ReactNode
  link?: string
  primary?: boolean | string
  overrideColor?: string
  zIndex?: number
  sx?: any
}

export default function Buttons({
  children,
  icon,
  customIcon,
  id,
  content,
  link,
  primary,
  overrideColor,
  zIndex,
  sx,
  ...props
}: ButtonsProps) {
  const fontWeight = primary ? '700' : '400'

  return (
    <Box
      as="button"
      sx={{ background: 'transparent', border: 'none', color: 'white', zIndex: zIndex ||0, ...sx }}
      py={1}
      tabIndex={-1}
    >
      <Button
        data-place="right"
        data-for={id}
        data-effect="solid"
        data-tip
        sx={{
          background: (typeof primary === 'string' ? primary : undefined) || overrideColor || 'rgb(255, 255, 255, 0.3)',
          borderRadius: '100px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          color: 'inherit',
          px: '3',
          py: primary ? '12px' : 2,
          width: 'fit-content',
          textTransform: 'none',
          fontSize: primary ? ['18px', '20px', '22px'] : [1, '16px', '18px'],
          backdropFilter: 'blur(2px)',
          fontWeight: fontWeight,
          zIndex: 999,
        }}
        as="a"
        href={link || '/'}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {customIcon ? (
          <Box sx={{ marginRight: 2, display: 'flex', alignItems: 'center' }}>
            {customIcon}
          </Box>
        ) : (
          <Icon
            glyph={(icon || 'plus-fill') as any}
            size={24}
            style={{ color: 'inherit', marginRight: 2 }}
          />
        )}
        <Text sx={{ fontFamily: 'Phantom Sans', textAlign: 'left' }}>
          {children}
        </Text>
      </Button>
      <ReactTooltip
        id={id}
        delayShow={150}
        delayHide={100}
        delayUpdate={500}
        clickable={true}
        getContent={() => {
          return null
        }}
        className="custom-tooltip-radius custom-arrow-radius"
        arrowRadius="2"
        tooltipRadius="10"
      >
        {content}
      </ReactTooltip>
    </Box>
  )
}
