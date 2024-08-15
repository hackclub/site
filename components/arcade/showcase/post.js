import React from 'react'
import styles from './post.module.css'
import { useRef } from 'react';


const Post = ({ id, title, desc, slack, scrapbook, playable, images, githubProf}) => {
    const cardRef = useRef(null);
    var backgroundImage = `url(https://via.placeholder.com/300x300)`;

    const handleMouseMove = (e) => {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
  
      const centerX = rect.width / 3;
      const centerY = rect.height / 3;
  
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;
  
      const rotateX = percentY * -2 // Rotate between -15deg to 15deg
      const rotateY = percentX * 2; // Rotate between -15deg to 15deg
  
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
  
    const handleMouseLeave = () => {
      const card = cardRef.current;
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    if (images){

        if (images.length !== 0) {
            backgroundImage = `url(${images[0].url})`;
        }   
    }
   
    

  return (
    <div 
        alt={id} 
        className={styles.gallery_card}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ backgroundImage }}
        >
      <h1 className={styles.card_title}>
        {title}<br/>
      </h1>
      <div className={styles.overlay}>
        <p className={styles.description}>{desc}</p>
      </div>
    </div>
  )
}

export default Post