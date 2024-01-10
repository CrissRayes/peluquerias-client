import axios from 'axios';
import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const RegisterView = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    clave: '',
  });
  const [cofirmaClave, setConfirmaClave] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.clave !== cofirmaClave) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/registro`,
        formData
      );

      if (response.status === 201) {
        alert('Usuario registrado con éxito!');
        navigate('/login');
      } else {
        setError('Hubo un error al registrar el usuario');
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'clave') {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    } else if (name === 'confirmaClave') {
      setConfirmaClave(value);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center mb-5'>
      <div
        className='w-50 rounded'
        style={{
          backgroundColor: '#F5F5F5',
          margin: 'auto auto',
          padding: '2rem',
        }}
      >
        <h3>Registro de Clientes</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type='text'
            placeholder='Nombre'
            className='mb-3'
            name='nombre'
            value={formData.nombre}
            onChange={handleChange}
          />
          <Form.Control
            type='text'
            placeholder='Apellido'
            className='mb-3'
            name='apellidos'
            value={formData.apellidos}
            onChange={handleChange}
          />
          <Form.Control
            type='text'
            placeholder='Email'
            className='mb-3'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <Form.Control
            type='text'
            placeholder='Teléfono'
            className='mb-3'
            name='telefono'
            value={formData.telefono}
            onChange={handleChange}
          />
          <Form.Control
            type='password'
            placeholder='Ingresa tu contraseña'
            className='mb-3'
            name='clave'
            value={formData.clave}
            onChange={handleChange}
          />
          <Form.Control
            type='password'
            placeholder='Confirma tu contraseña'
            className='mb-3'
            name='confirmaClave'
            value={cofirmaClave}
            onChange={handleChange}
          />
          {formData.clave !== cofirmaClave && (
            <p className='text-danger'>Las contraseñas no coinciden</p>
          )}
          <Button
            type='submit'
            variant='primary rounded-pill'
          >
            Registrarme
          </Button>
          {error && <p className='text-danger'>{error}</p>}
        </Form>
      </div>
    </Container>
  );
};
