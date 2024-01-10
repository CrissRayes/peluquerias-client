import { useState, useEffect } from 'react';
import { getDataPeluquerias } from '../services/getDataPeluquerias';

export const useDataPeluquerias = () => {
  const [peluquerias, setPeluquerias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataPeluquerias();
        setPeluquerias(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return peluquerias;
};
