import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();


export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: emailGuardado || "",
      });
    }
    setCargando(false);
  }, []);


  const iniciarSesion = (username, emailIngresado) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("authEmail", emailIngresado);

    
    setUsuario({
      nombre: username,
      email: emailIngresado || "",
    });
  };

  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    setUsuario(null);
  };

  const value = {
    usuario,
    iniciarSesion,
    cerrarSesion,
    isAuthenticated: !!usuario, 
    esAdmin: usuario?.nombre === 'admin',
    cargando, 

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}