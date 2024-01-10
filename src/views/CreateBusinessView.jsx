import { useState } from 'react';
import { addPeluqueria } from '../services/peluqueriaService';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  ProgressBar,
} from 'react-bootstrap';
import axios from 'axios';

// Step 1: Crear Peluqueria
const Step1 = ({ peluqueriaData, handleChangePeluqueria, handleNextStep }) => {
  return (
    <Form>
      <Row>
        <Col>
          <Form.Control
            type='text'
            placeholder='Nombre'
            className='mb-3'
            name='nombre'
            value={peluqueriaData?.nombre}
            onChange={handleChangePeluqueria}
          />
          <Form.Control
            type='text'
            placeholder='Dirección'
            className='mb-3'
            name='direccion'
            value={peluqueriaData?.direccion}
            onChange={handleChangePeluqueria}
          />
          <Form.Control
            type='text'
            placeholder='Teléfono'
            className='mb-3'
            name='telefono'
            value={peluqueriaData?.telefono}
            onChange={handleChangePeluqueria}
          />
          <Form.Control
            type='text'
            placeholder='Email'
            className='mb-3'
            name='email'
            value={peluqueriaData?.email}
            onChange={handleChangePeluqueria}
          />
          <Form.Control
            type='text'
            placeholder='URL Imagen'
            className='mb-3'
            name='url_img'
            value={peluqueriaData?.url_img}
            onChange={handleChangePeluqueria}
          />
        </Col>
      </Row>
      <Button
        type='button'
        className='rounded-pill'
        onClick={handleNextStep}
      >
        Siguiente
      </Button>
    </Form>
  );
};

// Step 2: Crear Servicios
const Step2 = ({
  handlePrevStep,
  handleChangeService,
  handleCreate,
  addService,
  removeService,
  serviciosData,
}) => {
  return (
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
          className='me-3'
          onClick={handlePrevStep}
        >
          Anterior
        </Button>
        <Button
          variant='primary'
          type='submit'
        >
          Guardar
        </Button>
      </div>
    </Form>
  );
};

export const CreateBusinessView = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [peluqueriaData, setPeluqueriaData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    url_img: '',
  });
  const [serviciosData, setServiciosData] = useState([
    {
      nombre: '',
      precio: '',
      descripcion: '',
    },
  ]);

  const handleChangePeluqueria = (e) => {
    const { name, value } = e.target;
    setPeluqueriaData({
      ...peluqueriaData,
      [name]: value,
    });
  };

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
    // console.log(serviciosData);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const idPeluqueria = await createPeluqueria();
      await createServicios(idPeluqueria);
      alert('Peluquería y servicios creados con éxito');
      navigate('/mis-peluquerias');
    } catch (error) {
      console.log(error);
    }
  };

  const createPeluqueria = async () => {
    const response = await addPeluqueria(peluqueriaData);
    // console.log(response);
    const idPeluqueria = response.id;
    // console.log(idPeluqueria);
    return idPeluqueria;
  };

  const createServicios = async (idPeluqueria) => {
    if (!idPeluqueria) {
      console.log('idPeluqueria no definido');
      return;
    }
    for (const servicio of serviciosData) {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/peluqueria/${idPeluqueria}/servicios`,
          servicio,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(responseServicio);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2>Crear Peluquería</h2>
        <Button
          variant='outline-primary'
          className='mb-3'
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Volver
        </Button>
      </div>
      <ProgressBar
        now={step * 50}
        label={`${step * 50}%`}
        className='mb-3'
      />
      <div
        className='mt-3 mb-3'
        style={{
          border: '1px solid #ced4da',
          borderRadius: '5px',
          padding: '1rem',
        }}
      >
        {step === 1 && (
          <Step1
            handleNextStep={handleNextStep}
            handleChangePeluqueria={handleChangePeluqueria}
            peluqueriaData={peluqueriaData}
          />
        )}
        {step === 2 && (
          <Step2
            handlePrevStep={handlePrevStep}
            handleCreate={handleCreate}
            addService={addService}
            removeService={removeService}
            handleChangeService={handleChangeService}
            serviciosData={serviciosData}
          />
        )}
      </div>
    </Container>
  );
};
