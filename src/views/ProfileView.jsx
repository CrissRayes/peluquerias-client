import axios from 'axios';
import { /*useContext,*/ useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
// import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const ProfileView = () => {
  // const { usuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  // const [setPreferencias] = useState({});
  const [perfilData, setPerfilData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    url_img: '',
  });

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    const { id } = jwtDecode(token);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/usuario/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPerfilData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfilData((prevPerfilData) => ({
      ...prevPerfilData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  // const handlePreferencias = (e) => {
  //   const { name, checked } = e.target;
  //   setPreferencias((prevPreferencias) => ({
  //     ...prevPreferencias,
  //     [name]: checked,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { id } = jwtDecode(token);

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/usuario/${id}`,
        perfilData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className='mb-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Perfil y Ajustes</h2>
        <Button
          variant='outline-primary'
          onClick={() => navigate('/')}
        >
          <FaArrowLeft className='me-2' />
          Volver
        </Button>
      </div>
      <div
        className='mt-3 mb-3'
        style={{
          border: '1px solid #ced4da',
          borderRadius: '5px',
          padding: '1rem',
        }}
      >
        <Button
          className='rounded-pill mb-3'
          onClick={handleEdit}
          disabled={editMode}
        >
          <FaPencilAlt /> Editar Perfil
        </Button>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type='text'
                placeholder='Nombre'
                className='mb-3'
                name='nombre'
                value={perfilData?.nombre}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              <Form.Control
                type='text'
                placeholder='Apellidos'
                className='mb-3'
                name='apellidos'
                value={perfilData?.apellidos}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              <Form.Control
                type='text'
                placeholder='Teléfono'
                className='mb-3'
                name='telefono'
                value={perfilData?.telefono}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              <Form.Control
                type='text'
                placeholder='Foto de perfil'
                className='mb-3'
                name='url_img'
                value={perfilData?.url_img}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              {editMode && (
                <div className='d-flex justify-content-start'>
                  <Button
                    variant='primary'
                    type='submit'
                    className='rounded-pill'
                  >
                    Guardar
                  </Button>
                  <Button
                    variant='warning'
                    className='rounded-pill ms-3'
                    onClick={() => {
                      setEditMode(false);
                      getUserInfo();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </Form>
          </Col>
          <Col className='d-flex justify-content-center align-items-center'>
            <div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                backgroundImage: `url(${perfilData?.url_img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </Col>
        </Row>
      </div>
      {/* <div
        className='mt-3 mb-3'
        style={{
          border: '1px solid #ced4da',
          borderRadius: '5px',
          padding: '1rem',
        }}
      >
        <Row>
          <Col>
            <h3>Preferencias</h3>
            <Form.Check
              type='switch'
              id='custom-switch'
              label='Notificaciones'
              className='mb-3'
              name='notificaciones'
              onChange={handlePreferencias}
            />
            <Form.Check
              type='switch'
              id='custom-switch'
              label='Promociones'
              className='mb-3'
              name='promociones'
              onChange={handlePreferencias}
            />
          </Col>
          <Col></Col>
        </Row>
      </div> */}
    </Container>
  );
};
