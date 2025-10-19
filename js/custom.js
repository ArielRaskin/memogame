var gameValues = [];
var userValues = [];
var currentClickCounter = 0;
var gameMessages = {
	gameOverMsg: '!!! GAME OVER !!!\nWell dome!\nNext time you will do better!\nClick on START to begin the game',
	errorMsg_1: 'Click on START to begin the game',
	hiScoreMessage: 'HIGH SCORE: ',
	currentLevelMessate: 'You are on level: ',
	hiScore: 0,
	currentLevel: 0,
	gameSpeed: 1000,
	blinkSpeed: 300
}

function initGame(){
	$("#start_button").on('click', function(){
		resetGame();
		setTimeout(function(){playGame();}, 1000);
		$("#start_button").hide('slow');
		$(".description").hide();
		gameMessages.gameSpeed = parseInt($("#gameSpeed").val());
		gameMessages.blinkSpeed =  parseInt($("#gameSpeed").val()) / 3;		
	});

	$("div.sector").on('click', function(){
		manipColor(this.id);
		addUserValue(this.id);
		checkResult();
	});

	$('select').on('change', function(){
		gameMessages.gameSpeed = parseInt($("#gameSpeed").val());
		gameMessages.blinkSpeed =  parseInt($("#gameSpeed").val()) / 3;
	});
}

// *** ADD NEW ELEMENT TO GAME VALUES
function playGame(){
	currentClickCounter = 0;
	userValues = [];
	document.getElementById("gameContainer").removeEventListener("click", addCounter);	
	randomId = getRundom();
	gameValues.push(randomId);
	playGameValues();
}

// *** RESET GLOBAL VALUES BEFORE NEW GAME
function resetGame(){
	gameValues = [];
	userValues = [];
	currentClickCounter = 0;
	gameMessages.currentLevel = 0;
	showGameMessage();	
	$('.trophy').width('0px');
}

function playGameValues(){
	(function fn(n) {   
	  manipColor('sector_' + gameValues[n]);  
	  if( n <  gameValues.length ){
	  	if( n == gameValues.length - 1) document.getElementById("gameContainer").addEventListener("click", addCounter);
	  	setTimeout( function(){  fn(++n);  }, gameMessages.gameSpeed);
	  }
	}( 0 ));

}

function addCounter(){ 
	currentClickCounter++;
	console.log(currentClickCounter);
}

function manipColor(sectorId){
	if( gameValues.length > 0){
		$('#' + sectorId).fadeTo(gameMessages.blinkSpeed, 0.4).fadeTo(gameMessages.blinkSpeed, 1);
	}
}

function getRundom(){
	var xRand = 0;
	do{
		xRand = Math.floor((Math.random() * 10) + 1);
	} while ( xRand > 4);
	return xRand;
}

function addUserValue(SectorId){
	var tempArr = SectorId.split("_");
	userValues.push(parseInt(tempArr[1]));
}

function checkResult(){
	var gameOver = false;
	printLogValues();	
	if( gameValues[currentClickCounter] != userValues[currentClickCounter] || currentClickCounter > gameValues.length -1) {
			if(gameValues.length == 0)
				showErrorMessage(gameMessages.errorMsg_1, 1000);				
			else
				showErrorMessage(gameMessages.gameOverMsg, 3000);
	}
	else if(currentClickCounter == gameValues.length -1){
			gameMessages.currentLevel =  gameValues.length;
			showGameMessage();
			setTimeout(function(){playGame()}, parseInt( gameMessages.gameSpeed * 2 ));
	}	
}

function printLogValues(){
	console.log(gameValues[currentClickCounter] + ' == ' + userValues[currentClickCounter]);
	console.log('USER INPUT: ' + userValues);
	console.log('GAME INPUT: ' + gameValues);
}

function showErrorMessage(errorMessage, timeOutValue){
		resetGame();
		//alert(errorMessage);
		$("#errorMesage")
			.text(errorMessage)
			.css('left', $(window).width() / 2 - $("#errorMesage").width()  / 2 )
			.show();
		setTimeout(function(){$("#errorMesage").hide('slow');}, timeOutValue);
		$("#start_button").show('slow');
		$(".description").show();
};

function showGameMessage(){
		if( gameMessages.currentLevel == 2 ) $('.trophy').width('24px');
			else if( gameMessages.currentLevel == 5 ) $('.trophy').width('48px');	
				else if( gameMessages.currentLevel == 10 ) $('.trophy').width('72px');
					else if( gameMessages.currentLevel == 15 ) $('.trophy').width('96px');
						else if( gameMessages.currentLevel == 20 ) $('.trophy').width('120px');
		$("#currentLevel")
			.html(gameMessages.currentLevelMessate + gameMessages.currentLevel);
		if(gameMessages.currentLevel > gameMessages.hiScore){
			gameMessages.hiScore = gameMessages.currentLevel;
			$("#hiScore").html( gameMessages.hiScoreMessage + gameMessages.hiScore);
		}
};

/*
ChooseVeg.com
LiveVegan.org
Challenge22.com
Adaptt.org
VeganKit.com
VeganEasy.org

Join Challenge22+, it is completely free, online(!), and you will get all the help you need to get started. Join here: challenge22.com

Great Facebook note:
facebook.com/notes/berkay-tamer/why-vegan/843429495715758

Helpful Facebook group:
https://www.facebook.com/groups/4A.Vegan
*/