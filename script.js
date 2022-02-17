const ask = require("readline-sync");
const colors = require("colors");

// Variáveis Globais---------------------------------------------------------------------
let gameOver = false;
let inventario = [` Pocao Saude`.green];
let armas = [`Cajado`.yellow];
let fagulhaEsgotado = [`Fagulha`.blue];
let esferaEsgotado = [`Esfera`.cyan];


class Ciclo {
	constructor(dia, periodo) {
		this.dia = dia;
		this.periodo = periodo;		
	}

	 async passciclo() {
		if (this.periodo === "Manhã") {
			this.periodo = "Tarde";
		} else if (this.periodo === "Tarde") {
			this.periodo = "Noite";
		} else {
			this.periodo = "Manhã";
			this.dia++;
		}
	}
}

// Construtor do Jogador------------------------------------------------------------------
class Jogador {
	constructor(
		nick,
		saude,
		extrato,
		cristalAzul,
		cristalVermelho,
		fagulhaRodadas,
		esferaRodadas,
		ataque,
	) {
		this.nick = nick;
		this.saude = saude;
		this.extrato = extrato;
		this.cristalAzul = cristalAzul;
		this.cristalVermelho = cristalVermelho;
		this.fagulhaRodadas = fagulhaRodadas;
		this.esferaRodadas = esferaRodadas;
		this.ataque = ataque;
	}

	depositar(quantia) {
		this.extrato += quantia;
	}

	verExtrato() {
		return this.extrato;
	}
}
const jogador = new Jogador("", 120, 15, 0, 0, 0, 0, 0);
const ciclo = new Ciclo(1, 'Manhã');


if (jogador.extrato < 0) {
	jogador.extrato = 0;
}

// Construtor Inimigo
class Enemy {
	constructor(nome, saude, ataque) {
		this.nome = nome;
		this.saude = saude;
		this.ataque = ataque;
	}
}

// Introdução do Jogo -------------------------------------------------------------------

console.clear();

console.log(
	`
                  		      OS 6 CAMINHOS`.magenta +
	`
  
      Antes da criação dos mundos, apenas um Deus Existia e vagava pelo vazio. 
  Talvez nunca iremos saber a causa, mais sabemos que ele se dividiu em 4, gerando 4 mundos. 
  A história que você fará parte, se passa no mundo das ilusões, chamado Drain ou quarto mundo, 
  e como todos os outros, possui seus Deuses menores ou celestiais.
  
  
  ` +
	`			    	      O 1º DESAFIO!`.magenta +
	`
  
      A sua aventura se passa em um planeta hostil, com seres rudimentares e de sutil consciência, 
  atributos que levaram os Deuses menores a uma reunião. No fim da votação sobre a destruição 
  de todos os seres do planeta, uma Deusa chamada Galad solicitou uma última chance com base em 
  4 criaturas que se destacavam em inteligência. A proposta era enviar 6 celestiais voluntários 
  para guiá-las e através dos mesmos, preservar todas as outras criaturas. Após os 6 se apresentarem, 
  tiveram os seus poderes reduzidos, e se tornaram mortais. 
  
  
      Você foi um dos voluntários, e foi destinado aos Anões. 
  Os anões são os mais favorecidos em atributos físicos entre os destinados aos 6 celestiais, 
  porém são menos sábios e carismáticos.
  `.brightWhite

);

menuId = ask.keyIn("Pressione a tecla de ESPACO para continuar: ", { limit: "$< >", });
console.clear();

let nickPlayer = ask.question(`*Coruja:`.yellow.italic +
	``.yellow.italic + ` Por favor, digite o seu nome: `.brightWhite);
jogador.nick = nickPlayer;
console.log(`*Coruja:`.yellow.italic +
	``.yellow.italic + ` Okay, ` + `${jogador.nick}`.cyan + ` Eu sou Owl a Coruja e serei o seus olhos durante o jogo. 
         Agora que voce tem seu ` + `Cajado`.yellow + ` e uma ` + `Pequena pocao de saude`.red + ` 
	 voce esta pronto para comecar sua jornada.`.brightWhite);

console.log(`OBJETIVO: `.green + `Coletar 6 cristais Azul e 3 cristais Vermelho.`.yellow);

// Pause Menu and Options -----------------------------------------------------------------------------------------------------------------------------------------

function pausar() {
	let extratoAtual = `${jogador.extrato}`.brightYellow;
	let saudeAtual = `${jogador.saude}`.brightGreen + ` /`.brightWhite + ` 120 HP`.brightGreen;
	let fagulhaRodadas = `${jogador.fagulhaRodadas}`;
	let esferaRodadas = `${jogador.esferaRodadas}`;
	let textoMateriais = `MATERIAIS COLETADOS`.underline;

	function beberFermentacao() {
		let fermentacaoIndex = inventario.indexOf(' Fermentacao');
			inventario.splice(fermentacaoIndex, 1);
			console.log(`*Coruja: `.brightYellow.italic + `Como voce pode beber uma fermentacao que nem sequer sabe o que e?!?!.`.brightWhite);
			console.log(`NAO BEBA!!! 20 HP foi deduzido de sua saude.`.brightRed);
			jogador.saude -= 20;
			ciclo.passciclo();
			console.log(`Voce esta no periodo da ${ciclo.periodo}`);
			console.log(`Voce esta no dia ${ciclo.dia}`);

			if(fermentacaoIndex === -1){
				console.log(`VOCE NAO TEM ESTE ITEM EM SEU INVENTARIO!!!`.brightWhite);
			}				
			pausar();
	}


	function fumarErva() {
		let fumarIndex = inventario.indexOf(' Erva');
		inventario.splice(fumarIndex, 1);
		console.log(`*Coruja: `.brightYellow.italic + `O aroma e agradavel mas voce esta rindo para as paredes.`);
		console.log(`10  HP foram deduzidos de sua saude!`.brightRed);
		jogador.saude -= 10;
		ciclo.passciclo();
		console.log(`Voce esta no periodo da ${ciclo.periodo}`);
		console.log(`Voce esta no dia ${ciclo.dia}`);
		if (fumarIndex === -1){
			console.log(`VOCE NAO TEM ESTE ITEM EM SEU INVENTARIO!!!`.brightWhite);
		}		
			pausar();
	}


	monstrarInventario();
	function monstrarInventario() {
		ciclo.passciclo().then(()=> 'Time passed');

		console.log(
			`-----------------------------JOGO PAUSADO-----------------------------`.brightRed);

		let pausaJogo =
			`----------------------------------------------------------------------` + `  
  
        ` + `SAUDE`.underline + `            ${saudeAtual}                                       
        ` + `OURO`.underline + `             ${extratoAtual}                                                                                   
        ` + `ARMAS`.underline + `   	 [`.blue + `${armas}` + `]`.blue + `                                                 
        ` + `PODERES`.underline + `          Fagulha [${fagulhaRodadas}] `.blue + `||` + ` Esfera [${esferaRodadas}]`.cyan + `
        ` + `INVENTARIO`.underline + `       [`.brightGreen + `${inventario}`.magenta + `                          ]`.brightGreen + `

        ` + `OBJETIVO`.underline + `
        Coletar 6 cristais Azul e 3 cristais vermelho para...`.yellow + `

        ${textoMateriais}
        ` + `${jogador.cristalAzul}`.blue + ` /` + `6 cristais Azul.` + `
        ` + `${jogador.cristalVermelho}`.red + ` /` + `3 cristais Vermelho.` + `
  
  ----------------------------------------------------------------------` +
			`
                                                                    `;

		console.log(pausaJogo);
		perguntarUsarItem();

		function perguntarUsarItem() {
			let arr = [`Usar ` + `Pocao Saude`.brightRed + ` (restaura saude a ` + `cheio`.brightGreen + `!)`,
			`` +
			`Usar Pocao Inferior`.brightRed + ` (restaura + ` + `30`.brightGreen + ` de saude! ` + `Apenas`.red + ` se tiver no inventario!)`,
			`Beber a ` + `Fermentacao`.cyan + ` (` + `Apenas`.red + ` se tiver no inventario!)`,
			`Fumar a ` + `Erva`.green + ` (` + `Apenas`.red + ` se tiver no inventario!)`,
			`Sair do inventario e ` + `Reiniciar o `.brightGreen + ` Jogo`,];
			const useItem = ask.keyInSelect(arr, `Tem algum item em seu inventario que queira usar agora?`.brightWhite);

			if (useItem === 0) {
				usarPocaoSaude();
				monstrarInventario();
			} else if (useItem === 1) {
				usarPocaoInferior();
				monstrarInventario();
			} else if (useItem === 2) {
				beberFermentacao();
				monstrarInventario();
			} else if (useItem === 3) {
				fumarErva();
				monstrarInventario();
			} else if (useItem === 4 || useItem === -1) {
				console.log(`-----------------------------JOGO REINICIADO-----------------------------`.brightGreen);
			}
		}
	}
}

// Danos das Armas do Jogador ----------------------------------------------------------------------------------------------------------------------------------

function danoCajado() {
	let min = 15;
	let max = 25;
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function danoFagulha() {
	let min = 35;
	let max = 45;
	jogador.fagulhaRodadas -= 1;
	return Math.floor(Math.random() * (min - max + 1) + min);
}

function danoEsfera() {
	let min = 60;
	let max = 80;
	jogador.esferaRodadas -= 1;
	return Math.floor(Math.random() * (min - max + 1) + min);
}

//Funções do Jogo------------------------------------------------------------------
function vasculharArea() {
	const randomNum = Math.floor(Math.random() * 3);
	if (randomNum === 0) {
		batalha(criarInimigo());
	} else if (randomNum === 1) {
		console.log(`VOCE VASCULHOU 3 AREAS E NAO ENCONTROU NENHUM INIMIGO.`.brightWhite);
	} else if (randomNum === 2) {
		console.log(`CUIDADO!!! `.brightRed.bold +
			`FALSO ALARME!!!`.brightWhite);
	} else if (randomNum === 3) {
		console.log(`Nada por aqui. Continue vasculhando`.brightWhite);
	}
}

function usarPocaoInferior() {
	if (jogador.saude <= 95) {
		let checkinventario = inventario.indexOf(` Pocao Inferior`);
		inventario.splice(checkinventario, 1);

		console.log(`30 HP foi restaurado!`.brightGreen.bold);
		jogador.saude += 30;
	}
	if (jogador.saude > 91) {
		console.log(`Sua saude nao esta baixa o suficiente para usar Pocao Inferior!`.brightRed.bold);
	}
}

function usarPocaoSaude() {
	let inventarioIndex = inventario.indexOf(` Pocao Saude`);
		inventario.splice(inventarioIndex, 1);
		jogador.saude = 120;
		console.log(`Sua saude foi restaurada a 120 HP/ 120 HP!`.brightGreen);
}


// Gerar Status e Inimigo ------------------------------------------------------------------
class Inimigo {
	constructor(nome, saude, ataque) {
		this.nome = nome;
		this.saude = saude;
		this.ataque = ataque;
	}
}

function valorAtaque() {
	let min = 15;
	let max = 25;
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function valorAtaqueChefao() {
	let min = 35;
	let max = 45;
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function criarInimigo() {
	const numAleatorio = Math.floor(Math.random() * 4);

	// Criar Aranha  -----------------------------------------------------------------------
	if (numAleatorio === 0 || numAleatorio === 1) {
		console.log(`*Coruja:`.brightYellow.italic +
			` CUIDADO! `.red + `Uma ` + `Aranha Gigante`.red + ` acaba de aparecer!!!`);
		return new Inimigo("Aranha Gigante", 75, valorAtaque());

		// Criar Chefão --------------------------------------------------------------------
	} else if (numAleatorio === 2) {
		console.log(`*Coruja:`.brightYellow.italic +
			` Fique atento, o ` + `Chefao e seus Capangas`.red + ` acaba de avistá-lo.`);
		return new Inimigo("Chefao", 200, valorAtaqueChefao());

		// Criar cobra ---------------------------------------------------------------------
	} else if (numAleatorio === 3 || numAleatorio === 4) {
		console.log(`*Coruja:`.brightYellow.italic +
			` Você acabou de pisar no ` + `ninho da cobra de 2 cabecas`.red + `. E ambas as cabeças estão te encarando!`);
		return new Inimigo("Cobra de 2 cabecas", 40, valorAtaque());
	}
}

// Funções que cuida da dropagem dos itens--------------------------------------------------
function dropagem() {
	const randomNum = Math.floor(Math.random() * 4);
	if (randomNum === 0) {
		return ` Pocao Saude`.green;
	} else if (randomNum === 1) {
		return ` Fermentacao`.green;
	} else if (randomNum === 2) {
		return ` Fermentacao`.green;
	} else if (randomNum === 3) {
		return ` Erva`.green;
	}
}

function ouroDropagem() {
	let min = 10;
	let max = 15;
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Criar combate ---------------------------------------------------------------------------
function batalha(inimigo) {
	while (inimigo.saude > 0 && jogador.saude > 0) {
		console.log(
			`*Coruja: `.yellow.italic + `${jogador.nick}`.cyan + ` tem ` + `${jogador.saude}`.yellow + ` HP/ 120 HP.` + `O ${inimigo.nome}`.brightRed +
			` tem ` + `${inimigo.saude}`.brightRed + ` HP!`);
		const respostaUsuario = ask.keyInSelect(
			[`Atacar o(a) ` + `${inimigo.nome}`.brightRed, `Fugir`],
			`*Coruja:`.yellow.italic + ` Faca uma escolha `.brightWhite + `${jogador.nick}!!!`.cyan);

		let danoJogador = jogador.ataque;
		let danoInimigo = inimigo.ataque;

		if (respostaUsuario === 0) {
			escolherArmas();
		} else if (respostaUsuario === 1) {
			return;
		}

		// Escolha das Armas ---------------------------------------------------------------
		function escolherArmas() {
			if (respostaUsuario === 0) {
				let armaEscolhida = ask.keyInSelect(armas, `! ESCOLHA UMA ARMA PARA ATACAR !`.yellow);

				if (armaEscolhida === -1) {
					console.log(`OPCAO INVALIDA!`.brightRed);
				}

				if (armaEscolhida === 0) {
					danoJogador = danoCajado();
					inimigo.saude -= danoJogador;
					jogador.saude -= danoInimigo;
				}

				if (armas.includes(` Fagulha`) && armaEscolhida === 1 && jogador.fagulhaRodadas >= 1) {
					danoJogador = danoFagulha();
					inimigo.saude -= danoJogador;
					jogador.saude -= danoInimigo;
				} else if ((armaEscolhida === 1 && !armas.includes(` Fagulha`)) || (jogador.fagulhaRodadas < 1 && armaEscolhida === 1)) {
					console.log(`OU VOCE NAO COMPROU OU NAO TEM RODADAS DE FAGULHA O SUFICIENTE!`.brightRed);
					console.log(`ESCOLHA UMA ARMA!`.brightWhite);
					escolherArmas();
				}

				if (armas.includes(` Esfera`) && armaEscolhida === 2 && jogador.esferaRodadas >= 1) {
					danoJogador = danoEsfera();
					inimigo.saude -= danoJogador;
					jogador.saude -= danoInimigo;
				} else if ((armaEscolhida === 2 && !armas.includes(` Esfera`)) || (jogador.esferaRodadas < 1 && armaEscolhida === 2)) {
					console.log(`OU VOCE NAO COMPROU OU NAO TEM RODADAS DE FAGULHA O SUFICIENTE!`.brightRed);
					console.log(`ESCOLHA UMA ARMA!`.brightWhite);
					escolherArmas();
				}
				console.log(`${armas[armaEscolhida]} foi equipado(a).`);

				// Dialogo do Inimigo ------------------------------------------------------
				function dialogoInimigo() {
					const chefeNum = Math.floor(Math.random() * 2);
					let chefeFala1 =
						`O ${inimigo.nome}`.brightRed + ` lanca seu machado e acerta ${jogador.nick}`.cyan +
						` e tira ` + `${danoInimigo}`.brightRed + ` de dano!`;

					let chefeFala2 =
						`O ${inimigo.nome}`.brightRed + ` esquiva e branda seu machado ate acertar ${jogador.nick}`.cyan +
						` causando ` + `${danoInimigo}`.brightRed + ` de dano!`;

					if (chefeNum === 0) {
						return console.log(chefeFala1);
					} else if (chefeNum === 1) {
						return console.log(chefeFala2);
					} else {
						return console.log(`${inimigo.nome}`.brightRed + ` fica FURIOSO e acerta ${jogador.nick}`.cyan +
							` causando ${danoInimigo}`.brightRed + `de dano !!!`);
					}
				}

				if (inimigo.nome === "Aranha Gigante") {
					console.log(`A ${inimigo.nome}`.brightRed + ` golpeia ` + `${jogador.nick} `.cyan +
						`e causa um dano de ` + `${danoInimigo}`.brightRed + ` !!!`);
				} else if (inimigo.nome === "Chefao") {
					dialogoInimigo();
				} else if (inimigo.nome === "Cobra de 2 cabecas") {
					console.log(`A ${inimigo.nome}`.brightRed + ` ativa seu sistema de defesa e lanca duplo jorro de veneno em ` + `${jogador.nick}`.cyan +
						` retirando ` + `${danoInimigo}`.brightRed + ` de vida!!!`);
				}

				// Diálogo do Jogador ------------------------------------------------------
				dialogos();
				function dialogos() {
					if (armaEscolhida === -1) {
						console.log(`*Coruja:`.yellow.italic +
							` VOCE NAO ESCOLHEU UMA ARMA! DA PROXIMA VEZ ESCOLHA UMA ARMA PARA SE DEFENDER!`.brightBlue.bold);
					} else if (armaEscolhida === 0) {
						console.log(`${jogador.nick}`.cyan + ` segura firme seu cajado e golpeia ` + `${inimigo.nome}`.brightRed +
							` causando um dano de  ` + `${danoJogador}`.brightCyan + ` !!!`);
					} else if (armas.includes(` Fagulha`) && armaEscolhida === 1 && jogador.fagulhaRodadas > 1) {
						console.log(`${jogador.nick}`.cyan + ` aciona a Fagulha e incendeia ` + `${inimigo.nome}`.brightRed +
							` tirando ` + `${danoJogador}`.brightCyan + ` de vida!!!`);
						console.log(`*Coruja:`.yellow.italic + `Que truque zuado, ` + `${jogador.nick}`.cyan + `!`);
					} else if (armaEscolhida === 2) {
						console.log(`${jogador.nick}`.cyan + ` Retira as esferas, pronuncia umas palavras e dispara 6 esferas acertando ` + `${inimigo.nome}`.brightRed +
							` causando um dano de ` + `${danoJogador}`.brightCyan + `!!!`);
						console.log(`*Coruja:`.yellow.italic + `Que truque maneiro, ` + `${jogador.nick}`.cyan + `!`);
					}
				}
			}
		}

		// Chamdo de última chance----------------------------------------------------------
		if (jogador.saude < 50 && inventario.includes(`Pocao Saude`)) {
			console.log(
				`-----------------------------JOGO PAUSADO-----------------------------`.brightRed.bold);
			const usarPocao = ask.keyInSelect(
				["Usar Pocao Saude", "Sair"],
				`*Coruja:`.yellow.italic +
				` Voce que usar uma Pocao Saude para restaura o seu HP a 120? Seu HP atual é ${jogador.saude}`
					.brightGreen + ` HP/ 120 HP.`.brightGreen);
			if (usarPocao === 0) {
				usarPocaoSaude();
			} else {
				console.log(`*Coruja:`.yellow.italic + ` Aff!`);
			}
			console.log(
				`-----------------------------JOGO REINICIADO-----------------------------`.brightGreen);
		}

		if (jogador.saude < 30 && inventario.includes(` Pocao Saude`)) {
			console.log(`-----------------------------JOGO PAUSADO-----------------------------`.brightRed);
			console.log(`*Coruja:`.yellow.italic + ` Sua saude esta muito BAIXA!!! Use uma Pocao Saude para restaura seu HP a cheio!!!`.brightRed.bold);
			const alerta = ask.keyInSelect(["Use uma Pocao Saude!"], "Use a Pocao Saude ou voce MORRERA!!!");

			if (alerta === 0) {
				usarPocaoSaude();
			} else {
				console.log(`*Coruja:`.yellow.italic + ` Esta bem, ` + `${jogador.nick}`.cyan + `, como queira!`);
			}
			console.log(`-----------------------------JOGO REINICIADO-----------------------------`.brightGreen);
		}

		// Estágio da dropagem dos itens ---------------------------------------------------
		if (inimigo.saude <= 0) {
			const itemDrops = dropagem();
			const ouroDrops = ouroDropagem();
			console.log(`${inimigo.nome}`.brightRed + ` foi derrotado!`);
			const posResposta = ask.keyInSelect(["Coletar o item", "Ignorar o item"],
				`*Coruja:`.yellow.italic + ` ${itemDrops} caiu do combate. Voce quer adicionar ao seu inventario?`);
			console.log(`${itemDrops} e ${ouroDrops}`.brightYellow + ` de Ouro adicionados ao seu inventario!`);
			inventario.push(itemDrops);
			jogador.depositar(ouroDrops);

			if (inimigo.nome === `Chefao` && jogador.cristalAzul < 6) {
				console.log(`O ` + `Chefao `.brightRed +
					` foi derrotado. Tudo que sobrou foram seus capangas. Voce quer salva-los ou mata-los? Mata-los dara 2 cristais Azul. So dara 1 cristal Vermelho. Mas Drein, o olheiro do chefao oferece recompensa extra que nao e cristal Azul por salva-los.`);

				const matarOuSalvar = ask.keyInSelect([`Mata-los`, `Salva-los`,]);

				if (matarOuSalvar === 0) {
					console.log(`*Coruja:`.yellow.italic + ` O caminho da GANANCIA e SANGUE. Mandou ver, ` + `${jogador.nick}`.cyan + `!`);
					jogador.cristalAzul += 2;
				} else if (matarOuSalvar === 1) {
					console.log(`*Drein: `.brightGreen.italic + `O caminho CORRETO nem sempre e o mais FACIL de escolher. Voce mostrou bondade. E por isso, sou grato. Te darei algo para demostrar minha gratidao.`);
					jogador.cristalAzul += 1;
					console.log(`*` + `20`.brightYellow + ` Ouro e uma Pocao Saude foi adicionado ao seu inventario.*`);
					jogador.verExtrato += 20;
					inventario.push(` Pocao Saude`);
				}

				function cristalAzulRestante() {
					let sum = 6 - jogador.cristalAzul;
					return sum;
				}

				console.log(`*Coruja:`.yellow.italic + ` PROGRESSO DO OBJETIVO!` +
					`Voce tem ` + `${jogador.cristalAzul}`.brightBlue + `/6 cristais Azul.` +
					`Encontre ${cristalAzulRestante()} cristais Azul mais para...`.brightGreen);
				opcoesJogo();
			}

			if (inimigo.nome === `Aranha Gigante` && jogador.cristalVermelho < 4) {
				jogador.cristalVermelho += 1;
				console.log(`*Coruja:`.yellow.italic +
					` PROGRESSO DO OBJETIVO!!!`.brightGreen +

					`Voce tem ` + `${jogador.cristalVermelho}`.red + `/3 cristais Vermelho.` +

					`Encontre todas as amostras de cristais vermelho requerida!`.yellow);
			}

			if (posResposta === 1) {
			}
			if (itemDrops === 0 || 1 || 2 || 3) {
				//inventario.push(itemDrops);
			}

			if (posResposta === 2) {
				console.log(`*Coruja:`.yellow.italic + ` De acordo. Vamos nessa entao.`);
				opcoesJogo();
			}
			opcoesJogo();
		}

		if (respostaUsuario === 1) {
			console.log(`*Coruja:`.yellow.italic + ` Estamos ficando sem ciclo, ` + `${jogador.nick}`.cyan + `!`);

			console.log(`*Coruja:`.yellow.italic + ` Voce conseguiu escapar de ${inimigo.nome}.`);
			opcoesJogo();
		}

		if (respostaUsuario === 2) {
			pausar();
		}
	}
}

// Loop Principal do Jogo ------------------------------------------------------------------
function opcoesJogo() {
	const escolhasJogo = ["Vasculhar area", `Abrir Status e Inventario do(a) ` + `${jogador.nick}`.cyan, `Visitar a ` + `CABANA DO ESPER`];
	const respostaUsuario = ask.keyInSelect(escolhasJogo, `OK, ` + `${jogador.nick}`.cyan + `, o que voce fara?`);

	if (respostaUsuario === 0) {
		vasculharArea();
		ciclo.passciclo();
		console.log(`Voce esta no periodo da ${ciclo.periodo}`);
		console.log(`Voce esta no dia ${ciclo.dia}`);

	}
	if (respostaUsuario === 1) {
		pausar();
	}
	if (respostaUsuario === 2) {
		cabanaEsper();
		escolhaCabana();
	}
	if (respostaUsuario === -1) {
		console.log(`*Coruja:`.yellow.italic + ` Nao da para simplesmente cancelar. Escolha novamente!`.brightRed);
	}
}

while (!gameOver) {
	opcoesJogo();
	if (jogador.cristalAzul > 5) {
		console.log(`*Coruja: `.yellow.italic +
			` Voce tem todos os cristais azul necessarios para... Va matar Aranhas Gigantes para coletar mais cristais Vermelho.`.yellow);
	}

	if (jogador.cristalVermelho > 2) {
		console.log(`*Coruja:`.yellow.italic +
			` Voce tem todos os cristais vermelho necessarios para... Va Matar ou salvar os Capangas do Chefao para mais cristais Vermelho caso ainda nao tenha todos.`.yellow);
	}

	if (jogador.cristalAzul > 5 && jogador.cristalVermelho > 2) {
		console.log(
			`*Coruja:`.yellow.italic + ` Voce tem todos os materiais necessarios para formar a primeira alianca entre tribos anoes!`.yellow);
			console.log(`VOCE VENCEU!`.brightGreen.bold);
			console.log(`Voce sobreviveu ${ciclo.dia} dias.`)
		let escolhaContinua = [` Jogar Novamente`, ` Sair.`];
		let perguntaContinua = ask.keyInSelect(escolhaContinua, ` *Coruja:`.yellow.italic + `O que voce deseja fazer?`);

		if (perguntaContinua === 0) {
			const jogador = new Jogador("", 120, 15, 0, 0, 0, 0, 0);
			const ciclo = new Ciclo(1, 'Manhã');
			monstrarInventario();
		} else if (perguntaContinua === 1) {
			return;
		} else {
			console.log(
				`*Coruja:`.yellow.italic + ` Nao da para simplesmente cancelar!`.yellow);
			escolhaContinua;
		}
	}

	if (jogador.saude <= 0) {
		console.log(`Voce sobreviveu ${ciclo.dia} dias.`)
		console.log(`VOCE PERDEU!`.brightRed.bold);
		console.log(`GAME 0VER`.brightWhite.bold);
		gameOver = true;
	}
}

function lutaChefao() {
	console.log(`*Coruja: `.yellow.italic + `Finalmente, va conseguir essas amostras de cristais!`);

	console.log(`BATALHA A FRENTE!`.brightGreen);

	console.log(
		`*Chefao: `.brightGreen.italic +
		`NAO QUERO CONFRONTAR VOCE. ENTREGUE OS CRISTAIS OU SAIA DO MEU CAMINHO...`);

	const choicesChoices = ask.keyInSelect([`Entregar os cristais ao Chefao. `, `Lutar e conseguir mais cristais .`],
		`*Coruja: `.yellow.italic + `Voce vai dar ouvidos a ele?`, `Abrir o Status e Inventario do(a) ` + `${jogador.nick}`.cyan);

	if (choicesChoices === 2) {
		pausar();
	} else if (choicesChoices === 0) {
		console.log(`*Coruja:`.yellow.italic + ` Vamos acabar com isso!`);
		console.log(`*Bauer: `.yellow.italic + ` Tirarei estes cristais de voce e criarei a arma da aniquilacao!`);
		console.log(`VOCE PERDEU!`.brightRed.bold);
		console.log(`GAME OVER!`.brightRed.bold);
		gameOver = true;
	}
}


// Máquina de Vendas (CABANA DO ESPER) -----------------------------------------------------

function checkextrato() {
	let extratoAtual1 = `${jogador.extrato}`.brightGreen;
	return extratoAtual1;
}

function cabanaEsper() {
	console.log(`
	-----------------------------JOGO PAUSADO-----------------------------`.brightRed);
	let vozEsper = `	
	*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + ` 
	` + `BEM-VINDO A CABANA DO ESPER! 
	Como poderei ajudá-lo?`.green.underline;
	let menuDaCabana =
		`
	
	          ` + `BEM-VINDO A CABANA DO ESPER! `.green + `
	      ====================================== `.green + `              
	
	      [1]`+ ` Pocao Inferior `.brightRed + `        2 Ouro`.brightGreen + `
	      [2]`+ ` Pocao Saude `.brightRed + `           5 Ouro`.brightGreen + `
	      [3]`+ ` ${fagulhaEsgotado} `.blue + `               5 Ouro`.brightGreen + `                    
	      [4]`+ ` 10 Fagulha `.blue + ` 		 15 Ouro`.brightGreen + `                                
	      [5]`+ ` ${esferaEsgotado} `.cyan + `                10 Ouro`.brightGreen + `                           
	      [6]`+ ` 3 Esfera `.cyan + `   		 20 Ouro`.brightGreen + `                                                       
	      [7]`+ ` Fermentacao `.brightCyan + `           2 Ouro`.brightGreen + `                                                                                                                              
	
	`;

	console.log(vozEsper);
	console.log(menuDaCabana.magenta);
}

function checkInv() {
	let verificarOpcoesInv = [`Retornar a ` + `CABANA DO ESPER`.green, `Sair do Inventario e Reiniciar o jogo`];
	pausar();

	let verificarEscolhaInv = ask.keyInSelect(verificarOpcoesInv, `Voce esta em seu inventario. O que voce quer fazer?`.brightWhite);
	if (verificarEscolhaInv === 0) {
		cabanaEsper();
		escolhaCabana();
	} else if (verificarEscolhaInv === 1) {
		console.log(`-----------------------------JOGO REINICIADO-----------------------------`.brightGreen);

	} else if (verificarEscolhaInv <= -1) {
		console.log(`ESCOLHA UMA DAS OPCOES ACIMA!`.red.underline);
	}
}

function escolhaCabana() {
	let valoresCabana = [
		`Pocao Inferior`.brightRed,
		`Pocao Saude`.brightRed,
		`${fagulhaEsgotado}`.blue,
		`10 Fagulha`.blue,
		`${esferaEsgotado}`.cyan,
		`3 Esferas`.cyan,
		`Fermentacao`.brightCyan,
		`Verificar o inventario`.brightWhite,
		`Sair e Retornar ao jogo`.brightWhite
	];

	let opcoesVenda = ask.keyInSelect(valoresCabana, `O que voce quer comprar na ` + `CABANA DO ESPER`.green + `?` +
		` Voce tem ${checkextrato()} de Ouro.`);

	if (opcoesVenda === 8) {
		console.log(`-----------------------------JOGO REINICIADO-----------------------------`.brightGreen);
		opcoesJogo();
	}

	if (opcoesVenda <= -1) {
		cabanaEsper();
		escolhaCabana();
		console.log(`NAO HA COMO CANCELAR NESTE MOMENTO. ESCOLHA NOVAMENTE!`.brightRed);
	}

	if ((opcoesVenda === 0 && jogador.extrato >= 2) || (opcoesVenda === 0 && jogador.extrato <= 1)) {
		if (jogador.extrato <= 1) {
			cabanaEsper();
			escolhaCabana();
			console.log(`*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + `VOLTE QUANDO TIVER MAIS OURO.`);
		}
		inventario.push(` Pocao Inferior`);
		jogador.extrato -= 2;
		console.log(`${valoresCabana[0]} foi adicionado ao inventario.`);
		algoMais();
	}

	if ((opcoesVenda === 1 && jogador.extrato >= 5) || (opcoesVenda === 1 && jogador.extrato < 5)) {
		if (jogador.extrato < 5) {
			cabanaEsper();
			escolhaCabana();
			console.log(`*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + `VOLTE QUANDO TIVER MAIS OURO.`);
		}
		inventario.push(` Pocao Saude`);
		jogador.extrato -= 5;
		console.log(`${valoresCabana[1]} foi adicionado ao inventario.`);
		algoMais();
	}

	if ((opcoesVenda === 2 && jogador.extrato >= 5) || (opcoesVenda === 2 && jogador.extrato < 5)) {
		if (jogador.extrato < 9) {
			cabanaEsper();
			escolhaCabana();
			console.log(`*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + `VOLTE QUANDO TIVER MAIS OURO.`.yellow);
		}
		fagulhaEsgotado = `Esgotado`;

		if (opcoesVenda === 2 && armas.includes(` Fagulha`.blue)) {
			console.log(`Este item esta ` + `Esgotado`.brightRed.bold + `.`);
			algoMais();
		} else {
			jogador.extrato -= 5;
			jogador.fagulhaRodadas += 1;
			console.log(`Compra realizada com sucesso! ${valoresCabana[2]} foi adquirido.`);
			algoMais();
		}
	}

	if ((opcoesVenda === 3 && jogador.extrato >= 15) || (opcoesVenda === 3 && jogador.extrato < 15)) {
		if (jogador.extrato < 2) {
			cabanaEsper();
			escolhaCabana();
			console.log(`*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + `VOLTE QUANDO TIVER MAIS OURO.`.yellow);
		}

		jogador.fagulhaRodadas += 10;
		jogador.extrato -= 15;
		console.log(`${valoresCabana[3]} foi adicionado aos seus poderes.`);
		algoMais();
	}

	if ((opcoesVenda === 4 && jogador.extrato >= 15) || (opcoesVenda === 4 && jogador.extrato < 15)) {
		if (jogador.extrato < 15) {
			cabanaEsper();
			escolhaCabana();
			console.log(`*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + `VOLTE QUANDO TIVER MAIS OURO.`.yellow);
		}

		if (!armas.includes(` Fagulha`.blue) && opcoesVenda === 4) {
			console.log(`*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + `VOCE DEVE ADQUIRIR FAGULHA ANTES DA ESFERA!!!`.brightRed);
			algoMais();
		} else if (opcoesVenda === 4 && armas.includes(` Esfera`.red)) {
			console.log(`Este item esta ` + `Esgotado`.brightRed.underline);
			algoMais();
		} else if (opcoesVenda === 4 && !armas.includes(` Esfera`.red) && armas.includes(` Fagulha`.blue)) {
			jogador.esferaRodadas += 1;
			jogador.extrato -= 15;
			console.log(`${valoresCabana[4]} foi adquirido.`);
			esferaEsgotado = `Esgotado`;
			algoMais();
		}
	}

	if ((opcoesVenda === 5 && jogador.extrato >= 20) || (opcoesVenda === 5 && jogador.extrato < 20)) {
		if (jogador.extrato < 20) {
			cabanaEsper();
			escolhaCabana();
			console.log(`*Uma vóz profunda, cheia de sabedoria e serenidade* `.yellow + `VOLTE QUANDO TIVER MAIS OURO.`.yellow);
		}
		jogador.extrato -= 20;
		jogador.esferaRodadas += 3;
		console.log(`${valoresCabana[5]} foi acrescentado a seus poderes.`);
		algoMais();
	}

	if ((opcoesVenda === 6 && jogador.extrato > 1) || (opcoesVenda === 6 && jogador.extrato < 2)) {
		if (jogador.extrato < 2) {
			cabanaEsper();
			escolhaCabana();
			console.log(`*Uma voz profunda, cheia de sabedoria e serenidade* `.yellow + `VOLTE QUANDO TIVER MAIS OURO.`.yellow);
		}
		inventario.push(` Fermentacao`.green);
		jogador.extrato -= 2;
		console.log(`${valoresCabana[6]} foi adicionado a seu inventario.`);
		algoMais();
	}

	if (opcoesVenda === 7) {
		checkInv();
	}
}

function algoMais() {
	let queFazer = ask.keyInSelect([`Retornar a ` + `CABANA DO ESPER`.green, `Sair e Reiniciar o jogo`,
	`Abrir o Status e Inventario do(a) ` + `${jogador.nick}`.cyan], `Quer comprar algo mais?`);

	if (queFazer === 2) {
		console.log(`-----------------------------JOGO PAUSADO-----------------------------`.brightRed);
		pausar();
	}

	if (queFazer <= -1) {
		console.log(`ERRO. NAO HA COMO CANCELAR NESTE MOMENTO.`.brightRed);
		algoMais();
	}

	if (queFazer === 0) {
		cabanaEsper();
		escolhaCabana();
	}

	if (queFazer === 1) {
		console.log(`-----------------------------JOGO REINICIADO-----------------------------`.brightGreen);
		opcoesJogo();
	}
}

// Fim da máquina de vendas ----------------------------------------------------------------
