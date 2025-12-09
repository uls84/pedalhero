import { Link, useParams, useLocation } from "react-router-dom";
import "../css/Servicios.css";


const ProductoDetalle = () => {

    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;

    // if (!producto) {
    //     return (
    //         <div className="services-container">
    //             <div className="alert alert-warning">
    //                 <h4>Producto no encontrado</h4>
    //                 <p>No se pudo cargar la información del producto</p>
    //                 <Link to="/carrito" className="btn btn-primary">
    //                     Volver a Productos
    //                 </Link>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="services-container">
            <div className="d-flex flex-column flex-md-row align-items-start gap-4 w-100">
                {/* Columna para la imagen - IZQUIERDA */}
                <div className="flex-shrink-0" style={{ flex: '0 0 40%' }}>
                    <img
                        src={producto.avatar}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                        style={{ maxWidth: '100%', height: 'auto' }}
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

                        <div style={{ marginBottom: "30px" }}>
                            <strong style={{ color: "#A42B3D", fontSize: "1.1rem", marginBottom: "10px", display: "block" }}>Precio:</strong>
                            <h5 style={{ color: "#A42B3D", fontSize: "1.5rem", fontWeight: "bold", margin: "0" }}>${producto.precio}</h5>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <Link
                            to={`/productos`}
                            style={{
                                backgroundColor: "#A42B3D",
                                color: "white",
                                border: "none",
                                padding: "12px 30px",
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
