import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';

import HorariosTodasLiga from './HorariosTodasLiga';
import HorariosUmaLiga from './HorariosUmaLiga';

function Horarios(props) {
  const { liga } = props
  const [ultimosJogos, setUltimosJogos] = useState(false)
  const [corGreen, setCorGreen] = useState('#28A745')
  const [corRed, setCorRed] = useState('#DC3545')
  const [activeKey, setActiveKey] = useState(0)
  const [subActiveKey, setSubActiveKey] = useState(0)
  const [subActiveKeyColor, setSubActiveKeyColor] = useState(0)
  const [render, setRender] = useState(0)
  const [mostrarPlacar, setMostrarPlacar] = useState(true);
  const [mostrarTodasLigas, setMostrarTodasLigas] = useState(false);
  const [mercado, setMercado] = useState('Resultado FT');
  const [mercadoCard, setMercadoCard] = useState('Resultado FT - Casa');
  const botoes = ['Resultado FT', 'Resultado HT', 'Over', 'Under', 'Ambas Marcam', 'Gols', 'HT/FT', 'Par/Ímpar']
  const subBotoes = [['Casa', '1x0', '2x0', '2x1', '3x0', '3x1', '3x2', '4x0', '5+ (Casa)', 'Empate', '0x0', '1x1', '2x2', '5+ (Empate)', 'Virada', 'Fora', '0x1', '0x2', '1x2', '0x3', '1x3', '2x3', '0x4', '5+ (Fora)'], ['Casa', '1x0', '2x0', 'Empate', '0x0', '1x1', 'Outros', 'Fora', '0x1', '0x2'], ['Over 0.5', 'Over 1.5', 'Over 2.5', 'Over 3.5'], ['Under 0.5', 'Under 1.5', 'Under 2.5', 'Under 3.5'], ['Sim', 'Não'], ['0 Gols', '1 Gol', '2 Gols', '3 Gols', '4 Gols', '5+ Gols'], ['Casa/Casa', 'Casa/Fora', 'Casa/Empate', 'Fora/Casa', 'Fora/Fora', 'Fora/Empate', 'Empate/Casa', 'Empate/Fora', 'Empate/Empate'], ['Par', 'Ímpar']]
  
  useEffect(() => {
    fetch('http://164.92.126.51:5000/ultimosJogos')
      .then(response => response.json())
      .then(data => setUltimosJogos(JSON.parse(data)))
  }, [])

  function mudarGreen({ target }) {
    setCorGreen(target.value)
  } 

  function mudarRed({ target }) {
    setCorRed(target.value)
  } 

  function resetarCores() {
    setCorGreen('#28A745')
    setCorRed('#DC3545')
  }

  return ( 
    <>
      {
        ultimosJogos ? (
          <div className='p-3 bg-app'>
            <Row>
              <Col md={3} className='mb-3'>
                <Card>
                  <Card.Header className='fw-bold'>FILTROS</Card.Header>
                  <Card.Body>
                    <Row>
                      <Col> 
                        <div className="form-check mb-2">
                          <input className="form-check-input" readOnly type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={!mostrarTodasLigas} onClick={() => setMostrarTodasLigas(false)}/>
                          <label className="form-check-label fs-6" htmlFor="flexRadioDefault1">
                            Uma Liga
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" readOnly type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={mostrarTodasLigas} onClick={() => setMostrarTodasLigas(true)}/>
                          <label className="form-check-label fs-6" htmlFor="flexRadioDefault2">
                            Todas Ligas
                          </label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" checked={mostrarPlacar} type="checkbox" role="switch" onChange={() => setMostrarPlacar(!mostrarPlacar)} id="flexSwitchCheckDefault"/>
                          <label className="form-check-label fs-6" htmlFor="flexSwitchCheckDefault">Mostrar Ambos Placares</label>
                        </div>
                      </Col>
                      <Col className='d-flex flex-column'> 
                        <div className='d-flex align-items-center mb-1'>
                          <input type="color" readOnly value={corGreen} onChange={mudarGreen} className='p-1'/>
                          <span className='fs-6 ms-2'>Cor dos Greens</span>
                        </div>
                        <div className='d-flex align-items-center mb-1'>
                          <input type="color" readOnly value={corRed} onChange={mudarRed} className='p-1'/>
                          <span className='fs-6 ms-2'>Cor dos Reds</span>
                        </div>
                        <div className='d-flex align-items-center mb-1 mt-2'>
                          <Button variant="secondary" onClick={resetarCores}>Resetar Cores</Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={9} className='mb-3'>
                <Card>
                  <Card.Header className='fw-bold'>MERCADOS</Card.Header>
                  <Card.Body>
                    <Nav activeKey={0} className='row px-1'>
                      {
                        botoes.map((item, index) => {
                          return (
                            <Nav.Item key={index} className='col p-0'>
                              <Nav.Link eventKey={index}>
                                <Button onClick={() => {setActiveKey(index), setSubActiveKeyColor(-1), setMercado(item)}} className={`w-100 d-flex justify-content-center align-items-center ${activeKey === index ? 'border-secondary' : ''}`} variant={activeKey === index ? 'success' : 'secondary' } style={{'height': '3rem'}}>
                                  <p className='m-0'>{item}</p>
                                </Button>
                              </Nav.Link>
                            </Nav.Item>
                          )
                        }
                      )
                      }
                    </Nav>
                    <Nav className='pt-3 d-flex justify-content-center align-items-center'>
                      {
                        subBotoes[activeKey].map((item, index) => {
                          return (
                            <Nav.Item key={index} className='px-1'>
                              <Nav.Link eventKey={index} className='p-1'>
                                <Button onClick={() => {setSubActiveKey(index), setRender(activeKey), setSubActiveKeyColor(index), setMercadoCard(`${mercado} - ${item}`)}} className={`px-3 d-flex justify-content-center align-items-center ${subActiveKeyColor === index ? 'border-secondary' : ''}`} variant={subActiveKeyColor === index ? 'success' : 'secondary' }>
                                  <p className='m-0 fs-6'>{item}</p>
                                </Button>
                              </Nav.Link>
                            </Nav.Item>
                          )
                        }
                      )
                      }
                    </Nav>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* <Card className='mt-3'>
              <Card.Header className='fw-bold'>ESPELHAMENTO</Card.Header>
              <Card.Body>

              </Card.Body>
            </Card> */}
            <Card>
              <Card.Header className='fw-bold'>MERCADO: {mercadoCard}</Card.Header>
              <Card.Body>
                {
                  mostrarTodasLigas ? (
                    <HorariosTodasLiga 
                      ultimosJogos={ultimosJogos}
                      corGreen={corGreen}
                      corRed={corRed}
                      mostrarPlacar={mostrarPlacar}
                      activeKey={activeKey}
                      subActiveKey={subActiveKey}
                    />
                  ) : (
                    <HorariosUmaLiga
                      liga={liga}
                      ultimosJogos={ultimosJogos}
                      corGreen={corGreen}
                      corRed={corRed}
                      mostrarPlacar={mostrarPlacar}
                      activeKey={activeKey}
                      subActiveKey={subActiveKey}
                    />
                  )
                }
              </Card.Body>
            </Card>
          </div>
        ) : <div className="loading d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="light" role="status">
                <span className="visually-hidden-focusable">Loading...</span>
              </Spinner>
            </div>
      }
    </>
  );
}

export default Horarios;