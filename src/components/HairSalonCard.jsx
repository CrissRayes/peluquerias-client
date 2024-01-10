import { Card } from 'react-bootstrap';
import { FaEye, FaPencilAlt, FaTrash } from 'react-icons/fa';

export const HairSalonCard = ({
  id,
  nombre,
  direccion,
  email,
  imagen,
  handleEditarPeluqueria,
  handleVerDetalle,
  handleEliminarPeluqueria,
}) => {
  return (
    <Card
      style={{
        width: '18rem',
        margin: '1rem',
      }}
    >
      <Card.Img
        variant='top'
        src={imagen}
        style={{
          height: '200px',
        }}
      />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{direccion}</Card.Text>
        <Card.Text>{email}</Card.Text>
        <div className='d-flex justify-content-end'>
          <FaEye
            style={{
              cursor: 'pointer',
              marginRight: '1rem',
              color: 'green',
            }}
            onClick={() => handleVerDetalle(id)}
            size={20}
          />
          <FaPencilAlt
            style={{
              cursor: 'pointer',
              marginRight: '1rem',
              color: 'blue',
            }}
            onClick={() => handleEditarPeluqueria(id)}
          />
          <FaTrash
            style={{
              cursor: 'pointer',
              color: 'red',
            }}
            onClick={() => handleEliminarPeluqueria(id)}
          />
        </div>
      </Card.Body>
    </Card>
  );
};
