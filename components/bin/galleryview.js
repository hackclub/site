import React from 'react'
import styles from '../../public/bin/style/gallery.module.css'


const BinPost = ({title = "Bin Post", desc = "Bin Project", slack = '', link, images = []}) => {


  const handleClick = () => {
    window.open("www.example.com", '_blank', 'noopener,noreferrer');
  };





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