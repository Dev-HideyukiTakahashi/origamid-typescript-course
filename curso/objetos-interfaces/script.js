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
aula02();
