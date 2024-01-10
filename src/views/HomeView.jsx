import { FeaturedCard } from '../components/FeaturedCard';
import { Col, Container, Row } from 'react-bootstrap';
import { useDataPeluquerias } from '../hooks/useDataPeluquerias';
import { useSearch } from '../context/SearchContext';
import { Carrusel } from '../components/Carrusel';

export const HomeView = () => {
  const { search } = useSearch();
  const peluquerias = useDataPeluquerias();

  const searchResult = !search
    ? peluquerias
    : peluquerias.filter((peluqueria) =>
        peluqueria.nombre.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <Container className='mb-5'>
      <Carrusel />
      <Row>
        {searchResult?.map((peluqueria, index) => (
          <Col
            key={index}
            lg={6}
            md={12}
            sm={12}
          >
            <FeaturedCard
              key={peluqueria.id}
              id={peluqueria.id}
              nombre={peluqueria.nombre}
              direccion={peluqueria.direccion}
              telefono={peluqueria.telefono}
              imagen={peluqueria.url_img}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
