import axios from 'axios';

export const getDataServicios = async (idPeluqueria) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/peluqueria/${idPeluqueria}/servicios`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
