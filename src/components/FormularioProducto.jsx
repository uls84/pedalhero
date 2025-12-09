import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import '../css/FormularioProducto.css';

function FormularioProducto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto, validar } = useProducts();
 
  // Obtener el producto pasado por el state
  const productoRecibido = location.state?.producto;
 
  // Determina el modo
  const modo = productoRecibido ? "editar" : "agregar";
 
  // Estados del componente
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    avatar: ''
  });
 
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  // Cargar datos del producto si estamos en modo editar
  useEffect(() => {
    if (modo === "editar" && productoRecibido) {
      setProducto({
        id: productoRecibido.id || '',
        nombre: productoRecibido.nombre || '',
        precio: productoRecibido.precio || '',
        descripcion: productoRecibido.descripcion || '',
        categoria: productoRecibido.categoria || '',
        avatar: productoRecibido.avatar || ''
      });
    }
  }, [modo, productoRecibido]);

  // f(x) manejarCambios | inputs
  const manejarCambio = (e) => {
    const { name, value } = e.target;
   
    // Valida longitud max. descripción
    if (name === 'descripcion' && value.length > 200) return;
   
    setProducto(prev => ({ ...prev, [name]: value }));
   
    // Limpiar error del campo si existe
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  // f(x) validarFormulario - ahora usa la validación del contexto
  const validarFormulario = () => {
    const resultado = validar(producto);
    setErrores(resultado.errores);
    return resultado.esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
   
    // Valida antes de enviar usando el contexto
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.toString().replace(',', '.')
      };

      if (modo === "agregar") {
        // Usar el contexto para agregar producto
        const nuevoProducto = await agregarProducto(productoEnviar);
        alert(`Producto "${nuevoProducto.nombre}" agregado correctamente con ID: ${nuevoProducto.id}`);
       
        // Limpiar formulario después del éxito
        setProducto({
          id: '',
          nombre: '',
          precio: '',
          descripcion: '',
          categoria: '',
          avatar: ''
        });

        setTimeout(() => {
          navigate('/productos');
        }, 100);

      } else {
        // Usar el contexto para editar producto
        await editarProducto(productoEnviar);
        alert('Producto actualizado correctamente');

        setTimeout(() => {
          navigate('/productos');
        }, 100);
      }
     
      setErrores({});
     
    } catch (error) {
      alert(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} el producto`);
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    if (modo === "editar") {
      alert('Edición cancelada');
      navigate('/productos');
    }
  };

  // Renderizado del componente
  return (
    <div className="form-container">
      <form onSubmit={manejarEnvio}>
        <h2>{modo === "editar" ? 'Editar' : 'Agregar'} Producto</h2>

        {modo === "editar" && productoRecibido && (
          <p>
            Editando: {productoRecibido.nombre} (ID: {productoRecibido.id})
          </p>
        )}

        {/* Campo Nombre */}
        <div>
          <label>
            Nombre: *
          </label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={manejarCambio}
            disabled={cargando}
            className={errores.nombre ? 'error-input' : ''}
            placeholder="Ingrese el nombre del producto"
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>

        {/* Campo Precio */}
        <div>
          <label>
            Precio: *
          </label>
          <input
            type="text"
            name="precio"
            value={producto.precio}
            onChange={manejarCambio}
            disabled={cargando}
            placeholder="Ej: 40.000"
            inputMode="decimal"
            className={errores.precio ? 'error-input' : ''}
          />
          <div>
            Formato argentino: punto para miles, sin decimales.
          </div>
          {errores.precio && <p className="error">{errores.precio}</p>}
        </div>

        {/* Campo Categoría */}
        <div>
          <label>
            Categoría:
          </label>
          <input
            type="text"
            name="categoria"
            value={producto.categoria}
            onChange={manejarCambio}
            disabled={cargando}
            placeholder="Ej: Electrónica, Ropa, Hogar, etc."
          />
        </div>

        {/* Campo Avatar URL */}
        <div>
          <label>
            Imagen (URL):
          </label>
          <input
            type="text"
            name="avatar"
            value={producto.avatar}
            onChange={manejarCambio}
            disabled={cargando}
            placeholder="https://ejemplo.com/avatar.jpg"
          />
        </div>

        {/* Campo Descripción */}
        <div>
          <label>
            Descripción: *
          </label>
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={manejarCambio}
            rows="4"
            disabled={cargando}
            maxLength="200"
            placeholder="Mínimo 10 caracteres, máximo 200 caracteres"
            className={errores.descripcion ? 'error-input' : ''}
          />
          <div className={`char-count ${producto.descripcion.length > 200 ? 'error' : ''}`}>
            {producto.descripcion.length}/200 caracteres
          </div>
          {errores.descripcion && (
            <p className="error">{errores.descripcion}</p>
          )}
        </div>

        <div className="buttons">
          <button
            type="submit"
            disabled={cargando}
          >
            {cargando
              ? (modo === "editar" ? 'Actualizando...' : 'Agregando...')
              : (modo === "editar" ? 'Confirmar Cambios' : 'Agregar Producto')
            }
          </button>

          {modo === "editar" && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="cancel-btn"
            >
              Cancelar
            </button>
          )}
        </div>

        <p>(*) Campos obligatorios</p>
      </form>
    </div>
  );
}

export default FormularioProducto;
