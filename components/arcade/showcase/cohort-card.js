import React from 'react'
import { Box, Card, Heading, Link, Text } from 'theme-ui'
import styles from './cohort-card.module.css'

const CohortCard = ({ id, title = "Title Not Found", desc = "Description Not Found", slack = "Slack Not Found", scrapbook = "", playLink = "", images = [], githubProf, githubLink = "", draggable = false}) => {

  const firstImage = images[0] || "https://picsum.photos/200" 

  return (
    <Link href={`/arcade/showcase/project/${id}`} className={styles.linkWrapper} rel="noopener noreferrer">
      <div className={styles.card}>
        <img src={firstImage} alt="Project Image" className={styles.card_img} />
        <h1 className={styles.card_title}>{title}</h1>
        <p className={styles.card_description}>{desc}</p>
      </div>
    </Link>
  )
}

export default CohortCard