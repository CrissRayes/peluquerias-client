import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer
      style={{
        minHeight: '200px',
      }}
    >
      <Container>
        <Row>
          <Col sm={4}>
            <p>© {new Date().getFullYear()} Kraifu Web Development</p>
          </Col>
          <Col sm={4}>
            <ul>
              <li>Políticas y Términos</li>
              <li>Contacto</li>
            </ul>
          </Col>
          <Col sm={4}>
            <ul className='social-icons'>
              <li>
                <a
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href='https://www.facebook.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href='https://www.instagram.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
