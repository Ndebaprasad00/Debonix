// src/components/Slider.js
import React from "react";
import "./Slider.css";
import img1 from "../assets/slider1.jpg";
import img2 from "../assets/slider2.jpg";
import img3 from "../assets/slider3.jpg";

const Slider = () => {
  return (
    <div className="slider-container">
      <div className="slider-inner">
        <div className="slide"><img src={img1} alt="Slide 1" /></div>
        <div className="slide"><img src={img2} alt="Slide 2" /></div>
        <div className="slide"><img src={img3} alt="Slide 3" /></div>
        <div className="slide"><img src={img1} alt="Slide 1 repeat" /></div>
      </div>
    </div>
  );
};

export default Slider;
