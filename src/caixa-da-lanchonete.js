class CardapioItem {
  constructor(descricao, valor) {
    // Construtor da classe que define as propriedades de um item do cardápio
    this.descricao = descricao;
    this.valor = valor;
  }
}

class CaixaDaLanchonete {
  constructor() {
    // Construtor da classe CaixaDaLanchonete que inicializa o cardápio com itens e valores
    this.cardapio = {
      cafe: new CardapioItem("Café", 3.00), // Exemplo de item do cardápio com descrição e valor
      chantily: new CardapioItem("Chantily (extra do Café)", 1.50),
      suco: new CardapioItem("Suco Natural", 6.20),
      sanduiche: new CardapioItem("Sanduíche", 6.50),
      queijo: new CardapioItem("Queijo (extra do Sanduíche)", 2.00),
      salgado: new CardapioItem("Salgado", 7.25),
      combo1: new CardapioItem("1 Suco e 1 Sanduíche", 9.50),
      combo2: new CardapioItem("1 Café e 1 Sanduíche", 7.50)
    };
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    const formasDePagamentoValidas = ["dinheiro", "debito", "credito"];
    // Verifica se a forma de pagamento é válida
    if (!formasDePagamentoValidas.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Verifica se há itens no carrinho de compra
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    // Calcula a quantidade total de itens no carrinho
    const quantidadeTotalItens = itens.reduce((total, itemInfo) => {
      const [, quantidade] = itemInfo.split(",");
      return total + parseInt(quantidade);
    }, 0);

    // Verifica se a quantidade total de itens é zero
    if (quantidadeTotalItens === 0) {
      return "Quantidade inválida!";
    }

    let valorTotal = 0;
    const itensPrincipaisNoCarrinho = new Set();

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(",");
      // Verifica se o item é válido no cardápio
      if (!this.cardapio[codigo]) {
        return "Item inválido!";
      }

      // Verifica se um item extra é pedido sem o principal correspondente
      if (codigo === "chantily" || codigo === "queijo") {
        const itemPrincipal = codigo === "chantily" ? "cafe" : "sanduiche";
        if (!itensPrincipaisNoCarrinho.has(itemPrincipal)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      // Calcula o valor total da compra considerando a quantidade de cada item
      valorTotal += this.cardapio[codigo].valor * parseInt(quantidade);

      // Adiciona itens principais ao conjunto para verificação
      if (!["chantily", "queijo"].includes(codigo)) {
        itensPrincipaisNoCarrinho.add(codigo);
      }
    }

    // Aplica desconto ou acréscimo de acordo com a forma de pagamento
    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    // Formata o valor total como moeda brasileira (R$)
    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
