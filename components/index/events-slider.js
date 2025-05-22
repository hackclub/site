import Slider from "react-slick";
import React from "react";
import Highway from "./cards/highway";
import Shipwrecked from "./cards/shipwrecked";
import Neighborhood from "./cards/neighborhood";
/** @jsxImportSource theme-ui */

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: '-40px',
        left: 'calc(50% - 60px)',
        zIndex: 2,
        cursor: 'pointer',
        fontSize: 24,
        bg: 'background',
        borderRadius: '50%',
        px: 3,
        py: 2,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s',
        ':hover': {
          transform: 'scale(1.1)'
        }
      }}
    >
      ⬅
    </div>
  );
}

function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      sx={{
        position: 'absolute',
        bottom: '-40px',
        right: 'calc(50% - 60px)',
        zIndex: 2,
        cursor: 'pointer',
        fontSize: 24,
        bg: 'background',
        borderRadius: '50%',
        px: 3,
        py: 2,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s',
        ':hover': {
          transform: 'scale(1.1)'
        }
      }}
    >
      ➡
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
  <Shipwrecked />
  <Highway />
  <Neighborhood />
</Slider>

    );
}