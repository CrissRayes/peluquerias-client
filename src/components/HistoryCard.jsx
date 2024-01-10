import { Button, Card, Container, Image } from 'react-bootstrap';

export const HistoryCard = ({
  id,
  fecha,
  hora,
  monto,
  nombre,
  direccion,
  telefono,
  imagen,
  estado,
}) => {
  return (
    <Container className='d-flex justify-content-center align-items-center'>
      <Card className='mb-2 w-100'>
        <Card.Body className='d-flex align-items-center'>
          <Image
            src={imagen}
            roundedCircle
            width={100}
            height={100}
          />
          <div className='ms-3'>
            <Card.Text>
              {estado && (
                <span className='badge bg-success text-white'>
                  Reserva Activa
                </span>
              )}
            </Card.Text>
            <Card.Title>{nombre}</Card.Title>
            <Card.Title>{direccion}</Card.Title>
            <Card.Text>
              {fecha} - {hora}
            </Card.Text>
            <Card.Text>${monto?.toLocaleString('es-CL')}</Card.Text>
          </div>
          <div
            style={{
              marginLeft: 'auto',
            }}
          >
            <Button variant='danger'>Anular</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};
