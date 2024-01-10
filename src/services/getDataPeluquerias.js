import axios from 'axios';

export const getDataPeluquerias = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/peluquerias`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
