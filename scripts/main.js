class Item {
	constructor(nome, imagem, descricao, preco, tipo) {
		this.nome = nome;
		this.imagem = imagem;
		this.descricao = descricao;
		this.preco = preco;
		this.tipo = tipo;
	}

	getItemView() {
		const view = document.createElement("div");
		view.classList.add("opcao");
		view.addEventListener("click", () => {
			this.selecionarItem(view);
		});
		view.innerHTML = `
			<img src="${this.imagem}" />
			<div class="titulo">${this.nome}</div>
			<div class="descricao">${this.descricao}</div>
			<div class="fundo">
				<div class="preco">R$ ${this.preco.toFixed(2)}</div>
				<div class="check">
					<ion-icon name="checkmark-circle"></ion-icon>
				</div>
			</div>
		`;
		return view;
	}

	selecionarItem(elemento) {
		const selecionado = document.querySelector(`.${this.tipo} .selecionado`);
		if (selecionado !== null) {
			selecionado.classList.remove("selecionado");
		}
		elemento.classList.add("selecionado");

		if (this.tipo === "prato") {
			pedido.prato = {
				nome: this.nome,
				preco: this.preco,
			};
		}
		if (this.tipo === "bebida") {
			pedido.bebida = {
				nome: this.nome,
				preco: this.preco,
			};
		}
		if (this.tipo === "sobremesa") {
			pedido.sobremesa = {
				nome: this.nome,
				preco: this.preco,
			};
		}
		pedido.verificarPedido();
	}
}

class Pedido {
	constructor(prato, bebida, sobremesa) {
		this.prato = prato;
		this.bebida = bebida;
		this.sobremesa = sobremesa;
		this.btnConfirmar = document.querySelector(".confirmar");
		this.btnCancelar = document.querySelector(".cancelar");
		this.btnPedir = document.querySelector(".fazer-pedido");
	}

	verificarPedido() {
		if (this.prato && this.bebida && this.sobremesa) {
			this.btnPedir.classList.add("ativo");
			this.btnPedir.disabled = false;
			this.btnPedir.innerHTML = "Fazer pedido";
		}
	}

	getPrecoTotal() {
		return (
			this.prato.preco +
			this.bebida.preco +
			this.sobremesa.preco
		);
	}

	confirmarPedido() {
		const modal = document.querySelector(".overlay");
		modal.classList.remove("escondido");

		document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
			this.prato.nome;
		document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
			this.prato.preco.toFixed(2);

		document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
			this.bebida.nome;
		document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
			this.bebida.preco.toFixed(2);

		document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
			this.sobremesa.nome;
		document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
			this.sobremesa.preco.toFixed(2);

		document.querySelector(".confirmar-pedido .total .preco").innerHTML =
			this.getPrecoTotal().toFixed(2);
	}

	cancelarPedido() {
		const modal = document.querySelector(".overlay");
		modal.classList.add("escondido");
	}

	enviarZap() {
		const telefoneRestaurante = 553299999999;
		const encodedText = encodeURIComponent(
			`Olá, gostaria de fazer o pedido: \n- Prato: ${this.prato.nome
			} \n- Bebida: ${this.bebida.nome} \n- Sobremesa: ${this.sobremesa.nome
			} \nTotal: R$ ${this.getPrecoTotal().toFixed(2)}`
		);

		const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
		window.open(urlWhatsapp);
	}

	activateButtons() {
		this.btnConfirmar.addEventListener("click", () => {
			this.enviarZap();
		});
		
		this.btnCancelar.addEventListener("click", () => {
			this.cancelarPedido();
		});
		
		this.btnPedir.addEventListener("click", () => {
			this.confirmarPedido();
		});
	}
}

class Menu {
	constructor(itens) {
		this.itens = itens;
	}

	getContainerView() {
		this.itens.forEach(item => {
			const container = document.querySelector(`.opcoes.${item.tipo}`);
			container.appendChild(item.getItemView());
		});
	}
}

const prato1 = new Item("Estrombelete de Frango", "img/frango_yin_yang.png", "Um pouco de batata, um pouco de salada", 14.9, "prato");
const prato2 = new Item("Asa de Boi", "img/frango_yin_yang.png", "Com molho shoyu", 14.9, "prato");
const prato3 = new Item("Carne de Monstro", "img/frango_yin_yang.png", "Com batata assada e farofa", 14.9, "prato");
const bebida1 = new Item("Coquinha gelada", "img/coquinha_gelada.png", "Lata 350ml", 4.9, "bebida");
const bebida2 = new Item("Caldo de Cana", "img/coquinha_gelada.png", "Copo 600ml", 4.9, "bebida");
const bebida3 = new Item("Corote Gelado", "img/coquinha_gelada.png", "Garrafa 400ml", 4.9, "bebida");
const sobremesa1 = new Item("Pudim", "img/pudim.png", "Gosto de doce de leite", 7.9, "sobremesa");
const sobremesa2 = new Item("Flam", "img/pudim.png", "Gosto de chocolate", 7.9, "sobremesa");
const sobremesa3 = new Item("Brigadeiro", "img/pudim.png", "3 unidades", 7.9, "sobremesa");

const menu = new Menu([prato1, prato2, prato3, bebida1, bebida2, bebida3, sobremesa1, sobremesa2, sobremesa3]);

const pedido = new Pedido(null, null, null);

menu.getContainerView();

pedido.activateButtons();