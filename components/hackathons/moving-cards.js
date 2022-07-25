import Ticker from 'react-ticker'
import { Avatar, Box, Card, Message, Text } from 'theme-ui'
import Image from 'next/image'

export default function MovingCards() {
  const messageData = [
    {
      message: 'What sorts of prizes do you give out at a hackathon?',
      username: 'ella'
    },
    {
      message: 'how to organize a hackathon???????.',
      username: 'ella'
    },
    {
      message: 'how to get money for your hackathon??!??!?!??!!11!!!!!',
      username: 'scrappy'
    }
  ]
  return (
    <>
      <Ticker>
        {() => (
          <Box as="div" sx={{ display: 'flex' }}>
            {messageData.map(({ id, message, username }) => (
              <MessageCard key={id} message={message} username={username} />
            ))}
          </Box>
        )}
      </Ticker>
    </>
  )
}

function MessageCard({ message, username }) {
  return (
    <Card
      sx={{
        fontSize: 3,
        mx: 2,
        my: 4
      }}
    >
      <Box as="span" sx={{ display: 'flex' }}>
        {/* <Image
          src={`https://scrapbook.hackclub.com/${username}.png`}
          width={32}
          height={32}
          alt={`${username} profile picture`}
        /> */}
        <Avatar
          src={`https://scrapbook.hackclub.com/${username}.png`}
          alt={`${username} profile picture`}
          sx={{
            mr: 2,
            width: 32,
            height: 32
          }}
        />

        <Text>@{username}</Text>
      </Box>
      {message}
    </Card>
  )
}
