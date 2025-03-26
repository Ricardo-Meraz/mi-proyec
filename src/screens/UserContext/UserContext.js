// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Crea el contexto
export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Hook personalizado para usarlo fácilmente
export const useUser = () => useContext(UserContext);

// Provider del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error cargando usuario desde localStorage", error);
      return null;
    }
  });

  // Guarda o elimina el usuario del localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
