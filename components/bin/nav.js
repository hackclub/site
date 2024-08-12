import React from 'react'
import { Image } from 'theme-ui'
import styles from '../../public/bin/style/gallery.module.css'


const Nav = () => {
  return (
    <div className={styles.nav}>
      <button className={styles.nav_button} onClick={() => window.location.href = '/bin'}>Bin Home</button>
      <button className={styles.nav_button} onClick={() => window.location.href = '/bin/gallery'}>Gallery</button>
    </div>
  )
}

export default Nav;