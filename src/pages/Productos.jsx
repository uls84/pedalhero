import { Link, useNavigate, useLocation } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "../css/Productos.css";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Función para formatear precios en formato argentino
  const formatearPrecio = (precio) => {
    return Math.round(Number(precio)).toLocaleString('es-AR');
  };

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    document.title = "PedalHero | Productos";

    const updateMetaTag = (name, content, attribute = "name") => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag(
      "description",
      "Explora el catálogo de pedales músicales. Encuentra pedales históricos, clásicos, emuladores de gabinete y multiefectos."
    );
    updateMetaTag(
      "keywords",
      "pedales músicales, emuladores de gabinete, pedales de guitarra, pedales de bajo, pedalera multiefectos"
    );
    updateMetaTag("author", "@webmaster");
    updateMetaTag("robots", "index, follow");

    updateMetaTag("og:title", "Tienda de pedales musicales", "property");
    updateMetaTag(
      "og:description",
      "Explora el catálogo de pedales musicales.",
      "property"
    );
    updateMetaTag("og:type", "website", "property");
    updateMetaTag("og:image", "https://tudominio.com/logo.jpg", "property");
    updateMetaTag("og:url", window.location.href, "property");
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
    navigate("/eliminar-producto", { state: { producto } });
  };

  const manejarEditar = (producto) => {
    navigate("/formulario-producto", { state: { producto } });
  };

  const categorias = [...new Set(productos.map(p => p.categoria).filter(Boolean))];

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.categoria &&
        producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  ).filter(producto => !categoriaSeleccionada || producto.categoria === categoriaSeleccionada)
  .filter(producto => !precioMin || producto.precio >= parseFloat(precioMin))
  .filter(producto => !precioMax || producto.precio <= parseFloat(precioMax));

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);



  if (cargando) return <Loading message="Cargando productos..." />;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <>
      <div className="container mt-4 px-2">
        <div className="d-flex justify-content-end mb-3 d-block d-md-none">
          <button className="btn" style={{ backgroundColor: 'transparent', borderColor: '#422134', color: '#422134' }} onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>
        <div className="row">
          <div className={`col-10 col-md-3 mx-auto ${showFilters ? 'd-block' : 'd-none d-md-block'}`} style={{ padding: '20px 15px 20px 10px' }}>
            <h6 className="text-center">Filtros</h6>
            <div className="mb-3 px-2">
              <label className="form-label small">Categoría</label>
              <select value={categoriaSeleccionada} onChange={e => {setCategoriaSeleccionada(e.target.value); setPaginaActual(1);}} className="form-select form-select-sm">
                <option value="">Todas</option>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="mb-3 px-2">
              <label className="form-label small">Precio Mínimo</label>
              <input type="number" value={precioMin} onChange={e => {setPrecioMin(e.target.value); setPaginaActual(1);}} className="form-control form-control-sm" />
            </div>
            <div className="mb-3 px-2">
              <label className="form-label small">Precio Máximo</label>
              <input type="number" value={precioMax} onChange={e => {setPrecioMax(e.target.value); setPaginaActual(1);}} className="form-control form-control-sm" />
            </div>
            <button onClick={() => {setCategoriaSeleccionada(""); setPrecioMin(""); setPrecioMax(""); setPaginaActual(1);}} className="btn btn-sm" style={{ backgroundColor: '#422134', borderColor: '#422134', color: 'white' }}>Limpiar Filtros</button>

            {productosFiltrados.length > productosPorPagina && (
              <div className="d-flex justify-content-start mt-5 mb-4 d-none d-md-flex">
                {Array.from({ length: totalPaginas }, (_, index) => (
                  <button
                    key={index + 1}
                    className="btn mx-1"
                    style={
                      paginaActual === index + 1
                        ? { backgroundColor: "#A42B3D", color: "white", borderColor: "#A42B3D" }
                        : { backgroundColor: "transparent", color: "#A42B3D", borderColor: "#A42B3D" }
                    }
                    onClick={() => cambiarPagina(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            {productosFiltrados.length > 0 && (
              <div className="text-center text-muted mt-2 d-none d-md-block">
                <small>
                  Mostrando {productosActuales.length} productos (página{" "}
                  {paginaActual} de {totalPaginas})
                </small>
              </div>
            )}
          </div>
          <div className="col-md-9">
            <div className="row">
              {productosActuales.map((producto) => (
                <div key={producto.id} className="col-6 col-md-6 col-lg-4 mb-4">
                  <div className="card" style={{ borderColor: "#A42B3D" }}>
                    <img
                      src={producto.avatar}
                      alt={producto.nombre}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "contain" }}
                    />

                    <div className="card-body d-flex flex-column" style={{ padding: '0.5rem' }}>
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text flex-grow-1" style={{ fontSize: '0.9rem' }}>
                        {producto.descripcion}
                      </p>
                      <p className="card-text fw-bold text-dark">
                        ${formatearPrecio(producto.precio)}
                      </p>

                      <div className="mt-auto">
                        <div className="d-grid gap-2">
                          <Link
                            to={`/productos/${producto.id}`}
                            state={{ producto }}
                            className="btn btn-sm"
                            style={{ backgroundColor: "white", color: "#A42B3D", borderColor: "#A42B3D" }}
                          >
                            Ver detalles
                          </Link>
                          <button
                            onClick={() => agregarAlCarrito(producto)}
                            className="btn btn-sm"
                            style={{ backgroundColor: "#A42B3D", color: "white" }}
                          >
                            Agregar al carrito
                          </button>
                        </div>

                        {esAdmin && (
                          <div className="mt-3 pt-3 border-top">
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => manejarEditar(producto)}
                                className="btn btn-sm flex-fill"
                                style={{ backgroundColor: "#28a745", borderColor: "#28a745", color: "white" }}
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
          </div>
        </div>

        {productosFiltrados.length > productosPorPagina && (
          <div className="d-flex justify-content-center mt-4 mb-4 d-block d-md-none">
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index + 1}
                className="btn mx-1"
                style={
                  paginaActual === index + 1
                    ? { backgroundColor: "#A42B3D", color: "white", borderColor: "#A42B3D" }
                    : { backgroundColor: "transparent", color: "#A42B3D", borderColor: "#A42B3D" }
                }
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {productosFiltrados.length > 0 && (
          <div className="text-center text-muted mt-2 mb-3 d-block d-md-none">
            <small>
              Mostrando {productosActuales.length} productos (página{" "}
              {paginaActual} de {totalPaginas})
            </small>
          </div>
        )}
      </div>
    </>
  );
}
