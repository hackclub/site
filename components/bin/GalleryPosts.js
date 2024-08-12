import React from 'react'
import styles from '../../public/bin/style/gallery.module.css'
import { useEffect, useRef, useState } from 'react';


const BinPost = ({title = "Bin Post", desc = "Bin Project", slack = '', link = '', images = [], id}) => {

  link = link.trim();
  if (!/^https?:\/\//i.test(link)) {
      link = 'https://' + link;
  }
 const projectID = link.split('/')[4]
 const imgLink = `https://thumbs.wokwi.com/projects/${projectID}/social/bin.png`


  function handleClick() {
    console.log("clicked");
    if (typeof window !== 'undefined'){
      const currentHost = window.location.host;
  
      window.open(link, '_blank');
    }
   }

return (  
    <div alt={id} className={styles.gallery_card} 
      onClick={handleClick}>
      <h1 className={styles.card_title}>
        {title}<br/>
      </h1>
      
      <div className={styles.img_container}>
        <img src={imgLink} alt="Project Image"/>
      </div>
     
      <p className={styles.card_desc}>{desc}</p>
      <p>{slack ? (slack.startsWith('@') ? (slack) : (`@${slack}`)) : ("")}</p>

    </div>
  )
}

export default BinPost;
