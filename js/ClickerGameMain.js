//Copyright 2016 by Gabriel McKenna
var jobStatus; //true = has a job. False = has no job.
var timeLeft=360000; //6 minutes in Miliseconds
var rent;
var money=500;
var gameProgress=0;
var playAgain;
var workLoad =0;
var assetPrice = 500;
var numOfWorkers = 0;
var workPenalty = 0;
var numOfBugs = 0;
var progressBar = document.getElementsByClassName("progress-bar");

confirm("Are you ready to play?");

	jobStatus = confirm("Are you going to keep your current job? (okay means yes, cancel means no)")
		if(jobStatus == true){
			window.alert("Since you are keeping your job you must put in 3 units of work before you can do a side job every 6 seconds. (a day lasts 6 seconds)")
		}else{
			doQuitJob();
		}
	
	
	var livingSpace = confirm("Do you live in the city or a rural area? (okay for city, cancel for rural)")
	if(livingSpace == true){
		rent = 1000;
	}else{
		rent = 550;
	}
	
var gameTime = setInterval(timeTracker, 10);
if(jobStatus == true) {
	var goToNewWorkDay = setInterval(newWorkDay, 6000);
	var getPaidSalary = setInterval(doGetPaid, 60000);
}
var payRent = setInterval(doPayRent, 60000);
var payWorkers = setInterval(doPayWorkers, 60000);
var workingWorkers = setInterval(doWorkersWork, 6000);

function doGetPaid (){
	if(jobStatus == true){
		money += 750;
		moneyDisplay.innerHTML = money.toFixed(2);
	}
}
	
function doWork (){
	if(jobStatus == true){
		workLoad += 1;
		unitsOfWorkDisplay.innerHTML = workLoad;
	}
}
	
function doPayBills (){
	doPayRent();
	doPayWorkers();
}

function newWorkDay (){
	if(jobStatus == true){
		console.log('new work day');
		if(workLoad == 0){
			console.log('if you see this then this should work');
			workPenalty +=1;
			workPenaltyDisplay.innerHTML = workPenalty;
		}
		
		workLoad = 0;
		unitsOfWorkDisplay.innerHTML = workLoad;
	}
	
	if(workPenalty >= 7){
		doQuitJob();
	}
}
	
function doMakeGame (){
	if(Math.random() <= .1){
		numOfBugs++;
		numOfBugsDisplay.innerHTML = numOfBugs;
	}else{
		gameProgress += 0.05;
		//gameProgressDisplay.innerHTML = gameProgress.toFixed(2);
		progressBarUpdate();
	}
}

function doFixBug (){
	if(Math.random() <= .9 && numOfBugs > 0){
		numOfBugs--;
		numOfBugsDisplay.innerHTML = numOfBugs;
	}
}

var theSideJobTimer = 0;
var theSideJobTimer2 = 0;
var sideJobPossible = true;


function sideJobTimer (){
	sideJobPossible = false;
	theSideJobTimer = setInterval(updateSideJobTimer, 1000);
	theSideJobTimer2 = getRandomInt(1,10);
	timeUntilSideJobDisplay.innerHTML = theSideJobTimer2;
}

function doSideJob (){
	if(sideJobPossible){
		if(workLoad <=3 && jobStatus == true){
			//nothing
		}else{
			
			if(rent == 1000){
				money += getRandomInt(150,600);
			}else{
				money += getRandomInt(50,300);
			}
		
			moneyDisplay.innerHTML = money.toFixed(2);
			sideJobTimer();
		}
	}
}

function updateSideJobTimer (){
	theSideJobTimer2 --;
	timeUntilSideJobDisplay.innerHTML = theSideJobTimer2;
	if(theSideJobTimer2 <=0){
		clearInterval(theSideJobTimer);
		sideJobPossible = true;
	}
}

function doQuitJob (){
	jobStatus = false;
	jobStatusDisplay.innerHTML = jobStatus;
	clearInterval(goToNewWorkDay);
	clearInterval(getPaidSalary);
}

function timeTracker (){
	if (gameProgress>=100 && numOfBugs <=0){
		clearInterval(gameTime);
		clearInterval(payRent);
		clearInterval(goToNewWorkDay);
		clearInterval(getPaidSalary);
		clearInterval(doWorkersWork);
			playAgain = confirm("You won! Would you like to play again?");
				if(playAgain == true){
					reload();
				}else{
					window.alert("Thanks for playing!");
				}
	}
	
	if (timeLeft >=1 && money > -1000) {
		timeLeft -= 10;
		timeLeftDisplay.innerHTML = timeLeft;
	}else{
		clearInterval(gameTime);
		clearInterval(payRent);
		clearInterval(goToNewWorkDay);
		clearInterval(getPaidSalary);
		clearInterval(doWorkersWork);
		clearInterval(doPayWorkers);
		if(gameProgress>=100){
			playAgain = confirm("You won! Would you like to play again?");
				if(playAgain == true){
					reload();
				}else{
					window.alert("Thanks for playing!");
				}
		}else{
			playAgain = confirm("You lost! Would you like to play again?");
				if(playAgain == true){
					reload();
				}else{
					window.alert("Thanks for playing!");
				}
		}
	}
}

function doWorkersWork(){
	gameProgress += (numOfWorkers * .01);
	//gameProgressDisplay.innerHTML = gameProgress.toFixed(2);
}

function doPayRent (){
	money -= rent;
	moneyDisplay.innerHTML = money.toFixed(2);
}

function doPayWorkers (){
	money -= (numOfWorkers * 150);
	moneyDisplay.innerHTML = money.toFixed(2);
}

function doHireWorker (){
	money -= 150;
	moneyDisplay.innerHTML = money.toFixed(2);
	
	numOfWorkers +=1;
	numOfWorkersDisplay.innerHTML = numOfWorkers;
}

function doFireWorker(){
	if(numOfWorkers>=1){
	numOfWorkers -=1;
	numOfWorkersDisplay.innerHTML = numOfWorkers;
	}else{
		//nobody to fire!	
	}
}

function doBuyAsset() {
	if(gameProgress <=59.99){
		money = money - assetPrice;
		moneyDisplay.innerHTML = money.toFixed(2);
			
		assetPrice = assetPrice * 1.5;
		costOfAssetDisplay.innerHTML = assetPrice.toFixed(2);
			
		gameProgress += 10;
		//gameProgressDisplay.innerHTML = gameProgress.toFixed(2);

		progressBarUpdate();
	}else{
		//cannot buy any more assets
	}
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openPopup(){
	var popup = document.getElementById('mypopup');
	popup.classList.toggle('show');
}

function progressBarUpdate() {
	progressBar[0].style.width = gameProgress+"%";
}