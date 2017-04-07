var palabra = [
	{"valor": "a", "estado": 1},
	{"valor": "b", "estado": 0},
	{"valor": "a", "estado": 0},
	{"valor": "b", "estado": 0},
	{"valor": "b", "estado": 0}
];

var exp = [
		{ "estInicial": "q1", "tokInicial": "a", "estFinal": "q1", "tokFinal": "a", "desplazamiento": "R"},
		{ "estInicial": "q2", "tokInicial": "b", "estFinal": "q2", "tokFinal": "b", "desplazamiento": "R"},
		{ "estInicial": "q1", "tokInicial": "b", "estFinal": "q2", "tokFinal": "a", "desplazamiento": "R"},
		{ "estInicial": "q2", "tokInicial": "B", "estFinal": "q3", "tokFinal": "B", "desplazamiento": "L"},
		{ "estInicial": "q2", "tokInicial": "a", "estFinal": "q2", "tokFinal": "a", "desplazamiento": "R"},
]


$(function(){
	console.log(palabra);
	botton();
	contenido();
});

function botton(){
	$('input[type=button]').on('click', function(e){
		e.preventDefault();
		logica();	
	});
}


function contenido(){
	var clase;
	for(var i = 0; i < palabra.length; i++){
		if(palabra[i].estado == 1 ){
			clase = "<div class='turing-container turing-container-red'>" + "<a>" + palabra[i].valor + "</a>"+ "</div>";
		}else {
			clase = "<div class='turing-container turing-container-green'>" + "<a>" + palabra[i].valor + "</a>"+ "</div>";
		}
		
		$('#tape-turing').append(
			clase
		);
	}
}

function remove(){
	$('.turing-container').remove();
}

timer = setTimeout('temporizador()', 4000);
function logica(){
	var estado = "q1";
	var position = 0;
	palabra[0].estado = 1; palabra[0].valor = "a";
	palabra[1].estado = 0; palabra[1].valor = "b";
	palabra[2].estado = 0; palabra[2].valor = "a";
	palabra[3].estado = 0; palabra[3].valor = "b";
	palabra[4].estado = 0; palabra[4].valor = "b";
	for(var i =0 ; i < exp.length; i++){
		sw = false;
		for(var j = 0; j <  palabra.length && sw == false; j++){
			if(estado == exp[j].estInicial && palabra[position].valor == exp[j].tokInicial ){
				sw = true;
				palabra[position].estado = 0;
				palabra[position].valor  = exp[j].tokFinal;
				estado = exp[j].estFinal;
				if(exp[j].desplazamiento == "R"){
					position++;
				}else{
					position--;
				}
				if (position >= 0 && position < palabra.length){
					palabra[position].estado = 1;
				}else{
					 palabra[position-1].estado = 1;
				}				
			}			
		}
		remove();
		contenido();
	}
}
