import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import "../css/Servicios.css";

function Servicios() {
  const { productos } = useProducts();
  const navigate = useNavigate();
  const productImages = productos.map(p => p.avatar);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const changeImage = (newIndex) => {
    setOpacity(0);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setOpacity(1);
    }, 500);
  };

  const nextImage = () => {
    const newIndex = currentIndex === productImages.length - 1 ? 0 : currentIndex + 1;
    changeImage(newIndex);
  };

  const prevImage = () => {
    const newIndex = currentIndex === 0 ? productImages.length - 1 : currentIndex - 1;
    changeImage(newIndex);
  };

  const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * productImages.length);
    changeImage(randomIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      randomImage();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="services-container">
      <img className="logoServices" src="/logogrande1.png" alt="Logo" />
      <h1>Servicios</h1>
      <p>
        Nuestra Experiencia en Pedales Musicales Con más de diez años de
        trayectoria en el mercado de pedales musicales, nos hemos consolidado
        como un referente en la industria. Durante este tiempo, hemos cultivado
        relaciones sólidas con las mejores marcas, lo que nos permite ofrecer
        una selección excepcional de productos, desde pedales de efectos hasta
        unidades de modulación y overdrive. Nuestro compromiso con la calidad y
        la innovación nos ha mantenido a la vanguardia, asegurando que nuestros
        clientes siempre tengan acceso a las últimas tendencias y tecnologías en
        el mundo de la música. Lo que realmente nos distingue es la dedicación a
        nuestros clientes. No solo vendemos pedales; nos dedicamos a entender
        las necesidades y preferencias de cada músico que se acerca a nosotros.
        Esa atención personalizada, combinada con nuestro profundo conocimiento
        del equipo, es la razón por la cual nuestros clientes regresan una y
        otra vez. Valoramos la confianza que nuestros clientes depositan en
        nosotros y trabajamos incansablemente para ofrecer no solo productos de
        alta calidad, sino también una experiencia de compra excepcional.
      </p>
      <div className="slider-container">
        <h2>Nuestra Selección de Productos</h2>
        <div className="slider" onClick={() => navigate(`/productos/${productos[currentIndex].id}`, { state: { producto: productos[currentIndex] } })}>
          <img
            className="slider-image"
            src={productImages[currentIndex]}
            alt={`Producto ${currentIndex + 1}`}
            style={{ opacity }}
          />
          <div className="slider-overlay">
            +info
          </div>
        </div>
        <div className="slider-buttons">
          <button className="slider-btn" onClick={prevImage}>
            Anterior
          </button>
          <button className="slider-btn" onClick={nextImage}>
            Siguiente
          </button>
        </div>
      </div>
      <Link to="/">
        <button>Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default Servicios;
