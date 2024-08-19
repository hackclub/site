import React from 'react'
import styles from './create-card.module.css'
import img from '../../../public/arcade/plus.png'

const CreateCard = ({ createCardLink }) => {
  return (
    <>
    <a href={createCardLink} className={styles.linkWrapper} rel="noopener noreferrer">
      <div className={styles.card}>
        <img src={img}/>
        Create a card
      </div>
    </a>
    </>
  )
}

export default CreateCard