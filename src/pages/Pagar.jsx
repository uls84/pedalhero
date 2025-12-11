import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/useCartContext';
import { toast } from "react-toastify";
import "../css/Servicios.css";

export default function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();


  const tokenActual = localStorage.getItem('authToken');

  // Función para formatear precios en formato argentino
  const formatearPrecio = (precio) => {
    return Math.round(Number(precio)).toLocaleString('es-AR');
  };


  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito(); // Limpiar carrito después de comprar
    navigate("/productos");
  };

  const manejarCerrarSesion = () => {
    vaciarCarrito(); // ← Primero vaciar el carrito en el estado
    cerrarSesion(); // ← Luego cerrar sesión
    navigate("/productos"); // ← Redirigir
  };

  const manejarVaciarCarrito = () => {
    toast.error("Carrito vaciado.", {
      style: { background: '#dc3545', color: 'white' }
    });
    vaciarCarrito();
  };


  return (
    <div className="services-container">
      <h1 style={{ textAlign: 'center' }}>Pago</h1>
      <div style={{ padding: "20px", display: 'flex', gap: '20px' }}>
        {/* Izquierda: Carrito */}
        <div style={{ flex: 2 }}>
          <h2>Tu compra:</h2>

          {carrito.length > 0 ? (
            <>
              {carrito.map((producto) => {
                const cantidad = Number(producto.cantidad || 1);
                const precioUnitario = Number(producto.precio || 0);
                const subtotal = cantidad * precioUnitario;
                return (
                  <div key={producto.id} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '20px' }}>
                    <img src={producto.avatar} alt={producto.nombre} width="100" />
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'rgb(164, 43, 61)' }}>{producto.nombre}</div>
                      <div>Precio unidad: ${formatearPrecio(precioUnitario)}</div>
                      <div>Cantidad: {cantidad}</div>
                      <div><strong>Subtotal: ${formatearPrecio(subtotal)}</strong></div>
                    </div>
                  </div>
                );
              })}
              <hr />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', background: '#f9f6f4', padding: '15px', borderRadius: '10px' }}>Total a pagar: ${formatearPrecio(total)}</h3>

              <div style={{ margin: "20px 0", display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {carrito.length > 0 && (
                  <button
                    onClick={comprar}
                    style={{
                      padding: "10px 20px",
                      background: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "16px",
                      transition: "background 0.3s",
                    }}
                  >
                    Confirmar y Pagar
                  </button>
                )}
                <button
                  onClick={manejarVaciarCarrito}
                  style={{
                    padding: "10px 20px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background 0.3s",
                  }}
                >
                  Vaciar Carrito
                </button>
                <button
                  onClick={() => navigate("/productos")}
                  style={{
                    padding: "10px 20px",
                    background: "#e0ac0fff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background 0.3s",
                  }}
                >
                  {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
                </button>
              </div>
            </>
          ) : (
            <p>No hay productos en el carrito</p>
          )}
        </div>

        {/* Derecha: Info del usuario */}
        <div style={{ flex: 1, paddingLeft: '20px', borderLeft: '1px solid #ddd', textAlign: 'right' }}>
          <h2 style={{ fontSize: '18px', textAlign: 'right' }}>Hola {usuario.nombre}</h2>
          <p style={{ fontSize: '14px', textAlign: 'right' }}>Email: {usuario.email}</p>

          {/* Estilo para el Token */}
          <div style={{
            background: '#e9ecef',
            padding: '8px',
            borderRadius: '4px',
            margin: '10px 0',
            fontSize: '12px',
            wordBreak: 'break-all'
          }}>
            <strong>Token:</strong> {tokenActual}
          </div>
          <button
            onClick={manejarCerrarSesion}
            style={{
              padding: "8px 16px",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              fontSize: "14px",
              transition: "background 0.3s",
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
