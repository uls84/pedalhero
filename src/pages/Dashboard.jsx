import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/Servicios.css";

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem("authToken");

  const manejarAgregarProducto = () => {
    navigate("/formulario-producto");
  };

  return (
    <div className="services-container">
      <h1 style={{ textAlign: 'center' }}>Dashboard Administrativo</h1>
      <div style={{ padding: "20px" }}>
        <p>
          <strong>Sesión iniciada como: </strong> {usuario.nombre}
        </p>

        <div
          style={{
            background: "#e9ecef",
            padding: "10px",
            borderRadius: "4px",
            margin: "10px 0",
            fontSize: "14px",
          }}
        >
          <strong>Token de autenticación:</strong>
          <br />
          <code>{tokenActual}</code>
        </div>
        <div style={{ margin: "20px 0", textAlign: 'center' }}>
          <h3>Acciones:</h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
              justifyContent: 'center',
            }}
          >
            <button
              onClick={manejarAgregarProducto}
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                display: "inline-block",
                fontSize: "16px",
                transition: "background 0.3s",
              }}
            >
              Agregar Productos
            </button>

            <Link
              to="/productos"
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
                display: "inline-block",
                fontSize: "16px",
                transition: "background 0.3s",
              }}
            >
              Ver / Editar / Eliminar Productos
            </Link>
          </div>
        </div>
        <hr></hr>
        <button
          onClick={cerrarSesion}
          style={{
            padding: "10px 20px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "10px auto",
            display: "block",
            fontSize: "16px",
            transition: "background 0.3s",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
