import { useState } from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import bruxos_png from '../assets/bruxos.png';
import axios from 'axios';

function Login(props) {
  const { setLogin } = props;
  const [erro, setErro] = useState(false);

  function login() {
    const login = document.getElementsByName('login')[0].value
    const senha = document.getElementsByName('senha')[0].value

    axios.post('http://164.92.126.51:5000/login', { login, senha })
    .then(response => {
      if (response.data.status === 'success') {
        setLogin(true)
        setErro(false)
      } else {
        setErro(true)
      }
    })
  }

  return ( 
    <div className="background d-flex justify-content-center align-items-center">
      <Card className='w-10 d-flex flex-column justify-content-center align-items-center'>
        <Card.Header className='w-100 p-0 fs-5 fw-bold d-flex justify-content-center align-items-center'>
        <img src={bruxos_png} style={{ width: '4rem', height: '4rem' }} />
          BRUXO DO VIRTUAL
        <img src={bruxos_png} style={{ width: '4rem', height: '4rem' }} />
        </Card.Header>
        <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
          <InputGroup className="mb-3">
            <InputGroup.Text id="login" className='w-25 d-flex justify-content-center'>Usuário</InputGroup.Text>
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
              id='login'
              name='login'
              />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="senha" className='w-25 d-flex justify-content-center'>Senha</InputGroup.Text>
            <Form.Control
              type='password'
              aria-label="Username"
              aria-describedby="basic-addon1"
              id='senha'
              name='senha'
              />
          </InputGroup>
          <Button variant="primary" className='w-25' onClick={login}>Logar</Button>
          {
            erro ? (
              <p className='p-0 m-0 mt-3 text-danger'>Usuário ou senha incorretos</p>
            ) : null
          }
        </Card.Body>
      </Card>
    </div>    
  );
}

export default Login;