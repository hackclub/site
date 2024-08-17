import styles from './project-view.module.css'
import { Button } from 'theme-ui'
/** @jsxImportSource theme-ui */


const ProjectView = ({ id, title = "Title Not Found", desc = "Description Not Found", slack = "Slack Not Found", scrapbook = "", playLink, images = [], githubProf, user="User Not Found", codeLink = "", ...props}) => {
  const codeHost = codeLink.includes('github') ? 'View on GitHub' : 'View project source'
  return (
    <div {...props} className='gaegu'>
      <div sx={{py: 5, backgroundColor: "#F4E7C7"}}>
      <h1 className='slackey'>{title}</h1>
      <h3>By {user}</h3>
      </div>

      <div className={styles.imageGallery}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Project image ${index + 1}`} className={styles.image} />
        ))}
      </div>

      <p className={styles.description} sx={{width: '90%', margin:'auto', mb: 3}}>{desc}</p>

      <div className={styles.buttonGroup} sx={{width: '90%', margin:'auto'}}>
        {/* {playLink && ( */}
        <Button
          as="a"
          sx={{ backgroundColor: '#FF5C00', color: '#ebebeb', textSizeAdjust: "16px", borderRadius: '10px' }}          
          href={playLink}
          target="_blank"
          rel="noopener"
        >
          Play Game
        </Button>
        {/* )} */}
        

        <Button
          as="a"
          sx={{ backgroundColor: '#09AFB4', color: '#ebebeb', textSizeAdjust: "16px", borderRadius: '10px' }}
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
