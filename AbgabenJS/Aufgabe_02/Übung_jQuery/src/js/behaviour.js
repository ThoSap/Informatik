$(document).ready(function() {
	alert("Es funktioniert!");
});

$(document).ready(function() {
	$("#steuern_blau").ready(function() {
		$("#block3").css("background-color", "transparent");
	});
});

$("#steuern_rot").onmouseover(function() {
	$("#steuern_rot").css("background-color", "red");
});

$("#steuern_gruen").onmouseover(function() {
	$("#steuern_rot").css("background-color", "green");
});

$("#steuern_blau").onmouseover(function() {
	$("#steuern_rot").css("background-color", "blue");
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