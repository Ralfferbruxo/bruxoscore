import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Rankings(props) {
  const { liga } = props
  const [open, setOpen] = useState(-1);
  const [dados, setDados] = useState(false)
  // const dados = rankings[0]['dados'][liga]

  useEffect(() => {
    fetch('http://164.92.126.51:5000/rankings')
      .then(response => response.json())
      .then(data => setDados(JSON.parse(data)[0]['dados'][liga]))
  }, [])

  useEffect(() => {
    fetch('http://164.92.126.51:5000/rankings')
      .then(response => response.json())
      .then(data => setDados(JSON.parse(data)[0]['dados'][liga]))
  }, [liga])

  return ( 
    <>
      {
        dados ? (
          <div className='p-1 bg-app'>
            <Card className='m-4'>
              <Card.Header className='fw-bold'>RAKING DOS MERCADOSs - ÚLTIMAS 24H</Card.Header>
              <Card.Body>
                {
                  dados[0]['tabela1'].map((item, index1) => {
                    return (
                      <Card key={index1}>
                        <Card.Header 
                          className='fw-bold p-0'
                          style={{cursor: 'pointer'}}
                          onClick={() => setOpen(open === index1 ? -1 : index1)}
                        >
                          <div className='m-2 d-flex'>
                            <p className='m-0 ms-1'>{item.titulo[0]}</p>
                            <p className='m-0 ms-3 mt-1 text-primary align-self-center' style={{'fontSize': '1rem'}}>{item.titulo[1]}</p>
                          </div>
                        </Card.Header>
                        <Card.Body className='p-0'>
                          <Collapse in={open === index1} className='p-3'>
                            <div>
                              {
                                item.ranking.map((item, index2) => {
                                  return (
                                    <p key={`${index1}${index2}`} className='p-0 m-0 fs-6'>{item}</p>
                                  )
                                })
                              }
                            </div>
                          </Collapse>
                        </Card.Body>
                      </Card>
                    )
                  })
                }
                
              </Card.Body>
            </Card>
            <Card className='m-4'>
              <Card.Header className='fw-bold'>RAKING DOS MERCADOS - ÚLTIMOS 7 DIAS</Card.Header>
              <Card.Body>
                {
                  dados[1]['tabela2'].map((item, index1) => {
                    return (
                      <Card key={index1}>
                        <Card.Header 
                          className='fw-bold p-0'
                          style={{cursor: 'pointer'}}
                          onClick={() => setOpen(open === index1 ? -1 : index1)}
                        >
                          <div className='m-2 d-flex'>
                            <p className='m-0 ms-1'>{item.titulo[0]}</p>
                            <p className='m-0 ms-3 mt-1 text-primary align-self-center' style={{'fontSize': '1rem'}}>{item.titulo[1]}</p>
                          </div>
                        </Card.Header>
                        <Card.Body className='p-0'>
                          <Collapse in={open === index1} className='p-3'>
                            <div>
                              {
                                item.ranking.map((item, index2) => {
                                  return (
                                    <p key={`${index1}${index2}`} className='p-0 m-0 fs-6'>{item}</p>
                                  )
                                })
                              }
                            </div>
                          </Collapse>
                        </Card.Body>
                      </Card>
                    )
                  })
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

export default Rankings;