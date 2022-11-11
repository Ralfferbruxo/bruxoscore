import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import tableSort from "table-sort-js/table-sort.js";
import { FaSort } from "react-icons/fa";
import Spinner from 'react-bootstrap/Spinner';

function Artilheiros(props) {
  const { liga } = props
  const [artilheiros, setArtilheiros] = useState(false)
  const [tabela1, setTabela1] = useState(false)
  const [tabela2, setTabela2] = useState(false)

  useEffect(() => {
    fetch('http://164.92.126.51:5000/artilheiros')
      .then(response => response.json())
      .then(data => {
        setArtilheiros(JSON.parse(data))
        setTabela1(JSON.parse(data)[0]['dados'][liga][0]['tabela1'])
        setTabela2(JSON.parse(data)[0]['dados'][liga][1]['tabela2'])
      })
    tableSort()
  }, [])

  useEffect(() => {
    fetch('http://164.92.126.51:5000/artilheiros')
      .then(response => response.json())
      .then(data => {
        setArtilheiros(JSON.parse(data))
        setTabela1(JSON.parse(data)[0]['dados'][liga][0]['tabela1'])
        setTabela2(JSON.parse(data)[0]['dados'][liga][1]['tabela2'])
      })
  }, [liga])

  return ( 
    <>
      {
        artilheiros ? (<Row className='p-4 bg-app'>
        <Col className='shadow p-0'>
          <Card>
            <Card.Header className='fw-bold'>ARTILHEIROS POR TIME</Card.Header>
            <Card.Body>
              <Table responsive bordered className='table-sort' hover size='sm'>
                <thead>
                  <tr>
                    <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>Marcador<FaSort className='ms-1'/></th>
                    <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>Gols<FaSort className='ms-1'/></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tabela1.map((item, index) => {
                      const tamanho = tabela1.length
                      let classe = ''
                      if (index  <= 4) {
                        classe = 'bg-success p-2 text-light bg-gradient'
                      } else if (index >= tamanho - 5) {
                        classe = 'table-danger'
                      }
                      return (
                        <tr key={index} className={`${classe}`}>
                          <td className='fs-6 col'>{item[0]}</td>
                          <td className='fs-6 col'>{item[1]}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='shadow p-0'>
            <Card.Header className='fw-bold'>ARTILHEIROS - GERAL</Card.Header>
            <Card.Body>
              <Table responsive bordered className='table-sort' hover size='sm'>
                <thead>
                  <tr>
                    <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>Marcador<FaSort className='ms-1'/></th>
                    <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>Gols<FaSort className='ms-1'/></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tabela2.map((item, index) => {
                      const tamanho = tabela2.length
                      let classe = ''
                      if (index  <= 4) {
                        classe = 'bg-success p-2 text-light bg-gradient'
                      } else if (index >= tamanho - 5) {
                        classe = 'table-danger'
                      }
                      return (
                        <tr key={index} className={`${classe}`}>
                          <td className='fs-6 col'>{item[0]}</td>
                          <td className='fs-6 col'>{item[1]}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
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

export default Artilheiros;