import React from 'react'
import BinPost from '../../components/bin/GalleryPosts'
import styles from '../../public/bin/style/gallery.module.css'
import Nav from '../../components/bin/nav'
import Footer from '../../components/bin/footer'
import { useEffect, useRef, useState } from 'react';
import { resolve } from 'styled-jsx/css';
import { set } from 'lodash';

export async function getStaticProps() {
  const res = await fetch(`/api/bin/gallery/posts/`);
  const posts = await res.json();
  
  const filteredPosts = posts.filter(post => post.status === 'Accepted');
  return {
    props: { posts: filteredPosts },
  };
}


function Gallery({ posts = [] }) {
  
  return (
    <section className='page'>

      <div className={styles.background}></div>
      <script src="https://awdev.codes/utils/hackclub/orph.js"></script>

      <Nav />

      <h1 className={styles.title}>Bin Gallery</h1>
      <p className={styles.sub_title}>A display of all of bin's projects</p>


      <div className={styles.feed}>

          {posts.map(post => {
            return (
              <BinPost
                key={post.ID}
                id={post.ID}
                title={post.title}
                desc={post.desc}
                slack={post.slack}
                link={post.link}
                date={post.created}
              />)

          })}
        
      </div>
      <Footer />
    </section>
  )
}



export default Gallery
