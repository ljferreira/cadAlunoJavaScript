/********************************
*                               *
*                               *
*** Código em Desenvolvimento ***
*                               *
*                               *
*********************************/

class Aluno{
	
	constructor(IDAluno, nome, fone, dataNasc, notaFinal){
		this.IDAluno   = IDAluno;
		this.nome      = nome;
		this.fone      = fone;
		this.dataNasc  = dataNasc;
		this.notaFinal = notaFinal;
	}

	dadosAluno(){
		alert("IDAluno: "             + this.IDAluno + 
			"\nNome: "                + this.nome +
			"\nFone:"                 + this.fone +
			"\nData de Nascimento : " + this.dataNasc + 
			"\nNota Final: "          + this.notaFinal);
	}
}

let   BDAlunos = [0];
let   numeroMatricula = 0;
let   tblListaAluno = "";
let   foneAluno = "";
let   notaFinalAluno = "";
const teclaDel = 46;
const teclaBackspace = 8;
let   del = false;
let   backspace = false;

function criaAluno(){

	let nomeAluno      = document.getElementById("nomeAluno").value.trim().replace(/\s{2,}/g, ' ');
	let foneAluno      = document.getElementById("foneAluno").value.trim();
	let dataNascAluno  = document.getElementById("dataNascAluno").value.trim();
	let notaFinalAluno = document.getElementById("notaFinalAluno").value.trim();

	//alert(nomeAluno);
	
	//document.getElementById("btnCriaAluno").disabled = true;
	/*BDAlunos[++numeroMatricula] = new Aluno(numeroMatricula, 
		                    document.getElementById("nomeAluno").value, 
		                    document.getElementById("foneAluno").value,
		                    document.getElementById("dataNascAluno").value,
		                    document.getElementById("notaFinalAluno").value);*/

	if(nomeAluno != "" && (foneAluno != "" && foneAluno.length >= 13) && dataNascAluno != "" && notaFinalAluno != ""){

		let compara = (valor) => valor.nome == nomeAluno && valor.dataNasc == dataNascAluno;
		if(BDAlunos.findIndex(compara) != -1){
			document.getElementById("btnCriaAluno").blur();
			//alert("Aluno já existe!!!"); //chamar o Modal
			return;
		}

		BDAlunos[++numeroMatricula] = new Aluno(numeroMatricula, nomeAluno, foneAluno, dataNascAluno, notaFinalAluno);
		geraTabela();
	}

	//document.getElementById("btnCriaAluno").disabled = false;
	document.getElementById("btnCriaAluno").blur();

	//console.log(BDAlunos[numeroMatricula].nome);

}

function geraTabela(){
	
	tblListaAluno = "<table class='table table-striped my-3'>" +
						"<thead>"                              + 
							"<tr>"                             +
								"<th>Matrícula</th>"           +
								"<th>Nome do Aluno</th>"       + 
								"<th>Telefone</th>"            + 
								"<th>Data de Nascimento</th>"  +
								"<th>Nota Final</th>"          + 
							"</tr>"                            +
						"</thead>"                             +
						"<tbody>";

	BDAlunos.forEach(atualizaTabela);

	tblListaAluno +=    "</tbody>" +
			        "</table>";
	exibeTabela();

}

function atualizaTabela(valor, indice){
	if(indice > 0){

		const corDaNota = (nota) => (nota < 70) ? "style='color:red'" : "style='color:blue'";
		const data = new Date(valor.dataNasc.slice(0, valor.dataNasc.indexOf('-')), 
                    		  valor.dataNasc.slice(valor.dataNasc.indexOf('-') + 1, valor.dataNasc.lastIndexOf('-')) - 1,
                    		  valor.dataNasc.slice(valor.dataNasc.lastIndexOf('-') + 1));

		tblListaAluno += "<tr id=" + valor.IDAluno   								                               +">"               +  //onclick='alert(this.id)'
							"<td>" + valor.IDAluno.toString().padStart(5, '0')  								   + "</td>"          +
							"<td>" + valor.nome      														       + "</td>"          +
							"<td>" + valor.fone                                                                    + "</td>"          +
							"<td>" + data.getDate().toString().padStart(2, '0') + "/" + 
							         (data.getMonth() + 1).toString().padStart(2, '0') + "/"  + data.getFullYear() + "</td>"          +
							"<td " + corDaNota(valor.notaFinal.replace(/,/, '.')) + " ><strong>" + valor.notaFinal + "</strong></td>" +
							"<td><img title='Editar' src=\"./img/editar.svg\"" 		+ 
							"onmousedown=\"this.src=\'./img/editar_click.svg\'\"" 	+ 
							"onmouseup=\"this.src=\'./img/editar_hover.svg\'\""   	+ 
							"onmouseover=\"this.src=\'./img/editar_hover.svg\'\"" 	+ 
							"onmouseout=\"this.src=\'./img/editar.svg\'\"></td>"  	+
							"<td><div><img title='Excluir' src=\"./img/deletar.svg\"" + 
							"onmousedown=\"this.src=\'./img/deletar_click.svg\'\"" 	+ 
							"onmouseup=\"this.src=\'./img/deletar_hover.svg\'\""   	+ 
							"onmouseover=\"this.src=\'./img/deletar_hover.svg\'\"" 	+ 
							"onmouseout=\"this.src=\'./img/deletar.svg\'\"></div></td>" +
						"</tr>";
	}

}

function exibeTabela(){
	/*tblListaAluno +="</tbody>" +
			        "</table>";*/

	document.getElementById("tabelaAluno").innerHTML = tblListaAluno;
	//console.log(tblListaAluno);
}

function validaFone(elem){
	//console.log(elem);
	//let result = elem.value.replace(/[^(0-9)-]/g, '');
	//let result = elem.value.replace(/[^(0-9) -]/g, '');
	let posAtual = elem.selectionStart;
	let resultFinal = "";
	let result = elem.value.replace(/[^0-9]/g, '');
	//console.log(result.length);

	/*for(let pos = 0 ; pos < result.length ; pos++){
		while(pos > 0 && pos < result.length){
			while(charAt(pos) == "("){
				result = ;
			}	
		}
	}*/

	//resultFinal = "(";
	for(pos = 0 ; pos < result.length ; pos++){
		if(pos == 0){
			resultFinal += "(";
			if(posAtual == 1)
			//alert(posAtual);
			posAtual++;
		}
		if(pos == 2){
			resultFinal += ")";
			if(posAtual == 4 || posAtual == 5)
			posAtual = 5;
		}
		if(pos == 6 && result.length < 11)
			resultFinal += "-";
		else if(pos == 7 && result.length == 11)
			resultFinal += "-";
		
		resultFinal += result[pos];
	}
	elem.value = resultFinal;
	elem.setSelectionRange(posAtual,posAtual);
}

function validaNotaFinal(elem){
	//console.log("Delete = " + del);
	//console.log("Backspace = " + backspace);
	let posAtual = elem.selectionStart;
	let posCursor = [posAtual,posAtual];
	//alert(posAtual);



	if(elem.value.match(/[^0-9.,]/g) != null){
		posCursor[0] = posAtual-1;
		posCursor[1] = posAtual-1;
	}


	let resultFinal = "";
	resultFinal = elem.value.replace(/[^0-9.,]/g,'').replace(/[.]/g,',').replace(/[,]{2,}/g,',');
	//resultFinal = (excessoSeparadorDecimal(resultFinal)) ? notaFinalAluno : resultFinal;

	if(excessoSeparadorDecimal(resultFinal)){
		resultFinal = notaFinalAluno;
		//alert("Teste");
		posCursor[0] = posAtual-1;
		posCursor[1] = posAtual-1;
	}

	//resultFinal = (resultFinal.includes(',')) ? ((resultFinal.indexOf(',') < resultFinal.length - 3) ? notaFinalAluno : resultFinal ) : resultFinal;

	if(resultFinal.includes(',')){
		if(resultFinal.indexOf(',') < resultFinal.length - 3){
			resultFinal = notaFinalAluno;
			//alert("Teste");
			posCursor[0] = posAtual-1;
			posCursor[1] = posAtual-1;
		}
	}


	//resultFinal = (resultFinal.replace(/,/, '.') > 100) ? notaFinalAluno : resultFinal;

	if(resultFinal.replace(/,/, '.') > 100){
		resultFinal = notaFinalAluno;
		//alert("Teste");
		posCursor[0] = posAtual-1;
		posCursor[1] = posAtual-1;
	}



	//resultFinal = parseFloat(resultFinal.replace(/,/, '.'));//.toString().replace(/./, ',');
	while(resultFinal.length > 1){
    	if(resultFinal[0] == 0 && resultFinal[1] != ','){
        	resultFinal = resultFinal.slice(1);
    	}
    	else{
    		//posCursor[0] = posAtual-1;
			//posCursor[1] = posAtual-1;
        	break;
    	}
	}

	//resultFinal = (resultFinal == ',') ? "0," : resultFinal;
	if(resultFinal == ','){
		resultFinal  = "0,";
		posCursor[0] = posAtual + 1;
		posCursor[1] = posAtual + 1;
	}

	//if(resultFinal == "0")resultFinal = "0,";
	elem.value = notaFinalAluno = resultFinal;


	elem.setSelectionRange(posCursor[0],posCursor[1]);
	//elem.setSelectionRange(1,1);


	function excessoSeparadorDecimal(numero){
		let contaSeparadorDecimal = 0;
		for(let caractere of numero)
			if(caractere == ',')contaSeparadorDecimal++;
		return (contaSeparadorDecimal > 1) ? true : false;
	}
}

function teste(){alert("testando");}
function fn(event){
	event.preventDefault();
}
//this.value = this.value.replace(/[ ]/g, '')

function capTecla(elem){
	//console.log(event.keyCode);
	del       = (event.keyCode == teclaDel)       ? true : false;
	backspace = (event.keyCode == teclaBackspace) ? true : false;
	//console.log(event.keyCode);
	//if(event.keyCode == 46)alert(event.key);
	//alert("SSSSS");
	//console.log(event.key);
}

