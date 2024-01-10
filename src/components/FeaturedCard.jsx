import { UserContext } from '../context/UserContext';
import { Button, Card, Row, Col, Image } from 'react-bootstrap';
import { FaCheck, FaMapMarkerAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useVerDetalle } from '../hooks/useVerDetalle';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FavoritosContext } from '../context/FavoritosContext';
import axios from 'axios';

export const FeaturedCard = ({ id, nombre, direccion, imagen, verificada }) => {
  const { usuario } = useContext(UserContext);
  const { handleVerDetalle } = useVerDetalle();
  const navigate = useNavigate();
  const { favoritos, setFavoritos } = useContext(FavoritosContext);

  const handleLogin = (path) => {
    if (!usuario) {
      localStorage.setItem('rutaActual', path);
      return navigate('/login');
    } else {
      navigate(path);
    }
  };
  // const isFavorito = favoritos?.find((favorito) => favorito.id === id) || false;
  // const isFavorito = Array.isArray(favoritos) && favoritos.some((favorito) => favorito.id === id);
  const isFavorito =
    Array.isArray(favoritos) &&
    favoritos.find((favorito) => favorito.id === id);

  const toggleFavorito = async () => {
    if (!usuario) return navigate('/login');
    const token = localStorage.getItem('token');

    if (!isFavorito) {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/peluquerias/${id}/favoritos`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } else {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/peluquerias/${id}/favoritos`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }

    // TODO: Revisar si este request es el correcto o si hay que hacer otro
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/favoritos`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setFavoritos(data);
  };

  return (
    <Card
      style={{ borderRadius: '10px' }}
      className='featured-card mb-3 position-relative'
    >
      <div className='position-absolute top-0 end-0 p-3'>
        {usuario && isFavorito ? (
          <FaHeart
            onClick={toggleFavorito}
            style={{
              cursor: 'pointer',
            }}
          />
        ) : (
          <FaRegHeart
            onClick={toggleFavorito}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      <Card.Body>
        <Row>
          <Col
            sm={12}
            lg={4}
          >
            <div className='circle'>
              <Image
                src={imagen}
                roundedCircle
                width={150}
                height={150}
                className='border border-white'
              />
            </div>
          </Col>
          <Col
            sm={12}
            lg={8}
          >
            {verificada && (
              <div>
                <FaCheck className='verification-icon' />
                <span className='ms-1'>verificada</span>
              </div>
            )}
            <h5>{nombre}</h5>
            <FaMapMarkerAlt className='location-icon' />
            <span>{direccion}</span>
            <div className='mt-3'>
              <Button
                variant='outline-primary'
                className='rounded-pill'
                onClick={() => handleVerDetalle(id)}
              >
                Ver Detalle
              </Button>
              <Button
                variant='primary'
                className='rounded-pill ms-2'
                onClick={() => handleLogin(`/reservar/${id}`)}
              >
                Reservar
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
