"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = normalizarTransacao;
const moedaParaNumero_js_1 = __importDefault(require("./moedaParaNumero.js"));
const stringToDate_js_1 = __importDefault(require("./stringToDate.js"));
function normalizarTransacao(transacao) {
    return {
        nome: transacao.Nome,
        id: transacao.ID,
        data: (0, stringToDate_js_1.default)(transacao.Data),
        status: transacao.Status,
        email: transacao.Email,
        moeda: transacao["Valor (R$)"],
        valor: (0, moedaParaNumero_js_1.default)(transacao["Valor (R$)"]),
        pagamento: transacao["Forma de Pagamento"],
        novo: Boolean(transacao["Cliente Novo"]), // recebendo 0 retorna false e 1 retorna true
    };
}
