import {
  Box,
  Textarea,
  Link,
  Grid,
  Image,
  Container,
  Button,
  Heading,
  Text,
  Input,
  Checkbox
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Tilt from '../components/tilt'
import Ticker from 'react-ticker'
import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const StevePage = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const [disabledDates, setDisabledDates] = useState([])

  useEffect(() => {
    // Fetch the disabled dates from the API endpoint when the component mounts
    const fetchDisabledDates = async () => {
      try {
        const response = await fetch('/api/steve')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const dateStrings = await response.json()
        const dateObjects = dateStrings.map(dateStr => {
          const date = new Date(
            Date.UTC(
              dateStr.substring(0, 4),
              dateStr.substring(5, 7) - 1,
              dateStr.substring(8, 10)
            )
          )
          date.setDate(date.getDate() + 1) // Add one day to the date
          return date
        })
        setDisabledDates(dateObjects)
      } catch (error) {
        console.error('Failed fetching disabled dates:', error)
      }
    }

    fetchDisabledDates()
  }, [])

  const isDateDisabled = date => {
    return disabledDates.some(
      disabledDate => disabledDate.getTime() === date.getTime()
    )
  }

  const isSelectingDisabledRange = (start, end) => {
    let currDate = new Date(start)
    currDate.setHours(0, 0, 0, 0) // Normalize the time component

    let normalizedEnd = new Date(end)
    normalizedEnd.setHours(0, 0, 0, 0)

    while (currDate <= normalizedEnd) {
      if (isDateDisabled(currDate)) {
        return true
      }
      currDate.setDate(currDate.getDate() + 1)
    }
    return false
  }

  const handleStartDateChange = date => {
    if (!endDate || !isSelectingDisabledRange(date, endDate)) {
      setStartDate(date)
    } else {
      setStartDate(date)
      setEndDate(null) // Reset end date if the new range is invalid
    }
  }

  const handleEndDateChange = date => {
    if (!isSelectingDisabledRange(startDate, date)) {
      setEndDate(date)
    } // Do nothing if the range is invalid
  }
  const images = [
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/e8863609fd72bb9246a072ef895d0ebb53510a0c_110_0703c1939042f53e6d8fbb78e5ac01c46afdf6bf_0image.webp',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/f25af7743a52f437286bc0ad03098f849ced77e7_111_a41bfce2d34a2c24fe0020544d46c1328ac6cc6c_0image.webp',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/a89cf56d856cbe9a43c10670a9d432c0c6a966b6_112_c562c9891d419652fae7dcc256e86a339f924681_0image.webp',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/7693d4932bf63054e6a52b3af6a5463903159bb4_113_14713dffe3c9a094e430bcf831727fde0095de4e_0image.webp',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/960b248fba5189b104c5e9f47b122c45cb6f38b7_114_8780c76c656b0b06efd4d0a40b1001e29946e60d_0image.webp',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/9140892938abc7fcdc85514f20eaeb46ec50237a_115_7e6782ca3ab24ba30ad129317f60fa931a2f373a_0mountains.webp'
  ]
  const [selectedImage, setSelectedImages] = useState(0)

  return (
    <>
      <Meta
        as={Head}
        title="A Home For You At Hack Club HQ"
        description="We now have a free place for you to stay near Hack Club HQ! It's called Steve!"
        image="https://hc-cdn.hel1.your-objectstorage.com/s/v3/e8863609fd72bb9246a072ef895d0ebb53510a0c_110_0703c1939042f53e6d8fbb78e5ac01c46afdf6bf_0image.webp"
      />
      <ForceTheme theme="light" />
      <Box
        sx={{
          background:
            'linear-gradient(0deg, rgba(15, 33, 79, 0.00) 0%, rgba(15, 33, 79, 0.00) 100%), linear-gradient(180deg, #0F214F 0%, #8B412E 100%)',
          imageRendering: 'pixelated'
        }}
      >
        <Nav sx={{ backgroundColor: '#0F214F' }} />

        <Heading
          sx={{
            marginTop: 0,
            paddingTop: 96,
            color: '#fff',
            fontSize: 96,
            textAlign: 'center',
            lineHeight: 1
          }}
        >
          Imagine a{' '}
          <Text sx={{ color: '#F8E32E', fontFamily: 'billy' }}>home</Text> for
          <br /> you to hack with friends
        </Heading>
        <Image
          alt="Pixel art of Steve"
          sx={{ width: '100%', marginTop: 48, imageRendering: 'pixelated' }}
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/b61e538bcedba0c43e65d77791c2367cfb7d5779_116_952784713f5ef9dc6806fba8175f065d164ccdf4_0topheroart.webp"
        />
      </Box>
      <Box sx={{ backgroundColor: '#8B412E' }}>
        <Container sx={{ paddingBottom: 32 }}>
          <Heading
            sx={{
              color: '#FFF',
              fontFamily: 'Billy',
              fontSize: 72,
              fontStyle: 'normal',
              fontWeight: 700,
              paddingTop: 32,
              paddingBottom: 32,
              lineHeight: '100%', // 76px
              textShadow:
                '6px 6px 0px #000, 6px -6px 0px #000, -6px 6px 0px #000, -6px -6px 0px #000'
            }}
          >
            Welcome To <Text style={{ color: '#F8E32E' }}>Steve</Text>
          </Heading>

          <Grid
            columns={[1, '1fr 1fr 1fr']} // Three columns in a row for smaller screens and larger screens
            gap={'32px'} // Adjust the gap between items as needed
          >
            <Box
              sx={{
                backgroundColor: 'black',
                color: 'white',
                aspectRatio: 1, // Ensure a square aspect ratio
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                imageRendering: 'pixelated',
                gap: '32px',
                justifyContent: 'center',
                background:
                  'url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/cc729ea3e43fa692135b6edf5940c92709dd868d_0pixelbox.png)',
                backgroundSize: 'cover',
                padding: 3 // Adjust padding as needed
              }}
            >
              <Image
                alt="Free"
                style={{
                  width: '104px',
                  height: '104px',
                  imageRendering: 'pixelated'
                }}
                src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/ce5a438fa025132757092903d34e5c5a74a39955_118_1d91fd6959106c22ab01f565b78987f8aa9c5406_0nomoney.webp"
              />
              <Text
                sx={{
                  color: '#fff',
                  fontFamily: 'billy',
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: 1.25
                }}
              >
                Stay At Steve
                <br /> For Free
              </Text>
            </Box>
            <Box
              sx={{
                backgroundColor: 'black',
                color: 'white',
                aspectRatio: 1, // Ensure a square aspect ratio
                display: 'flex',
                imageRendering: 'pixelated',

                alignItems: 'center',
                flexDirection: 'column',
                gap: '32px',
                justifyContent: 'center',
                background:
                  'url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/cc729ea3e43fa692135b6edf5940c92709dd868d_0pixelbox.png)',
                backgroundSize: 'cover',
                padding: 3 // Adjust padding as needed
              }}
            >
              <Image
                alt="5min walk"
                style={{
                  width: '104px',
                  height: '104px',
                  imageRendering: 'pixelated'
                }}
                src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c2d09e535488d013e76fc1494cb364f224e47f54_119_d92818c8e24a4952e75f83e78153a0d2af36433c_05min_walk.webp"
              />
              <Text
                sx={{
                  color: '#fff',
                  fontFamily: 'billy',
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: 1.25
                }}
              >
                Walk to HQ
                <br /> in 5min
              </Text>
            </Box>

            <Box
              sx={{
                backgroundColor: 'black',
                color: 'white',
                aspectRatio: 1, // Ensure a square aspect ratio
                display: 'flex',
                imageRendering: 'pixelated',

                alignItems: 'center',
                flexDirection: 'column',
                gap: '32px',
                justifyContent: 'center',
                background:
                  'url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/cc729ea3e43fa692135b6edf5940c92709dd868d_0pixelbox.png)',
                backgroundSize: 'cover',
                padding: 3 // Adjust padding as needed
              }}
            >
              <Image
                alt="friends building together"
                style={{
                  width: '104px',
                  height: '104px',
                  imageRendering: 'pixelated'
                }}
                src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/fc63f96d3e601be1e302e675b84f8034896fccdf_120_c8ee4aba6e42a02f29d9999c23b33df2f0eec7b6_0wefriends.webp"
              />
              <Text
                sx={{
                  color: '#fff',
                  fontFamily: 'billy',
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: 1.25
                }}
              >
                Collaborate on
                <br /> HQ Projects IRL
              </Text>
            </Box>
          </Grid>
          <Box
            style={{
              marginTop: 48,
              display: 'flex',
              padding: 24,
              backgroundColor: '#91979C'
            }}
            columns={'3fr 1fr'}
          >
            <Box style={{ padding: '16px', backgroundColor: '#000' }}>
              <Image
                alt="Image of Steve"
                width={'100%'}
                style={{
                  height: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover'
                }}
                src={images[selectedImage]}
              />
            </Box>

            <Box
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '142px',
                padding: '24px 24px 24px 0px',
                backgroundColor: '#000',
                justifyContent: 'space-between',
                display: 'flex'
              }}
            >
              {images.map((image, idx) => (
                <Image
                  key={idx}
                  alt=""
                  style={{
                    display: idx === selectedImage ? 'flex' : 'flex',
                    cursor: 'pointer',
                    aspectRatio: '1',
                    objectFit: 'cover',
                    opacity: idx !== selectedImage ? 0.5 : 1
                  }}
                  onClick={() => setSelectedImages(idx)}
                  width={'96px'}
                  height={'96px'}
                  src={image}
                />
              ))}
            </Box>
          </Box>
          {/* <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/675a2bf80565cb9805f2e4e6c59ee0162b00c248_0untitled__1_.gif" />
      <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c1cbfb6a6c1828f7d5923636c748d4bac453d2f0_0ezgif-4-91825479d0.gif" />
      <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/c7e34be18fad69e6903c1ba4261907c1e25d53f9_13__1_.gif" />
      <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/12c198ea6ccffb3802aab210d2ab7f4c75709248_0ezgif-4-39f9efb85b.gif" />
      <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/faf655fecb541745fde4ba74a3d8c28821b863ad_35__1_.gif" /> */}
        </Container>

        <Image
          alt=""
          sx={{ marginBottom: 0, width: '100vw' }}
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/d2c72ceb3e774e48b222b4acf2e7dc9d88999081_126_bc65a573daa6942092a608f0960d45ed77fc857a_0dirtrow.webp"
        />
        <Box style={{ backgroundColor: '#000', marginTop: -8 }}>
          <Container sx={{ marginTop: 0 }}>
            <Heading
              sx={{
                color: '#F8E32E',
                fontFamily: 'Billy',
                fontSize: 72,
                fontStyle: 'normal',
                fontWeight: 700,
                paddingTop: 32,
                paddingBottom: 32,
                lineHeight: '100%', // 76px
                textShadow:
                  '6px 6px 0px #000, 6px -6px 0px #000, -6px 6px 0px #000, -6px -6px 0px #000'
              }}
            >
              Book Your Stay
            </Heading>
            <Box
              sx={{
                display: 'flex',
                paddingBottom: 96,
                gap: '16px',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box>
                  <Text
                    sx={{ fontFamily: 'billy', fontSize: 24, color: '#fff' }}
                  >
                    Name
                  </Text>
                  <Input
                    placeholder={'Marsha Mellow'}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: 28,
                      padding: 16,
                      lineHeight: 1,
                      borderRadius: 0,
                      marginTop: '4px',
                      border: '4px solid #495057'
                    }}
                  />
                </Box>
                <Box sx={{ marginTop: '16px' }}>
                  <Text
                    sx={{ fontFamily: 'billy', fontSize: 24, color: '#fff' }}
                  >
                    What Do You Plan To Work On?
                  </Text>
                  <Textarea
                    placeholder="I wanna try building a dock for Sprig"
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000',
                      fontSize: 28,
                      marginTop: '4px',
                      padding: 16,
                      lineHeight: 1,
                      borderRadius: 0,
                      border: '4px solid #495057'
                    }}
                    multiline={true} // Set the multiline property to true
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Box
                    sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}
                  >
                    <Text
                      sx={{ fontFamily: 'billy', color: '#fff', fontSize: 18 }}
                    >
                      Start Date
                    </Text>
                    <DatePicker
                      selected={startDate}
                      style={{
                        width: '100%', // Set the width to 100%
                        boxSizing: 'border-box' // Include padding and border in the total width
                      }}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      excludeDates={disabledDates}
                      sx={{
                        width: '100%', // Set the width to 100%
                        boxSizing: 'border-box' // Include padding and border in the total width
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}
                  >
                    <Text
                      sx={{ fontFamily: 'billy', color: '#fff', fontSize: 18 }}
                    >
                      End Date
                    </Text>
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      excludeDates={disabledDates}
                    />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: '100%' }}>
                <Box>
                  <Text
                    sx={{ fontFamily: 'billy', color: '#fff', fontSize: 18 }}
                  >
                    Email
                  </Text>
                  <Input
                    placeholder={'Marsha Mellow'}
                    sx={{
                      backgroundColor: '#fff',
                      color: '#000'
                    }}
                  />
                </Box>
                <Box>
                  <Text
                    sx={{ fontFamily: 'billy', color: '#fff', fontSize: 18 }}
                  >
                    Check All That Apply <br />
                  </Text>
                  <Box sx={{ display: 'flex', gap: '16px' }}>
                    <Box>
                      <Box sx={{ display: 'flex' }}>
                        <Checkbox />
                        <Text sx={{ color: '#fff', marginRight: '0px' }}>
                          Club Leader
                        </Text>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Checkbox />
                        <Text sx={{ color: '#fff', marginRight: '0px' }}>
                          Hackathon Organizer
                        </Text>
                      </Box>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex' }}>
                        <Checkbox />
                        <Text sx={{ color: '#fff', marginRight: '0px' }}>
                          Member Of The Slack
                        </Text>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Checkbox />
                        <Text sx={{ color: '#fff', marginRight: '0px' }}>
                          Project Contributor
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Button type="submit">Submit</Button>
                </Box>
                <Box></Box>
              </Box>
            </Box>

            {/*
      <Box>
        <Text>
          <strong>Frequently Asked Questions</strong>
        </Text>

        <Text>What's Tracy House, Bank, and HQ?</Text>
        <Text>What's the environment like at HQ?</Text>
        <Text>What's are the sleeping arrangements?</Text>
        <Text>How cold is it in the winter?</Text>
        <Text>Where will I get food?</Text>
        <Text>Who can stay at Steve?</Text>
        <Text>How many people can stay at Steve?</Text>
        <Text>How long can I stay at Steve?</Text>
      </Box> */}
            {/* <Box>
        Have additional questions? Send us an email at{' '}
        <Link href="mailto:steve@hackclub.com">steve@hackclub.com</Link>
      </Box> */}
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default StevePage
