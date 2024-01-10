import jwt_decode from 'jwt-decode';
import { UserContext } from '../context/UserContext';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginView = () => {
  const { setUsuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [clave, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [claveError, setClaveError] = useState('');

  useEffect(() => {
    setEmailError('');
  }, [email]);

  useEffect(() => {
    setClaveError('');
  }, [clave]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const urlServer = process.env.REACT_APP_API_URL;
    const endpoint = '/login';

    try {
      if (!email) return setEmailError('Ingrese su email');
      if (!clave) return setClaveError('Ingrese su clave');

      const response = await axios.post(urlServer + endpoint, {
        email,
        clave,
      });

      const data = response.data;
      const token = data.token;
      localStorage.setItem('token', token);
      const tokenDecoded = jwt_decode(token);
      setUsuario({
        id: tokenDecoded.id,
        email: tokenDecoded.email,
        nombre: tokenDecoded.nombre,
        imagen: tokenDecoded.imagen,
      });

      const rutaActual = localStorage.getItem('rutaActual');
      if (rutaActual) {
        navigate(rutaActual);
        localStorage.removeItem('rutaActual');
      } else {
        navigate('/');
      }
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data === 'El usuario no existe') {
        setEmailError('El usuario no existe');
      }
      if (error.response.data === 'La clave no es correcta') {
        setClaveError('La clave no es correcta');
      }
    }
  };

  return (
    <Container
      style={{
        height: 'calc(100vh - 350px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='mb-5 shadow-sm w-75'>
        <Row>
          <Col
            md={7}
            className='rounded-start'
            style={{
              backgroundColor: '#f8f9fa',
              padding: '2rem',
            }}
          >
            <h2 className='mb-5'>Te damos la Bienvenida</h2>
            <p>
              En esta plataforma podrás encontrar las mejores peluquerías de la
              ciudad, con los mejores precios y los mejores profesionales. Si
              eres dueño de una peluquería, también podrás registrarte y ofrecer
              tus servicios.
            </p>
          </Col>
          <Col
            md={5}
            className='rounded-end'
            style={{
              padding: '2rem',
            }}
          >
            <h3>Inicia Sesión</h3>
            <Form
              onSubmit={handleLogin}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <Form.Control
                type='email'
                placeholder='Ingresa tu correo'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
              />
              {emailError && <p className='text-danger'>{emailError}</p>}
              <Form.Control
                type='password'
                placeholder='Ingresa tu contraseña'
                value={clave}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setClaveError('');
                }}
              />
              {claveError && <p className='text-danger'>{claveError}</p>}
              <Button
                variant='primary'
                type='submit'
                className='rounded-pill'
              >
                Ingresar
              </Button>
            </Form>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1rem',
              }}
            >
              <div>¿Aún no tienes cuenta?</div>
              <Button
                variant='outline-primary'
                className='rounded-pill'
              >
                Regístrate
              </Button>
            </div>
            <p className='text-center mt-5 fw-bold'>Olvidé mi contraseña</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
