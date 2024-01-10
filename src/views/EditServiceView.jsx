import { Container, Button, Row, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaPencilAlt } from 'react-icons/fa';

export const EditServiceView = () => {
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
  });
  const [editMode, setEditMode] = useState(false);

  // obtener los datos del servicio
  const getServicio = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/servicios/${id}`
      );
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServicio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/servicios/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setFormData(data);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Editar Servicio</h2>
        <Button
          variant='outline-primary'
          onClick={() => navigate(-1)}
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
          disabled={editMode}
          onClick={handleEdit}
        >
          <FaPencilAlt /> Editar Servicio
        </Button>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Control
              type='text'
              placeholder='Nombre'
              className='mb-3'
              name='nombre'
              value={formData?.nombre}
              readOnly={!editMode}
              onChange={handleChange}
              style={{
                color: editMode ? 'black' : 'gray',
              }}
            />
            <Form.Control
              type='text'
              placeholder='Precio'
              className='mb-3'
              name='precio'
              value={formData?.precio}
              readOnly={!editMode}
              onChange={handleChange}
              style={{
                color: editMode ? 'black' : 'gray',
              }}
            />
            <Form.Control
              type='text'
              placeholder='Descripción'
              className='mb-3'
              name='descripcion'
              value={formData?.descripcion}
              readOnly={!editMode}
              onChange={handleChange}
              style={{
                color: editMode ? 'black' : 'gray',
              }}
            />
          </Row>
          {editMode && (
            <div>
              <Button
                type='submit'
                className='rounded-pill mb-5 me-3'
                variant='success'
              >
                Guardar
              </Button>
              <Button
                className='rounded-pill mb-5'
                variant='warning'
                onClick={() => {
                  setEditMode(false);
                  getServicio();
                }}
              >
                Cancelar
              </Button>
            </div>
          )}
        </Form>
      </div>
    </Container>
  );
};
