import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
// import './ProxJogos.css';
import '../App.css'

function ProxJogos(props) {
  const { liga, dados, flags, renderProxJogos } = props;
  const [activeKey, setActiveKey] = useState(0)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (dados[0]['dados']['Próximos Jogos'][activeKey].jogo.length === 0) {
      setRender(false)
    } else {
      setRender(true)
    }
  }, [])

  useEffect(() => {
    setRender(false)
    if (dados[0]['dados']['Próximos Jogos'][activeKey].jogo.length > 0) {
      setRender(true)
    }
  }, [dados, activeKey])


  return ( 
    <div className='p-3 bg-app d-flex flex-column'>
      <Nav
        activeKey={0}
        // onSelect={(selectedKey) => setJogo(jogos[selectedKey])}
        className='row pb-3'
      >
        {
          dados[0]['dados']['Próximos Jogos'].map((jogo, index) => {
            const { confronto } = jogo;
            const tituloNav = confronto.titulo.split('-');
            return (
              <Nav.Item key={index} className='col p-0' >
                <Nav.Link eventKey={index}>
                  <Button onClick={() => setActiveKey(index)} className={`p-2 w-100 rounded-5 ${activeKey === index ? 'border' : ''}`} variant={activeKey === index ? 'success' : 'secondary' }>
                    <p className='m-0'>{tituloNav[0]}</p>
                    <p className='m-0'>{tituloNav[1]}</p>
                  </Button>
                </Nav.Link>
              </Nav.Item>
            )
          }
        )
        }
      </Nav>
      <Card className='w-50 shadow mb-3 align-self-center'>
        <Card.Body>
        <h1 className='fw-bold d-flex justify-content-center align-content-center flex-wrap m-0'>
          <p className='m-0 me-3 text-dark fs-2'>{`${dados[0]['dados']['Próximos Jogos'][activeKey].confronto.titulo.replace('-', '').split(' ')[0]} - `}</p>
          <img src={flags[`flag${dados[0]['dados']['Próximos Jogos'][activeKey].confronto.casaFlag}`]} className='align-self-center m-0 me-2' style={{ width: '32px', height: '32px' }}/>
          <p className='m-0 text-dark fs-2'>{dados[0]['dados']['Próximos Jogos'][activeKey].confronto.titulo.split('-')[1].split('X')[0]}</p>
          <p className='m-0 mx-3 text-dark fs-4 align-self-center'>x</p>
          <p className='m-0 text-dark fs-2'>{dados[0]['dados']['Próximos Jogos'][activeKey].confronto.titulo.split('-')[1].split('X')[1]}</p>
          <img src={flags[`flag${dados[0]['dados']['Próximos Jogos'][activeKey].confronto.foraFlag}`]} className='align-self-center m-0 ms-2' style={{ width: '32px', height: '32px' }}/>
        </h1>
        </Card.Body>
      </Card>
      {
        renderProxJogos && render ? (
          <>
            <Row>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0])}</Card.Header>
                  <Card.Body>
                    <Table bordered responsive>
                      <thead>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0])[0]][0]['tabela_1'].map((item, index) => {
                            const nome = Object.keys(item)[0]
                            return <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50' key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0])[0]][0]['tabela_1'].map((item, index) => {
                            const nome = Object.values(item)[0]
                            let classe = ''
                            if (nome.includes('%')) {
                              const valor = Number(nome.split(' ')[1].replace('%', '').slice(1).slice(0, -1))
                              if (valor >= 60 ) {
                                classe = 'bg-success p-2 text-light bg-gradient'
                              } else if (valor >= 40) {
                                classe = 'bg-warning text-black'
                              } else {
                                classe = 'bg-danger bg-opacity-75'
                              }
                            }
                            return <th className={`fs-6 col ${classe}`} key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </tbody>
                    </Table>
                    <Table bordered responsive>
                      <thead>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0])[0]][1]['tabela_2'].map((item, index) => {
                            const nome = Object.keys(item)[0]
                            return <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50' key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0])[0]][1]['tabela_2'].map((item, index) => {
                            const nome = Object.values(item)[0]
                            let classe = ''
                            if (nome.includes('%')) {
                              const valor = Number(nome.split(' ')[1].replace('%', '').slice(1).slice(0, -1))
                              if (valor >= 60 ) {
                                classe = 'bg-success p-2 text-light bg-gradient'
                              } else if (valor >= 40) {
                                classe = 'bg-warning text-black'
                              } else {
                                classe = 'bg-danger bg-opacity-75'
                              }
                            }
                            return <th className={`fs-6 col ${classe}`} key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </tbody>
                    </Table>
                    {/* <span className='d-flex align-items-center fs-6 ms-2'><p className='m-0 me-1'>{`${Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0])[0]][2])[0]}:`}</p><b>{Object.values(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[0])[0]][2])[0]}</b></span> */}
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1])}</Card.Header>
                  <Card.Body>
                    <Table bordered responsive>
                      <thead>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1])[0]][0]['tabela_1'].map((item, index) => {
                            const nome = Object.keys(item)[0]
                            return <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50' key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1])[0]][0]['tabela_1'].map((item, index) => {
                            const nome = Object.values(item)[0]
                            let classe = ''
                            if (nome.includes('%')) {
                              const valor = Number(nome.split(' ')[1].replace('%', '').slice(1).slice(0, -1))
                              if (valor >= 60 ) {
                                classe = 'bg-success p-2 text-light bg-gradient'
                              } else if (valor >= 40) {
                                classe = 'bg-warning text-black'
                              } else {
                                classe = 'bg-danger bg-opacity-75'
                              }
                            }
                            return <th className={`fs-6 col ${classe}`} key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </tbody>
                    </Table>
                    <Table bordered responsive>
                      <thead>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1])[0]][1]['tabela_2'].map((item, index) => {
                            const nome = Object.keys(item)[0]
                            return <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50' key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[1])[0]][1]['tabela_2'].map((item, index) => {
                            const nome = Object.values(item)[0]
                            let classe = ''
                            if (nome.includes('%')) {
                              const valor = Number(nome.split(' ')[1].replace('%', '').slice(1).slice(0, -1))
                              if (valor >= 60 ) {
                                classe = 'bg-success p-2 text-light bg-gradient'
                              } else if (valor >= 40) {
                                classe = 'bg-warning text-black'
                              } else {
                                classe = 'bg-danger bg-opacity-75'
                              }
                            }
                            return <th className={`fs-6 col ${classe}`} key={index}>{nome}</th>
                          }
                          )
                        }
                        </tr>
                      </tbody>
                    </Table>
                    {/* <span className='d-flex align-items-center fs-6 ms-2 opacity-0'>NÃO APARECER</span> */}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className='shadow mb-3'>
              <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[2])}</Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[2][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[2])[0]][0]['Linha 1'].map((item, index) => {
                        return <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50' key={index}>{item}</th>
                      }
                      )
                    }
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[2][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[2])[0]][1]['Linha 2'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } else if (!item.includes('-')) {
                          classe = 'bg-success p-2 text-light bg-gradient'
                        }
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[2][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[2])[0]][2]['Linha 3'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } else if (!item.includes('-')) {
                          classe = 'bg-success p-2 text-light bg-gradient'
                        }
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className='shadow mb-3'>
              <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])}</Card.Header>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][0]['Linha 1'].map((item, index) => {
                        return <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50' key={index}>{item}</th>
                      }
                      )
                    }
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][1]['Linha 2'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][2]['Linha 3'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][3]['Linha 4'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][4]['Linha 5'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][5]['Linha 6'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][6]['Linha 7'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][7]['Linha 8'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][8]['Linha 9'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                    <tr>
                    {
                      dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[3])[0]][9]['Linha 10'].map((item, index) => {
                        let classe = ''
                        if (index === 0) {
                          classe = 'bg-secondary bg-gradient bg-opacity-50'
                        } 
                        return <td className={`fs-6 col ${classe}`} key={index}>{item}</td>
                      }
                      )
                    }
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className='w-50 shadow mb-3 align-self-center'>
              <Card.Body>
              <h1 className='fw-bold d-flex justify-content-center align-content-center flex-wrap m-0'>
                <p className='m-0 me-3 text-dark fs-2'>{dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Casa'][0]['Título']}</p>
                <img src={flags[`flag${dados[0]['dados']['Próximos Jogos'][activeKey].confronto.casaFlag}`]} className='align-self-center m-0' style={{ width: '32px', height: '32px' }}/>
              </h1>
              </Card.Body>
            </Card>
            <Row>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Casa'][1])[0]}</Card.Header>
                  <Card.Body>
                    <Table striped hover responsive>
                      <tbody>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Casa'][1][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Casa'][1])[0]].map((item, index) => {
                            let classe = ''
                            if (item[4] === 'V') {
                              classe = 'bg-success'
                            } else if (item[4] === 'D') {
                              classe = 'bg-danger'
                            } else {
                              classe = 'bg-warning text-dark'
                            }
                            return (
                              <tr key={index} className='text-center'>
                              <td className={`fs-6 align-middle`}>{item[0]}</td>
                              <td className={`fs-6 align-middle`}>{item[1]}</td>
                              <td className={`fs-6 align-middle fw-bold`}>{item[2]}</td>
                              <td className={`fs-6 align-middle`}>{item[3]}</td>
                              <td><span className={`badge ${classe} p-2 bg-gradient`}>{item[4]}</span></td>
                              </tr>
                            )
                          }
                          )
                        }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Casa'][2])[0]}</Card.Header>
                  <Card.Body>
                    <Table striped hover responsive>
                      <tbody>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Casa'][2][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Casa'][2])[0]].map((item, index) => {
                            let classe = ''
                            if (item[4] === 'V') {
                              classe = 'bg-success'
                            } else if (item[4] === 'D') {
                              classe = 'bg-danger'
                            } else {
                              classe = 'bg-warning text-dark'
                            }
                            return (
                              <tr key={index} className='text-center'>
                              <td className={`fs-6 align-middle`}>{item[0]}</td>
                              <td className={`fs-6 align-middle`}>{item[1]}</td>
                              <td className={`fs-6 align-middle fw-bold`}>{item[2]}</td>
                              <td className={`fs-6 align-middle`}>{item[3]}</td>
                              <td><span className={`badge ${classe} p-2 bg-gradient`}>{item[4]}</span></td>
                              </tr>
                            )
                          }
                          )
                        }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className='w-50 shadow mb-3 align-self-center'>
              <Card.Body>
              <h1 className='fw-bold d-flex justify-content-center align-content-center flex-wrap m-0'>
                <p className='m-0 me-3 text-dark fs-2'>{dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Fora'][0]['Título']}</p>
                <img src={flags[`flag${dados[0]['dados']['Próximos Jogos'][activeKey].confronto.foraFlag}`]} className='align-self-center m-0' style={{ width: '32px', height: '32px' }}/>
              </h1>
              </Card.Body>
            </Card>
            <Row>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Fora'][1])[0]}</Card.Header>
                  <Card.Body>
                    <Table striped hover responsive>
                      <tbody>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Fora'][1][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Fora'][1])[0]].map((item, index) => {
                            let classe = ''
                            if (item[4] === 'V') {
                              classe = 'bg-success'
                            } else if (item[4] === 'D') {
                              classe = 'bg-danger'
                            } else {
                              classe = 'bg-warning text-dark'
                            }
                            return (
                              <tr key={index} className='text-center'>
                              <td className={`fs-6 align-middle`}>{item[0]}</td>
                              <td className={`fs-6 align-middle`}>{item[1]}</td>
                              <td className={`fs-6 align-middle fw-bold`}>{item[2]}</td>
                              <td className={`fs-6 align-middle`}>{item[3]}</td>
                              <td><span className={`badge ${classe} p-2 bg-gradient`}>{item[4]}</span></td>
                              </tr>
                            )
                          }
                          )
                        }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Fora'][2])[0]}</Card.Header>
                  <Card.Body>
                    <Table striped hover responsive>
                      <tbody>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Fora'][2][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Últimos Jogos Fora'][2])[0]].map((item, index) => {
                            let classe = ''
                            if (item[4] === 'V') {
                              classe = 'bg-success'
                            } else if (item[4] === 'D') {
                              classe = 'bg-danger'
                            } else {
                              classe = 'bg-warning text-dark'
                            }
                            return (
                              <tr key={index} className='text-center'>
                              <td className={`fs-6 align-middle`}>{item[0]}</td>
                              <td className={`fs-6 align-middle`}>{item[1]}</td>
                              <td className={`fs-6 align-middle fw-bold`}>{item[2]}</td>
                              <td className={`fs-6 align-middle`}>{item[3]}</td>
                              <td><span className={`badge ${classe} p-2 bg-gradient`}>{item[4]}</span></td>
                              </tr>
                            )
                          }
                          )
                        }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className='w-50 shadow mb-3 align-self-center'>
              <Card.Body>
              <h1 className='fw-bold d-flex justify-content-center align-content-center flex-wrap m-0'>
                <p className='m-0 me-3 text-dark fs-2'>{dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Confrontos Diretos'][0]['Título']}</p>
                <img src={flags[`flag${dados[0]['dados']['Próximos Jogos'][activeKey].confronto.casaFlag}`]} className='align-self-center m-0 me-3' style={{ width: '32px', height: '32px' }}/>
                <p className='m-0 me-3 text-dark fs-2'>x</p>
                <img src={flags[`flag${dados[0]['dados']['Próximos Jogos'][activeKey].confronto.foraFlag}`]} className='align-self-center m-0' style={{ width: '32px', height: '32px' }}/>
              </h1>
              </Card.Body>
            </Card>
            <Row>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Confrontos Diretos'][1])[0]}</Card.Header>
                  <Card.Body>
                    <Table striped hover responsive>
                      <tbody>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Confrontos Diretos'][1][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Confrontos Diretos'][1])[0]].map((item, index) => {
                            let classe = ''
                            if (item[4] === 'V') {
                              classe = 'bg-success'
                            } else if (item[4] === 'D') {
                              classe = 'bg-danger'
                            } else {
                              classe = 'bg-warning text-dark'
                            }
                            return (
                              <tr key={index} className='text-center'>
                              <td className={`fs-6 align-middle`}>{item[0]}</td>
                              <td className={`fs-6 align-middle`}>{item[1]}</td>
                              <td className={`fs-6 align-middle fw-bold`}>{item[2]}</td>
                              <td className={`fs-6 align-middle`}>{item[3]}</td>
                              <td><span className={`badge ${classe} p-2 bg-gradient`}>{item[4]}</span></td>
                              </tr>
                            )
                          }
                          )
                        }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className='shadow mb-3'>
                  <Card.Header className='fw-bold'>{Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Confrontos Diretos'][2])[0]}</Card.Header>
                  <Card.Body>
                    <Table striped hover responsive>
                      <tbody>
                        {
                          dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Confrontos Diretos'][2][Object.keys(dados[0]['dados']['Próximos Jogos'][activeKey].jogo[4]['Confrontos Diretos'][2])[0]].map((item, index) => {
                            let classe = ''
                            if (item[4] === 'V') {
                              classe = 'bg-success'
                            } else if (item[4] === 'D') {
                              classe = 'bg-danger'
                            } else {
                              classe = 'bg-warning text-dark'
                            }
                            return (
                              <tr key={index} className='text-center'>
                              <td className={`fs-6 align-middle`}>{item[0]}</td>
                              <td className={`fs-6 align-middle`}>{item[1]}</td>
                              <td className={`fs-6 align-middle fw-bold`}>{item[2]}</td>
                              <td className={`fs-6 align-middle`}>{item[3]}</td>
                              <td><span className={`badge ${classe} p-2 bg-gradient`}>{item[4]}</span></td>
                              </tr>
                            )
                          }
                          )
                        }
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : <p>ahshd</p>
      }
    </div>
  );
}

export default ProxJogos;