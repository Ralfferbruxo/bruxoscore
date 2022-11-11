import euro_png from '../assets/euro.png';
import premier_png from '../assets/premier.png';
import super_png from '../assets/champions-white.png';
import copa_png from '../assets/copa.png';
import bruxos_png from '../assets/bruxos.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaHome, FaBackward, FaForward, FaCalendarAlt, FaHistory, 
  FaRobot, FaClock, FaBullseye, FaUserAlt, FaMoneyCheckAlt, FaKey, 
  FaUserClock, FaSignOutAlt } from "react-icons/fa";
import './Header.css';

function Header(props) {
  const { setLogin, liga } = props;
  return ( 
    <div className='w-100 bg-navbar m-0 p-0'>
      <div className='d-flex flex-column'>
        <div>
          <Navbar collapseOnSelect expand="lg" variant="dark" className='p-0 bg-navbar-blue m-0'>
            <Navbar.Brand className='p-0 m-0'>
              <img src={bruxos_png} style={{ width: '4rem', height: '4rem' }} />
              <span className='align-middle fs-1'>BRUXO SCORE</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className='fw-bold align-middle'>
              <Nav activeKey={props.menu} className="me-auto ms-5">
                <Nav.Link onClick={() => props.setMenu('inicio')} eventKey='inicio' className='d-flex align-items-center rounded-0'>
                  <FaHome className='me-1' />
                  Início
                </Nav.Link>
                <Nav.Link onClick={() => props.setMenu('ult. jogos')} eventKey='ult. jogos' className='d-flex align-items-center rounded-0'>
                  <FaBackward className='me-1' />
                  <p className='m-0'>Últ. Jogos</p>
                </Nav.Link>
                <Nav.Link onClick={() => props.setMenu('prox. jogos')} eventKey='prox. jogos' className='d-flex align-items-center rounded-0'>
                  <FaForward className='me-1' />
                  <p className='m-0'>Próx. Jogos</p>
                </Nav.Link>
                <NavDropdown 
                  title={
                  <div className={`p-1 d-inline-flex align-items-center ${
                    props.menu === 'jogos' || props.menu === 'artilheiros' || props.menu === 'tabelas' || props.menu === 'rankings' ? 'activeDropdown' : ''
                  }`}>
                    <FaCalendarAlt />
                    <span className='ms-1'>Hoje</span>
                  </div>
                  }
                  id="collasible-nav-dropdown">
                  <NavDropdown.Item eventKey='tabelas' onClick={() => props.setMenu('tabelas')}>Tabelas</NavDropdown.Item>
                  <NavDropdown.Item eventKey='artilheiros' onClick={() => props.setMenu('artilheiros')}>Artilheiros</NavDropdown.Item>
                  {/* <NavDropdown.Item eventKey='calculadora' onClick={() => props.setMenu('calculadora')}>Calculadora</NavDropdown.Item> */}
                  <NavDropdown.Item eventKey='rankings' onClick={() => props.setMenu('rankings')}>Rankings</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown 
                  title={
                  <div className={`p-1 d-inline-flex align-items-center ${
                    props.menu === 'maximas' || props.menu === 'odds' ? 'activeDropdown' : ''
                  }`}>
                    <FaHistory />
                    <span className='ms-1'>Hist.</span>
                  </div>
                  } 
                  id="collasible-nav-dropdown">
                  <NavDropdown.Item eventKey='maximas' onClick={() => props.setMenu('maximas')}>Máximas</NavDropdown.Item>
                  <NavDropdown.Item eventKey='odds' onClick={() => props.setMenu('odds')}>Odds</NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link eventKey='padroes' onClick={() => props.setMenu('padroes')} className='d-flex align-items-center rounded-0'>
                  <FaRobot className='me-1' />
                  Padrões
                </Nav.Link> */}
                <Nav.Link eventKey='horarios' onClick={() => props.setMenu('horarios')} className='d-flex align-items-center rounded-0'>
                  <FaClock className='me-1' />
                  Horários
                </Nav.Link>
                {/* <Nav.Link eventKey='simulador' onClick={() => props.setMenu('simulador')} className='d-flex align-items-center rounded-0'>
                  <FaBullseye className='me-1' />
                  Simulador
                </Nav.Link> */}
                <NavDropdown 
                  title={
                  <div className={`p-1 d-inline-flex align-items-center rounded-0 ${
                    props.menu === 'renovacao' || props.menu === 'senha' || props.menu === 'vencimento' || props.menu === 'logout' ? 'activeDropdown' : ''
                  }`}>
                    <FaUserAlt />
                    <span className='ms-1'>Conta</span>
                  </div>
                  } 
                  id="collasible-nav-dropdown">
                  <NavDropdown.Item eventKey='renovacao'
                    // onClick={() => props.setMenu('renovacao')}
                  >
                    <FaMoneyCheckAlt className='me-2'/>
                    Renovação
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey='senha'
                    // onClick={() => props.setMenu('senha')}
                  >
                    <FaKey className='me-2'/>
                    Trocar Senha
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey='vencimento'
                    // onClick={() => props.setMenu('vencimento')}
                  >
                    <FaUserClock className='me-2'/>
                    Venc. xx/xx/xxxx
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey='logout' onClick={() => props.setLogin(false)}>
                    <FaSignOutAlt className='me-2'/>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Navbar collapseOnSelect expand="lg" variant="dark" className='p-0 bg-navbar m-0 d-flex'>
            <Nav.Link onClick={() => props.setLiga('euro')} eventKey='euro' className='d-flex align-items-center p-1 m-0 liga w-25 bg-euro'>
              <div className='w-100 d-flex'>
                <span className='ms-2 fs-2 text-white'>EURO</span>
              </div>
            </Nav.Link>
            <Nav.Link onClick={() => props.setLiga('copa')} eventKey='copa' className='d-flex align-items-center p-1 m-0 liga w-25 bg-copa'>
              <div className='w-100 d-flex'>
                <span className='ms-2 fs-2 text-white'>COPA</span>
              </div>
            </Nav.Link>
            <Nav.Link onClick={() => props.setLiga('premier')} eventKey='premier' className='d-flex align-items-center p-1 m-0 liga w-25 bg-premier'>
              <div className='w-100 d-flex'>
                <span className='ms-2 fs-2 text-white'>PREMIER</span>
              </div>
            </Nav.Link>
            <Nav.Link 
              // onClick={() => props.setLiga('super')}
              eventKey='super' className='d-flex align-items-center p-1 m-0 liga w-25 bg-super'>
              <div className='w-100 d-flex'>
                <span className='ms-2 fs-2 text-white'>SUPER</span>
              </div>
            </Nav.Link>
          </Navbar>
          {/* style={{ filter: liga === 'super' ? 'invert(75%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)' : ''}} */}
        </div>
      </div>
    </div>
  );
}

export default Header;