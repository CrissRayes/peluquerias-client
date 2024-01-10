import { useState, useEffect } from 'react';
import { getDataServicios } from '../services/getDataServicios';

export const useDataServicios = (id) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataServicios(id);
        setServicios(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return servicios;
};
