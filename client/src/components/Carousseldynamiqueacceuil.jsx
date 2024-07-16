import { useState, useEffect } from "react";
import dataAcceuille from "../Data/AcceuilData";

function CarouselDynamiqueAcceuil() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === dataAcceuille.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel">
        {dataAcceuille.map((item, index) => (
          <div
            key={item.titre}
            className={`slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={item.image} alt={item.titre} />
            <div className="legend">
              <h3>{item.titre}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselDynamiqueAcceuil;
