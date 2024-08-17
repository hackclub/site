import React from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/arcade/Footer'
import BGImg from '../../components/background-image'
import background from '../../public/home/assemble.jpg'
import { Badge, Box, Button, Card, Container, Grid, Heading, Link, Text } from 'theme-ui'
import SlideDown from '../../components/slide-down'
import Post from '../../components/arcade/showcase/post'
import styles from '../../components/arcade/showcase/post.module.css'
import CohortCard from '../../components/arcade/showcase/cohort-card'

export async function getStaticProps() {
    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hackclub.com';
    const res = await fetch(`${host}/api/arcade/gallery`);
    const posts = await res.json();
    
    const filteredPosts = posts;
  
    return {
      props: { posts: filteredPosts, 
      },
    };
  }


const gallery = ({ posts }) => {
    console.log(posts);
  return (
    <section>
        <Nav />
        <BGImg 
            src={background}
            alt="Arcade Gallery BG Img"
            priority
        />


        <SlideDown duration={768}>
        <Heading
          as="h1"
          variant="ultratitle"
          sx={{
            color: 'white',
            textShadow: 'text',
            filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.5))',
            WebkitFilter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.5))',
            maxWidth: [null, 'copyUltra'],
            my: [3, 4],
            mx: 'auto',
            zIndex: 1
          }}
        >
          <Text
            as="span"
            sx={{
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }}
          >
            Arcade Gallery
          </Text>
          <br />
        <Button
          as="a"
          variant="ctaLg"
          href="https://apply.hackclub.com"
          target="_blank"
          rel="noopener"
        >
          Add a Project
        </Button>
        </Heading>
      </SlideDown>

        <div className={styles.feed}>
            <CohortCard/>
            {posts.map(post => {
                return (
                <Post
                    id={post.id}
                    title={post.name}
                    desc={post.desc}
                    slack={post.slack}
                    codeLink={post.codeLink}
                    playable={post.playable}
                    images={post.images}
                    githubProf={""}
                    key={post.id}
                />)

            })}
        </div>      
        <Footer />

    </section>
  )
}

export default gallery