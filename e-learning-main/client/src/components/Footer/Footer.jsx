import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='text-center text-white bg-light text-lg-start'
      style={{
        background: "#0575E6",  /* fallback pour les anciens navigateurs */
        background: "-webkit-linear-gradient(to right, #021B79, #0575E6)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to right, #021B79, #0575E6)", 

      }}
    >
      <section className='p-4 d-flex justify-content-center justify-content-lg-between border-bottom' id='footer'>
        <div className='me-5 d-none d-lg-block'>
          <span>Connectez-vous avec nous sur les réseaux sociaux :</span>
        </div>

        <div>
          <a href='https://www.facebook.com/sfectoria' className='me-4 text-reset'>
            <FaFacebookF />
          </a>
       
          <a href='https://www.sfectoria.com/' className='me-4 text-reset'>
            <FaGoogle />
          </a>
          <a href='https://www.instagram.com/sfectoria.tn/' className='me-4 text-reset'>
            <FaInstagram />
          </a>
          <a href='https://www.linkedin.com/company/sfectoria/' className='me-4 text-reset'>
            <FaLinkedin />
          </a>
   
        </div>
      </section>

      <section className=''>
        <Container className='mt-5 text-center text-md-start'>
          <Row className='mt-3'>
            <Col md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='mb-4 text-uppercase fw-bold'>
                <FaGithub className="me-3" />
               Sfectoria
              </h6>
              <p>
              Libérez votre croissance numérique avec SFECTORIA: Créer des expériences Web et mobiles exceptionnelles
              </p>
            </Col>

            <Col md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='mb-4 text-uppercase fw-bold'>Produits</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Angular
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Vue
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Laravel
                </a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='mb-4 text-uppercase fw-bold'>Liens utiles</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Tarification
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Paramètres
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Commandes
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Aide
                </a>
              </p>
            </Col>

            <Col md="4" lg="3" xl="3" className='mx-auto mb-4 mb-md-0'>
              <h6 className='mb-4 text-uppercase fw-bold'>Contact</h6>
              <p>
                <FaGithub className="me-2" />
                75 Rue Khaireddine Pacha, Pacha Center Building, Block C, 1st floor, Office C2, Montplaisir, Tunis.
              </p>
              <p>
                <FaEnvelope className="me-3" />
                contact@sfectoria.com
              </p>
             
              <p>
                <FaPrint className="me-3" /> (+216) 55 180 992
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className='p-4 text-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright :
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Sfectoria.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
