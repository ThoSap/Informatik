$(document).ready(function() {
	alert("Es funktioniert!");
});

$(document).ready(function() {
	$("#steuern_blau").ready(function() {
		$("#block3").css("background-color", "transparent");
	});
});

/*$("#steuern_rot").on({
	mousehover: function() {
		$("#steuern_rot").css("background-color", "red");
	}
});*/

$("#steuern_rot").hover(function(){
	$(this).css("background-color", "red");
}, function() {
	$(this).css("background-color", "grey");
});

$("#steuern_gruen").hover(function() {
	$(this).css("background-color", "green");
}, function() {
	$(this).css("background-color", "grey");
});

$("#steuern_blau").hover(function() {
	$(this).css("background-color", "blue");
}, function() {
	$(this).css("background-color", "grey");
});

$("#steuern_rot").click(function() {
	$("#block1").hide();
});

$("#steuern_gruen").click(function() {
	$("#block2").fadeOut(1000);
});

$("#steuern_blau").click(function() {
	$("#block3").css("background-color", "blue");
});