export default function Exemplo() {
	const umaLindaVariavel = "Oi, eu sou o Goku";

	return (
		<h1>{umaLindaVariavel}</h1>
	);
}

/*Ternario*/

export default function Exemplo() {
	const nome = prompt("Qual o seu nome?");
	const idade = parseInt(prompt("Qual a sua idade?");

	return (
		<div>
			<p>Você se chama {nome}</p>
			<p>Você é {(idade > 17) ? 'maior de idade' : 'menor de idade'}</p>
		</div>
	);
}

function Pessoa(props) {
	return (
		<div class="pessoa">
			<img src={props.imagem} />
			<div class="nome">{props.nome}</div>
		</div>
	);
}