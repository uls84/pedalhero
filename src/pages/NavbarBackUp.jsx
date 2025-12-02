import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import "../css/Navbar.css";

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    navigate("/productos");

    // Tiempo 1'' para asegurar la navegación
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  return (
    <nav>
      <div className="navLogo">
        <Link to="/">
          <img className="logoGrande" src="public/logogrande1.png"></img>
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/servicios">Servicios</Link>
        </li>

        {/* ENLACE PARA ADMIN - Solo visible para admin */}
        {usuario?.nombre === "admin" &&
          ((<>
            <li>
              <Link to="/formulario-producto">Agregar Producto</Link>
            </li>
             <li>
              <Link to="/dashboard" style={{ margin: "0 10px" }}>
                Dashboard
              </Link>
            </li>
            </>
          )
          )}

        <li>
          {isAuthenticated ? (
            <div className="userSession">
              <span>{usuario.nombre}</span>

              <button onClick={manejarCerrarSesion}>Cerrar Sesión</button>
            </div>
          ) : (
            <Link to="/iniciar-sesion">Iniciar Sesión</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
