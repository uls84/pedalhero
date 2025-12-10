import { Link, useParams, useLocation } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "../css/Servicios.css";


const ProductoDetalle = () => {

    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;
    const { agregarAlCarrito } = useCartContext();

    // Función para formatear precios en formato argentino
    const formatearPrecio = (precio) => {
        return Math.round(Number(precio)).toLocaleString('es-AR');
    };

    const manejarAgregarAlCarrito = () => {
        agregarAlCarrito(producto);
    };

    return (
        <div className="services-container text-center">
            <div className="d-flex flex-column flex-md-row align-items-center gap-4 w-100">
                {/* Columna para la imagen - IZQUIERDA */}
                <div className="flex-shrink-0" style={{ flex: '0 0 40%' }}>
                    <img
                        src={producto.avatar}
                        alt={producto.nombre}
                        className="rounded"
                        style={{ maxWidth: '100%', maxHeight: '400px', width: 'auto', height: 'auto', objectFit: 'contain' }}
                    />
                </div>

                {/* Columna para la información - DERECHA */}
                <div className="flex-grow-1 d-flex flex-column justify-content-between" style={{ minHeight: '100%' }}>
                    <div>
                        <h1 style={{ color: "#A42B3D", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px", fontSize: "2rem", marginBottom: "30px" }}>{producto.nombre}</h1>

                        <div style={{ marginBottom: "25px" }}>
                            <strong style={{ color: "#A42B3D", fontSize: "1.1rem", marginBottom: "10px", display: "block" }}>Descripción:</strong>
                            <p style={{ lineHeight: "1.8", fontSize: "1rem", color: "#444", textAlign: "justify", marginBottom: "20px" }}>{producto.descripcion}</p>
                        </div>

                        <div style={{ marginBottom: "25px" }}>
                            <strong style={{ color: "#A42B3D", fontSize: "1.1rem", marginBottom: "10px", display: "block" }}>Categoría:</strong>
                            <span className="badge" style={{ backgroundColor: "#A42B3D", color: "white", padding: "8px 15px", fontSize: "0.9rem" }}>{producto.categoria}</span>
                        </div>

                        <div style={{ marginBottom: "30px", backgroundColor: "rgba(164, 43, 61, 0.1)", padding: "15px", borderRadius: "8px" }}>
                            <strong style={{ color: "#A42B3D", fontSize: "1.1rem", marginBottom: "10px", display: "block" }}>Precio:</strong>
                            <h5 style={{ color: "#A42B3D", fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>${formatearPrecio(producto.precio)}</h5>
                        </div>
                    </div>

                    <div className="mt-auto d-flex gap-3 justify-content-center mb-4">
                        <button
                            onClick={manejarAgregarAlCarrito}
                            style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                padding: "15px 40px",
                                borderRadius: "5px",
                                fontSize: "1rem",
                                cursor: "pointer",
                                transition: "background-color 0.3s"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
                        >
                            Comprar Producto
                        </button>
                        <Link
                            to={`/productos`}
                            style={{
                                backgroundColor: "#A42B3D",
                                color: "white",
                                border: "none",
                                padding: "15px 40px",
                                borderRadius: "5px",
                                fontSize: "1rem",
                                textDecoration: "none",
                                display: "inline-block",
                                transition: "background-color 0.3s"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#8a2231"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#A42B3D"}
                        >
                            Volver a Productos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}; export default ProductoDetalle;
