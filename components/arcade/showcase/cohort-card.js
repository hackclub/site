import React from 'react'
import { Text, Close } from 'theme-ui'
import styles from './cohort-card.module.css'
import { useState } from 'react'
import { Button } from 'theme-ui'
import Icon from '@hackclub/icons'
import randomNotFoundImg from './random-not-found-img'
/** @jsxImportSource theme-ui */

const CohortCard = ({
  id,
  title = 'Title Not Found',
  desc = 'Description Not Found',
  imageLink = '',
  personal = false,
  reload,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  async function handleDelete() {
    try {
      const authToken = window.localStorage.getItem('arcade.authToken')

      if (!authToken) {
        throw new Error('Authorization token is missing.')
      }

      const response = await fetch(
        `/api/arcade/showcase/projects/${id}/delete`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}) // Empty body since your API expects some body content
        }
      )

      if (!response.ok) {
        throw new Error(
          `Failed to delete project with ID ${id}: ${response.statusText}`
        )
      }

      console.log(`Project with ID ${id} marked as deleted.`)
    } catch (error) {
      console.error('Error deleting project:', error)
    }

    reload()
  }

  const firstImage = imageLink || randomNotFoundImg(id)
  console.log({imageLink})

  function red() {
    window.location.href = '/arcade/showcase/project/' + id + '/edit'
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* attempt to make blob... not working rn */}
      {/* <div sx={{
        background: 'black',
        clipPath: `
    path('M36.8,-68.8C45.8,-58.6,49.9,-44.9,51.7,-32.8C53.5,-20.8,53.1,-10.4,56.4,1.9C59.6,14.2,66.6,28.3,63.8,38.6C60.9,48.9,48.3,55.3,36,62.2C23.8,69.1,11.9,76.4,-1.7,79.4C-15.3,82.3,-30.7,81,-38.4,71.6C-46.2,62.1,-46.5,44.5,-54,31.3C-61.4,18,-76.2,9,-78.4,-1.3C-80.6,-11.5,-70.2,-23.1,-63.1,-36.9C-55.9,-50.7,-51.9,-66.8,-41.9,-76.4C-31.9,-86.1,-15.9,-89.3,-1,-87.6C13.9,-85.8,27.8,-79.1,36.8,-68.8Z')
  `,
            width: '130%', 
            height: '400px',
            transform: "translate(-50%, -50%) scale(1.5)",
      }}>

        </div> */}
      {personal && isHovered && (
        <div
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'flex',
            gap: '5px'
          }}
        >
          <div
            as="a"
            onClick={() => red()}
            sx={{
              color: 'white',
              bg: '#09AFB4',
              borderRadius: '10px',
              height: '32px',
              cursor: 'pointer',
              transitionDuration: '0.4s',
              '&:hover': {
                transform: 'scale(1.15)'
              }
            }}
          >
            <Icon glyph="edit" />{' '}
          </div>
          <div
            onClick={e => {
              document.getElementById('delete-project').showModal()
            }}
            sx={{
              color: 'white',
              bg: '#09AFB4',
              borderRadius: '10px',
              height: '32px',
              cursor: 'pointer',
              transitionDuration: '0.4s',
              '&:hover': {
                transform: 'scale(1.15)'
              }
            }}
          >
            <Icon glyph="minus" />{' '}
          </div>
        </div>
      )}
      <a
        href={`/arcade/showcase/project/${id}`}
        className={styles.linkWrapper}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={firstImage}
          alt="Project Image"
          className={styles.card_img}
        />
        <h1 className={styles.card_title}>{title}</h1>
        <p className={styles.card_description}>{desc}</p>
      </a>
      <dialog
        id="delete-project"
        sx={{ borderRadius: '10px', border: '3px dashed #09AFB4' }}
        className="gaegu"
      >
        <Text>Are you sure you want to delete this project?</Text>
        <br />
        <Button
          sx={{
            backgroundColor: '#FF5C00',
            color: '#FAEFD6',
            borderRadius: '5px',
            border: 'none',
            px: '20px',
            transitionDuration: '0.3s',
            '&:hover': {
              transform: 'scale(1.05)'
            },
            width: 'fit-content'
          }}
          onClick={e => {
            handleDelete()
            document.getElementById('add-project').close()
          }}
        >
          Yes
        </Button>
        <Close
          sx={{
            '&:hover': { cursor: 'pointer' },
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2,
            color: '#09AFB4'
          }}
          onClick={e => {
            document.getElementById('add-project').close()
          }}
        />
      </dialog>
    </div>
  )
}

export default CohortCard
