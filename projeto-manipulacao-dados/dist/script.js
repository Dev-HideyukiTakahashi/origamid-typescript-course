import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!data)
        return;
    const transacoes = data.map(normalizarTransacao);
    preencherTabela(transacoes);
    preencherEstatisticas(transacoes);
}
;
function preencherTabela(transacoes) {
    const tabela = document.querySelector('#transacoes tbody');
    if (!tabela)
        return;
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
function preencherChaveValor(lista, containerId) {
    const containerElement = document.getElementById(containerId);
    if (containerElement) {
        const chaves = Object.keys(lista);
        chaves.forEach(key => {
            containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
        });
    }
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas(transacoes);
    preencherChaveValor(data.pagamento, 'pagamento');
    preencherChaveValor(data.status, 'status');
    const diaElement = document.querySelector('#melhorDia');
    if (diaElement) {
        diaElement.innerHTML += data.melhorDia[0];
    }
    const totalElement = document.querySelector('#total span');
    if (totalElement) {
        totalElement.innerHTML = data.total.toLocaleString('pt-BR', {
            style: "currency",
            currency: 'BRL'
        });
    }
}
handleData();
//# sourceMappingURL=script.js.map