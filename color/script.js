//Variables
var colors = [];
var allclicked = [];
var wrongclicked = [];
var pickedcolornum;
var pickedcolor;
var clickedcolor;
var time;
var timestart;
var count = 0;
var numsq = 6;
var gotright = false;
var activemode = "hard";
var squares = document.querySelectorAll(".square");
var message = document.querySelector("span");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var display = document.querySelector("#message");
var changecolors = document.querySelector("#resetcolor");
var extra = document.querySelectorAll(".extra");
var menu = document.querySelector("div");
var h1 = document.querySelector("h1");
var wrong = document.querySelector("#count");
var container = document.querySelector("#container");
var overall = document.querySelector("#score");
var overalltext = document.querySelector("button b")
var score = document.querySelector("#nscore");
//Over All Score Object
var score = [

    //hardplay:
     0,
    //easyplay:
     0,
    //hardwon:
     0,
    //easywon:
     0,
    //hardlost:
     0,
    //easylost:
     0,
    //thardwrong:
     0,
    //teasywrong:
     0,
    //thardcorrect:
     0,
    //teasycorrect:
     0,
    //hardtime:
     0,
    //easytime:
     0,

]
var matchbymatch = [];

var thismatch = [
        //modeplayed
        "",
        // winlose
        '',
        //time
        '',
        //wrongs
        '',
        //all colors
        [''],
        //correct color
        ["You haven't played any match yet. "],
        //wrong clicked
        ['  Just Wait 5 seconds']
    ]

//score tutorial
function scoretell(){
    h1.innerHTML = "<br>TO VIEW YOUR SCORES CLICK ON THE SCORE BUTTON!<br><br>"
    setTimeout(function(){
        fadeout(overall);
        setInterval(function(){
            fadein(overall);
        }, 800)
    }, 1000)
    setInterval(function(){
        h1.innerHTML = 'The Great <br> <span>RGB(255,255,255)</span> <br> Color Guessing Game!'
        var message = document.querySelector("span");   
        message.textContent = pickedcolor;
        h1.style.fontSize = "2em";
        h1.style.transition = "all 1s";
    }, 3500)
}
//All Functions

function colorsetup(numberofsquares) {
    var message = document.querySelector("span");
    var squares = document.querySelectorAll(".square");
    timestart = new Date().getTime();
    for (var i = 0; i < numberofsquares; i++) {
        var r = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        colors[i] = " RGB(" + r + ", " + g + ", " + b + ") ";
        pickedcolornum = Math.floor(Math.random() * numberofsquares);
        pickedcolor = colors[pickedcolornum];
        squares[i].style.backgroundColor = colors[i];
        message.textContent = pickedcolor;
        changecolors.textContent = "NEW COLORS!";
        display.textContent = "";
        gotright = false;
        h1.style.backgroundColor = "steelblue";
        mode();
        count = 0;
        wrong.textContent = "You Got " + count + " wrong.";
        container.style.display = "block";
        clickedcolor = '';
        wrongclicked = [];
        fadein(container);
    }

}

function newset(){
    changecolors.addEventListener("click", function() {
        colorsetup(numsq);
        colorcheck();
    });
}

function easymode(){
    document.querySelector("#easy").addEventListener("click", function(){
        document.querySelector("#easy").classList.add("selected");
        document.querySelector("#hard").classList.remove("selected");
        numsq = 3;
        activemode = "easy";
        colorsetup(numsq);

            for(var i = 0; i<extra.length; i++){
                extra[i].classList.add("invisible");
            }
    });
};

function hardmode() {
    document.querySelector("#hard").addEventListener("click", function(){
        document.querySelector("#easy").classList.remove("selected");
        document.querySelector("#hard").classList.add("selected");
        activemode = "hard";
        numsq = 6;
        colorsetup(numsq);

            for(var i = 0; i<extra.length; i++){
                extra[i].classList.remove("invisible");
            }
    });
};

function mode(){
    easymode();
    hardmode();
}

function scoresave(){
    //score save
    time = (new Date().getTime() - timestart) / 1000;
    thismatch[1] = 'You played the match in "' + activemode.toUpperCase() + ' MODE."';
    thismatch[2] = 'You Took ' + time + "s to complete the round."
    thismatch[3] = 'You got "' + count + '" incorrect attempt(s).';
    thismatch[4] = 'You were given these color(s)   ' + colors + " .";
    thismatch[5] = "The correct color was   " + pickedcolor + ".";
    //
}

function colorcheck(){
    var squares = document.querySelectorAll(".square");

    for(var i = 0; i<numsq; i++){
        squares[i].addEventListener("click", function(){
            if (gotright === false) {
                clickedcolor = this.style.backgroundColor.toUpperCase();
            }
            if(gotright === false){
                if(clickedcolor === pickedcolor){
                    display.textContent = "CORRECT!";
                    changecolors.textContent = "PLAY AGAIN!";
                    h1.style.backgroundColor = pickedcolor;
                    gotright = true;
                    if (count === 0) { thismatch[6] = "You didn't clicked any wrong box." }
                    else if (count>0) { thismatch[6] = "You clicked these wrong color(s)    " + wrongclicked + " ." }
                    if(activemode === "hard" && count<4){
                        thismatch[0] = "You Won The Match.";
                    }
                    if(activemode === "easy" && count<2){
                        thismatch[0] = "You Won The Match.";
                    }
                    return gotright;
                }
                if(clickedcolor !== pickedcolor){
                    wrongclicked.push(' '+clickedcolor+' ');
                    display.textContent = "TRY AGAIN!";
                    count++;
                    wrong.textContent = "You Got " + count + " wrong.";
                    if (count>0) { thismatch[6] = "You clicked these wrong color(s)     " + wrongclicked + " ." } 
                    if(activemode === "easy" && count === 2){
                            gotright = true;
                                display.textContent = "You Lose!";
                                changecolors.textContent = "PLAY AGAIN!";
                                thismatch[0] = "You Lost The Match.";
                                return gotright;
                        }
                        else if(activemode === "hard" && count === 4){
                            gotright = true;
                            display.textContent = "You Lose!";
                            changecolors.textContent = "PLAY AGAIN!";
                            thismatch[0] = "You Lost The Match.";  
                            return gotright;
                        }
                        else{
                            thismatch[0] = "You Won The Match.";
                        }
                    return clickedcolor;
                }
            }
            else if(gotright === true){
                container.style.backgroundColor = "#232323";
                scoresave();
                matchbymatch.push(thismatch);
            }
        });
    };
};

function fadeout(object){
    var timing = 1000;
    var opacity = 0.001;
    for (var i =0; i<timing; i++)
        setTimeout(function(){
            object.style.opacity = opacity;
        }, 1)
        opacity + 0.001;
}
function fadein(object){
    var timing = 1000;
    var opacity = 1;
    for (var i =0; i<timing; i++)
        setTimeout(function(){
            object.style.opacity = opacity;
        }, 1)
        opacity - 0.001;
}

function toggledisplay(object){
    for(var i =0; i < object.length; i++){
        if(object[i].style.display !== "none"){
            object[i].style.display = "none";
        }
        else{
            object[i].style.display = "block";
        }
    }
}

function scoreset() {
    overall.addEventListener("click", function () {
        //squares hide
        toggledisplay(squares);
        container.innerHTML = "";
        for(var i = 0; i < matchbymatch.length; i++){
            container.innerHTML = container.innerHTML + '<button class="match"> Match No.' + (i + 1) + ' </button>'
            var match = document.querySelectorAll(".match");
        }
        for(var i = 0; i < thismatch.length; i++){
            container.innerHTML = container.innerHTML + thismatch[i] + "<br>";
        }
        setTimeout(function(){
            container.innerHTML = '<div class="square"></div><div class="square"></div><div class="square"></div><br><div class="square extra"></div><div class="square extra"></div><div class="square extra"></div><br>'
            colorsetup(numsq);
            colorcheck();
        }, 5000)
    })
}
//Execution

    colorsetup(numsq);

    scoretell();
    
    setTimeout(function(){
        
        newset();
    
        mode();
    
        scoreset();
    
        colorcheck();

    }, 4300);
