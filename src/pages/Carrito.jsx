import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import "../css/Carrito.css";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito, agregarCantidad, quitarCantidad, total  } = useCartContext();

  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  return (
    <div className="carrito-container">
      <img className="logoCarrito" src="/logogrande1.png" alt="Logo" />
      <h1>Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items">
            {carrito.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  {item.nombre} - ${Number(item.precio).toFixed(3)}
                </div>
                <div className="item-controls">
                  <span>Cantidad: {item.cantidad || 1}</span>
                  <button className="cart-btn" onClick={() => quitarCantidad(item.id)}>-</button>
                  <button className="cart-btn" onClick={() => agregarCantidad(item.id)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <hr />
            <div>Total: ${Number(total).toFixed(3)}</div>
          </div>
          <div className="cart-buttons">
            <button className="cart-btn-primary" onClick={vaciarCarrito}>Vaciar Carrito</button>
            <button className="cart-btn-primary" onClick={irAPagar}>Pagar</button>
          </div>
        </>
      )}
      <Link to="/">
        <button className="cart-btn-secondary">Volver al Inicio</button>
      </Link>
    </div>
  );
}
