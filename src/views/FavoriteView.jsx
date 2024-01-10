import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { FavoriteCard } from '../components/FavoriteCard';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const FavoriteView = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [favoritos, setFavoritos] = useState([]);

  const getFavorites = async () => {
    try {
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
  };

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h1>Favoritos</h1>
          <Form.Check
            type='checkbox'
            label='Eliminar seleccionados'
          />
        </div>
        <Button
          variant='outline-primary'
          onClick={() => navigate('/')}
        >
          <FaArrowLeft className='me-2' />
          Volver
        </Button>
      </div>
      {favoritos.length === 0 ? (
        <h2>No tienes favoritos</h2>
      ) : (
        favoritos.map((favorito) => (
          <div
            key={favorito.id}
            className='d-flex align-items-center'
          >
            <Form.Check type='checkbox' />
            <FavoriteCard
              id={favorito.id}
              nombre={favorito.nombre}
              direccion={favorito.direccion}
              telefono={favorito.telefono}
              email={favorito.email}
              imagen={favorito.url_img}
            />
          </div>
        ))
      )}
    </Container>
  );
};
