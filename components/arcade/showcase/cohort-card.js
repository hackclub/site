import { useRef } from 'react'
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
  color = '#09AFB4',
  textColor = '#000000'
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const modalRef = useRef()

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
            Authorization: `Bearer ${authToken}`
          }
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
  }

  const firstImage = imageLink || randomNotFoundImg(id)
  const editLink = `/arcade/showcase/project/${id}/edit`

  if (isDeleted) {
    return null
  }

  return (
    <>
      <div
        sx={{
          backgroundColor: color
        }}
        className={styles.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {personal && isHovered && (
          <div
            sx={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              gap: '5px'
            }}
          >
            <a
              href={editLink}
              sx={{
                display: 'block',
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
            </a>
            <div
              onClick={e => {
                modalRef.current?.showModal()
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
              <Icon glyph="delete" />{' '}
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
          <h1 sx={{ color: textColor }} className={styles.card_title}>
            {title}
          </h1>

          <p sx={{ color: textColor }} className={styles.card_description}>
            {desc}
          </p>
        </a>

        <dialog
          ref={modalRef}
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
              modalRef.current?.close()
              setIsDeleted(true)
              handleDelete()
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
              modalRef.current?.close()
            }}
          />
        </dialog>
      </div>
    </>
  )
}

export default CohortCard
