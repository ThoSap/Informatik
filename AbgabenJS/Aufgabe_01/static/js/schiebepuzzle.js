/*** Globale Variablen ***/
// Veränderbar
var gridSizeX = 3; // Spalten
var gridSizeY = 3; // Reihen
var tileSizeWidth = 100; // Puzzleteil Breite
var tileSizeHeight = 100; // Puzzleteil Höhe

// Fix
var gridSize = gridSizeX * gridSizeY; // Berechnet Größe
var puzzleGrid = null; // 2-Dimensionales Array mit den Puzzle Nummern

/*
z.B.
	[8][4][7]
	[3][5][2]
	[6][ ][1]
*/

/* Das Puzzle laden */
function loadPuzzle()
{
	var puzzle = null; // Puzzle Teile HTML-Code
	
	puzzle = '<div id="slidingPuzzleContainer' + gridSizeX + 'x' + gridSizeY + '" class="container" style="width: ' + (gridSizeX * tileSizeWidth) + 'px; height: ' + (gridSizeY * tileSizeHeight) + 'px;">';
	
	for (var i = 0; i < gridSizeY; i++)
	{
		for (var j = 0; j < gridSizeX; j++)
		{
			puzzle += '<canvas id="puzzleTile[' + i + '][' + j + ']" class="puzzleTile" onclick="movePuzzle(' + i + ', ' + j + ');"></canvas>'; // Canvas Element mit Index in der ID und in der movePuzzle() Funktion
		}
	}
	
	puzzle += '</div>';
	
	document.getElementById('container').innerHTML = puzzle; // HTML-Code in innerHTML Objekt "container" einfügen
	
	var numbers = randomNumbers(); // Zufällige Nummern generieren
	console.log(numbers); // TODO Delete
	
	createPuzzleGrid(numbers); // 2-Dimensionales Array mit den zufälligen Nummern füllen
	drawPuzzleTiles(); // Puzzleteile darstellen (mit Zahlen)
}

/* Zahlen generieren und zufällig anordnen */
function randomNumbers()
{
	var numbers = []; // Nummern Array
	
	for (var i = 0; i < gridSize; i++)
	{
		numbers.push(i); // Nummer zu Array hinzufügen
	}
	
	return shuffle(numbers); // Nummern zufällig anordnen und zurückgeben
}

/* https://github.com/daplie/knuth-shuffle */
function shuffle(array)
{
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/* 2-Dimensionales Array mit Zufälligen Zahlen erstellen */
function createPuzzleGrid(numbers)
{
	puzzleGrid = new Array(gridSizeY); // Array mit den Reihen erstellen
	var counter = 0; // Counter um Zahlen-Array Index hochzuzählen
	
	for (var i = 0; i < gridSizeX; i++)
	{
		puzzleGrid[i] = new Array(gridSizeX); // Im Array am Index[i] die Spalten erstellen
		
		for (var j = 0; j < gridSizeY; j++)
		{
			puzzleGrid[i][j] = numbers[counter]; // Array am Index[i][j] mit einer Zahl füllen
			
			counter++; // Counter hochzählen
		}
	}
	
	console.log(puzzleGrid); // TODO Delete
}

/* Puzzleteile darstellen */
function drawPuzzleTiles()
{
	for (var i = 0; i < gridSizeY; i++) // Reihe
	{
		for (var j = 0; j < gridSizeX; j++) // Spalte
		{
			var puzzleTile = document.getElementById("puzzleTile[" + i + "][" + j + "]"); // Puzzle Canvas-Element holen
			var puzzleProperties = puzzleTile.getContext("2d"); // Puzzle Context holen
		
			puzzleTile.setAttribute("width", tileSizeWidth - 2); // Breite festlegen
			puzzleTile.setAttribute("height", tileSizeHeight - 2); // Höhe festlegen

			if (puzzleGrid[i][j] != 0) // Wenn das 2D-Array an dieser Stelle nicht den Wert 0 beträgt
			{
				puzzleProperties.font = "30px Arial"; // Schrift
				puzzleProperties.textAlign = "center"; // Zentrieren
				puzzleProperties.textBaseline = "middle"; // Mitte
				puzzleProperties.fillText(puzzleGrid[i][j], puzzleTile.width / 2, puzzleTile.height / 2); // Zahl in der Mitte darstellen
			}
		}
	}
}

/* Puzzleteil wenn möglich verschieben/austauschen */
function movePuzzle(x, y)
{
	var selectedPuzzleTile = document.getElementById("puzzleTile[" + x + "][" + y + "]");
	var puzzleProperties = selectedPuzzleTile.getContext("2d");
	var changed = false;
	
	if ((y != 0) && (puzzleGrid[x][y - 1] == 0)) // Oben: checkt ob das Feld oben frei ist 
	{
		puzzleGrid[x][y - 1] = puzzleGrid[x][y];
		puzzleGrid[x][y] = 0;
		changed = true;
	}
	else if ((x != 0) && (puzzleGrid[x - 1][y] == 0)) // Links: checkt ob das Feld links frei ist
	{
		puzzleGrid[x - 1][y] = puzzleGrid[x][y];
		puzzleGrid[x][y] = 0;
		changed = true;
	}
	else if ((x != (gridSizeX - 1)) && (puzzleGrid[x + 1][y] == 0)) // Rechts: : checkt ob das Feld rechts frei ist
	{
		puzzleGrid[x + 1][y] = puzzleGrid[x][y];
		puzzleGrid[x][y] = 0;
		changed = true;
	}
	else if ((y != (gridSizeY - 1)) && (puzzleGrid[x][y + 1] == 0)) // Unten: checkt ob das Feld unten frei ist
	{
		puzzleGrid[x][y + 1] = puzzleGrid[x][y];
		puzzleGrid[x][y] = 0;
		changed = true;
	}
	
	if (changed) // Wenn sich etwas verändert hat ...
	{
		drawPuzzleTiles(); // die Puzzleteile neu darstellen
	}	
}
