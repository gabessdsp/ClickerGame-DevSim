var jobStatus; //true = has a job. False = has no job.
var timeLeft=360000; //6 minutes in Miliseconds
var rent;
var money=500;
var gameProgress=0;
var playAgain;
var workLoad;

confirm("Are you ready to play?");

	jobStatus = confirm("Are you going to keep your current job? (okay means yes, cancel means no)")
		if(jobStatus == true){
			window.alert("Since you are keeping your job you must put in 8 units of work before you can do a side job or work on your game every 6 seconds. (a day lasts 6 seconds)")
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
	
	
function doGetPaid (){
	if(jobStatus == true){
		money += 750;
		moneyDisplay.innerHTML = money.toFixed(2);
		historybar.innerHTML += "<span class=\"getPaid\">Got paid $750!</span><br />";
	}
}
	
function doWork (){
	if(jobStatus == true){
		workLoad += 1;
		unitsOfWorkDisplay.innerHTML = workLoad;
		historybar.innerHTML += "<span class=\"workLoad\">You worked for 1 unit!</span><br />";
	}
}

function newWorkDay (){
	if(jobStatus == true){
		workLoad = 0;
		unitsOfWorkDisplay.innerHTML = workLoad;
		historybar.innerHTML += "<span class=\"workLoad\">A new workday has started!</span><br />";
	}
}
	
function doMakeGame (){
	if(workLoad <8){
		historybar.innerHTML += "<span class=\"warning\">You need to work more before you can do that!</span><br />";
	}else if(workLoad >= 8){
		gameProgress += 0.1;
		gameProgressDisplay.innerHTML = gameProgress.toFixed(1);
		historybar.innerHTML += "<span class=\"workOnGame\">You worked on your game!</span><br />";
	}
}

function doSideJob (){
	if(workLoad <8){
		historybar.innerHTML += "<span class=\"warning\">You need to work more before you can do that!</span><br />";
	}else if(workLoad >= 8){
		money += 50;
		moneyDisplay.innerHTML = money.toFixed(2);
		historybar.innerHTML += "<span class=\"sideJob\">Made $50!</span><br />";
	}
}

function doQuitJob (){
	jobStatus = false;
	jobStatusDisplay.innerHTML = jobStatus;
	historybar.innerHTML += "<span class=\"quitJob\">You quit your job!</span><br />";
}

function timeTracker (){
	if (timeLeft >=1) {
		timeLeft -= 10;
	}else{
		clearInterval(gameTime);
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
	timeLeftDisplay.innerHTML = timeLeft;
}

function doPayRent (){
	money -= rent;
	moneyDisplay.innerHTML = money.toFixed(2);
	historybar.innerHTML += "<span class=\"paidRent\">Paid $" + rent + " for rent!</span><br />";
}