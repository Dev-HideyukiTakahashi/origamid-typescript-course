import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";


// Declarando global para ser reutilizado sem precisar importar
declare global {
  type TransacaoPagamento = "Boleto" | "Cartão de Crédito";
  type TransacaoStatus = "Paga" | "Recusada pela operadora de cartão" | "Aguardando pagamento " | "Estornada";

  interface TransacaoAPI {
    Nome: string;
    ID: number;
    Data: string;
    Status: TransacaoStatus;
    Email: string;
    ['Valor (R$)']: string; // não podemos declarar variável com 'espaço' em branco
    ['Cliente Novo']: number; // por isso declarado dentro do colchetes
    ['Forma de Pagamento']: TransacaoPagamento;
  }

  // normalizando para o retorno
  interface Transacao {
    nome: string;
    id: number;
    data: string;
    status: TransacaoStatus;
    email: string;
    moeda: string; // relacionado ao ['Valor (R$)'] acima
    valor: number | null; // relacionado ao ['Valor (R$)'] acima
    pagamento: TransacaoPagamento; // relacionado ao ['Cliente Novo'] acima
    novo: boolean; // relacionado ao ['Forma de Pagamento'] acima
  }
}
export default function normalizarTransacao(transacao: TransacaoAPI) {
  return {
    nome: transacao.Nome,
    id: transacao.ID,
    data: stringToDate(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),  // recebendo 0 retorna false e 1 retorna true
  };
}