import React, { createContext, use, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const CartContext = createContext();

export function CartProvider({ children }) {

  const [carrito, setCarrito] = useState([]);
  const [cargaCompleta, setCargaCompleta] = useState(false); 

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito"); 
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargaCompleta(true); 
  }, []);       


  useEffect(() => {
    if (cargaCompleta) { 
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  }, [carrito, cargaCompleta]);

const agregarAlCarrito = (producto) => {
    setCarrito(prevCarrito => {
      const productoExistente = prevCarrito.find(item => item.id === producto.id);
     
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
    toast(`Producto ${producto.nombre} agregado.`);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

   const quitarCantidad = (idProducto) => {
    const carritoActualizado = carrito.map(producto => {
      if (producto.id === idProducto) {
        const cantidadActual = producto.cantidad || 1;
        if (cantidadActual === 1) {
          return null;
        }
        return { ...producto, cantidad: cantidadActual - 1 };
      }
      return producto;
    }).filter(producto => producto !== null);


    setCarrito(carritoActualizado);
  };

    const agregarCantidad = (idProducto) => {
    const nuevoCarrito = carrito.map(producto => {
      if (producto.id === idProducto) {
        return {
          ...producto,
          cantidad: (producto.cantidad || 1) + 1
        };
      }
      return producto;
    });
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((sum, item) => {
    const cantidad = item.cantidad || 1;
    return sum + (Number(item.precio) * cantidad);
  }, 0);
 
  const value = {  
    carrito,
    agregarAlCarrito,
    vaciarCarrito,
    eliminarDelCarrito,

    agregarCantidad,
    quitarCantidad,
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de CartProvider");
  }
  return context;
}