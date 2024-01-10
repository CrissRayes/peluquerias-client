const token = localStorage.getItem('token');

export const addFavorito = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/peluquerias/${id}/favoritos`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response;
  return data;
};

export const deleteFavorito = async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/peluquerias/${id}/favoritos`,
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
};
