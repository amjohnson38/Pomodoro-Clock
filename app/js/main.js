
var workTime = 25;
var downTime = 5;
var seconds = 59;
var minutes = workTime;
var paused = false;
var workTimeLength = null;
var breakTimeLength = null;
var currentTime = null;
var timerAlarm = new Audio("http://res.cloudinary.com/angiemjohnson/raw/upload/v1469195204/Beep-beep-beep_lxbbce.mp3");



/***************************************************************************************
 * updates the timer and the minutes to equal the work time and displays it in the html*
****************************************************************************************/
function updateMinutes() {
    minutes = workTime;
    $("#workTimeNum").html(workTime);
    $("#min").html(workTime);
}

function formatSeconds(seconds) {
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return seconds;
}



$(function () {
    //sets the HTML contents
    $("#downTimeNum").html(downTime);
    $("#workTimeNum").html(workTime);
    $("#min").html(workTime);
    $("#downtimeTimer").toggleClass("inactive");
    $("#workTimer").toggleClass("inactive");
    $("#clock").toggleClass("inactive");
    $("#pause").prop("disabled", true);

    //changes the work time length
    $("#increaseWorkTime").on("click", function () {
        workTime += 1; //increments the work time by 1
        updateMinutes();
    });

    $("#decreaseWorkTime").on("click", function () {
        workTime -= 1; //decrements the work time by 1
        if (workTime < 1) {
            workTime = 1;
        }
        updateMinutes();
    });

    $("#increaseBreakTime").on("click", function () {
        downTime += 1; //increments the down time by 1
        $("#downTimeNum").html(downTime);
    });

    $("#decreaseBreakTime").on("click", function () {
        downTime -= 1; //decrements the work time by 1
        if (downTime < 0) {
            downTime = 0;
        }
        $("#downTimeNum").html(downTime);
    });

    $("#start").on("click", function () {

        //disables the reset button 
        $("#reset").prop("disabled", true);
        $("#start").prop("disabled", true);
        $("#pause").prop("disabled", false);
        init();
    });

    $("#pause").on("click", function () {
        clearInterval(currentTime);
        clearInterval(breakTimeLength);
        paused = true;
        // gets the attribute value of start
        $("#start").prop("disabled", false);
        //enables the reset button to work after the pause button has been pressed
        $("#reset").prop("disabled", false);
        $("#pause").prop("disabled", true);


    });
    $("#reset").on("click", function () {
        //reset button needs to change the time to equal the work time value
        //make the timer minutes equal the worktime 
        $("#min").html(workTime);
        // make the timer seconds equal "00"
        $("#sec").html("00");

        //the seconds have to be reset to reflect the initial value
        seconds = 59;
        //the minutes have to be reset to reflect the intial value
        minutes = workTime;

        //set pause, so that it doesn't equal true when the time is reset
        paused = false;


        $("#downtimeTimer").removeClass("active inactive");
        $("#workTimer").removeClass("active inactive");
        $("#downtimeTimer").addClass("inactive");
        $("#workTimer").addClass("inactive");
    });
});

/*******************************************************************************
 * intializes the time clock *
 *******************************************************************************/
function init() {
    $("#sec").html(seconds);
    if (paused === false) {
        minutes -= 1;
        $("#min").html(minutes);
        $("#workTimer").toggleClass("active inactive");
    }
    //set pause to false
    paused = false;


    workTimeLength = window.setInterval(workTimeTimer, 1000);//set's the work Time 
    currentTime = workTimeLength;
};

function workTimeTimer() {
    seconds -= 1;

    if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
        $("#min").html(minutes);

    }

    if (minutes <= 0 && seconds <= 0) {
        //plays the alarm after the work time has elasped
        timerAlarm.play();
        $("#workTimer").toggleClass("active inactive");
        clearInterval(workTimeLength);//clears the timer
        currentTime = breakTimeLength;
        downTimeTimerInit();

    }
    //gets the formatted seconds and displays them 
    $("#sec").html(formatSeconds(seconds));


}
//initalizes the down time clock
function downTimeTimerInit() {
    $("#downtimeTimer").toggleClass("active inactive");
    minutes = $("#downTimeNum").html() - 1;
    $("#min").html(minutes);
    seconds = 59;
    breakTimeLength = window.setInterval(downTimeTimer, 1000);


}

function downTimeTimer() {
    seconds -= 1;
    if (seconds < 0) {
        seconds = 59;
        minutes -= 1;
        $("#min").html(minutes);

    }

    if (minutes <= 0 && seconds <= 0) {
        timerAlarm.play();
        $("#downtimeTimer").toggleClass("active inactive");
        clearInterval(breakTimeLength);
        minutes = $("#workTimeNum").html();
        seconds = 59;
        init();
    }

    $("#sec").html(formatSeconds(seconds));
}