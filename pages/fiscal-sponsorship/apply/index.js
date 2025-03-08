import { Box, Flex, Grid, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Link from 'next/link'
import Icon from '@hackclub/icons'
import Meta from '@hackclub/meta'
import ForceTheme from '../../../components/force-theme'
import HCBInfo from '../../../components/fiscal-sponsorship/apply/hcb-info'
import Watermark from '../../../components/fiscal-sponsorship/apply/watermark'
import ContactBanner from '../../../components/fiscal-sponsorship/contact'
import ApplicationForm from '../../../components/fiscal-sponsorship/apply/application-form'
import { MultiStepProvider } from '../../../components/fiscal-sponsorship/apply/multi-step-context'

export default function Apply() {
  return (
    <>
      <Meta as={Head} title="Apply for HCB" />
      <ForceTheme theme="light" />

      <MultiStepProvider>
        <Grid
          columns={[null, null, 2]}
          sx={{
            gap: 0,
            width: '100%',
            minHeight: '100vh',
            alignItems: 'start'
          }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              px: [3, 5],
              py: 4,
              gap: 4,
              height: [null, null, '100svh'],
              position: [null, null, 'sticky'],
              top: 0,
              overflowY: [null, null, 'auto']
            }}
          >
            {/* vertically align h1 to top of form */}
            <Box as="header" sx={{ mt: [null, 3], mb: 'auto' }}>
              <Link href="/fiscal-sponsorship" passHref legacyBehavior>
                <Text
                  as="a"
                  variant="subheadline"
                  sx={{
                    mb: 3,
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'muted',
                    textDecoration: 'none',
                    ':hover': { color: 'primary' }
                  }}
                >
                  <Icon
                    size={24}
                    glyph="inserter"
                    style={{ transform: 'rotate(180deg)' }}
                  />
                  Back
                </Text>
              </Link>
              <Heading as="h1" variant="headline">
                Turn your ideas into
                <br />
                reality with{' '}
                <Flex
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    verticalAlign: 'middle'
                  }}
                >
                  <img
                    src="/fiscal-sponsorship/hcb-icon-small.png"
                    width={48}
                    height={48}
                    alt="HCB logo"
                    style={{
                      width: '1em',
                      height: '1em',
                      verticalAlign: 'baseline'
                    }}
                  />{' '}
                  HCB
                </Flex>
              </Heading>
            </Box>
            <HCBInfo />
            <ContactBanner
              sx={{ borderRadius: 'default', bg: 'snow', width: 'fit-content' }}
            />
          </Flex>
          <ApplicationForm />
        </Grid>
      </MultiStepProvider>
      <Watermark />
    </>
  )
}
