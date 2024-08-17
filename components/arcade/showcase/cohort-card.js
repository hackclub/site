import React from 'react'
import { Box, Card, Heading, Link, Text } from 'theme-ui'
import styles from './cohort-card.module.css'
import { useState } from 'react'
import { Button } from 'theme-ui'

const CohortCard = ({ id, title = "Title Not Found", desc = "Description Not Found", slack = "Slack Not Found", scrapbook = "", playLink = "", images = [], githubProf, githubLink = "", draggable = false, personal = false, reload}) => {
  const [isHovered, setIsHovered] = useState(false);


  async function handleDelete() {
    try {
      const authToken = window.localStorage.getItem('arcade.authToken');

      if (!authToken) {
          throw new Error('Authorization token is missing.');
      }

      const response = await fetch(`/api/arcade/showcase/projects/${id}/delete`, {
          method: 'PATCH',
          headers: {
              'Authorization': `Bearer ${authToken}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({}) // Empty body since your API expects some body content
      });

      if (!response.ok) {
          throw new Error(`Failed to delete project with ID ${id}: ${response.statusText}`);
      }

      console.log(`Project with ID ${id} marked as deleted.`);
  } catch (error) {
      console.error('Error deleting project:', error);
  }

  reload();
}


  const firstImage = images[0] || "https://picsum.photos/200" 


  return (
    <div
    className={styles.card}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
>
    {personal && isHovered && (
        <button className={styles.deleteButton}
        onClick={handleDelete}>Delete</button>
    )}
    <a href={`/arcade/showcase/project/${id}`} className={styles.linkWrapper} target="_blank" rel="noopener noreferrer">
        <img
            src={images[0] || "https://picsum.photos/200"}
            alt="Project Image"
            className={styles.card_img}
        />
        <h1 className={styles.card_title}>{title}</h1>
        <p className={styles.card_description}>{desc}</p>
    </a>
  </div>
  )
}

export default CohortCard