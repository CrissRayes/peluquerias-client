import { Button, Container } from 'react-bootstrap';
import { HistoryCard } from '../components/HistoryCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const HistoryView = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [reservas, setReservas] = useState([]);

  const dataReservas = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/citas`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReservas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataReservas();
    console.log(reservas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className='mb-5 w-75'>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Historial de reservas</h2>
        <Button
          variant='outline-primary'
          className='mb-3'
          onClick={() => navigate('/')}
        >
          <FaArrowLeft className='me-2' />
          Volver
        </Button>
      </div>
      {reservas.map((reserva) => (
        <HistoryCard
          key={reserva.id}
          id={reserva.id}
          fecha={reserva.fecha}
          hora={reserva.hora}
          monto={reserva.monto}
          nombre={reserva.nombre}
          direccion={reserva.direccion}
          telefono={reserva.telefono}
          imagen={reserva.url_img}
          estado={reserva.activa}
        />
      ))}
    </Container>
  );
};
