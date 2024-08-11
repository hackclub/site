import React from 'react'
import { Image } from 'theme-ui'
import styles from '../../public/bin/style/gallery.module.css'


const Nav = () => {
  return (
    <div className={styles.nav}>
        <Image
          src='https://cloud-mt5wqf6f5-hack-club-bot.vercel.app/0rummaging.png'
          alt='logo'
          width={120}
          className={styles.bin_home}
        />
    </div>
  )
}

export default Nav;