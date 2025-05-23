import { Box, Grid, Text, Link } from 'theme-ui'

const Feature = ({ number, title, description, color }) => (
    <Grid columns="auto 1fr" sx={{
        py: 2,
        px: 2,
        color: 'inherit',
        position: 'relative',
        textDecoration: 'none',
        borderRadius: 'extra'
    }} as="li">
        <Text as="span" color={color} aria-hidden="true">{number}</Text>
        <Text as="p" variant="subtitle">
            <strong sx={{ mb: 1, display: 'block', fontSize: ['22px', 2, 3] }}>{title}</strong>
            {description}
        </Text>
    </Grid>
)

const Features = () => (
    <Grid columns="1fr" sx={{
        gridColumnGap: 3,
        span: {
            width: 36,
            height: 36,
            borderRadius: 24,
            display: 'inline-block',
            fontSize: 2,
            lineHeight: '30px',
            textAlign: 'center',
            fontWeight: 'bold',
            border: '3px solid currentColor'
        },
        p: {
            my: 0,
            fontSize: ['18px', '20px', '22px'],
            color: 'cyberpunk.text'
        }
    }} as="ul">
        <Feature
            number="1"
            color="cyberpunk.electricBlue"
            title="Connect with other teenage coders"
            description={
                <>
                    Have a coding question? Looking for project feedback? You'll find hundreds of fabulous people to talk to in our global{' '}
                    <Link href="/slack" target="_blank" rel="noopener" sx={{ color: 'cyberpunk.electricBlue' }}>Slack</Link>
                    {' '}(like Discord), active at all hours.
                </>
            }
        />
        <Feature
            number="2"
            color="#F002ED"
            title="Build open source learning tools"
            description={
                <>
                    We build large open source projects together (
                    <Link href="https://github.com/hackclub" target="_blank">3k+&nbsp;PRs a year</Link>
                    ) like this website, a game engine, daily streak system, and more!
                </>
            }
        />
        <Feature
            number="3"
            color="#8A2BE2"
            title="Gather IRL with other makers"
            description={
                <>
                    Meet other Hack&nbsp;Clubbers in your community to build together at one of the 400+{' '}
                    <Link href="/clubs" target="_blank" rel="noopener">Hack&nbsp;Clubs</Link>{' '}
                    and{' '}
                    <Link href="/hackathons" target="_blank" rel="noopener">high school hackathons</Link>.
                </>
            }
        />
    </Grid>
)

export default Features 