import axios from 'axios';

export const getDataReservas = async (idPeluqueria) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/peluquerias/${idPeluqueria}/citas`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
