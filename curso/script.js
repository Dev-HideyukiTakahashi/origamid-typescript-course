"use strict";
// instalando : $ npm install -g typescript 
// tsc : cria um arquivo .js para executar
// tsc -w : terminal fica acompanhando e transforamndo em .js, sem necessidade de precisar 'tsc' toda hora
function somar(a, b) {
    return a + b;
}
console.log(somar(5, 10));
/*  Aula 2 - Annotation e Inference */
function aula2() {
    // como produto já foi inferido com um valor 'string' não seria necessário atribuir ':string'
    var produto = "Livro";
    var preco = 200;
    //produto = 300; - TS não permite pois agora 'produto' é do tipo 'string' e não aceita valor 'number' 
    // criando um obj com ts
    const carro = {
        marca: "Audi",
        portas: 5
    };
    // criando uma função
    function somar(a, b) {
        return a + b; // o return foi inferido o tipo number pelos parâmetros, seria o mesmo que 'somar(a: number, b: number) : number {} '
    }
}
function normalizarTexto(texto) {
    return texto.trim().toLowerCase();
}
console.log(normalizarTexto("Ola Mundo!  OK"));
