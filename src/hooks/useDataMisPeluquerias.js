import { useState, useEffect } from 'react';
import { getDataPeluquerias } from '../services/getDataPeluquerias';
import jwtDecode from 'jwt-decode';

export const useDataMisPeluquerias = () => {
  const [misPeluquerias, setMisPeluquerias] = useState([]);
  const token = localStorage.getItem('token');
  const { id: userId } = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataPeluquerias();
        const peluqueriasFiltradas = response.filter(
          (peluqueria) => peluqueria.usuario_id === userId
        );
        setMisPeluquerias(peluqueriasFiltradas);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId]);

  return misPeluquerias;
};
