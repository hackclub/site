import CardModel from './card-model'
import { Badge, Box, Flex, Grid, Image, Text } from 'theme-ui'
import Icon from '../../icon'
import Buttons from './button'
import { useEffect } from 'react'
import useSWR from 'swr'
import featuredProject from '../../../lib/featured-project.json'

/** @jsxImportSource theme-ui */

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ProjectOfTheWeek() {
    const { data, mutate } = useSWR('/api/featured-project-views', fetcher)

    useEffect(() => {
        fetch('/api/featured-project-views', { method: 'POST' }).then(() => {
            mutate()
        })
    }, [mutate])

    return (
        <CardModel
            color="white"
            sx={{
                background: theme => theme.util.gx('red', 'orange'),
                borderRadius: '24px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                mb: 5,
                maxWidth: 'layout',
                width: '90vw',
                mx: 'auto',
                transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.0625)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)'
                }
            }}
            highlight="white"
            visible={true}
        >
            <Grid
                columns={[1, 2]}
                sx={{ position: 'relative', alignItems: 'center', zIndex: 2 }}
            >
                <Box sx={{ textAlign: ['left', 'left', 'left'], position: 'relative' }}>
                    <Text
                        as="h3"
                        sx={{
                            color: 'white',
                            fontSize: ['28px', '34px', '42px'],
                            fontWeight: 800,
                            mb: 3,
                            lineHeight: 1,
                            textAlign: 'left',
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        Project of the week: {featuredProject.name}!
                    </Text>

                    <Text
                        as="p"
                        sx={{
                            color: 'rgba(255,255,255,0.9)',
                            fontSize: [1, '16px', '20px'],
                            lineHeight: 1.5,
                            mb: 3,
                            display: 'block',
                            textAlign: 'left'
                        }}
                    >
                        {featuredProject.description} Built by {featuredProject.author}, {featuredProject.age}!
                    </Text>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                        <Buttons
                            id="check-it-out"
                            link={featuredProject.url}
                            primary="white"
                            color="red"
                            icon="external"
                        >
                            CHECK IT OUT
                        </Buttons>
                        <Buttons
                            id="view-more-projects"
                            link="https://scrapbook.hackclub.com/"
                            icon="view"
                            primary="transparent"
                            sx={{
                                border: '1px solid rgba(255,255,255,0.5)',
                                color: 'white'
                            }}
                        >
                            View more projects
                        </Buttons>
                    </Box>
                </Box>

                <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            display: 'block'
                        }}
                    >
                        <Image
                            alt={`Screenshot of ${featuredProject.name}`}
                            src={featuredProject.image}
                            sx={{
                                width: '100%',
                                objectFit: 'cover',
                                borderRadius: '12px',
                                aspectRatio: '16/9'
                            }}
                        />
                        <Box
                            sx={{
                                color: 'red',
                                backgroundColor: 'white',
                                position: 'absolute',
                                bottom: '16px',
                                right: '16px',
                                padding: '6px 12px',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                zIndex: 5
                            }}
                        >
                            <Icon glyph="view" size={24} />
                            <Text sx={{ ml: 1, fontWeight: 'bold' }}>
                                {data ? data.views : '...'} views
                            </Text>
                        </Box>
                    </Box>
                </Flex>
            </Grid>
        </CardModel>
    )
}