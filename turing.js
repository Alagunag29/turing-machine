var palabra = ['a', 'b', 'a', 'b', 'b'];

$(function(){
	console.log(palabra);
	botton();
	contenido();
});

function botton(){
	$('input[type=button]').on('click', function(e){
		e.preventDefault();
		alert("estamos mejor");
	});
}


function contenido(){
	for(var i = 0; i < palabra.length; i++){
		$('#tape-turing').append(
			"<div class='turing-container'>" + "<a>" + palabra[i] + "</a>"+ "</div>"
		);
	}
} 
