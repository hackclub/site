import React from 'react'
import { Box, Card, Heading, Text } from 'theme-ui'
import styles from './cohort-card.module.css'


const CohortCard = ({ id, title, desc, slack, scrapbook, playable, images, githubProf }) => {
  return (
    <>
    <link href='www.google.com'/>
      <div className={styles.card}>
        <img src={images ? (images[0].url) : ("https://via.placeholder.com/150")} alt="Project Image" className={styles.card_img}/>
        <h1 className={styles.card_title}>{title}</h1>
        <p className={styles.card_description}>{desc}</p>
      
      </div>
      
    </>
    
    
  )
}

export default CohortCard