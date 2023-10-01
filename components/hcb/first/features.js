import { Box, Heading, Link, Text, Container, Card, Image } from 'theme-ui'
import Icon from '../../icon'
import Masonry from 'react-masonry-css'
import NextImage from 'next/image'

import Fade from 'react-reveal/Fade'

export default function Features() {
  return (
    <Box sx={{ py: 5 }}>
      <Box as="a" href="#testimonials">
        <Image
          src="/hcb/meet-teams-using-hcb.svg"
          alt="yeah"
          width={200}
          height={100}
          sx={{
            position: 'absolute',
            right: 2,
            mt: -36,
            display: ['none', 'none', 'none', 'block'],
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
      </Box>
      <Container>
        <Text variant="heading" sx={{ fontSize: 50 }}>
          Everything you'll need.
        </Text>
        <br />
        <br />
        <Text sx={{ color: 'muted', maxWidth: '48', fontSize: 28 }}>
          Organize your team's finances in real time, receive grants, gain
          nonprofit status, & more.
          <br />
          Use features engineered by <i>FIRST</i> alumni to help you run a
          successful team.
        </Text>
        <br />
        <br />
      </Container>

      <Container>
        <Masonry
          breakpointCols={{
            10000: 3,
            640: 2,
            480: 1,
            default: 1
          }}
          className="masonry-posts"
          columnClassName="masonry-posts-column"
        >
          <Module
            icon="bank-account"
            name="Nonprofit status"
            body="Become part of Hack Club's legal entity, getting the benefits of our 501(c)(3) tax status."
          />

          <ModuleDetails>
            <Link
              href="https://hcb.hackclub.com/poseidon-robotics"
              target="_blank"
            >
              <NextImage
                src="/hcb/poseidon-dashboard.png"
                alt="iPad"
                width={500}
                height={300}
              />
            </Link>
          </ModuleDetails>

          <Module
            icon="analytics"
            name="Balance &amp; history"
            body="Keep everyone on your team and beyond up to date with real-time balance and transaction history."
          />

          <Module
            icon="card"
            name="Debit cards"
            body="Issue physical debit cards to all your teammates."
          />

          <Module
            icon="payment"
            name="Grants &amp; donations"
            body="Easily receive and deposit money from grants and donations into your account. You'll also get a customizable online donation form to share with friends and family."
          />

          <Module
            icon="payment-transfer"
            name="Reimbursement flow"
            body="Reimburse teammates for expenses with flexible money transfer options including ACH, PayPal, mailed checks, and more."
          />
          {/* <Fade bottom>
            <Tilt>
              <Card
                as="div"
                sx={{
                  backgroundImage:
                    'url("https://cloud-ehtgzdn7u-hack-club-bot.vercel.app/0card.png")',
                  height: '230px',
                  backgroundSize: 'cover',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.0625)'
                }}
              />
            </Tilt>
          </Fade> */}
          <Module
            icon="support"
            name="Support anytime"
            body="With 24-hour response time on weekdays, we'll never leave you hanging."
          />
          {/* <Tilt>
            <Card
              as="div"
              sx={{
                borderRadius: 0,
                backgroundColor: '#193046',
                boxShadow:
                  '0 0 2px 0 rgb(0 0 0 / 6%), 0 6px 12px 0 rgb(0 0 0 / 25%)',
                '&::before': {
                  position: 'absolute',
                  content: '""',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin: '0.5rem',
                  border: '1px dotted #8492a6'
                }
              }}
            >
              <Flex sx={{ justifyContent: 'end' }}>
                <Text
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    lineHeight: 1
                  }}
                >
                  Date
                </Text>
                <Text sx={{ fontFamily: 'cursive' }}>10-10-2020</Text>
              </Flex>
              <Flex sx={{ width: '100%' }}>
                <Text
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    lineHeight: 1
                  }}
                >
                  Pay to the <br />
                  order of
                </Text>
                <Text
                  as="span"
                  sx={{ fontFamily: 'cursive', textAlign: 'left', ml: 2 }}
                >
                  Hack Club
                </Text>

                <Text
                  sx={{
                    textAlign: 'right',
                    ml: 'auto'
                  }}
                >
                  $
                  <Text
                    as="span"
                    sx={{
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      fontFamily: 'cursive'
                    }}
                  >
                    1000
                  </Text>
                </Text>
              </Flex>
              <Flex sx={{ justifyContent: 'space-between', alignItems: 'end' }}>
                <Text sx={{ fontFamily: 'cursive' }}>One thousand only</Text>
                <Text
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    lineHeight: 1
                  }}
                >
                  Dollars
                </Text>
              </Flex>

              <Flex
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pb: 1
                }}
              >
                <Text
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: '10px',
                    lineHeight: 1
                  }}
                >
                  Memo
                  <Text
                    as="span"
                    sx={{
                      fontFamily: 'cursive',
                      fontSize: '12px',
                      textTransform: 'none'
                    }}
                  >
                    {' '}
                    Grant for Poseidon Robotics
                  </Text>
                </Text>
                <Image
                  src="/signatures/prophet_orpheus-light.png"
                  alt="Prophet Orpheus signature"
                  width={80}
                  height={30}
                />
              </Flex>
              <Flex>
                <Text
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    lineHeight: 1,
                    pt: 1,
                    mb: -3
                  }}
                >
                  ⑆ 00000000000 ⑆ 123456789 ⑆
                </Text>
              </Flex>
            </Card>
          </Tilt> */}
          <Module
            icon="rep"
            name="No start-up costs"
            body="All fees waived on your first $25k until September 1st, 2023. Then, just 7% of revenue (as compared to 10-14% charged by other fiscal sponsors). "
          />
        </Masonry>
      </Container>
      <Container
        variant="narrow"
        sx={{
          pt: 3,
          borderColor: 'muted',
          textAlign: 'center'
        }}
      >
        <Text variant="caption" sx={{ color: 'muted' }}>
          Hack Club does not directly provide banking services. Banking services
          are provided by FDIC-certified financial institutions.
        </Text>
      </Container>

      <style>{`
      .masonry-posts {
        display: flex;
        width: 100%;
        max-width: 100%;
      }

      .masonry-posts-column {
        background-clip: padding-box;
      }

      .post {
        margin-bottom: 16px;
      }

      @media (max-width: 32em) {
        .post:nth-child(8) ~ .post {
          display: none;
        }
      }

      @media (min-width: 32em) {
        .masonry-posts {
          padding-right: 12px;
        }

        .masonry-posts-column {
          padding-left: 12px;
        }

        .post {
          border-radius: 12px;
          margin-bottom: 12px;
        }
      }

      @media (min-width: 64em) {
        .masonry-posts {
          padding-right: 24px;
        }

        .masonry-posts-column {
          padding-left: 24px;
        }

        .post {
          margin-bottom: 24px;
        }
      }

    `}</style>
    </Box>
  )
}

function Module({ icon, name, body, iconColor }) {
  return (
    <Fade bottom>
      <Card
        variant="primary"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: [4, null, 4]
        }}
        className="post"
      >
        <Box
          as="span"
          sx={{
            width: 'fit-content',
            background: iconColor || 'primary',
            borderRadius: 'default',
            lineHeight: 0,
            p: 1,
            mb: 1,
            display: 'inline-block',
            transform: ['scale(0.75)', 'none'],
            transformOrigin: 'bottom left',
            boxShadow:
              'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Icon glyph={icon} size={28} />
        </Box>
        <Box>
          <Heading sx={{ color: 'snow', lineHeight: '1.5' }}>{name}</Heading>
          <Text
            sx={{
              color: 'muted',
              lineHeight: '1.375',
              fontSize: 17
            }}
          >
            {body}
          </Text>
        </Box>
      </Card>
    </Fade>
  )
}

function ModuleDetails({ children }) {
  return (
    <Fade bottom>
      <Box
        sx={{
          bg: 'none',
          color: 'smoke',
          boxShadow: '0 8px 32px rgba(255, 255, 255, 0.0625)',
          borderRadius: 'default',
          p: 0,
          mb: 3
        }}
      >
        {children}
      </Box>
    </Fade>
  )
}

function Document({ name, cost }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Icon
        size={28}
        mr={1}
        glyph="payment"
        sx={{ flexShrink: 0, color: 'green' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text fontSize={2}>{name}</Text>

        {cost && (
          <Text fontSize={1} color="muted" style={{ lineHeight: '1.375' }}>
            {cost}
          </Text>
        )}
      </Box>
    </Box>
  )
}

function Laptop({ href, title, sx }) {
  return (
    <Link href={href} title={title} sx={sx}>
      <Box
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: '16rem',
          backgroundSize: 'auto 115%',
          backgroundImage:
            "url('https://cloud-az94fzpyw-hack-club-bot.vercel.app/1poseidon.png')",
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      ></Box>
    </Link>
  )
}
