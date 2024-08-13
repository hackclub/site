import React from 'react'
import styles from '../../public/bin/style/gallery.module.css'
import { useEffect, useRef, useState } from 'react';


const BinPost = ({title = "Bin Post", desc = "Bin Project", slack = '', link = '', id, date}) => {

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

  function formatDate(dateString) {
    console.log("date", date)
    const inputDate = new Date(dateString);
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in one day
    
    // Check if the input date is within the last 24 hours
    if (now - inputDate < oneDay) {
      const hours = inputDate.getHours().toString().padStart(2, '0');
      const minutes = inputDate.getMinutes().toString().padStart(2, '0');
      return `Today at ${hours}:${minutes}`;
    } else {
      // Format the date to "Month day, year"
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return inputDate.toLocaleDateString(undefined, options);
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
      <span>{(slack ? (slack.startsWith('@') ? (slack) : (`@${slack}`)) : (""))+ " "}</span> 
      <span className={styles.date}>{formatDate(date)}</span>
      

    </div>
  )
}

export default BinPost;
