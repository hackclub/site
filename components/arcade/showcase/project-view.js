import styles from './project-view.module.css'
import { Button } from 'theme-ui'
/** @jsxImportSource theme-ui */

const ProjectView = ({
  id,
  title = 'Title Not Found',
  desc = 'Description Not Found',
  slack = 'Slack Not Found',
  scrapbook = '',
  playLink,
  images = [],
  githubProf,
  user = 'User Not Found',
  codeLink = '',
  ...props
}) => {
  const codeHost = codeLink.includes('github')
    ? 'View on GitHub'
    : 'View project source'
  return (
    <div {...props} className="gaegu" sx={{ position: 'relative' }}>
      <div sx={{ py: 4, backgroundColor: '#F4E7C7', textAlign: 'center' }}>
        <h1 className="slackey">{title}</h1>
        <h3>By {user}</h3>
      </div>

      <div
        sx={{
          width: '90%',
          margin: 'auto',
          my: 3,
          maxWidth: '800px',
          display: 'grid',
          gridTemplateColumns: images.length > 0 ? images.length > 1 ? '1fr' : ['1fr', '1fr 1fr'] : '',
          gap: '20px'
        }}
      >
          <div
            sx={{
              display: 'grid',
              flexWrap: 'wrap',
              gridTemplateColumns: images > 1 ? ['1fr', '1fr 1fr', '1fr 1fr 1fr'] : '1fr'
            }}
          >
            {images.map((image, index) => (
              <div
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  key={index}
                  src={image}
                  alt={`Project image ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        

        <p className={styles.description} sx={{textAlign: images.length != 1 ? 'center' : 'left'}}>{desc}</p>
      </div>

      <div
        className={styles.buttonGroup}
        sx={{ width: '90%', margin: 'auto', my: 3 }}
      >
        {playLink && (
          <Button
            as="a"
            sx={{
              backgroundColor: '#FF5C00',
              color: '#ebebeb',
              textSizeAdjust: '16px',
              borderRadius: '10px'
            }}
            href={playLink}
            target="_blank"
            rel="noopener"
          >
            Play Game
          </Button>
        )}

        <Button
          as="a"
          sx={{
            backgroundColor: '#09AFB4',
            color: '#ebebeb',
            textSizeAdjust: '16px',
            borderRadius: '10px'
          }}
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
