"use strict";
// criando com classe apenas para praticar, poderia ser function
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const countBy_js_1 = __importDefault(require("./countBy.js"));
// verificando se o parametro é equivalente ao novo tipo
// isso tudo para evitar que o valor venha como null depois de filtrado('filter')
function filtrarValor(transacao) {
    return transacao.valor !== null;
}
class Estatisticas {
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }
    setTotal() {
        return this.transacoes.filter((filtrarValor))
            .reduce((acc, item) => {
            // sem o filtrarValor, o ts ainda reclama que o valor pode ser number | null
            return acc + item.valor;
        }, 0);
    }
    setPagamento() {
        // as chaves tranforma em transacao pagamento (desestrutura)
        return (0, countBy_js_1.default)(this.transacoes.map(({ pagamento }) => pagamento));
    }
    setStatus() {
        return (0, countBy_js_1.default)(this.transacoes.map(({ status }) => status));
    }
    setSemana() {
        const semana = {
            domingo: 0,
            segunda: 0,
            terca: 0,
            quarta: 0,
            quinta: 0,
            sexta: 0,
            sabado: 0,
        };
        for (let i = 0; i < this.transacoes.length; i++) {
            const day = this.transacoes[i].data.getDay();
            if (day === 0)
                semana.domingo += 1;
            if (day === 1)
                semana.segunda += 1;
            if (day === 2)
                semana.terca += 1;
            if (day === 3)
                semana.quarta += 1;
            if (day === 4)
                semana.quinta += 1;
            if (day === 5)
                semana.sexta += 1;
            if (day === 6)
                semana.sabado += 1;
        }
        return semana;
    }
    setMelhorDia() {
        return Object.entries(this.semana).sort((a, b) => {
            return b[1] - a[1];
        })[0];
    }
    ;
}
exports.default = Estatisticas;
