import { CountList } from "./countBy.js";
import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";


async function handleData() {
  const data = await fetchData<TransacaoAPI[]>("https://api.origamid.dev/json/transacoes.json?");

  if (!data) return;
  const transacoes = data.map(normalizarTransacao);

  /* após a checagem voltar como 'true' o TS já entende que o tipo do objeto é 'TransacaoAPI'
   e contém todos seus atributos/métodos
  if (data) {
    data.forEach(element => {
      console.log(element.Email);
    });
  } */
  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
};

// preenchendo a 'table' do html com dados do json já normalizados
function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector('#transacoes tbody');
  if (!tabela) return;

  transacoes.forEach((transacao) => {
    tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>R$ ${transacao.moeda}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>
    `;
  });
}

function preencherChaveValor(lista: CountList, containerId: string): void {

  const containerElement = document.getElementById(containerId);
  if (containerElement) {
    const chaves = Object.keys(lista); // retorna 1 array
    chaves.forEach(key => {
      containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`; // preenchendo chave/valor
    });
  }
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  const data = new Estatisticas(transacoes);

  preencherChaveValor(data.pagamento, 'pagamento');
  preencherChaveValor(data.status, 'status');

  const diaElement = document.querySelector('#melhorDia');
  if (diaElement) {
    diaElement.innerHTML += data.melhorDia[0];
  }

  const totalElement = document.querySelector('#total span');
  if (totalElement) {
    // Convertendo para moeda local Brasil
    totalElement.innerHTML = data.total.toLocaleString('pt-BR', {
      style: "currency",
      currency: 'BRL'
    });
  }
}


handleData();
