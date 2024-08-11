import React from 'react'
import styles from '../../public/bin/style/gallery.module.css'
import { useEffect } from 'react';


const BinPost = ({title = "Bin Post", desc = "Bin Project", slack = '', link, images = []}) => {

  const handleClick = () => {
    window.open("www.example.com", '_blank', 'noopener,noreferrer');
  };

  async function fetchPosts() {
    const response = await fetch('https://hackclub.com/api/bin/gallery/posts/');
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }
    data = await response.json();

    return data
  }


  useEffect(() => { 1
    const handleLoad = async (e) => {
      console.log('Page has loaded');

      const fetchedParts = await fetchPosts()
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);



return (
    <div className={styles.gallery_card} 
      onClick={handleClick}>
      <h1 className={styles.card_title}>
        {title}<br/>
      </h1>
      <p className={styles.card_desc}>{desc}</p>
      <p>{slack}</p>

    </div>
  )
}

export default BinPost;