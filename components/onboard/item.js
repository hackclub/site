import { Box, Flex, Heading, Paragraph } from "theme-ui";
import { Link } from "theme-ui";

// const onboardContext = React.createContext({})

const Item = ({ project }) => {
  const { name, imageTop, galleryURL } = project
  // console.log({p: props})
  return (
    <Box
      sx={{
        bg: '#ffffff',
        color: 'black',
        borderRadius: 8,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        p: 4,
        mt: 4,
        position: 'relative'
      }}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <object
          data={imageTop}
          type={'image/svg+xml'}
          style={{
            width: '100%',
            borderRadius: '8px'
          }}
        ></object>
        <Link
          href={galleryURL}
          sx={{
            textDecoration: 'none',
            color: 'black',
            ':hover': {
              color: 'primary'
            }
          }}
        >
          <Heading
            as="h2"
            sx={{
              textAlign: 'center',
              mt: 3
            }}
          >
            {name}
          </Heading>
        </Link>
        <Paragraph
          sx={{
            textAlign: 'center',
            mt: 2,
            wordBreak: 'break-word'
          }}
        >
          {/* {`${author_name ? `by ${trim(author_name)}` : ""} ${author_slack ? `(${trim(author_slack)})` : ""}`} */}
        </Paragraph>
      </Flex>
    </Box>
  )
}

export default Item;
// export { onboardContext };