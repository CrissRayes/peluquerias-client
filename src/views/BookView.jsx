import { BookContext } from '../context/BookContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { useDataServicios } from '../hooks/useDataServicios';
import { useDataReservas } from '../hooks/useDataReservas';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'moment/locale/es';
import es from 'date-fns/locale/es';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
registerLocale('es', es);

export const BookView = () => {
  const navigate = useNavigate();
  const {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedServices,
    setSelectedServices,
    totalReserva,
    setTotalReserva,
  } = useContext(BookContext);
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const servicios = useDataServicios(id);
  const reservas = useDataReservas(id);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
    getHorasDisponibles(date);
  };

  const handleTimeSelection = (hora) => {
    setSelectedTime(hora);
  };

  const getHorasDisponibles = () => {
    if (!selectedDate) return [];

    const selectedDateString = moment(selectedDate).format('DD-MM-YYYY');

    const horasDelDia = [];
    for (let hour = 9; hour <= 20; hour++) {
      horasDelDia.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    const horasReservadas = reservas
      .filter((reserva) => reserva.fecha === selectedDateString)
      .map((reserva) => reserva.hora);

    const horasDisponibles = horasDelDia.filter(
      (hora) => !horasReservadas.includes(hora)
    );

    setHorasDisponibles(horasDisponibles);
  };

  useEffect(() => {
    getHorasDisponibles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, reservas]);

  const handleServiceSelection = (id) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(id)) {
        return prevSelectedServices.filter((servicioId) => servicioId !== id);
      } else {
        return [...prevSelectedServices, id];
      }
    });
  };

  useEffect(() => {
    const totalReserva = selectedServices.reduce(
      (total, id) =>
        total + servicios.find((servicio) => servicio.id === id).precio,
      0
    );
    setTotalReserva(totalReserva);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServices, servicios]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // manejar campos vacíos
    if (!selectedDate && !selectedTime && !selectedServices.length) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const cita = {
      fecha: moment(selectedDate).format('YYYY-MM-DD'),
      hora: selectedTime,
      monto: totalReserva,
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/peluquerias/${id}/citas`,
        cita,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Reserva realizada con éxito');
      setSelectedDate('');
      setSelectedTime('');
      setSelectedServices([]);
      setTotalReserva(0);
      navigate('/');
    } catch (error) {
      alert('Error al realizar la reserva');
    }
  };

  return (
    <Container>
      <div className='d-flex justify-content-between'>
        {/* TODO: Traer nombre de peluquería */}
        <h1>Una Gran Peluquería</h1>
        <div>
          <Button
            variant='outline-primary'
            className='me-2 rounded-pill'
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className='me-2' />
            Volver
          </Button>
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={7}>
            <h5>Servicios</h5>
            <ul>
              {servicios.map((servicio) => (
                <li key={servicio.id}>
                  <Form.Check
                    type='switch'
                    id='custom-switch'
                    label={servicio?.nombre}
                    inline
                    onChange={() => handleServiceSelection(servicio?.id)}
                  />
                  ${servicio?.precio.toLocaleString('es-CL')}
                </li>
              ))}
            </ul>
            <div>
              <h5>Total: ${totalReserva.toLocaleString('es-CL')}</h5>
            </div>
          </Col>
          <Col
            md={5}
            style={{
              borderLeft: '1px solid #ced4da',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h5>Selecciona la fecha y hora</h5>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleDateSelection(date)}
              dateFormat='DD/MM/YYYY'
              showTimeSelect={false}
              locale={es}
              inline
            />

            <h5>Horas disponibles</h5>
            <div
              style={{
                borderTop: '1px solid #ced4da',
                borderBottom: '1px solid #ced4da',
                paddingTop: '1rem',
                paddingBottom: '1rem',
              }}
            >
              {horasDisponibles === 0 ? (
                <p>No hay horas disponibles 😔</p>
              ) : (
                horasDisponibles.map((hora, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedTime === hora ? 'primary' : 'outline-primary'
                    }
                    className='rounded-pill ms-2 mb-3'
                    onClick={() => handleTimeSelection(hora)}
                  >
                    {hora}
                  </Button>
                ))
              )}
            </div>
            <Button
              type='submit'
              variant='primary'
              className='rounded-pill ms-2 mt-3 mb-3'
            >
              <FaCheck className='me-2' />
              Confirmar Reserva
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};
