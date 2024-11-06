/* Instance of */

function aula01() {
  // criando uma classe com TS
  class Produto {
    nome: string;
    preco: number;
    constructor(nome: string, preco: number) {
      this.nome = nome;
      this.preco = preco;
    }
    precoReal() {
      return `R$ ${this.preco}`
    }
  }

  const livro = new Produto('A guerra dos Tronos', 200);
  console.log(livro.precoReal()); // out: R$ 200
  console.log(livro instanceof Produto); // out: true
  console.log(livro instanceof String); // out: false

  class Livro extends Produto {
    autor: string;
    constructor(nome: string, preco: number, autor: string) {
      super(nome, preco);
      this.autor = autor;
    }
  }


  const livro2 = new Livro('O senhor dos anéis', 150, "Tolkien");
  if (livro2 instanceof Produto) {
    console.log("O livro2 faz parte de Produto."); //out: O livro2 faz parte de Produto.
  }
}

aula01();
