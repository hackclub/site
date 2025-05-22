import Slider from "react-slick";
import React from "react";
import Highway from "./cards/highway";
import Shipwrecked from "./cards/shipwrecked";
import Neighborhood from "./cards/neighborhood";

export default function EventSlider() {
    var settings = {
        dots: true,
        infinite:true,
        speed:500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    return (
        <Slider {...settings}>
        <Shipwrecked />
        <Highway />
        <Neighborhood />
        </Slider>
    );
}