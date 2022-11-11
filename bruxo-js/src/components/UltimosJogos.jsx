import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { FaClock } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import Spinner from 'react-bootstrap/Spinner';

import flags_euro from '../assets/bandeiras_euro/export_euro';
import flags_copa from '../assets/bandeiras_copa/export_copa';
import flags_premier from '../assets/bandeiras_premier/export_premier';
import flags_super from '../assets/bandeiras_super/export_super';

function UltimosJogos(props) {
  const { setLiga, setCasa, setFora, setMenu } = props 
  const [qtdJogos, setQtdJogos] = useState(20);
  const [dados, setDados] = useState(false);

  useEffect(() => {
    fetch('http://164.92.126.51:5000/ultimosJogos')
      .then(response => response.json())
      .then(data => setDados(JSON.parse(data)))
  }, [])

  useEffect(() => {
    if (dados) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setQtdJogos((qtdJogos) => qtdJogos + 10);
        }
      });
        
      intersectionObserver.observe(document.querySelector('#sentinela'))
      return () => {
        intersectionObserver.disconnect()
      }
    }
  }, [dados])

  function goOdds(casa, fora, liga) {
    setCasa(casa - 1);
    setFora(fora - 1);
    setLiga(liga);
    setMenu('odds');
  }

  return ( 
    <>
      {
        dados ? (
          <Row className='p-3 m-0 bg-app w-100'>
            <Col md={3} className='p-0'>
              <Card className='shadow m-1 p-0'>
                <Card.Header className='fw-bold'>EUROCUP</Card.Header>
                <Card.Body>
                  {
                  dados[0]['dados'][1].slice(0, qtdJogos).map((jogo, index) => {
                    const { CasaFlag, Casa, PlacarCasa, Hora, ForaFlag, Fora, PlacarFora, Gol } = jogo;
                    const placarCasaSplit = PlacarCasa.split(' ');
                    const placarForaSplit = PlacarFora.split(' ');

                    return (
                      <div key={index} className='container c-pad'>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_euro[`flag${CasaFlag}`]} className='col' style={{ width: '32px', height: '32px' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Casa}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] > placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] < placarForaSplit[0] ? 'text-danger' : '') }`}>{placarCasaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarCasaSplit[1]}</span>
                          </div>
                          <Badge bg="dark" className='col-2 my-auto d-flex' style={{ 'fontSize': '0.8rem'}}><FaClock className='me-1' />{Hora}</Badge>
                        </div>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_euro[`flag${ForaFlag}`]} className='col' style={{ width: '2rem', height: '2rem' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Fora}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] < placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] > placarForaSplit[0] ? 'text-danger' : '') }`}>{placarForaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarForaSplit[1]}</span>
                          </div>
                          <Button className='col-2 my-auto text-center p-1' variant='success' style={{ 'fontSize': '0.9rem'}} onClick={() => goOdds(CasaFlag, ForaFlag, 'euro')}>Odds</Button>
                        </div>
                        <div className='row mt-1 text-center'>
                          <span className='col-12 gol'><IoIosFootball className='me-1' />{Gol}</span>
                        </div>
                        <hr/>
                      </div>
                    )
                  }
                  )
                  }
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className='p-0'>
              <Card className='shadow m-1'>
                <Card.Header className='fw-bold'>CAMPEONATO DO MUNDO</Card.Header>
                <Card.Body>
                  {
                  dados[0]['dados'][0].slice(0, qtdJogos).map((jogo, index) => {
                    const { CasaFlag, Casa, PlacarCasa, Hora, ForaFlag, Fora, PlacarFora, Gol } = jogo;
                    const placarCasaSplit = PlacarCasa.split(' ');
                    const placarForaSplit = PlacarFora.split(' ');

                    return (
                      <div key={index} className='container c-pad'>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_copa[`flag${CasaFlag}`]} className='col' style={{ width: '32px', height: '32px' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Casa}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] > placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] < placarForaSplit[0] ? 'text-danger' : '') }`}>{placarCasaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarCasaSplit[1]}</span>
                          </div>
                          <Badge bg="dark" className='col-2 my-auto d-flex' style={{ 'fontSize': '0.8rem'}}><FaClock className='me-1' />{Hora}</Badge>
                        </div>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_copa[`flag${ForaFlag}`]} className='col' style={{ width: '2rem', height: '2rem' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Fora}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] < placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] > placarForaSplit[0] ? 'text-danger' : '') }`}>{placarForaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarForaSplit[1]}</span>
                          </div>
                          <Button className='col-2 my-auto text-center p-1' variant='success' style={{ 'fontSize': '0.9rem'}} onClick={() => goOdds(CasaFlag, ForaFlag, 'copa')}>Odds</Button>
                        </div>
                        <div className='row mt-1 text-center'>
                          <span className='col-12 gol'><IoIosFootball className='me-1' />{Gol}</span>
                        </div>
                        <hr/>
                      </div>
                    )
                  }
                  )
                  }
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className='p-0'>
              <Card className='shadow m-1 p-0'>
                <Card.Header className='fw-bold'>PREMIER</Card.Header>
                <Card.Body>
                  {
                  dados[0]['dados'][2].slice(0, qtdJogos).map((jogo, index) => {
                    const { CasaFlag, Casa, PlacarCasa, Hora, ForaFlag, Fora, PlacarFora, Gol } = jogo;
                    const placarCasaSplit = PlacarCasa.split(' ');
                    const placarForaSplit = PlacarFora.split(' ');

                    return (
                      <div key={index} className='container c-pad'>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_premier[`flag${CasaFlag}`]} className='col' style={{ width: '32px', height: '32px' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Casa}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] > placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] < placarForaSplit[0] ? 'text-danger' : '') }`}>{placarCasaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarCasaSplit[1]}</span>
                          </div>
                          <Badge bg="dark" className='col-2 my-auto d-flex' style={{ 'fontSize': '0.8rem'}}><FaClock className='me-1' />{Hora}</Badge>
                        </div>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_premier[`flag${ForaFlag}`]} className='col' style={{ width: '2rem', height: '2rem' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Fora}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] < placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] > placarForaSplit[0] ? 'text-danger' : '') }`}>{placarForaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarForaSplit[1]}</span>
                          </div>
                          <Button className='col-2 my-auto text-center p-1' variant='success' style={{ 'fontSize': '0.9rem'}} onClick={() => goOdds(CasaFlag, ForaFlag, 'premier')}>Odds</Button>
                        </div>
                        <div className='row mt-1 text-center'>
                          <span className='col-12 gol'><IoIosFootball className='me-1' />{Gol}</span>
                        </div>
                        <hr/>
                      </div>
                    )
                  }
                  )
                  }
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className='p-0'>
              <Card className='shadow m-1 p-0'>
                <Card.Header className='fw-bold'>SUPERLIGA</Card.Header>
                <Card.Body>
                  {/* {
                  dados[0]['dados'][3].slice(0, qtdJogos).map((jogo, index) => {
                    const { CasaFlag, Casa, PlacarCasa, Hora, ForaFlag, Fora, PlacarFora, Gol } = jogo;
                    const placarCasaSplit = PlacarCasa.split(' ');
                    const placarForaSplit = PlacarFora.split(' ');

                    return (
                      <div key={index} className='container c-pad'>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_super[`flag${CasaFlag}`]} className='col' style={{ width: '32px', height: '32px' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Casa}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] > placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] < placarForaSplit[0] ? 'text-danger' : '') }`}>{placarCasaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarCasaSplit[1]}</span>
                          </div>
                          <Badge bg="dark" className='col-2 my-auto d-flex' style={{ 'fontSize': '0.8rem'}}><FaClock className='me-1' />{Hora}</Badge>
                        </div>
                        <div className='row ml-lg-1 ml-md-0 mb-2'>
                          <img src={flags_super[`flag${ForaFlag}`]} className='col' style={{ width: '2rem', height: '2rem' }} />
                          <span className='col-5 text-left my-auto name-wrap p-0'>{Fora}</span>
                          <div className='col-3 text-right my-auto border-right'>
                            <span className={`mx-1 fw-bold ${placarCasaSplit[0] < placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] > placarForaSplit[0] ? 'text-danger' : '') }`}>{placarForaSplit[0]}</span>
                            <span className='fw-bold fs-6'>{placarForaSplit[1]}</span>
                          </div>
                          <Button className='col-2 my-auto text-center p-1' variant='success' style={{ 'fontSize': '0.9rem'}} onClick={() => goOdds(CasaFlag, ForaFlag, 'super')}>Odds</Button>
                        </div>
                        <div className='row mt-1 text-center'>
                          <span className='col-12 gol'><IoIosFootball className='me-1' />{Gol}</span>
                        </div>
                        <hr/>
                      </div>
                    )
                  }
                  )
                  } */}
                </Card.Body>
              </Card>
            </Col>
            <div id='sentinela' style={{ width: '100%', height: '0.1rem' }}></div>
          </Row>
        ) : <div className="loading d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="light" role="status">
                <span className="visually-hidden-focusable">Loading...</span>
              </Spinner>
            </div>
      }
    </>
  );
}

export default UltimosJogos;