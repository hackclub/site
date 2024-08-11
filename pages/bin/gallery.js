import React from 'react'
import BinPost from '../../components/bin/galleryview'
import styles from '../../public/bin/style/gallery.module.css'
import Nav from '../../components/bin/nav'
import { useEffect, useRef } from 'react';
import { resolve } from 'styled-jsx/css';



function Gallery() {
    var data = [];
    async function fetchPosts() {
        try {
          const response = await fetch('http://hackclub.com/api/bin/gallery/posts/');
    
          if (!response.ok) {
            throw new Error('Network response was not ok. Status: ' + response.ok);
          }
      
        data = await response.json();
        console.log(data);
        return data;
        } catch (error) {
          throw error;
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
        
        {data.forEach(post => {
                  <BinPost
                  title={post.First}
                  desc="sdasd"
                  slack="@CAN"
                  link="https://www.google.com"
                  image="https://www.google.com"
                  />
    })}
        



        

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />
    </div>
      
    </section>
   )
}

export default Gallery