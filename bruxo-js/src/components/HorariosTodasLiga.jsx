import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './Horarios.css';
import tratarTabelaHorarios from '../utils/HorariosPage';

function HorariosTodasLiga(props) {
  const { ultimosJogos, corGreen, corRed, mostrarPlacar, activeKey, subActiveKey } = props;
  const copa = tratarTabelaHorarios(ultimosJogos[0].dados[0], activeKey, subActiveKey, corGreen, corRed)
  const euro = tratarTabelaHorarios(ultimosJogos[0].dados[1], activeKey, subActiveKey, corGreen, corRed)
  const premier = tratarTabelaHorarios(ultimosJogos[0].dados[2], activeKey, subActiveKey, corGreen, corRed)
  // const superliga = tratarTabelaHorarios(ultimosJogos[0].dados[3], activeKey, subActiveKey, corGreen, corRed)
  const [selects, setSelects] = useState({
    copa: ['select1', 'select2', 'select3', 'select4', 'select5', 'select6', 'select7', 'select8', 'select9', 'select10', 'select11'],
    euro: ['select1', 'select2', 'select3', 'select4', 'select5', 'select6', 'select7', 'select8', 'select9', 'select10', 'select11'],
    premier: ['select1', 'select2', 'select3', 'select4', 'select5', 'select6', 'select7', 'select8', 'select9', 'select10', 'select11'],
    super: ['select1', 'select2', 'select3', 'select4', 'select5', 'select6', 'select7', 'select8', 'select9', 'select10', 'select11']
  });
  const colunas = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
  const linha0 = ['00', '03', '06', '09', '12', '15', '18', '21', '24', '27', '30', '33', '36', '39', '42', '45', '48', '51', '54', '57']
  const linha1 = ['01', '04', '07', '10', '13', '16', '19', '22', '25', '28', '31', '34', '37', '40', '43', '46', '49', '52', '55', '58']
  const linha2 = ['02', '05', '08', '11', '14', '17', '20', '23', '26', '29', '32', '35', '38', '41', '44', '47', '50', '53', '56', '59']

  function atualizaSelecao(selecao, index, liga) {
    const elements = document.querySelectorAll(`.placar${liga}`);
    const element = Array.from(elements).find(element => element.id === index);
    if (element.className === `placar${liga}`) {
      elements.forEach(element => {
        if (selecao === element.firstChild.innerHTML) {
          element.className = `placar${liga} ${selects[liga][0]}`;
        }
      })
      const sliceSelects = selects[liga].slice(1);
      const newSelects = [].concat(selects);
      newSelects[0][liga] = sliceSelects;
      setSelects(newSelects[0]);
    } else {
      const selected = element.className.split(' ')[1];
      const concatSelects = [selected].concat(selects[liga]);
      console.log(concatSelects);
      const newSelects = [].concat(selects);
      newSelects[0][liga] = concatSelects;
      setSelects(newSelects[0]);
      elements.forEach(element => {
        if (selecao === element.firstChild.innerHTML) {
          element.className = `placar${liga}`;
        }
      })
    }
  }

  return ( 
    <div>
      <Row>
        <Col className='px-1 mt-1'>
          <Card>
            <Card.Header className='fw-bold fs-6 text-center'>Copa do Mundo</Card.Header>
            <Card.Body>
              <Table responsive bordered size='sm'>
                <tbody>
                  <tr>
                    <td colSpan={12} className='text-center text-light fw-bold bg-success align-middle'>
                      <p className='m-0' style={{'fontSize': '1.2rem'}}>{`GREENS: ${copa[1][0]} (${((copa[1][0] * 100) / 480).toFixed(2)}%)`}</p>
                    </td>
                    <td colSpan={12} className='text-center text-light fw-bold bg-danger align-middle'>
                      <p className='m-0' style={{'fontSize': '1.2rem'}}>{`REDS: ${copa[1][1]} (${((copa[1][1] * 100) / 480).toFixed(2)}%)`}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center text-light fw-bold bg-secondary align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>H.</p>
                    </td>
                    {
                      linha1.map((item, index) => {
                        return (
                          <td key={index} className='text-center text-light fw-bold bg-secondary align-middle'>
                            <p className='m-0' style={{'fontSize': '0.8rem'}}>{item}</p>
                          </td>
                        )
                      }
                    )
                    }
                    <td className='text-center fw-bold bg-dark text-light align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>%</p>
                    </td>
                    <td className='text-center fw-bold bg-dark text-light align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>Gols</p>
                    </td>
                  </tr>
                  {
                    copa[0].map((jogos, index1) => {
                      let greens = 0
                      return (
                        <tr key={index1} className='text-center'>
                          <td className='text-center text-light fw-bold bg-secondary align-middle'>
                            <p className='m-0' style={{'fontSize': '0.8rem'}}>{colunas[index1]}</p>
                          </td>
                          {/* <td className='bg-light align-middle'>
                            <input type="checkbox" defaultChecked={false} readOnly id="inlineCheckbox1" value="option1"/>
                          </td> */}
                          {
                          jogos.map((jogo, index2) => {
                            const { Casa, Fora, Hora, PlacarCasa, PlacarFora, classe} = jogo
                            classe === corGreen ? greens += 1 : null
                            let out = false
                            const placarCasaSplit = PlacarCasa.split(' ')
                            const placarForaSplit = PlacarFora.split(' ')
                            const casaFinal = placarCasaSplit[0]
                            const foraFinal = placarForaSplit[0]
                            const casaIntervalo = placarCasaSplit[1][1]
                            const foraIntervalo = placarForaSplit[1][1]
                            placarCasaSplit[1] == "(OUT)" || placarForaSplit[1] == "(OUT)" ? out = true : null

                            return (
                              <td key={`1${index1}${index2}`} className='text-light hoverChange align-middle' style={{ backgroundColor: jogo.classe}}>
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={
                                    <Tooltip id={`tooltip-s`}>
                                      {`${Hora} - ${Casa} x ${Fora}`}
                                    </Tooltip>
                                  }
                                >
                                  <div id={`1${index1}${index2}`} className='placarcopa' onClick={() => atualizaSelecao(`${casaFinal === '5+' ? '5' : casaFinal}x${foraFinal === '5+' ? '5' : foraFinal}`, `1${index1}${index2}`, 'copa')}>
                                    <p className='m-0' style={{'fontSize': '0.8rem'}}>{`${casaFinal === '5+' ? '5' : casaFinal}x${foraFinal === '5+' ? '5' : foraFinal}`}</p>
                                    <p className='m-0' style={{'fontSize': '0.7rem'}}>{ mostrarPlacar ? out ? 'oth' : `${casaIntervalo}x${foraIntervalo}` : '-'}</p>
                                  </div>
                                </OverlayTrigger>
                              </td>
                            )
                          })
                          }
                          <td className='bg-light align-middle'>
                            <p className={`m-0 text-bg-${ greens < 8 ? 'danger' : greens >= 10 ? 'success' : 'warning' } rounded`} style={{'fontSize': '0.7rem'}}>{`${((greens * 100) / 20).toFixed(1)}%`}</p>
                          </td>
                          <td className='bg-light align-middle'>
                            <p className='m-0 fw-bold' style={{'fontSize': '0.9rem'}}>
                              {
                                jogos.reduce((acc, item) => {
                                  const { PlacarCasa, PlacarFora} = item
                                  const placarCasaSplit = PlacarCasa.split(' ')
                                  const placarForaSplit = PlacarFora.split(' ')
                                  const casaFinal = placarCasaSplit[0]
                                  const foraFinal = placarForaSplit[0]
                                  return acc + parseInt(casaFinal) + parseInt(foraFinal)
                                }
                                , 0)
                              }
                            </p>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col className='px-1 mt-1'>
          <Card>
            <Card.Header className='fw-bold fs-6 text-center'>Euro Copa</Card.Header>
            <Card.Body>
              <Table responsive bordered size='sm'>
                <tbody>
                  <tr>
                    <td colSpan={12} className='text-center text-light fw-bold bg-success align-middle'>
                      <p className='m-0' style={{'fontSize': '1.2rem'}}>{`GREENS: ${euro[1][0]} (${((euro[1][0] * 100) / 480).toFixed(2)}%)`}</p>
                    </td>
                    <td colSpan={12} className='text-center text-light fw-bold bg-danger align-middle'>
                      <p className='m-0' style={{'fontSize': '1.2rem'}}>{`REDS: ${euro[1][1]} (${((euro[1][1] * 100) / 480).toFixed(2)}%)`}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center text-light fw-bold bg-secondary align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>H.</p>
                    </td>
                    {
                      linha2.map((item, index) => {
                        return (
                          <td key={index} className='text-center text-light fw-bold bg-secondary align-middle'>
                            <p className='m-0' style={{'fontSize': '0.8rem'}}>{item}</p>
                          </td>
                        )
                      }
                    )
                    }
                    <td className='text-center fw-bold bg-dark text-light align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>%</p>
                    </td>
                    <td className='text-center fw-bold bg-dark text-light align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>Gols</p>
                    </td>
                  </tr>
                  {
                    euro[0].map((jogos, index1) => {
                      let greens = 0
                      return (
                        <tr key={index1} className='text-center'>
                          <td className='text-center text-light fw-bold bg-secondary align-middle'>
                            <p className='m-0' style={{'fontSize': '0.8rem'}}>{colunas[index1]}</p>
                          </td>
                          {/* <td className='bg-light align-middle'>
                            <input type="checkbox" defaultChecked={false} readOnly id="inlineCheckbox1" value="option1"/>
                          </td> */}
                          {
                          jogos.map((jogo, index2) => {
                            const { Casa, Fora, Hora, PlacarCasa, PlacarFora, classe} = jogo
                            classe === corGreen ? greens += 1 : null
                            let out = false
                            const placarCasaSplit = PlacarCasa.split(' ')
                            const placarForaSplit = PlacarFora.split(' ')
                            const casaFinal = placarCasaSplit[0]
                            const foraFinal = placarForaSplit[0]
                            const casaIntervalo = placarCasaSplit[1][1]
                            const foraIntervalo = placarForaSplit[1][1]
                            placarCasaSplit[1] == "(OUT)" || placarForaSplit[1] == "(OUT)" ? out = true : null

                            return (
                              <td key={`2${index1}${index2}`} className={'text-light hoverChange align-middle'} style={{ backgroundColor: jogo.classe}}>
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={
                                    <Tooltip id={`tooltip-s`}>
                                      {`${Hora} - ${Casa} x ${Fora}`}
                                    </Tooltip>
                                  }
                                >
                                  <div id={`2${index1}${index2}`} className='placareuro' onClick={() => atualizaSelecao(`${casaFinal === '5+' ? '5' : casaFinal}x${foraFinal === '5+' ? '5' : foraFinal}`, `2${index1}${index2}`, 'euro')}>
                                    <p className='m-0' style={{'fontSize': '0.8rem'}}>{`${casaFinal === '5+' ? '5' : casaFinal}x${foraFinal === '5+' ? '5' : foraFinal}`}</p>
                                    <p className='m-0' style={{'fontSize': '0.7rem'}}>{ mostrarPlacar ? out ? 'oth' : `${casaIntervalo}x${foraIntervalo}` : '-'}</p>
                                  </div>
                                </OverlayTrigger>
                              </td>
                            )
                          })
                          }
                          <td className='bg-light align-middle'>
                            <p className={`m-0 text-bg-${ greens < 8 ? 'danger' : greens >= 10 ? 'success' : 'warning' } rounded`} style={{'fontSize': '0.7rem'}}>{`${((greens * 100) / 20).toFixed(1)}%`}</p>
                          </td>
                          <td className='bg-light align-middle'>
                            <p className='m-0 fw-bold' style={{'fontSize': '0.9rem'}}>
                              {
                                jogos.reduce((acc, item) => {
                                  const { PlacarCasa, PlacarFora} = item
                                  const placarCasaSplit = PlacarCasa.split(' ')
                                  const placarForaSplit = PlacarFora.split(' ')
                                  const casaFinal = placarCasaSplit[0]
                                  const foraFinal = placarForaSplit[0]
                                  return acc + parseInt(casaFinal) + parseInt(foraFinal)
                                }
                                , 0)
                              }
                            </p>
                          </td>
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
      <Row className='pt-1'>
        <Col className='px-1 mt-1'>
          <Card>
            <Card.Header className='fw-bold fs-6 text-center'>Premiership</Card.Header>
            <Card.Body>
              <Table responsive bordered size='sm'>
                <tbody>
                  <tr>
                    <td colSpan={12} className='text-center text-light fw-bold bg-success align-middle'>
                      <p className='m-0' style={{'fontSize': '1.2rem'}}>{`GREENS: ${premier[1][0]} (${((premier[1][0] * 100) / 480).toFixed(2)}%)`}</p>
                    </td>
                    <td colSpan={12} className='text-center text-light fw-bold bg-danger align-middle'>
                      <p className='m-0' style={{'fontSize': '1.2rem'}}>{`REDS: ${premier[1][1]} (${((premier[1][1] * 100) / 480).toFixed(2)}%)`}</p>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-center text-light fw-bold bg-secondary align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>H.</p>
                    </td>
                    {
                      linha0.map((item, index) => {
                        return (
                          <td key={index} className='text-center text-light fw-bold bg-secondary align-middle'>
                            <p className='m-0' style={{'fontSize': '0.8rem'}}>{item}</p>
                          </td>
                        )
                      }
                    )
                    }
                    <td className='text-center fw-bold bg-dark text-light align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>%</p>
                    </td>
                    <td className='text-center fw-bold bg-dark text-light align-middle'>
                      <p className='m-0' style={{'fontSize': '0.8rem'}}>Gols</p>
                    </td>
                  </tr>
                  {
                    premier[0].map((jogos, index1) => {
                      let greens = 0
                      return (
                        <tr key={index1} className='text-center'>
                          <td className='text-center text-light fw-bold bg-secondary align-middle'>
                            <p className='m-0' style={{'fontSize': '0.8rem'}}>{colunas[index1]}</p>
                          </td>
                          {/* <td className='bg-light align-middle'>
                            <input type="checkbox" defaultChecked={false} readOnly id="inlineCheckbox1" value="option1"/>
                          </td> */}
                          {
                          jogos.map((jogo, index2) => {
                            const { Casa, Fora, Hora, PlacarCasa, PlacarFora, classe} = jogo
                            classe === corGreen ? greens += 1 : null
                            let out = false
                            const placarCasaSplit = PlacarCasa.split(' ')
                            const placarForaSplit = PlacarFora.split(' ')
                            const casaFinal = placarCasaSplit[0]
                            const foraFinal = placarForaSplit[0]
                            const casaIntervalo = placarCasaSplit[1][1]
                            const foraIntervalo = placarForaSplit[1][1]
                            placarCasaSplit[1] == "(OUT)" || placarForaSplit[1] == "(OUT)" ? out = true : null

                            return (
                              <td key={`3${index1}${index2}`} className={'text-light hoverChange align-middle'} style={{ backgroundColor: jogo.classe}}>
                                <OverlayTrigger
                                  placement="top"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={
                                    <Tooltip id={`tooltip-s`}>
                                      {`${Hora} - ${Casa} x ${Fora}`}
                                    </Tooltip>
                                  }
                                >
                                  <div id={`3${index1}${index2}`} className='placarpremier' onClick={() => atualizaSelecao(`${casaFinal === '5+' ? '5' : casaFinal}x${foraFinal === '5+' ? '5' : foraFinal}`, `3${index1}${index2}`, 'premier')}>
                                    <p className='m-0' style={{'fontSize': '0.8rem'}}>{`${casaFinal === '5+' ? '5' : casaFinal}x${foraFinal === '5+' ? '5' : foraFinal}`}</p>
                                    <p className='m-0' style={{'fontSize': '0.7rem'}}>{ mostrarPlacar ? out ? 'oth' : `${casaIntervalo}x${foraIntervalo}` : '-'}</p>
                                  </div>
                                </OverlayTrigger>
                              </td>
                            )
                          })
                          }
                          <td className='bg-light align-middle'>
                            <p className={`m-0 text-bg-${ greens < 8 ? 'danger' : greens >= 10 ? 'success' : 'warning' } rounded`} style={{'fontSize': '0.7rem'}}>{`${((greens * 100) / 20).toFixed(1)}%`}</p>
                          </td>
                          <td className='bg-light align-middle'>
                            <p className='m-0 fw-bold' style={{'fontSize': '0.9rem'}}>
                              {
                                jogos.reduce((acc, item) => {
                                  const { PlacarCasa, PlacarFora} = item
                                  const placarCasaSplit = PlacarCasa.split(' ')
                                  const placarForaSplit = PlacarFora.split(' ')
                                  const casaFinal = placarCasaSplit[0]
                                  const foraFinal = placarForaSplit[0]
                                  return acc + parseInt(casaFinal) + parseInt(foraFinal)
                                }
                                , 0)
                              }
                            </p>
                          </td>
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
    </div>
  );
}

export default HorariosTodasLiga;