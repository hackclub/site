import React from 'react'
import styles from './create-card.module.css'

const CreateCard = ({ createCardLink }) => {
  return (
    <>
    <a href={createCardLink} className={styles.linkWrapper} rel="noopener noreferrer">
      <div className={styles.card}>
        Create a card
      </div>
    </a>
    </>
  )
}

export default CreateCard