import React from 'react'
import BinPost from '../../components/bin/GalleryPosts'
import styles from '../../public/bin/style/gallery.module.css'
import Script from 'next/script'
import Nav from '../../components/bin/nav'
import Footer from '../../components/footer'
import PartTag from '../../components/bin/PartTag';
import { useEffect, useRef, useState } from 'react';
import { resolve } from 'styled-jsx/css';
import { set } from 'lodash';

export async function getStaticProps() {
  const host = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://hackclub.com';
  const res = await fetch(`${host}/api/bin/gallery/posts/`);
  const posts = await res.json();

  const filteredPosts = Array.isArray(posts) ? posts.filter(post => post.status === 'Accepted' && post.parts && !post.hide) : [];

  //Tags

  const resTag = await fetch(`${host}/api/bin/gallery/tags/`);
  const tags = await resTag.json();
  
  const filteredTags = Array.isArray(tags) ? tags.filter(tag => !tag.hide) : [];
  return {
    props: { posts: filteredPosts, 
             tags: filteredTags
    },
  };
}



function Gallery({ posts = [], tags = [] }) {

  const [allPosts, setAllPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);
  const [filterParts, setFilterParts] = useState([]);

  useEffect(() => {
    setAllPosts(posts);
    setFilterParts([]);

  }, []);

  useEffect(() => {
    setFilterPosts(
      allPosts.filter(post =>
        post.parts && filterParts.every(part => post.parts.includes(part))
      )
    );
  }, [filterParts]);

  
  const addFilter = (partID) => {
    setFilterParts((prevParts) => {
      if (!prevParts.includes(partID)) {
        return [...prevParts, partID];
      }
      return prevParts; 
    });

  };
  
  const removeFilter = (partID) => {
    setFilterParts((prevParts) => {
      return prevParts.filter(id => id !== partID);
    });
  };

  return (
    <section className='page'>

      <div className={styles.background}></div>
      <Script src="https://awdev.codes/utils/hackclub/orph.js"></Script>

      

      <div className={styles.header_div}>
        <Nav />
        <h1 className={styles.title}>Bin Gallery</h1>
        <p className={styles.sub_title}>A display of all of bin's projects</p>
      </div>
      <div className={styles.text_container}>      <span className={styles.first}>Want to add to the gallery? </span><span className={styles.second} onClick={() => window.location.href = '/bin'}>Create a bin project in wokwi </span><span className={styles.third}>and your project will be added to the gallery!</span><br/>
      </div>
      <span className={styles.tag_text}>Search By Tag:</span>
      <div className={styles.tag_search_container}>
        
            {tags.map(tag => {
                  return (
                    <PartTag
                      partID={tag.ID} 
                      key={tag.ID}
                      search={true}
                      addFilter={addFilter}
                      removeFilter={removeFilter}
                    />)

                })}

        </div>

      <div className={styles.feed}>
        


          {filterPosts.map(post => {
            return (
              <BinPost
                key={post.ID}
                id={post.ID}
                title={post.title}
                desc={post.desc}
                slack={post.slack}
                link={post.link}
                date={post.created}
                parts={post.parts}
              />)

          })}
        
      </div>
      <Footer />
    </section>
  )
}



export default Gallery