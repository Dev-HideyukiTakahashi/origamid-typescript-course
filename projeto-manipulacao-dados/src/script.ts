import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";


async function handleData() {
  const data = await fetchData<TransacaoAPI[]>("https://api.origamid.dev/json/transacoes.json?");

  if (!data) return;
  const transacoes = data.map(normalizarTransacao);
  console.log(transacoes);

  /* após a checagem voltar como 'true' o TS já entende que o tipo do objeto é 'TransacaoAPI'
   e contém todos seus atributos/métodos
  if (data) {
    data.forEach(element => {
      console.log(element.Email);
    });
  } */

};

handleData();
