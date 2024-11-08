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


handleData();
