var palabra = [
	{
	 "valor": "a" ,
	 "estado": 1 
	}
]

var exp = [
		{
		"eInicial": "q1",
		 "tInicial": "a", 
		 "eFinal": "q1", 
		 "tFinal": "a", 
		 "desplazamiento": "R"
		}
]

var BLANCA;
var VECES = true;

$(function(){

	botton();

});

function botton(){
	$('#expresion').on('click', function(e){
		e.preventDefault();
		addExpresion();
	});

	$('#blanca').on('click', function(e){
		e.preventDefault();
		addBlanca();
	});

	$('#inicial').on('click', function(e){
		e.preventDefault();
		addInicial();
		contenido();
	});

	$('#simulacion').on('click', function(e){
		e.preventDefault();
		simulacion();
	});
}

function addExpresion(){
	var text = document.getElementById("text-expresion");
	var tx	 = text.value;
	var expreg = new RegExp('[(][q][0-9][,][a-z|A-Z][)][=][(][q][0-9][,][a-z|A-Z][,][R|L][)]')
	if (expreg.test(text.value)){
		exp.push({
			eInicial: tx[1]+tx[2],
			tInicial: tx[4],
			eFinal: tx[8]+tx[9],
			tFinal: tx[11],
			desplazamiento: tx[13]
		});
		pintarExpresion('#contenedor-expresion', tx);
	}
	text.value = "";
	console.log(exp);
}

function addBlanca(){
	var blanca = document.getElementById("text-blanca");
	BLANCA = blanca.value;
	pintarExpresion('#contenedor-blanca', blanca.value);
	blanca.value = "";
}


function addInicial(){
	est = 1;	
	var inicial = document.getElementById("text-inicial");
	for(var j=0; j < inicial.value.length; j++){
		palabra.push({valor: inicial.value[j], estado: est});
		est = 0;		
	}
	pintarExpresion('#contenedor-inicial', inicial.value);
	inicial.value = ""
}

function contenido(){
	var clase;
	for(var i = 1; i < palabra.length; i++){
		if(palabra[i].estado == 1 ){
			clase = "<div class='turing-container purple'>" + "<a>" + palabra[i].valor + "</a>"+ "</div>";
		}else {
			clase = "<div class='turing-container blue'>" + "<a>" + palabra[i].valor + "</a>"+ "</div>";
		}
		
		$('#tape-turing').append(
			clase
		);
	}
}

function remove(){
	$('.turing-container').remove();
}

function pintarExpresion(lugar, pal){
	$(lugar).append('<p>'+ pal +'</p>');
}

function simulacion(){
	var estado = "q1";
	var sw = true;
	pos = 1;
	if(VECES == true){
		for(var i = 1; i < palabra.length ; i++){
			var veces = 0;
			for(var j = 1; j < exp.length; j++ ){
				if( (estado == exp[j].eInicial) && (palabra[i].valor == exp[j].tInicial) && (pos >= 1) ){
					veces++;
					palabra[pos].estado = 0;
					palabra[pos].valor  = exp[j].tFinal;
				    estado = exp[j].eFinal;
					if(exp[j].desplazamiento == "R"){
						pos++;
					}else{
						pos--;
					}	
					if (pos >= 1 && pos < palabra.length){
						palabra[pos].estado = 1;
					}else{
					 	palabra[pos-1].estado = 1;
					}
				}
			}
			if(veces == 0){
				sw = false;
			}
		}
		remove();
		contenido();
		VECES = false;
		console.log("termino");
	}
}
