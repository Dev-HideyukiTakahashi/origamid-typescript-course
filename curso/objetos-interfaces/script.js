"use strict";
/* Instance of */
function aula01() {
    // criando uma classe com TS
    class Produto {
        constructor(nome, preco) {
            this.nome = nome;
            this.preco = preco;
        }
        precoReal() {
            return `R$ ${this.preco}`;
        }
    }
    const livro = new Produto('A guerra dos Tronos', 200);
    console.log(livro.precoReal()); // out: R$ 200
    console.log(livro instanceof Produto); // out: true
    console.log(livro instanceof String); // out: false
    class Livro extends Produto {
        constructor(nome, preco, autor) {
            super(nome, preco);
            this.autor = autor;
        }
    }
    const livro2 = new Livro('O senhor dos anéis', 150, "Tolkien");
    if (livro2 instanceof Produto) {
        console.log("O livro2 faz parte de Produto."); //out: O livro2 faz parte de Produto.
    }
}
// aula01();
/* Call back */
function aula02() {
    const button = document.querySelector('button');
    function handleClick(event) {
        const elemento = event.target;
        console.log(elemento); // out: <button>click</button>    
        console.log(elemento.innerText); // ts mostra erro de propridade
        if (elemento instanceof HTMLElement) {
            console.log(elemento.innerText); // ts confirma que é um html element e não da mais erro
        }
    }
    button === null || button === void 0 ? void 0 : button.addEventListener('click', handleClick);
}
// aula02();
/* Generics */
function aula03() {
    function retorno(a) {
        return a;
    }
    console.log(retorno("A game")); // inferindo no <tipo> o valor 'string', pois o parâmetro é string
    // é comum passar <T> e T[]
    function retornoArray(lista) {
        return lista.slice(0, 5);
    }
    // não seria necessário passar <number> pois o parâmetro já é um array de number
    console.log(retornoArray([1, 2, 3, 4, 5, 6, 7, 8, 9])); // out: [ 1, 2, 3, 4, 5 ]
    console.log(retornoArray(["Ana", "João", "Maria", "José", "Bob", "Don", "Estela", "Fernanda"])); // out: [ 'Ana', 'João', 'Maria', 'José', 'Bob' ]
}
// aula03();
/* Type guard, safety e narrowing */
function aula04() {
    function typeGuard(value) {
        if (typeof value === 'string') {
            return value.toUpperCase();
        }
        if (typeof value === 'number') {
            return value.toFixed();
        }
        if (value instanceof HTMLElement) {
            return value.innerText;
        }
    }
    console.log(typeGuard('teste')); // out: TESTE
    console.log(typeGuard(22.54874)); // out: 23
    const obj = {
        nome: 'Teste',
        numero: 22
    };
    if ('nome' in obj) {
        console.log("nome existe"); // true
    }
    if ('preco' in obj) {
        console.log("perco existe"); // false
    }
}
aula04();
