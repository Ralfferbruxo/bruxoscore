import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FaClock } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Inicio.css';
import Grafico from './Grafico';
import Spinner from 'react-bootstrap/Spinner';

function Inicio(props) {
  const { liga, dados, flags, setMenu, setCasa, setFora } = props;
  const [ultimosJogos, setUltimosJogos] = useState(false);

  // const T_UG_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[0]['UNDER GOLS']);
  // const T_UG_values = Object.values(dados[0]['dados'].Tend\u00eancias[0]['UNDER GOLS']);
  // const T_PF_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[1]['PLACAR - FINAL']);
  // const T_PF_values = Object.values(dados[0]['dados'].Tend\u00eancias[1]['PLACAR - FINAL']);
  // const T_GS_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[2]['GOAL SCORER']);
  // const T_GS_values = Object.values(dados[0]['dados'].Tend\u00eancias[2]['GOAL SCORER']);
  // const T_OG_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[3]['OVER GOLS']);
  // const T_OG_values = Object.values(dados[0]['dados'].Tend\u00eancias[3]['OVER GOLS']);
  // const T_GE_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[4]['GOLS EXATOS']);
  // const T_GE_values = Object.values(dados[0]['dados'].Tend\u00eancias[4]['GOLS EXATOS']);
  // const T_PI_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[5]['PLACAR - INTERVALO']);
  // const T_PI_values = Object.values(dados[0]['dados'].Tend\u00eancias[5]['PLACAR - INTERVALO']);
  // const T_RA_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[6]['RESULTADO / AMBAS']);
  // const T_RA_values = Object.values(dados[0]['dados'].Tend\u00eancias[6]['RESULTADO / AMBAS']);
  // const T_FI_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[7]['1X2 - FINAL']);
  // const T_FI_values = Object.values(dados[0]['dados'].Tend\u00eancias[7]['1X2 - FINAL']);
  // const T_IN_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[8]['1X2 - INTERVALO']);
  // const T_IN_values = Object.values(dados[0]['dados'].Tend\u00eancias[8]['1X2 - INTERVALO']);
  // const T_AM_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[9]['AMBAS MARCAM']);
  // const T_AM_values = Object.values(dados[0]['dados'].Tend\u00eancias[9]['AMBAS MARCAM']);
  // const T_CM_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[10]['CASA MARCAR']);
  // const T_CM_values = Object.values(dados[0]['dados'].Tend\u00eancias[10]['CASA MARCAR']);
  // const T_FM_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[11]['FORA MARCAR']);
  // const T_FM_values = Object.values(dados[0]['dados'].Tend\u00eancias[11]['FORA MARCAR']);
  // const T_IF_keys = Object.keys(dados[0]['dados'].Tend\u00eancias[12]['INTERVALO / FINAL']);
  // const T_IF_values = Object.values(dados[0]['dados'].Tend\u00eancias[12]['INTERVALO / FINAL']);

  useEffect(() => {
    fetch('http://164.92.126.51:5000/ultimosJogos')
      .then(response => response.json())
      .then(data => setUltimosJogos(JSON.parse(data)))
  }, [])

  useEffect(() => {
    fetch('http://164.92.126.51:5000/ultimosJogos')
      .then(response => response.json())
      .then(data => setUltimosJogos(JSON.parse(data)))
  }, [dados])

  function goOdds(casa, fora) {
    if (liga === 'copa' && (Number(casa) > 16 || Number(fora) > 16)) {
      setCasa(1);
      setFora(2);
      setMenu('odds');
    } else {
      setCasa(casa - 1);
      setFora(fora - 1);
      setMenu('odds');
    }
  }
  
  return (
      <Row className='p-3 m-0 bg-app w-100'>
        <Col md={4} className='p-0'>
          <Card className='shadow'>
            <Card.Header className='fw-bold'>ÚLTIMAS PARTIDAS</Card.Header>
            <Card.Body>
              {
              dados[0]['dados'].Jogos.map((jogo, index) => {
                const { CasaFlag, Casa, PlacarCasa, Hora, ForaFlag, Fora, PlacarFora, Gol } = jogo;
                const placarCasaSplit = PlacarCasa.split(' ');
                const placarForaSplit = PlacarFora.split(' ');

                return (
                  <div key={index} className='container c-pad'>
                    <div className='row ml-lg-1 ml-md-0 mb-2'>
                      <img src={flags[`flag${CasaFlag}`]} className='col' style={{ width: '32px', height: '32px' }} />
                      <span className='col-5 text-left my-auto name-wrap p-0'>{Casa}</span>
                      <div className='col-3 text-right my-auto border-right'>
                        <span className={`mx-1 fw-bold ${placarCasaSplit[0] > placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] < placarForaSplit[0] ? 'text-danger' : '') }`}>{placarCasaSplit[0]}</span>
                        <span className='fw-bold fs-6'>{placarCasaSplit[1]}</span>
                      </div>
                      <Badge bg="dark" className='col-2 my-auto d-flex justify-content-center' style={{ 'fontSize': '0.8rem'}}><FaClock className='me-1' />{Hora}</Badge>
                    </div>
                    <div className='row ml-lg-1 ml-md-0 mb-2'>
                      <img src={flags[`flag${ForaFlag}`]} className='col' style={{ width: '2rem', height: '2rem' }} />
                      <span className='col-5 text-left my-auto name-wrap p-0'>{Fora}</span>
                      <div className='col-3 text-right my-auto border-right'>
                        <span className={`mx-1 fw-bold ${placarCasaSplit[0] < placarForaSplit[0] ? 'text-success' : (placarCasaSplit[0] > placarForaSplit[0] ? 'text-danger' : '') }`}>{placarForaSplit[0]}</span>
                        <span className='fw-bold fs-6'>{placarForaSplit[1]}</span>
                      </div>
                      <Button className='col-2 my-auto text-center p-1' variant='success' onClick={() => goOdds(CasaFlag, ForaFlag)}>Odds</Button>
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
        <Col md={8}>
          <Card className='shadow mb-4'>
            <Card.Header className='fw-bold'>TENDÊNCIA DO MERCADO</Card.Header>
            <Card.Body className='d-flex justify-content-center align-items-center'>
              {
                ultimosJogos ? <Grafico liga={liga} ultimosJogos={ultimosJogos}/> : <Spinner animation="border" variant="primary" />
              }
            </Card.Body>
          </Card>
          <Row>
            <Col>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>UNDER GOLS</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[0]['UNDER GOLS']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[0]['UNDER GOLS'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>PLACAR - FINAL</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[1]['PLACAR - FINAL']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[1]['PLACAR - FINAL'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>GOAL SCORER</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[2]['GOAL SCORER']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[2]['GOAL SCORER'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>OVER GOLS</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[3]['OVER GOLS']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[3]['OVER GOLS'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>GOLS EXATOS</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[4]['GOLS EXATOS']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[4]['GOLS EXATOS'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>PLACAR - INTERVALO</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[5]['PLACAR - INTERVALO']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[5]['PLACAR - INTERVALO'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>RESULTADO / AMBAS</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[6]['RESULTADO / AMBAS']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[6]['RESULTADO / AMBAS'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>1X2 - FINAL</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[7]['1X2 - FINAL']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[7]['1X2 - FINAL'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>1X2 - INTERVALO</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[8]['1X2 - INTERVALO']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[8]['1X2 - INTERVALO'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>AMBAS MARCAM</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[9]['AMBAS MARCAM']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[9]['AMBAS MARCAM'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>CASA MARCAR</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[10]['CASA MARCAR']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[10]['CASA MARCAR'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>FORA MARCAR</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[11]['FORA MARCAR']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[11]['FORA MARCAR'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
              <Card className='shadow mb-4'>
                <Card.Header className='fw-bold'>INTERVALO / FINAL</Card.Header>
                <Card.Body>
                  <table className='table table-hover table-borderless text-center'>
                    <tbody>
                        {
                          Object.values(dados[0]['dados'].Tend\u00eancias[12]['INTERVALO / FINAL']).map((value, index) => {
                            const vs = value.split(' ');
                            return (
                              <tr key={index} className='border-bottom'>
                                <td className='text-center'><b>{Object.keys(dados[0]['dados'].Tend\u00eancias[12]['INTERVALO / FINAL'])[index]}</b></td>
                                <td>
                                  <b>{`${vs[0]} ${vs[1]} ${vs[2]}`}<br/>{`${vs[3]} ${vs[4]}`}</b>
                                  <ProgressBar className='border border-secondary' striped variant="danger" now={Number(vs[0]) * 100 / Number(vs[4])}/>
                                </td>
                              </tr>
                            )
                          }
                          )
                        }
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
  )
}

export default Inicio
