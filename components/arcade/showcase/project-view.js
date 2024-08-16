import styles from './project-view.module.css'
import { Button } from 'theme-ui'

const ProjectView = ({ id, title = "Title Not Found", desc = "Description Not Found", slack = "Slack Not Found", scrapbook = "", playLink = "", images = [], githubProf, codeLink = ""}) => {
  const codeHost = codeLink.includes('github') ? 'View on GitHub' : 'View code link'
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
        <Button
          as="a"
          sx={{ backgroundColor: '#1d571d', color: '#ebebeb', textSizeAdjust: "16px" }}          
          href={playLink}
          target="_blank"
          rel="noopener"
        >
          Play Game
        </Button>
        <Button
          as="a"
          sx={{ backgroundColor: '#0f0f0f', color: '#ebebeb', textSizeAdjust: "16px" }}
          href={codeLink}
          target="_blank"
          rel="noopener"
        >
          {codeHost}
        </Button>
      </div>
    </div>
  )
}

export default ProjectView
