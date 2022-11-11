import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import numerosGrafico from '../utils/GraficoComponent'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const botoes = ['Over/Under', 'Gols', 'Vencedor', 'HT/FT', 'FT/Ambas', 'Par/Ímpar']

function Grafico(props) {
  const { ultimosJogos, liga } = props
  const [activeKey, setActiveKey] = useState(0);

  const copa = numerosGrafico(ultimosJogos[0].dados[0], activeKey)
  const euro = numerosGrafico(ultimosJogos[0].dados[1], activeKey)
  const premier = numerosGrafico(ultimosJogos[0].dados[2], activeKey)
  // const superliga = numerosGrafico(ultimosJogos[0].dados[3], activeKey)
  
  const ligaAtual = liga === 'copa' ? copa
  : liga === 'euro' ? euro
  : liga === 'premier' ? premier
  // : superliga
  : 'copa'

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 20
      }
    },
    animations: {
      tension: {
        // duration: 500,
        // easing: 'linear',
        from: 1,
        to: 0.4,
        // loop: true
      },
    },
    plugins: {
      legend: {
        display: true,
  
        position: 'left',
      },
      title: {
        display: true,
        text: botoes[activeKey],
      },
    },
  };
  
  const labels = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  
  const data = {
    labels,
    datasets: ligaAtual
    // datasets: [
    //   {
    //     label: 'Over 0.5',
    //     data: userData.map((item) => item.u1),
    //     borderColor: 'rgb(255, 99, 132)',
    //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //   },
    //   {
    //     label: 'Over 1.5',
    //     data: userData.map((item) => item.u2),
    //     borderColor: 'rgb(53, 162, 235)',
    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //   },
    //   {
    //     label: 'Over 2.5',
    //     data: userData.map((item) => item.u3),
    //     borderColor: 'rgb(563, 56, 235)',
    //     backgroundColor: 'rgba(563, 56, 235, 0.5)',
    //   },
    //   {
    //     label: 'Over 3.5',
    //     data: userData.map((item) => item.u4),
    //     borderColor: 'rgb(53, 162, 235)',
    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //   },
    // ],
  };

  return ( 
    <div className='w-100'>
      <div>
        <Nav activeKey={0} className='row px-1'>
          {
            botoes.map((item, index) => {
              return (
                <Nav.Item key={index} className='col p-0'>
                  <Nav.Link eventKey={index}>
                    <Button onClick={() => {setActiveKey(index)}} className='w-100 d-flex justify-content-center align-items-center' variant={activeKey === index ? 'success' : 'secondary' } style={{'height': '3rem'}}>
                      <p className='m-0'>{item}</p>
                    </Button>
                  </Nav.Link>
                </Nav.Item>
              )
            }
          )
          }
        </Nav>
      </div>
      <Card className='shadow mt-3'>
        <Card.Body>
          <Line options={options} data={data} style={{ height: '20rem'}}/>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Grafico;