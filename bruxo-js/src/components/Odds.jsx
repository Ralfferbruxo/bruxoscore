import { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function Odds(props) {
  const { liga, flags, casa, fora, setCasa, setFora } = props
  const [odds, setOdds] = useState(false)
  const [titulos, setTitulos] = useState(false)
  const [dados, setDados] = useState(false)

  const times = {
    'copa': ['Alemanha', 'Argentina', 'Brasil', 'Bélgica', 'Colômbia', 'Croácia', 'Dinamarca', 'Espanha', 'França', 'Inglaterra', 'Itália', 'México', 'Países Baixos', 'Portugal', 'Suíça', 'Uruguai', '', 'Equador', 'Senegal', 'Irã', 'EUA', 'País de Gales', 'Arábia Saudita', 'Polônia', 'Austrália', 'Tunísia', 'Costa Rica', 'Japão', 'Canadá', 'Marrocos', 'Sérvia', 'Camarões', 'Gana', 'Coreia do Sul', 'Qatar'],
    'euro': ['Alemanha', 'Áustria', 'Bélgica', 'Croácia', 'Dinamarca', 'Escócia', 'Eslováquia', 'Espanha', 'Finlândia', 'França', 'Hungria', 'Inglaterra', 'Itália', 'Macedônia do Norte', 'País de Gales', 'Países Baixos', 'Polônia', 'Portugal', 'República Tcheca', 'Rússia', 'Suécia', 'Suíça', 'Turquia', 'Ucrânia'],
    'premier': ['Aston', 'Brentford', 'Brighton', 'Burnley', 'Chelsea', 'City', 'Everton', 'Islington', 'Leeds', 'Leicester', 'Liverpool', 'Newcastle', 'Norwich', 'Palace', 'Southampton', 'Tottenham', 'United', 'Watford', 'West Ham', 'Wolverhampton'],
    'super': ['Amsterdã', 'Barcelona', 'Benfica', 'Celtic', 'Chelsea', 'City', 'Dortmund', 'Liverpool', 'Madrid', 'Milan', 'Munique', 'Paris', 'Porto', 'Rome', 'Turin', 'United']
  }

  useEffect(() => {
    fetch('http://164.92.126.51:5000/odds')
      .then(response => response.json())
      .then(data => {
        setOdds(JSON.parse(data)[0]['dados'][liga][casa][fora][0])
        setTitulos(JSON.parse(data)[0]['dados'][liga][casa][fora][0][0])
        setDados(JSON.parse(data)[0]['dados'][liga][casa][fora][0][1])
      })
  }, [])

  useEffect(() => {
    fetch('http://164.92.126.51:5000/odds')
      .then(response => response.json())
      .then(data => {
        setOdds(JSON.parse(data)[0]['dados'][liga][casa][fora][0])
        setTitulos(JSON.parse(data)[0]['dados'][liga][casa][fora][0][0])
        setDados(JSON.parse(data)[0]['dados'][liga][casa][fora][0][1])
      })
  }, [liga, casa, fora])

  function atualizar (event) {
    const { value, id } = event.target
    if (id === 'casa') {
      Number(value) !== fora ? setCasa(Number(value)) : null
    } else {
      Number(value) !== casa ? setFora(Number(value)) : null
    }
  }

  return ( 
    <>
      {
        odds ? (
          <div className='p-3 bg-app'>
            <Card className='mb-3'>
              <Card.Header className='fw-bold'>ESCOLHER TIMES</Card.Header>
              <Card.Body>
                <Row>
                  <Col></Col>
                  <Col className='d-flex justify-content-center align-items-center'>
                    <Form.Select size="lg" id='casa' onChange={atualizar}>
                      {
                        times[liga].map((item, index) => {
                          if (index === 0) {
                            return (
                              <option key={index} value={index}>{item}</option>
                            )
                          } else {
                            return (
                              <option key={index} value={index}>{item}</option>
                            )
                          }
                        }
                        )
                      }
                    </Form.Select>
                    <span className='mx-2'>X</span>
                    <Form.Select size="lg" id='fora' defaultValue={1} onChange={atualizar}>
                    {
                        times[liga].map((item, index) => {
                          if (index === 1) {
                            return (
                              <option key={index} value={index}>{item}</option>
                            )
                          } else {
                            return (
                              <option key={index} value={index}>{item}</option>
                            )
                          }
                        }
                        )
                      }
                    </Form.Select>
                  </Col>
                  <Col></Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header className='fw-bold'>
                <div className='d-inline-flex align-items-center'>
                  <span className='me-2'>ODDS - </span>
                  <img src={flags[`flag${casa + 1}`]} style={{ width: '32px', height: '32px' }} />
                  <span className='mx-2'>{times[liga][casa].toUpperCase()}</span>
                  <span className='mx-2'>x</span>
                  <span className='mx-2'>{times[liga][fora].toUpperCase()}</span>
                  <img src={flags[`flag${fora + 1}`]} style={{ width: '32px', height: '32px' }} />
                </div>
              </Card.Header>
              <Card.Body>
                {
                  dados ? (
                    <Row>
                      <Col>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[0].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[0]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[0].map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[1].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[1]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[1].map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[2].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[2]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[2].slice(0, 3).map((item, index) => {
                                  const itemSplit = item.split(' ')
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${itemSplit[0]} ${itemSplit[1]}`}</span>
                                      <br/>
                                      <b>{itemSplit[2]}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[2].slice(3, 6).map((item, index) => {
                                  const itemSplit = item.split(' ')
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${itemSplit[0]} ${itemSplit[1]}`}</span>
                                      <br/>
                                      <b>{itemSplit[2]}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[3].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[3]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[3].slice(0, 2).map((item, index) => {
                                  const itemSplit = item.split(' ')
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${itemSplit[0]} ${itemSplit[1]}`}</span>
                                      <br/>
                                      <b>{itemSplit[2]}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[3].slice(2, 4).map((item, index) => {
                                  const itemSplit = item.split(' ')
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${itemSplit[0]} ${itemSplit[1]}`}</span>
                                      <br/>
                                      <b>{itemSplit[2]}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[3].slice(4, 6).map((item, index) => {
                                  const itemSplit = item.split(' ')
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${itemSplit[0]} ${itemSplit[1]}`}</span>
                                      <br/>
                                      <b>{itemSplit[2]}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[3].slice(6, 8).map((item, index) => {
                                  const itemSplit = item.split(' ')
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${itemSplit[0]} ${itemSplit[1]}`}</span>
                                      <br/>
                                      <b>{itemSplit[2]}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[4].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[4]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[4].slice(0, 3).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[4].slice(3, 6).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[4].slice(6, 9).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[4].slice(9, 12).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[4].slice(12, 15).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[4].slice(15, 18).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[4].slice(18, 21).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[4].slice(21, 24).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[5].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[5]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[5].map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[6].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[6]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[6].slice(0, 3).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[6].slice(3, 6).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[6].slice(6, 9).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[7].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[7]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[7].slice(0, 3).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[7].slice(3, 6).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[7].slice(6, 9).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[8].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[8]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[8].slice(0, 2).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[8].slice(2, 4).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[8].slice(4, 6).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                        <Table responsive bordered hover>
                          <thead>
                            <tr>
                              <th colSpan={dados[9].length} className='fs-6 w-100 col bg-secondary bg-gradient bg-opacity-50 order-by-desc text-center'>{titulos[9]}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              {
                                dados[9].slice(0, 3).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[9].slice(3, 6).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[9].slice(6, 9).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[9].slice(9, 12).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                            <tr>
                              {
                                dados[9].slice(12, 15).map((item, index) => {
                                  const linha1 = item.split(' ')
                                  const linha2 = linha1.pop()
                                  return (
                                    <td key={index} className='fs-6 text-center'>
                                      <span>{`${linha1.join(' ')}`}</span>
                                      <br/>
                                      <b>{linha2}</b>
                                    </td>
                                  )
                                })
                              }
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                  ) : null
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

export default Odds;
