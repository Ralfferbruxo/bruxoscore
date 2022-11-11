import { useState, useEffect } from 'react';
import tabelas from '../data/tabelas.json'
import tableSort from "table-sort-js/table-sort.js";
import Spinner from 'react-bootstrap/Spinner';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { FaSort } from "react-icons/fa";

function Tabelas(props) {
  const { liga } = props;
  const [dados, setDados] = useState(false);
  const [titulo, setTitulo] = useState(false);
  const [size, setSize] = useState(false);

  // let dados;
  // let titulo;
  // let size = '';
  // if (liga === 'euro') {
  //   dados = tabelas[0]['dados'][1]['TABELA EUROCUP']
  //   titulo = 'TABELA EUROCUP'
  //   size = 'sm'
  // }
  // else if (liga === 'copa') {
  //   dados = tabelas[0]['dados'][0]['TABELA CAMPEONATO DO MUNDO']
  //   titulo = 'TABELA CAMPEONATO DO MUNDO'
  // }
  // else if (liga === 'premier') {
  //   dados = tabelas[0]['dados'][2]['TABELA PREMIER']
  //   titulo = 'TABELA PREMIER',
  //   size = 'sm'
  // }
  // else {
  //   dados = tabelas[0]['dados'][3]['TABELA SUPERLIGA']
  //   titulo = 'TABELA SUPERLIGA'
  // }

  useEffect(() => {
    fetch('http://164.92.126.51:5000/tabelas')
      .then(response => response.json())
      .then(data => {
        setDados(JSON.parse(data)[0]['dados'][0][liga])
        if (liga === 'euro') {
          setTitulo('TABELA EUROCUP')
          setSize('sm')
        } else if (liga === 'copa') {
          setTitulo('TABELA CAMPEONATO DO MUNDO')
        } else if (liga === 'premier') {
          setTitulo('TABELA PREMIER')
          setSize('sm')
        } else {
          setTitulo('TABELA SUPERLIGA')
        }
      })
    tableSort()
  }, [])

  useEffect(() => {
    fetch('http://164.92.126.51:5000/tabelas')
      .then(response => response.json())
      .then(data => {
        setDados(JSON.parse(data)[0]['dados'][0][liga])
        if (liga === 'euro') {
          setTitulo('TABELA EUROCUP')
          setSize('sm')
        } else if (liga === 'copa') {
          setTitulo('TABELA CAMPEONATO DO MUNDO')
        } else if (liga === 'premier') {
          setTitulo('TABELA PREMIER')
          setSize('sm')
        } else {
          setTitulo('TABELA SUPERLIGA')
        }
      })
  }, [liga])

  return (
    <>
      {
        dados ? (
          <div className='p-4 bg-app'>
            <Card className='shadow mb-3'>
              <Card.Header className='fw-bold'>{titulo}</Card.Header>
              <Card.Body>
                <Table responsive bordered className='table-sort' hover size={size}>
                  <thead>
                    <tr>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50'>Nome<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>P<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>J<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>V<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>E<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>D<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>GP<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>GC<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>SG<FaSort className='ms-1'/></th>
                      <th className='fs-6 col bg-secondary bg-gradient bg-opacity-50 order-by-desc'>%<FaSort className='ms-1'/></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    dados.map((item, index) => {
                      const tamanho = dados.length
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
                          <td className='fs-6 col'>{item[2]}</td>
                          <td className='fs-6 col'>{item[3]}</td>
                          <td className='fs-6 col'>{item[4]}</td>
                          <td className='fs-6 col'>{item[5]}</td>
                          <td className='fs-6 col'>{item[6]}</td>
                          <td className='fs-6 col'>{item[7]}</td>
                          <td className='fs-6 col'>{item[8]}</td>
                          <td className='fs-6 col'>{item[9]}</td>
                        </tr>
                      )
                    }
                  )
                  }
                  </tbody>
                </Table>
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