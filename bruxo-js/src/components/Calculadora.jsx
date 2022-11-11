import construcao from '../assets/em-construcao.png';

function Calculadora(props) {
  return ( 
    <div  className='w-100 h-100 m-0 d-flex justify-content-center align-items-center'>
      <img src={construcao} alt="contrução" className='align-self-center mt-5'/>
    </div>
  );
}

export default Calculadora;