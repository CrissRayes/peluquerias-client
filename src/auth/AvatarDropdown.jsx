import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaDoorClosed,
  FaDoorOpen,
  FaHandScissors,
  FaHeart,
  FaPlus,
  FaUser,
} from 'react-icons/fa';

export const AvatarDropdown = () => {
  const { usuario, setUsuario } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () => {
    setUsuario(false);
    localStorage.removeItem('token');
    localStorage.removeItem('rutaActual');
    navigate('/');
  };

  const handleLogin = (path) => {
    if (!usuario) {
      localStorage.setItem('rutaActual', path);
      return navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <Dropdown align={'end'}>
      <Dropdown.Toggle
        variant='transparent'
        id='dropdown-basic'
      >
        <Image
          src={usuario ? usuario.imagen : 'https://via.placeholder.com/150'}
          roundedCircle
          width={40}
          height={40}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu className='p-2'>
        <Dropdown.Header>
          <Image
            src={usuario ? usuario.imagen : 'https://via.placeholder.com/150'}
            roundedCircle
            width={40}
            height={40}
          />

          <span
            className='ms-2'
            style={{
              verticalAlign: 'middle',
              lineHeight: '40px',
              color: '#000',
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
          >
            {usuario ? usuario.nombre : 'Invitado'}
          </span>
        </Dropdown.Header>
        <h5 className='mt-3'>Mis Compras</h5>
        <Dropdown.Item
          className='border-bottom'
          onClick={() => handleLogin('/historial')}
        >
          <div className='d-flex align-items-center'>
            <FaCalendarCheck className='me-2' />
            Mis Reservas
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          className='border-bottom'
          onClick={() => handleLogin('/favoritos')}
        >
          <div className='d-flex align-items-center'>
            <FaHeart className='me-2' />
            Mis Favoritos
          </div>
        </Dropdown.Item>
        <h5 className='mt-3'>Mis Negocios</h5>
        <Dropdown.Item
          className='border-bottom'
          onClick={() => handleLogin('/mis-peluquerias')}
        >
          <div className='d-flex align-items-center'>
            <FaHandScissors className='me-2' />
            Mis Peluquerías
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          className='border-bottom'
          onClick={() => handleLogin('/crear-peluqueria')}
        >
          <div className='d-flex align-items-center'>
            <FaPlus className='me-2' />
            Crear Peluquería
          </div>
        </Dropdown.Item>
        <h5 className='mt-3'>Mi Cuenta</h5>
        <Dropdown.Item
          className='border-bottom'
          onClick={() => handleLogin('/perfil')}
        >
          <div className='d-flex align-items-center'>
            <FaUser className='me-2' />
            Mi Perfil
          </div>
        </Dropdown.Item>
        {usuario ? (
          <Dropdown.Item
            className='border-bottom'
            onClick={logOut}
          >
            <div className='d-flex align-items-center'>
              <FaDoorClosed className='me-2' />
              Cerrar Sesión
            </div>
          </Dropdown.Item>
        ) : (
          <Dropdown.Item
            className='border-bottom'
            onClick={() => navigate('/login')}
          >
            <div className='d-flex align-items-center'>
              <FaDoorOpen className='me-2' />
              Iniciar Sesión
            </div>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
