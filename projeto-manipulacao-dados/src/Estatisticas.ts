// criando com classe apenas para praticar, poderia ser function



// criando uma cópia e defininindo que o valor será apenas number
// não mais number | null
type TransacaoValor = Transacao & { valor: number };
// verificando se o parametro é equivalente ao novo tipo
// isso tudo para evitar que o valor venha como null depois de filtrado('filter')
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}


export default class Estatisticas {
  private transacoes;
  total;
  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
  }

  private setTotal() {
    return this.transacoes.filter((filtrarValor))
      .reduce((acc, item) => {
        // sem o filtrarValor, o ts ainda reclama que o valor pode ser number | null
        return acc + item.valor;
      }, 0);
  }
}