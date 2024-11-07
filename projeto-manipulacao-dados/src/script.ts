import fetchData from "./fetchData.js";

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

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>("https://api.origamid.dev/json/transacoes.json");

  // após a checagem voltar como 'true' o TS já entende que o tipo do objeto é 'TransacaoAPI'
  // e contém todos seus atributos/métodos
  if (data) {
    data.forEach(element => {
      console.log(element.Email);
    });
  }

};

handleData();
