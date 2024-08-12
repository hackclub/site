import React from 'react'
import BinPost from '../../components/bin/GalleryPosts'
import styles from '../../public/bin/style/gallery.module.css'
import Nav from '../../components/bin/nav'
import Footer from '../../components/bin/footer'
import { useState } from 'react';

function Gallery({ posts }) {
  const [allPosts, setAllPosts] = useState(posts);
  const [loading, setLoading] = useState(false);


   return( 
    <section className='page'>
      
        <div className={styles.background}></div>
        <script src="https://awdev.codes/utils/hackclub/orph.js"></script>

        <Nav />
        
        <h1 className={styles.title}>Bin Gallery</h1>
        <p className={styles.sub_title}>A display of all of bin's projects</p>


    <div className={styles.feed}>
        {loading ? ( <div className={styles.loading}>Loading<span className={styles.dots}></span></div>) : (<>{
        allPosts.map(post => {
            {console.log(post)}
            return (            
            <BinPost 
              key={post.ID}
              id={post.ID}
              title={post.Title}
              desc={post["What will you be building?"]}
              slack={post["Slack Handle"]}
              link={post["Wokwi Share link"]}
              image="https://www.google.com"
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