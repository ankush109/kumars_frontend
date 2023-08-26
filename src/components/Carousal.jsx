import React, { useEffect, useState } from 'react';
import './carousal.css'; // Make sure to create this CSS file for styling

const Carousel = () => {
  const images = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/img18/Lawn_Garden/Ud/July2023/Monsoongd/August/GW/GW-heros-Pc-1_3000x1200._CB597354947_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/shoes/Unrec/26/3000_updated._CB597347633_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Shreyansh/BAU/Unrexc/D70978891_INWLD_BAU_Unrec_Uber_PC_Hero_3000x1200._CB594707876_.jpg'
    // Add more image URLs here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Automatically advance the slide every 3 seconds
    const interval = setInterval(nextSlide, 10000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />

    </div>
  );
};

export default Carousel;
