import { Link, useNavigate, useLocation } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import "../css/Servicios.css";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
    document.title = "Tienda de Juegos de Mesa | Productos";
   
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Explora el catálogo de pedales músicales. Encuentra pedales históricos, clásicos, emuladores de gabinete y multiefectos.');
    updateMetaTag('keywords', 'pedales músicales, emuladores de gabinete, pedales de guitarra, pedales de bajo, pedalera multiefectos');
    updateMetaTag('author', '@webmaster');
    updateMetaTag('robots', 'index, follow');

    updateMetaTag('og:title', 'Tienda de pedales musicales', 'property');
    updateMetaTag('og:description', 'Explora el catálogo de pedales musicales.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  }, []);

  // Check for search query from navbar
  useEffect(() => {
    if (location.state?.busqueda) {
      setBusqueda(location.state.busqueda);
      setPaginaActual(1);
    } else {
      // Reset search when navigating to products without search query
      setBusqueda("");
      setPaginaActual(1);
    }
  }, [location.state]);

  const productosPorPagina = 6;


  const manejarEliminar = (producto) => {
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    navigate('/formulario-producto', { state: { producto } });
  };

    const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.categoria &&
        producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };



  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container mt-4">
        {/* Barra de búsqueda */}
        {/*<div className="row mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label fw-bold">Buscar productos</label>
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              className="form-control"
              value={busqueda}
              onChange={manejarBusqueda}
            />
            {busqueda && (
              <small className="text-muted">
                Mostrando {productosFiltrados.length} de {productos.length} productos
              </small>
            )}
          </div>
        </div>
        */}

        <div className="row">
          {productosActuales.map((producto) => (
            <div key={producto.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <img
                  src={producto.avatar}
                  alt={producto.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
               
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text flex-grow-1">
                    {producto.descripcion}
                  </p>
                  <p className="card-text fw-bold text-primary">
                    ${producto.precio}
                  </p>
                 
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <Link
                        to={`/productos/${producto.id}`}
                        state={{producto}}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Ver detalles
                      </Link>
                      <button
                        onClick={() => agregarAlCarrito(producto)}
                        className="btn btn-sm"
                        style={{ backgroundColor: '#556B2F', color: 'white' }}
                      >
                        Agregar al carrito
                      </button>
                    </div>


                    {esAdmin && (
                      <div className="mt-3 pt-3 border-top">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => manejarEditar(producto)}
                            className="btn btn-warning btn-sm flex-fill"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => manejarEliminar(producto)}
                            className="btn btn-danger btn-sm flex-fill"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center my-4">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}


        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2">
            <small>
              Mostrando {productosActuales.length} productos
              (página {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}
      </div>
    </>
  );
}
