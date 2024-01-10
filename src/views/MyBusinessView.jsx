import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { useVerDetalle } from '../hooks/useVerDetalle';
import { deletePeluqueria } from '../services/peluqueriaService';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HairSalonCard } from '../components/HairSalonCard';

export const MyBusinessView = () => {
  const navigate = useNavigate();
  const { handleVerDetalle } = useVerDetalle();
  const [peluquerias, setPeluquerias] = useState([]);
  const token = localStorage.getItem('token');
  const { id: userId } = jwtDecode(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/peluquerias`
        );
        const peluqueriasFiltradas = data.filter(
          (peluqueria) => peluqueria.usuario_id === userId
        );
        setPeluquerias(peluqueriasFiltradas);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleEliminarPeluqueria = async (idPeluqueria) => {
    const confirmacion = window.confirm(
      '¿Está seguro que desea eliminar la peluquería?'
    );
    if (confirmacion) {
      try {
        await deletePeluqueria(idPeluqueria);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/peluquerias`
        );
        const peluqueriasFiltradas = data.filter(
          (peluqueria) => peluqueria.usuario_id === userId
        );
        setPeluquerias(peluqueriasFiltradas);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  const handleEditarPeluqueria = (id) => {
    navigate(`/editar-peluqueria/${id}`);
  };

  return (
    <Container>
      <div
        className='w-75'
        style={{
          margin: 'auto',
        }}
      >
        <div className='d-flex justify-content-between mb-2'>
          <h3>Mis peluquerías</h3>
          <div>
            <Button
              variant='outline-primary'
              onClick={() => navigate('/')}
            >
              <FaArrowLeft className='me-2' />
              Volver
            </Button>
          </div>
        </div>
        <Button
          variant='primary'
          className='rounded-pill me-2'
          onClick={() => navigate('/crear-peluqueria')}
        >
          <FaPlus className='me-2' />
          Crear Peluquería
        </Button>
        <Row>
          {peluquerias.map((peluqueria) => (
            <Col
              key={peluqueria.id}
              md={4}
              className='mb-4 h-100'
            >
              <HairSalonCard
                id={peluqueria.id}
                imagen={peluqueria.url_img}
                nombre={peluqueria.nombre}
                email={peluqueria.email}
                direccion={peluqueria.direccion}
                handleEditarPeluqueria={handleEditarPeluqueria}
                handleEliminarPeluqueria={handleEliminarPeluqueria}
                handleVerDetalle={handleVerDetalle}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};
