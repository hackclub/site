import React from 'react'
import BinPost from '../../components/bin/galleryview'
import styles from '../../public/bin/style/gallery.module.css'
import Nav from '../../components/bin/nav'
import { useEffect, useRef } from 'react';
import { resolve } from 'styled-jsx/css';



function Gallery() {
    var data = ""; 

    console.log("working");
    async function fetchPosts() {
        try {
          const response = await fetch('http://hackclub.com/api/bin/wokwi/parts/');
          console.log(response);
      
          if (!response.ok) {
            throw new Error('Network response was not ok. Status: ' + response.ok);
          }
      
          data = await response.json();
          console.log(data);
      
          return data;
        } catch (error) {
          console.error('Error fetching posts:', error);
          throw error;
        }
      }
    
      useEffect(() => {
          console.log('Page has loaded');
    
          const posts = fetchPosts()
          console.log(posts);
    
    
      }, []);
    
    

   return( 
    <section className='page'>
        <div className={styles.background}></div>
        <script src="https://awdev.codes/utils/hackclub/orph.js"></script>

        <Nav />
        
        <h1 className={styles.title}>Bin Gallery</h1>
        <p className={styles.sub_title}>A display of all of bin's projects</p>


    <div className={styles.feed}>
        <BinPost 
            title="Raspberry Pi Pico"
            desc="This is a Raspberry Pi Pico based Temperature and Humidity display that uses a combination of a motion sensor, photo resistor and IR remote/receiver to add some helpful The motion sensor turns on the display when it detects movement, but the photo resistor makes sure it stays off during the night unless you use the IR remote to turn it on in the dark. This way, it won't disrupt your sleep or work at night with accidental triggers of the motion sensor!"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        
        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

<BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        
        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

        <BinPost 
            title="title"
            desc="lore ipsum"
            slack="@CAN"
            link="https://www.google.com"
            image="https://www.google.com"
        />

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