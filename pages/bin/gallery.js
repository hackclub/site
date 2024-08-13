import React from 'react'
import BinPost from '../../components/bin/GalleryPosts'
import styles from '../../public/bin/style/gallery.module.css'
import Nav from '../../components/bin/nav'
import Footer from '../../components/bin/footer'
import { useEffect, useRef, useState } from 'react';
import { resolve } from 'styled-jsx/css';
import { set } from 'lodash';

function Gallery({ posts }) {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPosts = async () => {
    try {
      const response = await fetch('http://hackclub.com/api/bin/gallery/posts/');

      if (!response.ok) {
        throw new Error('Network response was not ok. Status: ' + response.ok);
      }
      const data = await response.json()
      setAllPosts(data.filter(post => post.Status === 'Accepted')); //Filter out rejected or under review as well as hidden posts
    } catch (error) {
      throw error;
    } finally {
      // Set loading to false when the async function is done
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts()
  }, []);


  return (
    <section className='page'>

      <div className={styles.background}></div>
      <script src="https://awdev.codes/utils/hackclub/orph.js"></script>

      <Nav />

      <h1 className={styles.title}>Bin Gallery</h1>
      <p className={styles.sub_title}>A display of all of bin's projects</p>


      <div className={styles.feed}>
        {loading ? (<div className={styles.loading}>Loading<span className={styles.dots}></span></div>) : (<>{
          allPosts.map(post => {
            return (
              <BinPost
                key={post.ID}
                id={post.ID}
                title={post.title}
                desc={post.desc}
                slack={post.slack}
                link={post.link}
              />)

          })
        }</>)}
      </div>
      <Footer />
    </section>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://hackclub.com/api/bin/gallery/posts/`)
  const posts = await res.json()
  const filteredPosts = posts.filter(post => post.Status === 'Accepted');
  return {
    props: { posts: filteredPosts }
  }
}

export default Gallery