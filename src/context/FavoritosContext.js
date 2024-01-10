import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

const FavoritosContext = createContext();

const FavoritosProvider = ({ children }) => {
  const { usuario } = useContext(UserContext);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (usuario) {
        try {
          const token = localStorage.getItem('token');
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/favoritos`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setFavoritos(data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchFavoritos();
  }, [usuario]);

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        setFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};

export { FavoritosContext, FavoritosProvider };
