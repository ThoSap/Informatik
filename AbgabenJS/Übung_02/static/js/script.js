var singleChime = new Audio("static/sound/ship-single-chime.wav"); // Ein Schlag Schiff Glocken Ton
var doubleChime = new Audio("static/sound/ship-double-chime.wav"); // Zwei Schlag Schiff Glocken Ton

/* Aktuelle Zeit laden */
function loadCurrentTime()
{
	var date = new Date(); // Das aktuelle Datum und Uhrzeit 
	var hour = date.getHours(); // Stunden
	var minute = date.getMinutes(); // Minuten

	document.getElementById("hour").value = hour; // Stunde in Textfeld einfügen
	document.getElementById("minute").value = minute; // Minute in Textfeld einfügen
}

/* Glasenuhr Hauptfunktion */
function bellClock() 
{
	var hour = document.getElementById("hour").value;
	var minute = document.getElementById("minute").value;
	
	if(minute < 30) // Wenn die aktuelle Minute unter 30 ist...
	{
		 minute = 0; // wird auf 0 "abgerundet"
	}
	else if(minute >= 30 && minute < 60) // Wenn die aktuelle Minute zwischen 30 und kleiner 60 ist...
	{
		 minute = 30; // wird auf 30 "abgerundet"
	}
	
	if(hour > 23 || minute >= 60) // Stunden und Minuten begrenzen
	{
		alert("Falsche Eingabe");
	}
	else
	{
		document.getElementById("bellClock").disabled = true; // "Glocken läuten" Button deaktivieren bis die Playlist abgespielt wurde
		playSound(hour, minute); // Akustische und visuelle Ausgabe des Glockentons bezogen auf der aktuellen Uhrzeit
	}
}

/* Gibt die Anzahl von Schlägen bezogen auf die eingegebenen Uhrzeit zurück */
function numberOfChimes(hour, minute)
{
	if(hour % 4 == 0 && minute == 30) // z.B. 00:30, 04:30, 08:30, 12:30, 16:30, 20:30
	{
		return 1; // 1 Schlag
	}
	else if(hour % 4 == 1 && minute == 0) // z.B. 01:00, 05:00, 09:00, 13:00, 17:00, 21:00
	{
		return 2; // 1 Doppelschlag
	}
	else if(hour % 4 == 1 && minute == 30) // z.B. 01:30, 05:30, 09:30, 13:30, 17:30, 21:30
	{
		return 3; // 1 Doppelschlag, 1 Schlag
	}
	else if(hour % 4 == 2 && minute == 0) // z.B. 02:00, 06:00, 10:00, 14:00, 18:00, 22:00
	{
		return 4; // 2 Doppelschläge
	}
	else if(hour % 4 == 2 && minute == 30) // z.B. 02:30, 06:30, 10:30, 14:30, 18:30, 22:30
	{
		return 5; // 2 Doppelschläge, 1 Schlag
	}
	else if(hour % 4 == 3 && minute == 0) // z.B. 03:00, 07:00, 11:00, 15:00, 19:00, 23:00
	{
		return 6; // 3 Doppelschläge
	}
	else if(hour % 4 == 3 && minute == 30) // z.B. 03:30, 07:30, 11:30, 15:30, 19:30, 23:30
	{
		return 7; // 3 Doppelschläge, 1 Schlag
	}
	else if(hour % 4 == 0 && minute == 0) // z.B. 04:00, 08:00, 12:00, 16:00, 20:00, 24:00 bzw. 00:00
	{
		return 8; // 4 Doppelschläge
	}
}

/* 
 * Akustische und visuelle Ausgabe des Glockentons bezogen auf der aktuellen Uhrzeit.
 * Die Berechnete Anzahl der Schläge von numberOfChimes() wird verwendet um die Schläge und Doppelschläge zu berechnen,
 * anschließend wird eine Playlist erstellt und diese abgespielt
 */
function playSound(hour, minute)
{
	var n = numberOfChimes(hour, minute);
	
	var singleCount = parseInt(n % 2); // Schlag: Bei ungerader Zahl z.B. 3 --> 1 Schlag
	var doubleCount = parseInt(n / 2); // Doppelschlag: Bei gerader Zahl z.B. 6 --> 3 Doppelschläge
	
	var playlist = null; // Playlist Objekt erstellen
	
	// Playliste anhand der Anzahl der Schläge und Doppelschläge erstellen
	if (doubleCount == 0 && singleCount == 1)
	{
		playlist = [singleChime];
	}
	else if (doubleCount == 1 && singleCount == 0)
	{
		playlist = [doubleChime];
	}
	else if (doubleCount == 1 && singleCount == 1)
	{
		playlist = [doubleChime, singleChime];
	}
	else if (doubleCount == 2 && singleCount == 0)
	{
		playlist = [doubleChime, doubleChime];
	}
	else if (doubleCount == 2 && singleCount == 1)
	{
		playlist = [doubleChime, doubleChime, singleChime];
	}
	else if (doubleCount == 3 && singleCount == 0)
	{
		playlist = [doubleChime, doubleChime, doubleChime];
	}
	else if (doubleCount == 3 && singleCount == 1)
	{
		playlist = [doubleChime, doubleChime, doubleChime, singleChime];
	}
	else if (doubleCount == 4 && singleCount == 0)
	{
		playlist = [doubleChime, doubleChime, doubleChime, doubleChime];
	}
	
	playPlaylist(playlist); // Playlist abspielen

	document.getElementById("textOutput").innerHTML = 	"Textuelle Ausgabe:" +
														"<br>----------------------------------------------<br>" +
														"Doppelschläge: " + doubleCount + "\nEinzelschläge: " + singleCount +
														"<br>----------------------------------------------" // Textuelle Ausgabe
	
	setTimeout(function() {
		document.getElementById("bellClock").disabled = false; // Playlist wurde abgespielt, den "Glocken läuten" Button wieder aktivieren
	}, singleCount * 2000 + doubleCount * 2000); // Timeout: jeweils 2000 weil 1000 ms Ton + 1000 ms Pause
}

/* Playlist Funktion aus dem Internet */
function playPlaylist(playlist)
{
	var current = null;
	var index = 0;

	function playSound() 
	{
		if (current == null || current.ended)
		{
			// go to next
			current = playlist[index++];

			// check if is the last of playlist and return to first
			if (index >= playlist.length + 1)
			{
				current = null;
				return;
			}

			// return to begin
			current.currentTime = 0;

			// play
			current.play();
		}

	}
	
	setInterval(playSound, 1000);
}
