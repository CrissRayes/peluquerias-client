import { Button, Card, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const FavoriteCard = ({
  id,
  nombre,
  direccion,
  telefono,
  email,
  imagen,
}) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card className='mb-2'>
        <Card.Body className='d-flex align-items-center'>
          <Image
            src={imagen}
            roundedCircle
            width={100}
            height={100}
          />
          <div className='ms-3'>
            <Card.Title>{nombre}</Card.Title>
            <Card.Text>{direccion}</Card.Text>
            <Card.Text>{email}</Card.Text>
          </div>
          <Button
            variant='primary'
            className='rounded-pill ms-auto'
            onClick={() => navigate(`/reservar/${id}`)}
          >
            Reservar
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};
