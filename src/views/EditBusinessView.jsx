import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { editPeluqueria } from '../services/peluqueriaService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';

export const EditBusinessView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const [editMode, setEditMode] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
    url_img: '',
  });

  const peluquerias = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/peluquerias/${id}`
      );
      setFormData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getServicios = async (id) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/peluqueria/${id}/servicios`
        );
        setServicios(data);
      } catch (error) {
        console.log(error);
      }
    };
    getServicios(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    peluquerias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editPeluqueria(id, formData);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id, idServicio) => {
    const confirmacion = window.confirm(
      '¿Está seguro que desea eliminar el servicio?'
    );

    if (!confirmacion) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/peluqueria/${id}/servicios/${idServicio}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Servicio eliminado con éxito');
      setServicios((prevServicios) =>
        prevServicios.filter((servicio) => servicio.id !== idServicio)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Editar Peluquería</h2>
        <Button
          className='mb-3'
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
          onClick={handleEdit}
          disabled={editMode}
        >
          <FaPencilAlt /> Editar Peluquería
        </Button>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Control
                type='text'
                placeholder='Nombre'
                className='mb-3'
                name='nombre'
                value={formData?.nombre}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              <Form.Control
                type='text'
                placeholder='Dirección'
                className='mb-3'
                name='direccion'
                value={formData?.direccion}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              <Form.Control
                type='text'
                placeholder='Teléfono'
                className='mb-3'
                name='telefono'
                value={formData?.telefono}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              <Form.Control
                type='text'
                placeholder='Email'
                className='mb-3'
                name='email'
                value={formData?.email}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
              <Form.Control
                type='text'
                placeholder='URL Imagen'
                className='mb-3'
                name='url_img'
                value={formData?.url_img}
                readOnly={!editMode}
                onChange={handleChange}
                style={{ color: editMode ? 'black' : 'gray' }}
              />
            </Col>
          </Row>
          {editMode && (
            <div className='d-flex justify-content-end'>
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
                  peluquerias();
                }}
              >
                Cancelar
              </Button>
            </div>
          )}
        </Form>
      </div>
      <div>
        <h2>Editar Servicios</h2>
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
            onClick={() => navigate(`/crear-servicio/${id}`)}
          >
            <FaPlus /> Crear Servicio
          </Button>
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.nombre}</td>
                  <td>{servicio.precio}</td>
                  <td>{servicio.descripcion}</td>
                  <td>
                    <Button
                      className='rounded-pill'
                      variant='success'
                      onClick={() =>
                        navigate(`/editar-servicio/${servicio.id}`)
                      }
                    >
                      <FaPencilAlt />
                    </Button>
                  </td>
                  <td>
                    <Button
                      className='rounded-pill'
                      variant='danger'
                      onClick={() => handleDelete(id, servicio.id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};
