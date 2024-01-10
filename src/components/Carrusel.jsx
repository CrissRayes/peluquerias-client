import { useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';

export const Carrusel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{
        height: '300px',
        marginBottom: '20px',
      }}
    >
      <Carousel.Item>
        <div className='imagen-carrusel'>
          <Image
            className='d-block w-100'
            src='/imagen1.png'
            alt='Primera imagen'
          />
          <div className='imagen-overlay'></div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='imagen-carrusel'>
          <Image
            className='d-block w-100'
            src='/imagen2.png'
            alt='Segunda imagen'
          />
          <div className='imagen-overlay'></div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='imagen-carrusel'>
          <Image
            className='d-block w-100'
            src='imagen3.png'
            alt='Tercera imagen'
          />
          <div className='imagen-overlay'></div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};
