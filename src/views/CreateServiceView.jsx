import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const CreateServiceView = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();

  const [serviciosData, setServiciosData] = useState([
    {
      nombre: '',
      precio: '',
      descripcion: '',
    },
  ]);

  const addService = () => {
    setServiciosData([
      ...serviciosData,
      { nombre: '', precio: '', descripcion: '' },
    ]);
  };

  const removeService = (index) => {
    const newServices = [...serviciosData];
    newServices.splice(index, 1);
    setServiciosData(newServices);
  };

  const handleChangeService = (index, field, value) => {
    const newServices = [...serviciosData];
    newServices[index][field] = value;
    setServiciosData(newServices);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const idPeluqueria = id;
      for (const servicio of serviciosData) {
        try {
          const responseServicio = await axios.post(
            `${process.env.REACT_APP_API_URL}/peluqueria/${idPeluqueria}/servicios`,
            servicio,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(responseServicio);
        } catch (error) {
          console.log(error);
        }
      }
      alert('Servicios creados con éxito');
      navigate(`/editar-peluqueria/${idPeluqueria}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className='d-flex align-items-center justify-content-between'>
        <h1>Crear Servicios</h1>
        <Button
          variant='outline-primary'
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className='me-2' />
          Volver
        </Button>
      </div>
      <div
        style={{
          border: '1px solid #ced4da',
          borderRadius: '5px',
          padding: '1rem',
        }}
      >
        <Form onSubmit={handleCreate}>
          <Row className='mb-5'>
            <Col className='d-flex justify-content-between'>
              <h5>Servicios</h5>
              <div>
                <Button
                  variant='success'
                  onClick={addService}
                >
                  <FaPlus /> Agregar servicio
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {serviciosData.map((servicio, index) => (
                <div
                  key={index}
                  className='mb-3 d-flex align-items-center justify-content-between'
                >
                  <Form.Control
                    type='text'
                    placeholder='Nombre servicio'
                    className='me-3'
                    name={`nombre${index}`}
                    value={servicio?.nombre}
                    onChange={(e) => {
                      handleChangeService(index, 'nombre', e.target.value);
                    }}
                  />
                  <Form.Control
                    type='text'
                    placeholder='Precio'
                    className='me-3'
                    name={`precio${index}`}
                    value={servicio?.precio}
                    onChange={(e) => {
                      handleChangeService(index, 'precio', e.target.value);
                    }}
                  />
                  <Form.Control
                    type='text'
                    placeholder='Descripción'
                    className='me-3'
                    name={`descripcion${index}`}
                    value={servicio?.descripcion}
                    onChange={(e) => {
                      handleChangeService(index, 'descripcion', e.target.value);
                    }}
                  />
                  <div>
                    <Button
                      variant='danger'
                      onClick={() => removeService(index)}
                    >
                      <FaMinus />
                    </Button>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          <div className='mt-5'>
            <Button
              variant='primary'
              type='submit'
            >
              Guardar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};
