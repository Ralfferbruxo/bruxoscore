import { useState, useEffect } from 'react';
import maximas from '../data/maximas.json'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
// import { FaSort } from "react-icons/fa";
// import tableSort from "table-sort-js/table-sort.js";

function Tabelas(props) {
  const { liga } = props
  const botoes = ['1x2 - FINAL', '1x2 - INTERVALO', 'OVER GOLS', 'UNDER GOLS', 'AMBAS MARCAM', 'TIME DA CASA MARCA', 'TIME DE FORA MARCA', 'PLACAR EXATO - FINAL', 'PLACAR EXATO - INTERVALO', 'GOLS EXATOS', 'RESULTADO / AMBAS MARCAM', 'RESULTADO INTERVALO/FIM', 'TABELA']
  const subBotoes = [['CASA', 'EMPATE', 'FORA'], ['CASA', 'EMPATE', 'FORA'], ['OVER 0.5', 'OVER 1.5', 'OVER 2.5', 'OVER 3.5'], ['UNDER 0.5', 'UNDER 1.5', 'UNDER 2.5', 'UNDER 3.5'], ['COM AMBAS MARCANDO', 'SEM AMBAS MARCANDO'], ['COM MANDANTE MARCANDO', 'SEM MANDANTE MARCANDO'], ['COM VISITANTE MARCANDO', 'SEM VISITANTE MARCANDO'], ['1 x 0', '2 x 0', '2 x 1', '3 x 0', '3 x 1', '3 x 2', '4 x 0', '0 x 0', '1 x 1', '2 x 2', '0 x 1', '0 x 2', '1 x 2', '0 x 3', '1 x 3', '2 x 3', '0 x 4', 'OUTROS'], ['1 x 0', '2 x 0', '0 x 0', '1 x 1', 'OUTROS', '0 x 1', '0 x 2'], ['SEM SAIR EXATAMENTE 0 GOLS', 'SEM SAIR EXATAMENTE 1 GOLS', 'SEM SAIR EXATAMENTE 2 GOLS', 'SEM SAIR EXATAMENTE 3 GOLS', 'SEM SAIR EXATAMENTE 4 GOLS', 'SEM SAIR 5+ GOLS'], ['CASA/SIM', 'CASA/NÃO', 'FORA/SIM', 'FORA/NÃO', 'EMPATE/SIM', 'EMPATE/NÃO'], ['CASA/CASA', 'CASA/FORA', 'CASA/EMPATE', 'EMPATE/EMPATE', 'EMPATE/CASA', 'EMPATE/FORA', 'FORA/FORA', 'FORA/CASA', 'FORA/EMPATE'], ['CLASSIFICAÇÃO']]
  const [dados, setDados] = useState(false)
  // const [maximas, setMaximas] = useState(false)
  const [activeKey, setActiveKey] = useState(0)
  const [subActiveKey, setSubActiveKey] = useState(0)
  const [subActiveKeyColor, setSubActiveKeyColor] = useState(-1)
  const [render, setRender] = useState(0)
  const [alerta, setAlerta] = useState(false)
  // const alerta = dados[render][subActiveKey][0][0][1]
  const [alertaTexto, setAlertaTexto] = useState(false)
  // const alertaTexto = alerta.split(' ').slice(0, -1)
  const [alertaValor, setAlertaValor] = useState(false)
  // const alertaValor = alerta.split(' ').pop()

  useEffect(() => {
    fetch('http://164.92.126.51:5000/maximas')
      .then(response => response.json())
      .then(data => {
        // setMaximas(JSON.parse(data))
        setDados(JSON.parse(data)[0]['dados'][liga])
        setAlerta(JSON.parse(data)[0]['dados'][liga][render][subActiveKey][0][0][1])
        setAlertaTexto(JSON.parse(data)[0]['dados'][liga][render][subActiveKey][0][0][1].split(' ').slice(0, -1))
        setAlertaValor(JSON.parse(data)[0]['dados'][liga][render][subActiveKey][0][0][1].split(' ').pop())
      })
  }, [])

  useEffect(() => {
    fetch('http://164.92.126.51:5000/maximas')
      .then(response => response.json())
      .then(data => {
        // setMaximas(JSON.parse(data))
        setDados(JSON.parse(data)[0]['dados'][liga])
        setAlerta(JSON.parse(data)[0]['dados'][liga][render][subActiveKey][0][0][1])
        setAlertaTexto(JSON.parse(data)[0]['dados'][liga][render][subActiveKey][0][0][1].split(' ').slice(0, -1))
        setAlertaValor(JSON.parse(data)[0]['dados'][liga][render][subActiveKey][0][0][1].split(' ').pop())
      })
  }, [liga, render, subActiveKey])

  // useEffect(() => {
  //   tableSort()
  // }, [])

  return ( 
    <>
      {
        dados ? (
          <div className='p-3 bg-app d-flex flex-column'>
            <Nav activeKey={0} className='row pb-3'>
              {
                botoes.map((item, index) => {
                  return (
                    <Nav.Item key={index} className='col p-0'>
                      <Nav.Link eventKey={index} className='p-1'>
                        <Button onClick={() => {setActiveKey(index), setSubActiveKeyColor(-1)}} className={`p-2 w-100 d-flex justify-content-center align-items-center ${activeKey === index ? 'border' : ''}`} variant={activeKey === index ? 'success' : 'secondary' } style={{'height': '5rem'}}>
                          <p className='m-0'>{item}</p>
                        </Button>
                      </Nav.Link>
                    </Nav.Item>
                  )
                }
              )
              }
            </Nav>
            <Nav className='pb-3 d-flex justify-content-center align-items-center'>
              {
                subBotoes[activeKey].map((item, index) => {
                  return (
                    <Nav.Item key={index} className='p-0'>
                      <Nav.Link eventKey={index} className='p-1'>
                        <Button onClick={() => {setSubActiveKey(index), setRender(activeKey), setSubActiveKeyColor(index)}} className={`p-2 w-100 d-flex justify-content-center align-items-center ${subActiveKeyColor === index ? 'border' : ''}`} variant={subActiveKeyColor === index ? 'success' : 'secondary' }>
                          <p className='m-0 fs-6'>{item}</p>
                        </Button>
                      </Nav.Link>
                    </Nav.Item>
                  )
                }
              )
              }
            </Nav>
            <Card>
              <Card.Header className='text-center fw-bold'>{`${botoes[render]} - ${subBotoes[render][subActiveKey]}`}</Card.Header>
              <Card.Body>
                <Alert variant={render === 12 && subActiveKey === 0 ? 'warning' : 'danger'} className='d-flex flex-column justify-content-center align-items-center'>
                  <Badge bg={render === 12 && subActiveKey === 0 ? 'warning' : 'danger'} className={render === 12 && subActiveKey === 0 ? 'text-dark' : ''}>{dados[render][subActiveKey][0][0][0]}</Badge>
                  {
                    render === 12 && subActiveKey === 0 ? (
                      <span className='mt-2'>{alerta}</span>
                    ) : (
                      <span className='mt-2'>{`${alertaTexto[0]} ${alertaTexto[1]} ${alertaTexto[2]} ${alertaTexto[3]} `}<b>{alertaValor}</b></span>
                    )
                  }
                  <span className='fs-6'>{dados[render][subActiveKey][0][0][2]}</span>
                </Alert>
                <Row>
                  <Col>
                    <Table responsive bordered striped hover size='sm'>
                      {
                      render === 12 && subActiveKey === 0 ? (
                        <thead>
                          <tr className='text-center'>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>Nome</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>P</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>J</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>V</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>E</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>D</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>GP</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>GC</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>SG</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>%</th>
                          </tr>
                      </thead>
                      ) : (
                        <thead>
                          <tr className='text-center'>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>Máxima</th>
                            <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>Data</th>
                          </tr>
                        </thead>
                      )
                      }
                      <tbody>
                        {
                          dados[render][subActiveKey][0][1][0].map((item, index) => {  
                            return (
                              <tr key={index} className='text-center'>
                                {
                                  item.map((item, index) => {
                                    return (
                                      <td key={index} className='fs-6 col'>{item}</td>
                                    )
                                  })
                                }
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </Col>
                  {
                    dados[render][subActiveKey][0][1][1] !== undefined ? (
                      <Col>
                        <Table responsive bordered striped hover size='sm'>
                          <thead>
                            <tr className='text-center'>
                              <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>Máxima</th>
                              <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>Frequência</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              dados[render][subActiveKey][0][1][1].map((item, index) => {  
                                return (
                                  <tr key={index} className='text-center'>
                                    {
                                      item.map((item, index) => {
                                        return (
                                          <td key={index} className='fs-6 col'>{item}</td>
                                        )
                                      })
                                    }
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      </Col>
                    ) : null
                  }
                </Row>
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

export default Tabelas;