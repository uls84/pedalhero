import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import "../css/Navbar.css";

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { vaciarCarrito, carrito } = useCartContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [busquedaNavbar, setBusquedaNavbar] = useState("");

  const totalItemsCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const manejarCerrarSesion = () => {
    navigate("/productos");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (busquedaNavbar.trim()) {
      navigate("/productos", { state: { busqueda: busquedaNavbar.trim() } });
    }
  };

  return (
    <>
      <NavbarContainer className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo a la izquierda y barra de búsqueda al lado */}
          <div className="d-flex align-items-center">
            <Logo to="/" className="navbar-brand me-3">
              <img className="logoGrande" src="public/logogrande1.png"></img>
            </Logo>

            <form className="d-flex" role="search" onSubmit={manejarBusqueda}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos..."
                aria-label="Search"
                style={{ width: "200px" }}
                value={busquedaNavbar}
                onChange={(e) => {
                  const value = e.target.value;
                  setBusquedaNavbar(value);
                  // Si el usuario borra la búsqueda (queda vacío), navegar a productos sin filtros
                  if (value === "") {
                    navigate("/productos");
                  }
                }}
              />
              <button className="btn btn-outline-light" type="submit">
                Buscar
              </button>
            </form>
          </div>

          {/* Botón toggler para móvil */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links y usuario a la derecha */}
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 justify-content-center">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" isActive={location.pathname === "/"}>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/servicios" className="nav-link" isActive={location.pathname === "/servicios"}>
                  Servicios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/productos" className="nav-link" isActive={location.pathname === "/productos"}>
                  Productos
                </NavLink>
              </li>
              {usuario?.nombre === "admin" && (
                <li className="nav-item">
                  <NavLink to="/formulario-producto" className="nav-link" isActive={location.pathname === "/formulario-producto"}>
                    Agregar Producto
                  </NavLink>
                </li>
              )}
            </ul>

            <SeccionUsuario className="d-flex align-items-center gap-3 ms-3">
              <ContenedorCarrito>
                <IconoCarrito
                  to="/pagar"
                  className="nav-link d-flex align-items-center"
                  isActive={location.pathname === "/pagar"}
                >
                  <span className="me-1">Carrito</span>
                  <FaShoppingCart />
                  {totalItemsCarrito > 0 && (
                    <ContadorCarrito>{totalItemsCarrito}</ContadorCarrito>
                  )}
                </IconoCarrito>
              </ContenedorCarrito>

              {isAuthenticated ? (
                <ContenedorUsuario className="d-flex align-items-center gap-3">
                  <Bienvenida>Hola, {usuario.nombre}</Bienvenida>

                  {usuario.nombre === "admin" && (
                    <NavLinkAdmin to="/dashboard" className="nav-link" isActive={location.pathname === "/dashboard"}>
                      Dashboard
                    </NavLinkAdmin>
                  )}

                  <BotonCerrarSesion
                    onClick={manejarCerrarSesion}
                    className="btn btn-outline-light btn-sm"
                  >
                    Cerrar Sesión
                  </BotonCerrarSesion>
                </ContenedorUsuario>
              ) : (
                <NavLink to="/iniciar-sesion" className="nav-link" isActive={location.pathname === "/iniciar-sesion"}>
                  Iniciar Sesión
                </NavLink>
              )}
            </SeccionUsuario>
          </div>
        </div>
      </NavbarContainer>
      <NavbarSpacer />
    </>
  );
}

export default Navbar;

const NavbarContainer = styled.nav`
  background-color: #422134 !important;
  padding: 0.5rem 2rem;
`;

const NavbarSpacer = styled.div`
  height: 70px;

  @media (max-width: 991.98px) {
    height: 66px;
  }
`;

const logoGrande = styled(Link)`
  height: 100px;
  float: left;
  background-color: #422134;
`;

const Logo = styled(Link)`
  color: white !important;
  font-size: 0.5rem;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: white !important;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.isActive ? '#ffc107' : 'white'} !important;
  text-decoration: none;
  padding: 0.5rem 1rem;

  &:hover {
    color: ${props => props.isActive ? '#ffc107' : 'white'} !important;
    text-decoration: underline;
  }
`;

const NavLinkAdmin = styled(Link)`
  color: ${props => props.isActive ? '#ffc107' : 'white'} !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-weight: bold;

  &:hover {
    color: ${props => props.isActive ? '#ffc107' : 'gold'} !important;
    text-decoration: underline;
  }
`;

const Bienvenida = styled.span`
  color: white;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;

  @media (max-width: 991.98px) {
    margin-bottom: 0.5rem;
  }
`;

const BotonCerrarSesion = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #dc3545;
    color: white;
  }

  @media (max-width: 991.98px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const ContenedorCarrito = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconoCarrito = styled(Link)`
  color: ${props => props.isActive ? '#ffc107' : 'white'} !important;
  text-decoration: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1rem;
  gap: 5px;

  &:hover {
    color: ${props => props.isActive ? '#ffc107' : 'white'} !important;
  }
`;

const ContadorCarrito = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

const SeccionUsuario = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

const ContenedorUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 991.98px) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }
`;
