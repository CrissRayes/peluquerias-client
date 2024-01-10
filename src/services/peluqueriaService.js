import axios from 'axios';
const token = localStorage.getItem('token');

export const addPeluqueria = async (peluqueria) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/peluquerias`,
      peluqueria,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    const { data } = response;
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }

  // try {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_URL}/peluquerias`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(peluqueria),
  //     }
  //   );
  //   // const data = await response;
  //   return response;
  // } catch (error) {
  //   console.log(error);
  // }
};

export const deletePeluqueria = async (idPeluqueria) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/peluquerias/${idPeluqueria}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editPeluqueria = async (id, peluqueria) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/peluquerias/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(peluqueria),
      }
    );
    const data = await response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
