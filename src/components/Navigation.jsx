import { Button, Col, Container, Navbar, NavbarBrand } from 'react-bootstrap';
import { AvatarDropdown } from '../auth/AvatarDropdown';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from './Search';

export const Navigation = () => {
  const navigate = useNavigate();
  const { usuario } = useContext(UserContext);

  return (
    <Navbar style={{ minHeight: '150px' }}>
      <Container>
        <NavbarBrand
          style={{ cursor: 'pointer' }}
          className='ms-2'
          onClick={() => navigate('/')}
        >
          <img
            src='/logo.png'
            width='150'
            className='d-inline-block align-top'
            alt='React Bootstrap logo'
          />
        </NavbarBrand>
        <Col md={6}>
          <Search />
        </Col>
        <Col
          md={3}
          className='d-flex justify-content-end'
        >
          <Button
            variant='outline-primary'
            className={'rounded-pill me-2'}
            disabled={usuario}
            onClick={() => navigate('/login')}
          >
            Inicia Sesión
          </Button>
          <Button
            variant='primary'
            className={'rounded-pill'}
            disabled={usuario}
            onClick={() => navigate('/registrate')}
          >
            Registrarse
          </Button>
        </Col>
        <AvatarDropdown />
      </Container>
    </Navbar>
  );
};
