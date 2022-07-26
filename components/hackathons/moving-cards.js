import Ticker from 'react-ticker'
import { Avatar, Box, Card, Link, Message, Text, Image } from 'theme-ui'
// import Image from 'next/image'

export default function MovingCards() {
  const messageData = [
    {
      message:
        "my team is trying to decide where to get the best/cheapest shirts. i've heard good things abt scalablepress, custom ink, gildan, bella x canvas, printful, etc but i'm wondering where did yall get ur swag from? also, approx how much would be the cost for 400 ppl?",
      username: 'elizabethq'
    },
    {
      message:
        'Speaking of how much time is needed, how reasonable is it to plan a virtual hackathon in 2 months?',
      username: 'googol'
    },
    {
      message: 'how to get money for your hackathon??!??!?!??!!11!!!!!',
      username: 'scrappy'
    },
    {
      message:
        'hey yall :wave: :smile: i\'m wondering abt the logistics and overall shipping costs for tshirts and swag to 300+ students in my area (some ppl across the country, and others in canada). what would be the best way to tackle this? (any "special" methods, package types, or any advice at all)',
      username: 'elizabethq'
    },
    {
      message:
        'can anyone suggest any sources for good stock hackathon photos?',
      username: 'charalampos'
    },
    {
      message:
        "Hey I'm looking forward  to hosting a hackathon but one question I have is about sponsors, if we get sponsored a physical item would we have to ship it out to the winner? or would the comapny do it aswell",
      username: 'scrappy'
    },
    {
      message:
        "I was looking at HackPenn's website and saw that they got breakfast down to a 1.60 for each participant, is there anyone on the team that can help me with how they did that",
      username: 'Jaden'
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
        my: 4,
        minWidth: '350px',
        height: 'fit-content',
        display: 'flex',
        alignItems: 'top'
      }}
    >
      <Box
        sx={{
          width: '50px',
          height: '50px',
          borderRadius: '5px',
          overflow: 'hidden',
          mr: 2
        }}
      >
        <Image
          src={`https://scrapbook.hackclub.com/${username}.png`}
          alt={`${username} profile picture`}
        />
      </Box>
      <Box
        as="span"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px'
        }}
      >
        <Link
          href={`https://scrapbook.hackclub.com/${username}`}
          sx={{ textDecoration: 'none' }}
        >
          <Text
            as="span"
            sx={{
              fontWeight: 'bold',
              textDecoration: 'none',
              color: 'black',
              fontSize: 2,
              pt: 0,
              mt: -2
            }}
          >
            {username}
          </Text>
        </Link>
        <Text as="p" sx={{ fontSize: 2 }}>
          {message}
        </Text>
      </Box>
    </Card>
  )
}
