import { useState } from 'react'
import Home from './Home'

function App() {
  const [login, setLogin] = useState(false)
  const [liga, setLiga] = useState('copa')
  const [menu, setMenu] = useState('inicio')
  const [count, setCount] = useState(0)

  return (
    <>
      <Home login={login} setLogin={setLogin} liga={liga} setLiga={setLiga} menu={menu} setMenu={setMenu} count={count} setCount={setCount}/>
    </>
  )
}

export default App
