const btn = document.querySelectorAll(".buttonCard")
const image = document.getElementById("image")
const mainCard = document.querySelector("#cards")
const body = document.getElementById("body")

let backgroundColors = ["yellow", "blue", "green"]
let localBgColor = parseInt(localStorage.getItem("bg")) || 0
let valor = false;

let change = 1
let renderizarUmaVez = 0
let controlEleminatorios = 0;
let controlGrupos = 0;

if (mainCard.innerHTML.length === 0) {
  btn.forEach((item) => {
    item.style.display = "none"
  })
}

if (renderizarUmaVez === 0) {

  for (let i = 0; i <= 2; i++) {
    body.classList.remove(backgroundColors[i]);
  }

  body.classList.add(backgroundColors[localBgColor])
  renderizarUmaVez = 1;
}

function changeBackground() {

  body.classList.remove(backgroundColors[localBgColor])

  localBgColor += 1

  if (localBgColor === 3) {
    localBgColor = 0
  }

  body.classList.add(backgroundColors[localBgColor])
  localStorage.setItem("bg", localBgColor);
  
}

function createGame(
  player1, hour, player2, player1Win, player2Win, player1Score, player2Score) {
  return `
    <li>
      <aside>${player1Score || 0}</aside>
      <div class="centerCrown">
        ${player1Win ? `
          <img
            src="./assets/gameWin.svg" 
            alt="crown"
            title="win"
            id="winOrLose"
          />`
          :
          `<span style="height: 20px; width: 20px"></span>`
        }

        <img
          src="./assets/${player1}-icon.svg"
          alt="Bandeira ${player1}"
          title="${player1}"
          ${player1Win ? `
            class="winColor"` : ""
          }
        >
      </div>

      <strong>${hour}</strong>

      <div class="centerCrown">
        ${player2Win ? 
          `<img
            src="./assets/gameWin.svg" 
            alt="crown"
            title="win"
            id="winOrLose"
          />`
          :
          `<span style="height: 20px; width: 20px"></span>`
        }

        <img
          src="./assets/${player2}-icon.svg"
          alt="Bandeira ${player2}"
          title="${player2}"
          ${player2Win ? `
            class="winColor"` : ""
          }
        >
      </div>
      <aside>${player2Score || 0}</aside>
    </li>
  `;
}

function createCard(date, day, games) {
  
  return `
    <div class="card">
      <h2>${date} <span>${day}</span></h2>

      <ul>
        ${games}
      </ul>

    </div>
  `;
}

let cardsFaseDeGrupos = [
  createCard(
  '20/11', 'Domingo', 
    createGame("qatar", "13:00" , "ecuador", false, true, 0, 2)
  ),
  createCard(
    '21/11', 'Segunda',
    createGame("england", "10:00" , "iran", true, false, 6, 2) +
    createGame("senegal", "13:00" , "netherlands", false, true, 0, 2) +
    createGame("unitedStates", "16:00" , "wales", false, false, 1, 1)
  ),
  createCard(
    '22/11', 'Terça',
    createGame("argentina", "07:00" , "saudiArabia", false, true, 1, 2) +
    createGame("denmark", "10:00" , "tunisia", false, false) +
    createGame("mexico", "13:00" , "poland", false, false) +
    createGame("france", "16:00" , "australia", true, false, 4, 1)
  ),
  createCard(
    '23/11', 'Quarta',
    createGame("morocco", "07:00" , "croatia", false, false) +
    createGame("germany", "10:00" , "japan", false, true, 1, 2) +
    createGame("spain", "13:00" , "costaRica", true, false, 7, 0) +
    createGame("belgium", "16:00" , "canada", true, false, 1, 0)
  ),
  createCard(
    '24/11', 'Quinta',
    createGame("switzerland", "07:00" , "cameroon", true, false, 1, 0) +
    createGame("uruguay", "10:00" , "southKorea", false, false) +
    createGame("portugal", "13:00" , "ghana", true, false, 3, 2) +
    createGame("brazil", "16:00" , "serbia", true, false, 2, 0)
  ),
  createCard(
    '25/11', 'Sexta',
    createGame("wales", "07:00" , "iran", false, true, 0, 2) +
    createGame("qatar", "10:00" , "senegal", false, true, 1, 3) +
    createGame("netherlands", "13:00" , "ecuador", false, false, 1, 1) +
    createGame("england", "16:00" , "unitedStates")
  ),
  createCard(
    '26/11', 'Sábado', 
    createGame("tunisia", "07:00" , "australia", false, true, 0, 1) +
    createGame("poland", "10:00" , "saudiArabia", true, false, 2, 0) +
    createGame("france", "13:00" , "denmark", true, false, 2, 1) +
    createGame("argentina", "16:00" , "mexico", true, false, 2, 0)
  )
  ,
  createCard(
    '27/11', 'Domingo', 
    createGame("japan", "07:00" , "costaRica", false, true, 0, 1) +
    createGame("belgium", "10:00" , "morocco", false, true, 0, 2) +
    createGame("croatia", "13:00" , "canada", true, false, 4, 1) +
    createGame("spain", "16:00" , "germany", false, false, 1, 1)
  ),
  createCard(
    '28/11', 'Segunda', 
    createGame("cameroon", "07:00" , "serbia", false, false, 3, 3) +
    createGame("southKorea", "10:00" , "ghana",false, true, 2, 3) +
    createGame("brazil", "13:00" , "switzerland", true, false, 1, 0) +
    createGame("portugal", "16:00" , "uruguay", true, false, 2, 0)
  ),
  createCard(
    '29/11', 'Terça', 
    createGame("ecuador", "12:00" , "senegal", false, true, 1, 2) +
    createGame("netherlands", "12:00" , "qatar", true, false, 2, 0) +
    createGame("iran", "16:00" , "unitedStates", false, true, 0, 1) +
    createGame("wales", "16:00" , "england", false, true, 0, 3)
  ),
  createCard(
    '30/11', 'Quarta', 
    createGame("tunisia", "12:00" , "france", true, false, 1, 0) +
    createGame("australia", "12:00" , "denmark", true, false, 1, 0) +
    createGame("poland", "16:00" , "argentina", false, true, 0, 2) +
    createGame("saudiArabia", "16:00" , "mexico", false, true, 1, 2)
  ),
  createCard(
    '01/12', 'Quinta',
    createGame("croatia", "12:00" , "belgium") +
    createGame("canada", "12:00" , "morocco") +
    createGame("japan", "16:00" , "spain") +
    createGame("costaRica", "16:00" , "germany")
  ),
  createCard(
    '02/12', 'Sexta',
    createGame("southKorea", "12:00" , "portugal") +
    createGame("ghana", "12:00" , "uruguay") +
    createGame("serbia", "16:00" , "switzerland") +
    createGame("cameroon", "16:00" , "brazil")
  )
]

let faseDeGruposDatas = [
  "20/11", "21/11", "22/11", "23/11", "24/11", "25/11", "26/11", "27/11", "28/11",
  "29/11", "30/11", "01/12", "02/12"
]

let cardsJogosEleminatorios = [
  createCard(
    '03/12', 'Sábado',
    createGame("netherlands", "12:00" , "unitedStates") +
    createGame("argentina", "16:00" , "australia")
  ),
  createCard(
    '04/12', 'Domingo',
    createGame("france", "12:00" , "poland") +
    createGame("england", "16:00" , "senegal")
  ),
  createCard(
    '05/12', 'Segunda',
    createGame("", "12:00" , "") +
    createGame("", "16:00" , "")
  ),
  createCard(
    '06/12', 'Terça',
    createGame("", "12:00" , "") +
    createGame("", "16:00" , "")
  )
  ,
  createCard(
    '09/12', 'Sexta',
    createGame("", "12:00" , "") +
    createGame("", "16:00" , "")
  ),
  createCard(
    '10/12', 'Sábado',
    createGame("", "12:00" , "") +
    createGame("", "16:00" , "")
  ),
  createCard(
    '13/12', 'Terça',
    createGame("", "16:00" , "")
  ),
  createCard(
    '14/12', 'Quarta',
    createGame("", "16:00" , "")
  ),
  createCard(
    '17/12', 'Sábado',
    createGame("", "12:00" , "")
  ),
  createCard(
    '18/12', 'Domingo',
    createGame("", "12:00" , "")
  )
]

let jogosEleminatoriosDatas = [
  "03/12", "04/12", "05/12", "06/12", "09/12", "10/12", "13/12", "14/12", "17/12", 
  "18/12"
]

function previousCard() {

  if (controlGrupos === 0 && controlEleminatorios === 0) {
    return
  }

  if (controlGrupos > 0 && !valor) {
    controlGrupos -= 1;

    const result = cardsFaseDeGrupos.filter(e =>
      e.includes(faseDeGruposDatas[controlGrupos]))

    mainCard.innerHTML = result.toString().replaceAll(",", " ");
  }

  if (valor && controlEleminatorios > 0) {

    controlEleminatorios -= 1;

    const result = cardsJogosEleminatorios.filter(e => 
      e.includes(jogosEleminatoriosDatas[controlEleminatorios]))

    mainCard.innerHTML = result.toString().replaceAll(",", " ");
  }

}

function nextCard() {

  if (controlGrupos === faseDeGruposDatas.length - 1 ) {
    controlGrupos = -1
  }

  if (controlEleminatorios === jogosEleminatoriosDatas.length - 1) {
    controlEleminatorios = -1;
  }

  if (valor) {

    controlEleminatorios += 1;

    const result = cardsJogosEleminatorios.filter(e => 
      e.includes(jogosEleminatoriosDatas[controlEleminatorios]))

    mainCard.innerHTML = result.toString().replaceAll(",", " ");
  } else {

    controlGrupos += 1;

    const result = cardsFaseDeGrupos.filter(e =>
      e.includes(faseDeGruposDatas[controlGrupos]))

    mainCard.innerHTML = result.toString().replaceAll(",", " ");
  }
}

function faseDeGrupos() {
  valor = false;

  image.style.display = "none"

  btn.forEach((item) => {
    item.style.display = "block"
  })

  const result = cardsFaseDeGrupos.filter(e => 
    e.includes(faseDeGruposDatas[controlGrupos]))

  mainCard.innerHTML = result.toString().replaceAll(",", " ");
}

function JogosFinais() {
  valor = true;

  image.style.display = "none"

  btn.forEach((item) => {
    item.style.display = "block"
  })

  const result = cardsJogosEleminatorios.filter(e =>
    e.includes(jogosEleminatoriosDatas[controlEleminatorios]))

  mainCard.innerHTML = result.toString().replaceAll(",", " ");
}
