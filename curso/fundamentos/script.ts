// instalando : $ npm install -g typescript 
// tsc : cria um arquivo .js para executar
// tsc -w : terminal fica acompanhando e transforamndo em .js, sem necessidade de precisar 'tsc' toda hora

function teste() {
  function somar(a: number, b: number) {
    return a + b;
  }
  console.log(somar(5, 10));
};
// teste();



/*  Aula 2 - Annotation e Inference */

function aula2() {

  // como produto já foi inferido com um valor 'string' não seria necessário atribuir ':string'
  var produto: string = "Livro";
  var preco: number = 200;
  //produto = 300; - TS não permite pois agora 'produto' é do tipo 'string' e não aceita valor 'number' 


  // criando um obj com ts
  const carro: {
    marca: string;
    portas: number;
  } = {
    marca: "Audi",
    portas: 5
  }

  // criando uma função
  function somar(a: number, b: number) {
    return a + b; // o return foi inferido o tipo number pelos parâmetros, seria o mesmo que 'somar(a: number, b: number) : number {} '
  }
}
// aula2();


/*  Aula 3 - Union Types */

function aula3() {

  let total: string | number = 200;
  total = "Hello";

  function isNumber(value: string | number) {
    if (typeof value === "number") {
      return true;
    } else {
      return false;
    }
  }

  console.log(isNumber("2"));
}
// aula3();

function toNumber(value: number | string) {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    return Number(value);
  } else {
    throw "value deve ser um número ou string!";
  }
}
console.log(toNumber(2));


