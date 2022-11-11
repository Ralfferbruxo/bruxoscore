import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

import Login from './components/Login'
import Header from './components/Header'
import Inicio from './components/Inicio'
import UltJogos from './components/UltimosJogos'
import ProxJogos from './components/ProxJogos'
import Tabelas from './components/Tabelas'
import Artilheiros from './components/Artilheiros'
import Rankings from './components/Rankings'
import Calculadora from './components/Calculadora'
import Maximas from './components/Maximas'
import Odds from './components/Odds'
import Horarios from './components/Horarios'

import flags_euro from './assets/bandeiras_euro/export_euro';
import flags_copa from './assets/bandeiras_copa/export_copa';
import flags_premier from './assets/bandeiras_premier/export_premier';
import flags_super from './assets/bandeiras_super/export_super';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

function Home(props) {
  const { login, setLogin, liga, setLiga, menu, setMenu, count, setCount } = props
  const [dados, setDados] = useState(null)
  const [renderProxJogos, setRenderProxJogos] = useState(true)
  const [flags, setFlags] = useState(flags_copa)
  const [intervalo, setIntervalo] = useState(null)
  // Odds
  const [casa, setCasa] = useState(0)
  const [fora, setFora] = useState(1)

  useEffect(() => {
    setRenderProxJogos(false)
    fetch('http://164.92.126.51:5000/copa')
      .then(response => response.json())
      .then(data => setDados(JSON.parse(data)))
    setRenderProxJogos(true)
  }, [])

  function atualizaDados() {
    fetch(`http://164.92.126.51:5000/${liga}`)
        .then(response => response.json())
        .then(data => setDados(JSON.parse(data)))
  }

  useEffect(() => {
    setRenderProxJogos(false)
    clearInterval(intervalo)
    fetch(`http://164.92.126.51:5000/${liga}`)
      .then(response => response.json())
      .then(data => setDados(JSON.parse(data)))
    if (liga === 'euro') {
      setFlags(flags_euro)
    }
    else if (liga === 'copa') {
      setFlags(flags_copa)
    }
    else if (liga === 'premier') {
      setFlags(flags_premier)
    }
    else {
      setFlags(flags_super)
    }
    if (count > 0) setIntervalo(setInterval(atualizaDados, 20000))
    setCount(count + 1)
    setRenderProxJogos(true)
  }, [liga])

  return (
    <div className="App">
      {
        login ? (
          dados ? (
            <>
            <Header className='m-0 p-0' setLogin={setLogin} liga={liga} setLiga={setLiga} menu={menu} setMenu={setMenu}/>
            <div className='conteudo'>
              {
                menu === 'inicio' ? <Inicio liga={liga} dados={dados} flags={flags} setMenu={setMenu} setCasa={setCasa} setFora={setFora}/> : null
              }
              {
                menu === 'prox. jogos' ? <ProxJogos liga={liga} dados={dados} flags={flags} renderProxJogos={renderProxJogos}/> : null
              }
              {
                menu === 'ult. jogos' ? <UltJogos setLiga={setLiga} setMenu={setMenu} setCasa={setCasa} setFora={setFora}/> : null
              }
              {
                menu === 'tabelas' ? <Tabelas liga={liga}/> : null
              }
              {
                menu === 'artilheiros' ? <Artilheiros liga={liga}/> : null
              }
              {
                menu === 'rankings' ? <Rankings liga={liga}/> : null
              }
              {
                menu === 'calculadora' ? <Calculadora/> : null
              }
              {
                menu === 'maximas' ? <Maximas liga={liga}/> : null
              }
              {
                menu === 'odds' ? <Odds casa={casa} fora={fora} setCasa={setCasa} setFora={setFora} liga={liga} flags={flags}/> : null
              }
              {
                menu === 'horarios' ? <Horarios liga={liga}/> : null
              }
            </div>
          </>
          ) : <div className="loading d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="light" role="status">
                  <span className="visually-hidden-focusable">Loading...</span>
                </Spinner>
              </div>
        ) : (
          <Login setLogin={setLogin}/>
        )
      }
    </div>
  )
}

export default Home
