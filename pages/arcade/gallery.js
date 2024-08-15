import React from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import BGImg from '../../components/background-image'
import AssembleImgFile from '../../public/home/assemble.jpg'


const gallery = () => {
  return (
    <section>
        <Nav />
        <BGImg 
            src={AssembleImgFile}
            alt="Hack Clubbers assemble at Figma HQ for the first IRL hackathon in SF since 2020: Assemble. 📸 Photo by Kunal Botla, Hack Clubber in MA!"
            priority
        />
        <Footer />

    </section>
  )
}

export default gallery