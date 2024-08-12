import React from 'react'
import BinPost from '../../components/bin/GalleryPosts'
import styles from '../../public/bin/style/gallery.module.css'
import Nav from '../../components/bin/nav'
import Footer from '../../components/bin/footer'
import { useEffect, useRef, useState } from 'react';
import { resolve } from 'styled-jsx/css';
import { set } from 'lodash';

function Gallery() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchPosts = async () => {
        try {
          const response = await fetch('http://hackclub.com/api/bin/gallery/posts/');
    
          if (!response.ok) {
            throw new Error('Network response was not ok. Status: ' + response.ok);
          }
          const data = await response.json()
          console.log(data);
          console.log(data.filter(post => post.Status === 'Accepted'));
          setAllPosts(data.filter(post => post.Status === 'Accepted')); //Filter out rejected or under review as well as hidden posts
          console.log('done' + allPosts);
        } catch (error) {
          throw error;
        } finally {
          // Set loading to false when the async function is done
          setLoading(false);
          console.log('done' + loading);
        }
      }
    
      useEffect(() => {
          console.log('Page has loaded');
          fetchPosts()
      }, []);


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

export default Gallery