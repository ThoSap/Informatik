$(function() {
	alert("So");
	//jQuery Funktion wird aufgerufen
	$(document).on('pageshow','#seite1',function(event) {
		// Die Funktion wird erst gestartet, wajax_aufrufenn die Seite (page) mit der ID [ID_EINTRAGEN]
		// aufgerufen wird. In diese Seite soll später der Ajax-Content geladen werden.
		
		// alert("Diese Funktion startet nach dem Aufruf");
		
		$("#ajax_aufruf").load("bilder.html", function() {
			// der div-Container mit der id [ID_EINTRAGEN], 
			// welcher als Markierung im Dokument dient wird ausgewählt
			
			// es wird dann eine HTML-Datei [QUELLDATEI.html] zu der Markierung
			// nachgeladen
			
			$('#seite1').trigger('create');
			
			// nach dem erfolgreichen Ajax-Request muss jQuery mobile die modifizierte Unterseite 
			// mit der id [ID_EINTRAGEN] neu stylen
		});
	})
});