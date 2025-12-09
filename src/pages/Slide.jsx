import Carousel from 'react-bootstrap/Carousel';

function ImageSlideshow() {
  const images = [
    { src: '/Slider/pedalboard.jpg', alt: 'Pedalboard completo', title: 'Tu Estación de Pedales', text: 'Arma tu setup perfecto con nuestros pedales de alta calidad' },
    { src: '/Slider/pedalesacomodados.jpg', alt: 'Pedales organizados', title: 'Variedad de Efectos', text: 'Desde distorsión hasta delay, encuentra todos los sonidos que necesitas' },
    { src: '/Slider/pedalessuelo.jpg', alt: 'Pedales en el suelo', title: 'Para Todos los Niveles', text: 'Desde principiantes hasta profesionales, tenemos el pedal ideal' },
    { src: '/Slider/pedalesyguitarra.jpg', alt: 'Pedales y guitarra', title: 'Calidad Profesional', text: 'Equipos certificados y probados para darte el mejor sonido' },
    { src: '/Slider/set.jpg', alt: 'Set completo de pedales', title: '¡Bienvenido a PedalHero!', text: 'Descubre el mundo de los efectos para guitarra' }
  ];

  return (
    <Carousel fade className="hero-carousel">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image.src}
            alt={image.alt}
            style={{ height: 'calc(100vh - 110px)', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{image.title}</h3>
            <p>{image.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageSlideshow;
