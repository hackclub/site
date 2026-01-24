import { Box, Button, Text } from 'theme-ui'

const PaginationButtons = ({ currentPage, itemCount, perPage }) => {
  const showPreviousPage = currentPage > 1
  const showNextPage = itemCount > currentPage * perPage

  return (
    <Box
      sx={{
        mt: 5,
        textAlign: 'center'
      }}
    >
      {showPreviousPage && (
        <Button
          as="a"
          href={`/onboard/gallery/${parseInt(currentPage) - 1}`}
          sx={{
            bg: 'black',
            color: 'white',
            ':hover': {
              bg: 'white',
              color: 'black'
            }
          }}
        >
          {'<'}
        </Button>
      )}
      <Text
        as="span"
        sx={{
          mx: 3,
          color: 'black'
        }}
      >
        {currentPage}
      </Text>
      {showNextPage && (
        <Button
          as="a"
          href={`/onboard/gallery/${parseInt(currentPage) + 1}`}
          sx={{
            bg: 'black',
            color: 'white',
            ':hover': {
              bg: 'white',
              color: 'black'
            }
          }}
        >
          {'>'}
        </Button>
      )}
    </Box>
  )
}

export default PaginationButtons
