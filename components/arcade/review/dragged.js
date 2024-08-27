import { Text } from 'theme-ui'
/** @jsxImportSource theme-ui */

export default function Dragged({ title, img, small, ...props }) {
  return (

      <div sx={{ border: '1px solid #35290F', width: small ? '100%' :'60vw', maxWidth: '350px', cursor: 'pointer', boxShadow: '10px 10px #35290F', backgroundColor: '#FFF7E5', margin: 'auto', mb: 3 }} {...props}>
        <Text
          variant="subtitle"
          sx={{
            backgroundColor: '#FFEEC6',
            py: 2,
            borderBottom: '1px solid #35290F',
            color: '#FF5C02',
            width: '100%', 
            display: 'block',
            mt: 0,
            px: 2,
            fontSize: [2, '18px', '22px']
          }}
          className="slackey"
        >
          {title}
        </Text>
        <img
          src={img}
          sx={{ width: 'calc(100% - 20px)', height: 'auto', m: '10px' }}
        />
      </div>
  )
}
