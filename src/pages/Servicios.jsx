import React from "react";
import { Link } from "react-router-dom";
import "../css/Servicios.css";

function Servicios() {
  return (
    <div className="services-container">
      <img className="logoServices" src="public/logogrande1.png"></img>
      <h1>Servicios</h1>
      <hr />
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
      <Link to="/">
        <button>Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default Servicios;
