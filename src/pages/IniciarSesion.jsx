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
    } else if (
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
    <div className="login-container">
      <form onSubmit={manejarEnvio}>
        <img className="logoServices" src="/logogrande1.png" alt="Logo" />
        <h1>Iniciar sesión</h1>
        <div className="illustration" ><i class="fa-solid fa-circle-user"></i></div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Nombre completo"
            value={formulario.nombre}
            onChange={(e) =>
              setFormulario({ ...formulario, nombre: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            value={formulario.email}
            onChange={(e) =>
              setFormulario({ ...formulario, email: e.target.value })
            }
            required
          />
        </div>
        <div className="buttons-container">
          <button className="btn-primary" type="submit">Iniciar Sesión</button>
          <button className="btn-primary" type="button" onClick={() => navigate("/productos")}>
            Cancelar
          </button>
        </div>
        <a className="forgot" href="#">¿No recuerdas tus credenciales de admin? <br></br> user: admin pass: 1234@admin</a>
      </form>
    </div>
  );
}
