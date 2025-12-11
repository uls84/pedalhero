import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/useCartContext";
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
          {/* Logo, barra de búsqueda y botón toggler en la misma línea */}
          <div className="d-flex align-items-center flex-grow-1">
            <Logo to="/" className="navbar-brand me-2">
              <img className="logoGrande" src="/logogrande1.png"></img>
            </Logo>

            <form className="d-flex me-2" role="search" onSubmit={manejarBusqueda}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar productos..."
                aria-label="Search"
                style={{ width: "120px" }}
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

            {/* Botón toggler para móvil */}
            <button
              className="navbar-toggler d-lg-none ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Links y usuario a la derecha */}
          <div
            className="collapse navbar-collapse d-lg-flex justify-content-lg-end"
            id="navbarContent"
          >
            <div className="d-flex flex-column d-lg-flex flex-lg-row justify-content-center gap-3 mb-2">
              <NavLink to="/" className="nav-link" isActive={location.pathname === "/"}>
                Inicio
              </NavLink>
              <NavLink to="/servicios" className="nav-link" isActive={location.pathname === "/servicios"}>
                Servicios
              </NavLink>
              <NavLink to="/productos" className="nav-link" isActive={location.pathname === "/productos"}>
                Productos
              </NavLink>
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
              {usuario?.nombre === "admin" && (
                <NavLink to="/formulario-producto" className="nav-link" isActive={location.pathname === "/formulario-producto"}>
                  Agregar Producto
                </NavLink>
              )}
              {usuario?.nombre === "admin" && (
                <NavLinkAdmin to="/dashboard" className="nav-link" isActive={location.pathname === "/dashboard"}>
                  Dashboard
                </NavLinkAdmin>
              )}
            </div>

            <SeccionUsuario className="d-flex flex-row align-items-center">
              {isAuthenticated ? (
                <>
                  <Bienvenida>Hola, {usuario.nombre}</Bienvenida>
                  <BotonCerrarSesion
                    onClick={manejarCerrarSesion}
                    className="btn btn-outline-light"
                  >
                    Cerrar Sesión
                  </BotonCerrarSesion>
                </>
              ) : (
                <NavLink to="/iniciar-sesion" className="nav-link login-button" isActive={location.pathname === "/iniciar-sesion"}>
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

  @media (max-width: 991.98px) {
    padding-left: 0.25rem;
  }
`;

const NavbarSpacer = styled.div`
  height: 70px;

  @media (max-width: 991.98px) {
    height: 66px;
  }
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
    color: ${props => props.isActive ? '#ffc107' : 'white'} !important;
    text-decoration: underline;
  }
`;

const Bienvenida = styled.span`
  color: white;
  font-size: 0.9rem;
  margin: 0;
  white-space: nowrap;
  margin-top: -6px;
`;

const BotonCerrarSesion = styled.button`
  background: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  white-space: nowrap;
  margin-top: -6px;

  &:hover {
    background: #dc3545;
    color: white;
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
  align-items-center;
`;

const ContenedorUsuario = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
