import Slider from "react-slick";
import React from "react";
import Highway from "./cards/highway";
import Shipwrecked from "./cards/shipwrecked";
import Neighborhood from "./cards/neighborhood";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
/** @jsxImportSource theme-ui */


const arrowStyles = {
  position: 'absolute',
  bottom: '-40px',
  zIndex: 2,
  cursor: 'pointer',
  width: '50px',
  height: '50px',
  fontSize: 24,
  bg: 'background',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  transition: 'transform 0.2s',
  ':hover': {
    transform: 'scale(1.1)'
  }
};

function PrevArrow({ onClick }) {
  return (
    <div onClick={onClick} sx={{ ...arrowStyles, left: 'calc(50% - 60px)' }}>
      <FaArrowLeft />
    </div>
  );
}

function NextArrow({ onClick }) {
  return (
    <div onClick={onClick} sx={{ ...arrowStyles, right: 'calc(50% - 60px)' }}>
      <FaArrowRight />
    </div>
  );
}



export default function EventSlider() {
    var settings = {
        centerMode: true,
        dots: true,
        infinite:true,
        speed:500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
            nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
    }

    return (
<Slider
  {...{
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }}
>
    <div sx = {{px : 2}}>
  <Shipwrecked />
  </div>
  <div sx = {{px : 2}}>
  <Highway />
  </div>
  <div sx = {{px : 2}}>
  <Neighborhood />
  </div>
</Slider>

    );
}