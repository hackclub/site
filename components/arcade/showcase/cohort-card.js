import React from 'react'
import { Box, Card, Heading, Link, Text } from 'theme-ui'
import styles from './cohort-card.module.css'


const CohortCard = ({project: {
  id,
  title,
  desc,
  codeLink,
  slackLink,
  playLink,
  images,
  githubProf
}}) => {
  return (
    <>
      <div className={styles.card}>
        <img src={images ? (images[0]) : ("https://via.placeholder.com/150")} alt="Project Image" className={styles.card_img}/>
        <h1 className={styles.card_title}>{title}</h1>
        <p className={styles.card_description}>{desc}</p>
        <Link target="_blank" href={codeLink}>Code</Link>{' '}
        <Link target="_blank" href={slackLink}>Slack</Link>{' '}
        <Link target="_blank" href={playLink}>Play</Link>
      </div>
      
    </>
    
    
  )
}

export default CohortCard