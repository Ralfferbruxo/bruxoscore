export default function tratarTabelaHorarios(tabela, activeKey, subActiveKey, corGreen, corRed) {
  let greens = 0;
  let reds = 0;

  const ordenarPorHora = tabela.sort(function (a, b) {
    if (a.Hora > b.Hora) {
      return 1;
    }
    if (a.Hora < b.Hora) {
      return -1;
    }
    return 0;
  });

  ordenarPorHora.forEach((jogo) => {
    const placarCasaFinal = jogo.PlacarCasa.split(' ')[0] === '5+' ? 5 : Number(jogo.PlacarCasa.split(' ')[0]);
    const placarForaFinal = jogo.PlacarFora.split(' ')[0] === '5+' ? 5 : Number(jogo.PlacarFora.split(' ')[0]);
    const placarCasaIntervalo = jogo.PlacarCasa.split(' ')[1]
    const placarForaIntervalo = jogo.PlacarFora.split(' ')[1]
    if (activeKey === 0) {
      if (subActiveKey === 0) {
        placarCasaFinal > placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        placarCasaFinal === 1 && placarForaFinal === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 2) {  
        placarCasaFinal === 2 && placarForaFinal === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 3) {
        placarCasaFinal === 2 && placarForaFinal === 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 4) {
        placarCasaFinal === 3 && placarForaFinal === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 5) {
        placarCasaFinal === 3 && placarForaFinal === 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 6) {
        placarCasaFinal === 3 && placarForaFinal === 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 7) {
        placarCasaFinal === 4 && placarForaFinal === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 8) {
        placarCasaFinal > placarForaFinal && (placarCasaFinal + placarForaFinal) >= 5 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 9) {
        placarCasaFinal === placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 10) {
        placarCasaFinal === 0 && placarForaFinal === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 11) {
        placarCasaFinal === 1 && placarForaFinal === 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 12) {
        placarCasaFinal === 2 && placarForaFinal === 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 13) {
        placarCasaFinal === placarForaFinal && (placarCasaFinal + placarForaFinal) >= 5 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 14) {
        if (placarCasaIntervalo.includes('OUT') || placarForaIntervalo.includes('OUT')) {
          jogo['classe'] = corRed;
        } else {
          (placarCasaFinal > placarForaFinal && Number(placarCasaIntervalo[1]) < Number(placarForaIntervalo[1])) || (placarCasaFinal < placarForaFinal && Number(placarCasaIntervalo[1]) > Number(placarForaIntervalo[1])) ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
        }
      } else if (subActiveKey === 15) {
        placarCasaFinal < placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 16) {
        placarCasaFinal === 0 && placarForaFinal === 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 17) {
        placarCasaFinal === 0 && placarForaFinal === 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 18) {
        placarCasaFinal === 1 && placarForaFinal === 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 19) {
        placarCasaFinal === 0 && placarForaFinal === 3 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 20) {
        placarCasaFinal === 1 && placarForaFinal === 3 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 21) {
        placarCasaFinal === 2 && placarForaFinal === 3 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 22) {
        placarCasaFinal === 0 && placarForaFinal === 4 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 23) {
        placarCasaFinal < placarForaFinal && (placarCasaFinal + placarForaFinal) >= 5 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    } else if (activeKey === 1) {
      const placarCasaIntervaloNumber = Number(placarCasaIntervalo[1]);
      const placarForaIntervaloNumber = Number(placarForaIntervalo[1]);
      if (subActiveKey === 0) {
        placarCasaIntervaloNumber > placarForaIntervaloNumber ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        placarCasaIntervaloNumber === 1 && placarForaIntervaloNumber === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 2) {
        placarCasaIntervaloNumber === 2 && placarForaIntervaloNumber === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 3) {
        placarCasaIntervaloNumber === placarForaIntervaloNumber ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 4) {
        placarCasaIntervaloNumber === 0 && placarForaIntervaloNumber === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 5) {
        placarCasaIntervaloNumber === 1 && placarForaIntervaloNumber === 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 6) {
        placarCasaIntervalo.includes('OUT') ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 7) {
        placarCasaIntervaloNumber < placarForaIntervaloNumber ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 8) {
        placarCasaIntervaloNumber === 0 && placarForaIntervaloNumber === 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 9) {
        placarCasaIntervaloNumber === 0 && placarForaIntervaloNumber === 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    } else if (activeKey === 2) {
      if (subActiveKey === 0) {
        placarCasaFinal + placarForaFinal > 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        placarCasaFinal + placarForaFinal > 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 2) {
        placarCasaFinal + placarForaFinal > 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 3) {
        placarCasaFinal + placarForaFinal > 3 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    } else if (activeKey === 3) {
      if (subActiveKey === 0) {
        placarCasaFinal + placarForaFinal < 1? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        placarCasaFinal + placarForaFinal < 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 2) {
        placarCasaFinal + placarForaFinal < 3 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 3) {
        placarCasaFinal + placarForaFinal < 4 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    } else if (activeKey === 4) {
      if (subActiveKey === 0) {
        placarCasaFinal > 0 && placarForaFinal > 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        placarCasaFinal === 0 || placarForaFinal === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    } else if (activeKey === 5) {
      if (subActiveKey === 0) {
        placarCasaFinal + placarForaFinal === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        placarCasaFinal + placarForaFinal === 1 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 2) {
        placarCasaFinal + placarForaFinal === 2 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 3) {
        placarCasaFinal + placarForaFinal === 3 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 4) {
        placarCasaFinal + placarForaFinal === 4 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey >= 5) {
        placarCasaFinal + placarForaFinal === 5 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    } else if (activeKey === 6) {
      const placarCasaIntervaloNumber = Number(placarCasaIntervalo[1]);
      const placarForaIntervaloNumber = Number(placarForaIntervalo[1]);
      if (subActiveKey === 0) {
        placarCasaIntervaloNumber > placarForaIntervaloNumber && placarCasaFinal > placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        placarCasaIntervaloNumber > placarForaIntervaloNumber && placarCasaFinal < placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 2) {
        placarCasaIntervaloNumber > placarForaIntervaloNumber && placarCasaFinal === placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 3) {
        placarCasaIntervaloNumber < placarForaIntervaloNumber && placarCasaFinal > placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 4) {
        placarCasaIntervaloNumber < placarForaIntervaloNumber && placarCasaFinal < placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 5) {
        placarCasaIntervaloNumber < placarForaIntervaloNumber && placarCasaFinal === placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 6) {
        placarCasaIntervaloNumber === placarForaIntervaloNumber && placarCasaFinal > placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 7) {
        placarCasaIntervaloNumber === placarForaIntervaloNumber && placarCasaFinal < placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 8) {
        placarCasaIntervaloNumber === placarForaIntervaloNumber && placarCasaFinal === placarForaFinal ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    } else if (activeKey === 7) {
      if (subActiveKey === 0) {
        (placarCasaFinal + placarForaFinal) % 2 === 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      } else if (subActiveKey === 1) {
        (placarCasaFinal + placarForaFinal) % 2 !== 0 ? jogo['classe'] = corGreen : jogo['classe'] = corRed;
      }
    }
    jogo.classe === corGreen ? greens += 1 : reds += 1;
  });

  const linhas = []

  for (let i = 1, inicio = 0, fim = 20 ; i <= 24 ; i += 1) {
    const linha = ordenarPorHora.slice(inicio, fim)
    linhas.push(linha)
    inicio += 20
    fim += 20
  }

  return [linhas, [greens, reds]];
  
  // const linha1 = ordenarPorHora.slice(0, 20);
  // const linha2 = ordenarPorHora.slice(20, 40);
  // const linha3 = ordenarPorHora.slice(40, 60);
  // const linha4 = ordenarPorHora.slice(60, 80);
  // const linha5 = ordenarPorHora.slice(80, 100);
  // const linha6 = ordenarPorHora.slice(100, 120);
  // const linha7 = ordenarPorHora.slice(120, 140);
  // const linha8 = ordenarPorHora.slice(140, 160);
  // const linha9 = ordenarPorHora.slice(160, 180);
  // const linha10 = ordenarPorHora.slice(180, 200);
  // const linha11 = ordenarPorHora.slice(200, 220);
  // const linha12 = ordenarPorHora.slice(220, 240);
  // const linha13 = ordenarPorHora.slice(240, 260);
  // const linha14 = ordenarPorHora.slice(260, 280);
  // const linha15 = ordenarPorHora.slice(280, 300);
  // const linha16 = ordenarPorHora.slice(300, 320);
  // const linha17 = ordenarPorHora.slice(320, 340);
  // const linha18 = ordenarPorHora.slice(340, 360);
  // const linha19 = ordenarPorHora.slice(360, 380);
  // const linha20 = ordenarPorHora.slice(380, 400);
  // const linha21 = ordenarPorHora.slice(400, 420);
  // const linha22 = ordenarPorHora.slice(420, 440);
  // const linha23 = ordenarPorHora.slice(440, 460);
  // const linha24 = ordenarPorHora.slice(460, 480);

  // return [[linha1, linha2, linha3, linha4, linha5, linha6, linha7, linha8, linha9, linha10, linha11, linha12, linha13, linha14, linha15, linha16, linha17, linha18, linha19, linha20, linha21, linha22, linha23, linha24], [greens, reds]];
}