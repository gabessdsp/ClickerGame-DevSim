var jobStatus; //true = has a job. False = has no job.
var timeLeft = 360000; //6 minutes in Miliseconds
var rent;
var money = 500;
var gameProgress = 0;
var playAgain;
var workLoad;
var gameWorkers = 0;
var assetCost = 500;
var jobStatus;

confirm("Are you ready to play?");

jobStatus = confirm("Are you going to keep your current job? (okay means yes, cancel means no)")
if (jobStatus == true) {
    window.alert("Since you are keeping your job you must put in 3 units of work before you can do a side job or work on your game every 6 seconds. (a day lasts 6 seconds)")
} else {
    doQuitJob();
}

var livingSpace = confirm("Do you live in the city or a rural area? (okay for city, cancel for rural)")
if (livingSpace == true) {
    rent = 1000;
} else {
    rent = 550;
}

doSetInitialValues();

var gameTime = setInterval(timeTracker, 10);
var payRent = setInterval(doPayRent, 60000);

function doSetInitialValues() {
	moneyDisplay.innerHTML = money.toFixed(2);
	gameProgressDisplay.innerHTML = 0;
	timeLeftDisplay.innerHTML = timeLeft;
	jobStatusDisplay.innerHTML = jobStatus;
	unitsOfWorkDisplay.innerHTML = workLoad;
	numOfWorkersDisplay.innerHTML = 0;
}

function doPayRent() {
    money -= rent;
    moneyDisplay.innerHTML = money.toFixed(2);
}

function timeTracker() {
    if (money <= -1000) {
        doEndGame();
    }
    if (timeLeft >= 1) {
        timeLeft -= 10;
    } else {
        doEndGame();
    }
	timeLeftDisplay.innerHTML = timeLeft;
}

function doQuitJob() {
	jobStatus = false;
	doWorkButton.style.display = "none";
}

function doWork() {
	if(jobStatus == true){
		workLoad += 1;
		unitsOfWorkDisplay.innerHTML = workLoad;
	}
}