import React from 'react'
import styles from './project-view.module.css'

const ProjectView = ({ id, title = "Title Not Found", desc = "Description Not Found", slack = "Slack Not Found", scrapbook = "", playLink = "", images = [], githubProf, githubLink = ""}) => {
  return (
<div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      
      <div className={styles.imageGallery}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Project image ${index + 1}`} className={styles.image} />
        ))}
      </div>
      
      <p className={styles.description}>{desc}</p>
      
      <div className={styles.buttonGroup}>
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className={styles.button}>
          View on GitHub
        </a>
        <a href={playLink} target="_blank" rel="noopener noreferrer" className={styles.button}>
          Play
        </a>
      </div>
    </div>
  )
}

export default ProjectView
