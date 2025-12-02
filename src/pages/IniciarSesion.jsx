import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "../css/IniciarSesion.css";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  const manejarEnvio = (e) => {
    e.preventDefault();


    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email);
      navigate("/dashboard");
    }

    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {

      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion(formulario.nombre, formulario.email);

      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
    } else {
      alert(
        "Credenciales de administrador incorrectas. Usa: admin / 1234@admin"
      );
    }
  };

  return (
    <div>
      <h1>Inicia sesión para continuar</h1>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={(e) =>
            setFormulario({ ...formulario, nombre: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formulario.email}
          onChange={(e) =>
            setFormulario({ ...formulario, email: e.target.value })
          }
          required
        />
        <button type="submit">Iniciar Sesión</button>
        <strong> </strong>
        <button type="button" onClick={() => navigate("/productos")}>
          Cancelar
        </button>
      </form>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#666" }}>
        <strong>Credenciales de prueba para Dashboard:</strong>
        <br />
        Nombre: admin
        <br />
        Email: 1234@admin
      </p>
    </div>
  );
}
