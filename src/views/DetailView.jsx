import { useParams } from 'react-router-dom';
import { useDataServicios } from '../hooks/useDataServicios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaMobile,
  FaCheckCircle,
  FaArrowLeft,
} from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';

export const DetailView = () => {
  const { usuario } = useContext(UserContext);
  const { id } = useParams();
  const [peluqueria, setPeluqueria] = useState();
  const servicios = useDataServicios(id);
  const navigate = useNavigate();

  const handleLogin = (path) => {
    if (!usuario) {
      localStorage.setItem('rutaActual', path);
      return navigate('/login');
    } else {
      navigate(path);
    }
  };

  const getPeluqueria = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/peluquerias/${id}`
      );
      setPeluqueria(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPeluqueria();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className='w-75'>
      <Row
        className='mb-5'
        style={{
          border: '1px solid #ced4da',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <Col
          md={7}
          className='d-flex flex-column justify-content-between mb-5'
        >
          <div>
            <div className='d-flex'>
              <h2>{peluqueria?.nombre}</h2>
            </div>
            <ul>
              {servicios?.map((servicio) => (
                <li key={servicio?.id}>
                  <FaCheckCircle className='me-2' />
                  {servicio?.nombre.charAt(0).toUpperCase() +
                    servicio?.nombre.slice(1)}{' '}
                  ${servicio?.precio.toLocaleString('es-CL')}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Button
              variant='outline-primary'
              className='rounded-pill'
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft className='me-2' />
              Volver
            </Button>
            <Button
              variant='primary'
              className='rounded-pill ms-2'
              // onClick={() => navigate(`/reservar/${peluqueria?.id}`)}
              onClick={() => handleLogin(`/reservar/${peluqueria?.id}`)}
            >
              Reservar
            </Button>
          </div>
        </Col>
        <Col
          md={5}
          style={{
            padding: 0,
          }}
        >
          <div
            style={{
              backgroundImage: `url(${peluqueria?.url_img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px',
              borderRadius: '10px',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: '#fff',
                padding: '0.5rem',
              }}
            >
              {/* {!isFavorito ? (
                <FaRegHeart
                  style={{
                    alignSelf: 'center',
                    marginLeft: '1rem',
                  }}
                  size={30}
                />
              ) : (
                <FaHeart
                  style={{
                    alignSelf: 'center',
                    marginLeft: '1rem',
                  }}
                  size={30}
                />
              )}{' '} */}
            </div>
          </div>
          <div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <FaMapMarkerAlt className='me-2' />
                {peluqueria?.direccion}
              </li>
              <li>
                <FaMobile className='me-2' />
                {peluqueria?.telefono}
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
