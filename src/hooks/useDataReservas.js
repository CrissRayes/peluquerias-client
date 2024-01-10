import { useState, useEffect } from 'react';
import { getDataReservas } from '../services/getDataReservas';

export const useDataReservas = (id) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataReservas(id);
        setReservas(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  return reservas;
};
