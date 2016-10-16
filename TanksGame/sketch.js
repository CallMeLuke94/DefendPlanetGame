var t; //tank
var gravity = 10;
var asts = [];
var shots = [];
var ready = true; //tank shot cooldown
var time = 0; //cooldown timer
var cooldown = 24; //rate of fire
var menu = true;
var option = "start";
var lose = true;
var impacts = 0;
var totalAsts = 6;
var maxImpacts = 4;
var hits = 0;
var level = 1;

function setup() {
    var myCanvas = createCanvas(900, 600);
    myCanvas.parent('sketch');
    background(0, 0, 255);
    noStroke();
    fill(0, 255, 0);
    rect(0, height * 0.9, width, height * 0.1); //ground

    t = new tank(width / 2 - 30, height * 0.6);
} //close setup

function draw() {
    background(0, 0, 255);
    noStroke();
    fill(0, 255, 0);
    rect(0, height * 0.9, width, height * 0.1); //ground

    if (menu == true) {
        activeTank(t);
        for (var x in shots) {
            shots[x].move();
            shots[x].display();
        }

        textSize(50);
        textAlign(CENTER);
        if (option == "start") {
            strokeWeight(6);
            strokeCap(SQUARE);
            stroke(0);
            noFill();
            rect(width / 3, height / 3, width / 3, 100);
            strokeWeight(3);
            fill(0);
            text("Click to start", width / 2, height / 3 + 65);
            textSize(80);
            fill(0);
            stroke(0);
            text("Defend The Planet", width / 2, height / 3 - 65);
            textSize(24);
            strokeWeight(2);
            text("Destroy the astroids before too many hit the planet! \n Make sure not to get hit yourself!", width / 2, height / 2 + 35);
            text("Move: [A] [D]    Aim: [J] [L]    Shoot: [SPACE]", width / 2, height / 2 + 100);
        } else if (option == "restart") {
            activeAsts(asts, false);
            strokeWeight(6);
            strokeCap(SQUARE);
            stroke(0);
            noFill();
            rect(width / 3, height / 3, width / 3, 100);
            strokeWeight(3);
            fill(0);
            text("Play again?", width / 2, height / 3 + 65);
            textSize(80);
            fill(255, 0, 0);
            stroke(255, 0, 0);
            text("You Lose!", width / 2, height / 3 - 65);
            showData();
        } else if (option == "win") {
            strokeWeight(6);
            strokeCap(SQUARE);
            stroke(0);
            noFill();
            rect(width / 3, height / 3, width / 3, 100);
            strokeWeight(3);
            fill(0);
            text("Next level", width / 2, height / 3 + 65);
            textSize(80);
            fill(0, 255, 0);
            stroke(0, 255, 0);
            text("Level Complete", width / 2, height / 3 - 65);
            showData();
        }

        if (mouseIsPressed && mouseX > width / 3 && mouseX < width / 3 * 2 && mouseY > height / 3 && mouseY < height / 3 + 100) {
            if (lose == true) {
                restartGame();
            } else if (lose == false) {
                nextLevel();
            }
        }

    } else { //gameplay is live
        activeAsts(asts, true);
        activeTank(t);
        winGame();
        loseGame(t);

        for (var a in asts) {
            t.death(asts[a]);
            if (lose == true) {
                asts[a].v = 0;
                menu = true;
                option = "restart";
            }
        }

        for (var x in shots) {
            shots[x].move();
            shots[x].display();
            for (var y in asts) {
                shots[x].destroy(asts[y]);
            }
        }

        showData();
    } //close else block
} //close draw

function activeTank(t) { //display, move and shoot tank
    t.display();
    t.fall();
    if (keyIsPressed === true) {
        t.pivot();
        t.move();
        if (ready === true) {
            t.shoot();
            ready = false;
        }
    }

    if (ready == false) {
        time += 1;
        if (time > cooldown) {
            ready = true;
            time = 0;
        }
    }
} //close function

function activeAsts(asts, move) {
    for (var b in asts) {
        asts[b].display();
        if (move == true) {
            asts[b].move();
        } else {
            asts[b].v = 0;
        }
    }
} //close function

function resetTank(t) {
    shots = [];
    t.mobile = true;
    t.a = 90;
    t.x = width / 2 - 30;
    t.y = height * 0.6;
}

function resetAstroids(asts) {
    for (var a = 0; a < totalAsts; a++) {
        asts.push(new astroid(random(0, width), random(0, -height * totalAsts / 10), random(0, width), random(1, 2), random(30, 50)));
        //asts.push(new astroid(width / 2, height / 2, width / 2, 1.5, 50)); //test case
    }
}

function astsRemaining(asts) {
    return asts.length - impacts - hits;
}

function showData() {
    textSize(28);
    strokeWeight(2);
    stroke(0);
    fill(0);
    textAlign(LEFT);
    text("Impacts: " + impacts + "/" + maxImpacts, 10, height - 12);
    textAlign(CENTER);
    text("Asteroids Remaining: " + astsRemaining(asts), width / 2, height - 12);
    textAlign(RIGHT);
    text("Level: " + level, width - 10, height - 12);
}

function winGame() {
    if (astsRemaining(asts) === 0) {
        menu = true;
        option = "win";
    }
}

function loseGame(t) {
    if (impacts == maxImpacts) {
        lose = true;
        t.mobile = false;
    }
}

function restartGame() {
    menu = false;
    lose = false;
    asts = [];
    totalAsts = 6;
    cooldown = 26;
    level = 1;
    impacts = 0;
    hits = 0;
    resetTank(t);
    resetAstroids(asts);
}

function nextLevel() {
    level += 1;
    totalAsts += 1;
    menu = false;
    lose = false;
    asts = [];
    impacts = 0;
    if (level % 5 == 0) {
        maxImpacts += 1;
    }
    if (cooldown > 0) {
        cooldown -= 2;
    }
    hits = 0;
    resetTank(t);
    resetAstroids(asts);
}
