import { Box, Container, Heading, Card, Text, Grid, BaseStyles } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '/components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import NotFoundPage from '../404'
import Content from '../../components/ content'

export default function page({ html, title, fourOhFour }) {
  if (fourOhFour) {
    return (
      <>
        <NotFoundPage />
      </>
    )
  } else {
    return (
      <>
        <Meta
          as={Head}
          title="Jobs"
          description="Hack Club is looking to hire please find our job listings below."
        />
        <ForceTheme theme="light" />
        <Nav />
        <Box
          as="section"
          sx={{
            pt: [5, 6],
            pb: [4, 5],
            backgroundImage: theme => theme.util.gx('purple', 'red')
          }}
        >
          <Container sx={{ textAlign: 'center', color: 'white' }}>
            <Heading as="h1" variant="title" mb={30} sx={{ fontSize: [5, 5] }}>
              {title}
            </Heading>
            
          </Container>
        </Box>
        <Container
          as={BaseStyles}
          variant="copy"
          sx={{
            pt: [3, 4],
            pb: [4, 5],
            fontSize: [2, 3]
          }}
        >
          <Content html={html} />
        </Container>
        <Footer key="footer" />
      </>
    )
  }
}

export async function getStaticPaths() {
  const { GraphQLClient, gql } = require('graphql-request')
  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB}`
    }
  })
  const slugsQuery = gql`
    query RepoFiles($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        object(expression: "HEAD:directory") {
          ... on Tree {
            entries {
              name
              type
            }
          }
        }
      }
    }
  `
  let slugs = (
    await client.request(slugsQuery, {
      owner: 'hackclub',
      name: 'jobs'
    })
  ).repository.object.entries
    .map(x => ({
      params: {
        job: x.name.replace('.md', '')
      }
    }))
    .filter(path => !['img', 'lib', 'README'].includes(path.params.job))
  console.log(slugs)
  return {
    paths: slugs,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const markdownToHtml = require('@hackclub/markdown')
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/hackclub/jobs/main/directory/${params.job}.md`
    )
    const md = await res.text()
    const splitMd = md.split('\n');
    let title = "";
    for(let x = 0; x < splitMd.length; x++){
        if(splitMd[x].includes("# ") & !splitMd[x].includes("##")){
            title = splitMd[x].replace("# ", "")
        }
    }
    if (md == '404: Not Found') {
      return { props: { fourOhFour: true } }
    }
    const html = await markdownToHtml(md, `${params.job}.md`, '', true)
    return { props: { html, title } }
  } catch {
    return { props: { fourOhFour: true } }
  }
}
