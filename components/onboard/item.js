import {Box, Divider, Flex, Heading, Image, Paragraph} from "theme-ui";

function trim(str) {
    return str.substring(1, str.length - 1)
}

const Item = ({ title, author_name, author_slack, image }) => {
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
                <Image
                    src={image}
                    alt={title}
                    sx={{
                        width: '100%',
                        borderRadius: 8
                    }}
                />
                <Heading
                    as="h2"
                    sx={{
                        textAlign: 'center',
                        mt: 3
                    }}
                >
                    {title}
                </Heading>
                <Paragraph
                    sx={{
                        textAlign: 'center',
                        mt: 2,
                        wordBreak: 'break-word'
                    }}
                >
                    {`${author_name ? `by ${trim(author_name)}` : ""} ${author_slack ? `(${trim(author_slack)})` : ""}`}
                </Paragraph>
            </Flex>
        </Box>
    )
}

export default Item;