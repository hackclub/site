import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
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

export default function ProjectsSlider() {
  const cards = require('../../lib/recent-projects.json');

  return (
    <Slider
      centerMode
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay
      autoplaySpeed={4000}
      arrows
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
    >
      {cards.map((card, index) => (
        <div key={index} sx={{ px: 2 }}>
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderRadius: '2xl',
              padding: 4,
              minHeight: '300px',
              background: card.background,
              textDecoration: 'none',
              transition: 'transform 0.2s',
              ':hover': {
                transform: 'scale(1.03)',
              },
            }}
          >
            <h2 sx={{ color: card.titleColor, fontSize: 5, mb: 2 }}>{card.title}</h2>
            <p sx={{ color: card.descriptionColor, fontSize: 3 }}>{card.description}</p>
          </a>
        </div>
      ))}
    </Slider>
  );
}
