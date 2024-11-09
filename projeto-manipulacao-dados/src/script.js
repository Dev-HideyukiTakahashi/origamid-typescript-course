"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Estatisticas_js_1 = __importDefault(require("./Estatisticas.js"));
const fetchData_js_1 = __importDefault(require("./fetchData.js"));
const normalizarTransacao_js_1 = __importDefault(require("./normalizarTransacao.js"));
function handleData() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, fetchData_js_1.default)("https://api.origamid.dev/json/transacoes.json?");
        if (!data)
            return;
        const transacoes = data.map(normalizarTransacao_js_1.default);
        /* após a checagem voltar como 'true' o TS já entende que o tipo do objeto é 'TransacaoAPI'
         e contém todos seus atributos/métodos
        if (data) {
          data.forEach(element => {
            console.log(element.Email);
          });
        } */
        preencherTabela(transacoes);
        preencherEstatisticas(transacoes);
    });
}
;
// preenchendo a 'table' do html com dados do json já normalizados
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
        const chaves = Object.keys(lista); // retorna 1 array
        chaves.forEach(key => {
            containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`; // preenchendo chave/valor
        });
    }
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas_js_1.default(transacoes);
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
