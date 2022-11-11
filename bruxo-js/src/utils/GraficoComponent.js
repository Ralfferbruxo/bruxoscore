export default function numerosGrafico(jogos, activeKey) {
  const ordenarPorHora = jogos.sort(function (a, b) {
    if (a.Hora > b.Hora) {
      return 1;
    }
    if (a.Hora < b.Hora) {
      return -1;
    }
    return 0;
  });

  const linhas = []

  for (let i = 1, inicio = 0, fim = 20 ; i <= 24 ; i += 1) {
    const linha = ordenarPorHora.slice(inicio, fim)
    linhas.push(linha)
    inicio += 20
    fim += 20
  }

  const dadosGrafico = []

  linhas.forEach((linha) => {
    const dados = { 
      o1: 0, o2: 0, o3: 0, o4: 0,
      u1: 0, u2: 0, u3: 0, u4: 0, ouE: 0,
      g0: 0, g1: 0, g2: 0, g3: 0, g4: 0, g5: 0, gE: 0,
      vcHT: 0, emHT: 0, vfHT: 0, vcFT: 0, emFT: 0, vfFT: 0, vE: 0,
      cc: 0, ce: 0, cf: 0, ec: 0, ee: 0, ef: 0, fc: 0, fe: 0, ff: 0, htftE: 0,
      am: 0, cs: 0, es: 0, fs: 0, cn: 0, en: 0, fn: 0, ftamE: 0,
      par: 0, impar: 0, piE: 0,
    }

    linha.forEach((jogo, index) => {
      const placarCasaFinal = jogo.PlacarCasa.split(' ')[0] === '5+' ? 5 : Number(jogo.PlacarCasa.split(' ')[0]);
      const placarForaFinal = jogo.PlacarFora.split(' ')[0] === '5+' ? 5 : Number(jogo.PlacarFora.split(' ')[0]);
      const placarCasaIntervalo = jogo.PlacarCasa.split(' ')[1]
      const placarForaIntervalo = jogo.PlacarFora.split(' ')[1]

      if ((placarCasaFinal + placarForaFinal) === 0) {dados.u1 += 1; dados.u2 += 1; dados.u3 += 1; dados.u4 += 1; dados.g0 += 1; dados.par += 1;
      } else if ((placarCasaFinal + placarForaFinal) === 1) {dados.o1 += 1; dados.u2 += 1; dados.u3 += 1; dados.u4 += 1; dados.g1 += 1; dados.impar += 1;
      } else if ((placarCasaFinal + placarForaFinal) === 2) {dados.o1 += 1; dados.o2 += 1; dados.u3 += 1; dados.u4 += 1; dados.g2 += 1; dados.par += 1;
      } else if ((placarCasaFinal + placarForaFinal) === 3) {dados.o1 += 1; dados.o2 += 1; dados.o3 += 1; dados.u4 += 1; dados.g3 += 1; dados.impar += 1;
      } else if ((placarCasaFinal + placarForaFinal) === 4) {dados.o1 += 1; dados.o2 += 1; dados.o3 += 1; dados.o4 += 1; dados.g4 += 1; dados.par += 1;
      } else if ((placarCasaFinal + placarForaFinal) >= 5) {dados.o1 += 1; dados.o2 += 1; dados.o3 += 1; dados.o4 += 1; dados.g5 += 1; dados.impar += 1;} 

      if (placarCasaFinal > placarForaFinal) {
        dados.vcFT += 1;
        if (placarCasaFinal > 0 && placarForaFinal > 0) {
          dados.am += 1;
          dados.cs += 1;
        } else {
          dados.cn += 1
        }
      } else if (placarCasaFinal === placarForaFinal) {
        dados.emFT += 1;
        if (placarCasaFinal > 0 && placarForaFinal > 0) {
          dados.am += 1;
          dados.es += 1;
        } else {
          dados.en += 1
        }
      } else if (placarCasaFinal < placarForaFinal) {
        dados.vfFT += 1;
        if (placarCasaFinal > 0 && placarForaFinal > 0) {
          dados.am += 1;
          dados.fs += 1;
        } else {
          dados.fn += 1;
        }
      }

      if (!placarCasaIntervalo.includes('OUT')) {
        if (Number(placarCasaIntervalo[1]) > Number(placarForaIntervalo[1])) {
          dados.vcHT += 1;
          if (placarCasaFinal > placarForaFinal) {
            dados.cc += 1;
          } else if (placarCasaFinal === placarForaFinal) {
            dados.ce += 1;
          } else if (placarCasaFinal < placarForaFinal) {
            dados.cf += 1;
          }
        } else if (Number(placarCasaIntervalo[1]) === Number(placarForaIntervalo[1])) {
          dados.emHT += 1;
          if (placarCasaFinal > placarForaFinal) {
            dados.ec += 1;
          } else if (placarCasaFinal === placarForaFinal) {
            dados.ee += 1;
          } else if (placarCasaFinal < placarForaFinal) {
            dados.ef += 1;
          }
        } else if (Number(placarCasaIntervalo[1]) < Number(placarForaIntervalo[1])) {
          dados.vfHT += 1;
          if (placarCasaFinal > placarForaFinal) {
            dados.fc += 1;
          } else if (placarCasaFinal === placarForaFinal) {
            dados.fe += 1;
          } else if (placarCasaFinal < placarForaFinal) {
            dados.ff += 1;
          }
        }
      }  
    })
    dados.ouE = (dados.o1 + dados.o2 + dados.o3 + dados.o4 + dados.u1 + dados.u2 + dados.u3 + dados.u4 ) / 8;
    dados.gE = (dados.g0 + dados.g1 + dados.g2 + dados.g3 + dados.g4 + dados.g5) / 6;
    dados.vE = (dados.vcHT + dados.emHT + dados.vfHT + dados.vcFT + dados.emFT + dados.vfFT) / 6;
    dados.htftE = (dados.cc + dados.ce + dados.cf + dados.ec + dados.ee + dados.ef + dados.fc + dados.fe + dados.ff) / 9;
    dados.ftamE = (dados.am + dados.cs + dados.es + dados.fs + dados.cn + dados.en + dados.fn) / 7;
    dados.piE = (dados.par + dados.impar) / 2;
    dadosGrafico.push(dados)
  })

  const dadosFinais = []

  if (activeKey === 0) {
    dadosFinais.push(
      {
        label: 'Equilíbrio',
        data: dadosGrafico.map((item) => item.ouE),
        borderColor: 'rgb(30, 30, 30)',
        backgroundColor: 'rgb(60, 60, 60)',
      },
      {
        label: 'Over 0.5',
        data: dadosGrafico.map((item) => item.o1),
        borderColor: 'rgb(220,20,60)',
        backgroundColor: 'rgb(220,20,60, 0.5)',
      },
      {
        label: 'Over 1.5',
        data: dadosGrafico.map((item) => item.o2),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Over 2.5',
        data: dadosGrafico.map((item) => item.o3),
        borderColor: 'rgb(255,215,0)',
        backgroundColor: 'rgba(255,215,0, 0.5)',
      },
      {
        label: 'Over 3.5',
        data: dadosGrafico.map((item) => item.o4),
        borderColor: 'rgb(60,179,113)',
        backgroundColor: 'rgba(60,179,113, 0.5)',
      },
      {
        label: 'Under 0.5',
        data: dadosGrafico.map((item) => item.u1),
        borderColor: 'rgb(255,165,0)',
        backgroundColor: 'rgb(255,165,0, 0.5)',
      },
      {
        label: 'Under 1.5',
        data: dadosGrafico.map((item) => item.u2),
        borderColor: 'rgb(238,130,238)',
        backgroundColor: 'rgba(238,130,238, 0.5)',
      },
      {
        label: 'Under 2.5',
        data: dadosGrafico.map((item) => item.u3),
        borderColor: 'rgb(123,104,238)',
        backgroundColor: 'rgba(123,104,238, 0.5)',
      },
      {
        label: 'Under 3.5',
        data: dadosGrafico.map((item) => item.u4),
        borderColor: 'rgb(50,205,50)',
        backgroundColor: 'rgba(50,205,50, 0.5)',
      },
    )
  } else if (activeKey === 1) {
    dadosFinais.push(
      {
        label: 'Equilíbrio',
        data: dadosGrafico.map((item) => item.gE),
        borderColor: 'rgb(30, 30, 30)',
        backgroundColor: 'rgb(60, 60, 60)',
      },
      {
        label: '0 Gols',
        data: dadosGrafico.map((item) => item.g0),
        borderColor: 'rgb(220,20,60)',
        backgroundColor: 'rgb(220,20,60, 0.5)',
      },
      {
        label: '1 Gol',
        data: dadosGrafico.map((item) => item.g1),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '2 Gols',
        data: dadosGrafico.map((item) => item.g2),
        borderColor: 'rgb(255,215,0)',
        backgroundColor: 'rgba(255,215,0, 0.5)',
      },
      {
        label: '3 Gols',
        data: dadosGrafico.map((item) => item.g3),
        borderColor: 'rgb(60,179,113)',
        backgroundColor: 'rgba(60,179,113, 0.5)',
      },
      {
        label: '4 Gols',
        data: dadosGrafico.map((item) => item.g4),
        borderColor: 'rgb(123,104,238)',
        backgroundColor: 'rgba(123,104,238, 0.5)',
      },
      {
        label: '5+ Gols',
        data: dadosGrafico.map((item) => item.g5),
        borderColor: 'rgb(255,165,0)',
        backgroundColor: 'rgba(255,165,0, 0.5)',
      },
    )
  } else if (activeKey === 2) {
    dadosFinais.push(
      {
        label: 'Equilíbrio',
        data: dadosGrafico.map((item) => item.vE),
        borderColor: 'rgb(30, 30, 30)',
        backgroundColor: 'rgb(60, 60, 60)',
      },
      {
        label: 'Casa HT',
        data: dadosGrafico.map((item) => item.vcHT),
        borderColor: 'rgb(220,20,60)',
        backgroundColor: 'rgb(220,20,60, 0.5)',
      },
      {
        label: 'Empate HT',
        data: dadosGrafico.map((item) => item.emHT),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Fora HT',
        data: dadosGrafico.map((item) => item.vfHT),
        borderColor: 'rgb(255,215,0)',
        backgroundColor: 'rgba(255,215,0, 0.5)',
      },
      {
        label: 'Casa FT',
        data: dadosGrafico.map((item) => item.vcFT),
        borderColor: 'rgb(60,179,113)',
        backgroundColor: 'rgba(60,179,113, 0.5)',
      },
      {
        label: 'Empate FT',
        data: dadosGrafico.map((item) => item.emFT),
        borderColor: 'rgb(123,104,238)',
        backgroundColor: 'rgba(123,104,238, 0.5)',
      },
      {
        label: 'Fora FT',
        data: dadosGrafico.map((item) => item.vfFT),
        borderColor: 'rgb(255,165,0)',
        backgroundColor: 'rgba(255,165,0, 0.5)',
      },
    )
  } else if (activeKey === 3) {
    dadosFinais.push(
      {
        label: 'Equilíbrio',
        data: dadosGrafico.map((item) => item.htftE),
        borderColor: 'rgb(30, 30, 30)',
        backgroundColor: 'rgb(60, 60, 60)',
      },
      {
        label: 'Casa/Casa',
        data: dadosGrafico.map((item) => item.cc),
        borderColor: 'rgb(220,20,60)',
        backgroundColor: 'rgb(220,20,60, 0.5)',
      },
      {
        label: 'Casa/Empate',
        data: dadosGrafico.map((item) => item.ce),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Casa/Fora',
        data: dadosGrafico.map((item) => item.cf),
        borderColor: 'rgb(255,215,0)',
        backgroundColor: 'rgba(255,215,0, 0.5)',
      },
      {
        label: 'Empate/Casa',
        data: dadosGrafico.map((item) => item.ec),
        borderColor: 'rgb(60,179,113)',
        backgroundColor: 'rgba(60,179,113, 0.5)',
      },
      {
        label: 'Empate/Empate',
        data: dadosGrafico.map((item) => item.ee),
        borderColor: 'rgb(255,165,0)',
        backgroundColor: 'rgb(255,165,0, 0.5)',
      },
      {
        label: 'Empate/Fora',
        data: dadosGrafico.map((item) => item.ef),
        borderColor: 'rgb(238,130,238)',
        backgroundColor: 'rgba(238,130,238, 0.5)',
      },
      {
        label: 'Fora/Casa',
        data: dadosGrafico.map((item) => item.fc),
        borderColor: 'rgb(123,104,238)',
        backgroundColor: 'rgba(123,104,238, 0.5)',
      },
      {
        label: 'Fora/Empate',
        data: dadosGrafico.map((item) => item.fe),
        borderColor: 'rgb(50,205,50)',
        backgroundColor: 'rgba(50,205,50, 0.5)',
      },
      {
        label: 'Fora/Fora',
        data: dadosGrafico.map((item) => item.ff),
        borderColor: 'rgb(112,128,144)',
        backgroundColor: 'rgba(112,128,144, 0.5)',
      },
    )
  } else if (activeKey === 4) {
    dadosFinais.push(
      {
        label: 'Equilíbrio',
        data: dadosGrafico.map((item) => item.ftamE),
        borderColor: 'rgb(30, 30, 30)',
        backgroundColor: 'rgb(60, 60, 60)',
      },
      {
        label: 'Ambas Marcam',
        data: dadosGrafico.map((item) => item.am),
        borderColor: 'rgb(220,20,60)',
        backgroundColor: 'rgb(220,20,60, 0.5)',
      },
      {
        label: 'Casa/Sim',
        data: dadosGrafico.map((item) => item.cs),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Empate/Sim',
        data: dadosGrafico.map((item) => item.es),
        borderColor: 'rgb(255,215,0)',
        backgroundColor: 'rgba(255,215,0, 0.5)',
      },
      {
        label: 'Fora/Sim',
        data: dadosGrafico.map((item) => item.fs),
        borderColor: 'rgb(60,179,113)',
        backgroundColor: 'rgba(60,179,113, 0.5)',
      },
      {label: 'Casa/Não',
        data: dadosGrafico.map((item) => item.cn),
        borderColor: 'rgb(255,165,0)',
        backgroundColor: 'rgb(255,165,0, 0.5)',
      },
      {
        label: 'Empate/Não',
        data: dadosGrafico.map((item) => item.en),
        borderColor: 'rgb(238,130,238)',
        backgroundColor: 'rgba(238,130,238, 0.5)',
      },
      {
        label: 'Fora/Não',
        data: dadosGrafico.map((item) => item.fn),
        borderColor: 'rgb(123,104,238)',
        backgroundColor: 'rgba(123,104,238, 0.5)',
      },
    )
  } else if (activeKey === 5) {
    dadosFinais.push(
      {
        label: 'Equilíbrio',
        data: dadosGrafico.map((item) => item.piE),
        borderColor: 'rgb(30, 30, 30)',
        backgroundColor: 'rgb(60, 60, 60)',
      },
      {
        label: 'Par',
        data: dadosGrafico.map((item) => item.par),
        borderColor: 'rgb(220,20,60)',
        backgroundColor: 'rgb(220,20,60, 0.5)',
      },
      {
        label: 'Ímpar',
        data: dadosGrafico.map((item) => item.impar),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    )
  }

  return dadosFinais
}