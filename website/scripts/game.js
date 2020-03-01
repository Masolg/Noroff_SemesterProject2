
// VARIABLES

var images = {
    "Jon Snow" : "wolf_dark",
    "Daenerys Targaryen": "dragon",
    "Arya Stark": "wolf_light",
    "Brienne of Tarth": "deer",
    "Jaime Lannister": "lion_light",
    "Theon Greyjoy": "octo",
    "Tyrion Lannister": "lion_orange",
    "Sandor Clegane": "lion_brown",
    "Drogo": "drogo",
    "Tormund": "mammoth"
}

coordinates = [
    [1,0],
    [1,1],
    [1,2],
    [1,3],
    [0,3],
    [0,4],
    [0,5],
    [1,5],
    [2,5],
    [3,5],
    [4,5],
    [4,4],
    [3,4],
    [2,4],
    [2,3],
    [3,3],
    [3,2],
    [3,1],
    [4,1],
    [4,0],
    [5,0],
    [6,0],
    [7,0],
    [8,0],
    [8,1],
    [9,1],
    [9,2],
    [10,2],
    [10,3],
    [10,4],
    [9, 4],
    [9, 5]
];

traps_pos = [4, 9, 14, 20, 24, 29];
traps_text = {
    4:"Turn around before Joffrey puts your head on a spike.",
    9:"Cersei Lannister is standing in your way. Turn back, you don't want to meet her.",
    14:"Daenerys' Dragons Ahead! Turn back three steps.",
    20:"The Martell's intend to poison you. Turn back!",
    24:"The Mountain is in a bad mood. Turn around before he smashes your skull.",
    29:"It's suddenly freezing outside. Turn back to avoid the White Walkers."

}

const lineLen = 130;

//// FUNCTIONS FOR CANVAS DRAWING ////

// This function takes integer coordinates and maps them to canvas coordinates
function toCanvasCoordinates(x0, y0){
    var startX = 2;
    var startY = 2;
    var x = startX + lineLen*x0;
    var y = startY + lineLen*y0;
    return [x, y];
}

// This function creates one tile at a position with specified text
function drawTile(x0, y0, text){
    [x, y] = toCanvasCoordinates(x0, y0);
    ctx.beginPath();
    ctx.rect(x, y, lineLen, lineLen);
    ctx.lineWidth = 1;
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center"; 
    ctx.fillText(text, x + 0.5*lineLen, y + 0.55*lineLen); 
}

// This function draws/redraws the entire board. Used every time something changes.
function drawBoard(){
    drawTile(1, 0, "Start");
    for (var i = 1; i<coordinates.length; i++){
        [x_coord, y_coord] = coordinates[i];
        drawTile(x_coord, y_coord, i)
    }
    drawTile(9, 5, "Finish");
    
    setTimeout(()=>{    // Because of load times
        const tree = document.getElementById("tree");
        ctx.drawImage(tree, 500, 150, 750, 600);
        
        const orange_leaves = document.getElementById("orange_leaves");
        const red_leaves = document.getElementById("red_leaves");
        const yellow_leaves = document.getElementById("yellow_leaves");
        ctx.drawImage(orange_leaves, 900, 680, 60, 60);
        ctx.drawImage(red_leaves, 900, 680, 150, 80);
        ctx.drawImage(yellow_leaves, 850, 720, 80, 50);
        
        ctx.drawImage(yellow_leaves, 750, 730, 80, 40);
        ctx.drawImage(red_leaves, 750, 680, 150, 80);
        ctx.drawImage(orange_leaves, 750, 680, 60, 60);
    },150)

    drawTokens()
    drawTraps();
}

// This function draws the traps from the traps arrays on the board.
function drawTraps(){
    for (var i = 0; i<traps_pos.length; i++){
        
        [x0, y0] = coordinates[ traps_pos[i] ];
        [x, y] = toCanvasCoordinates(x0, y0);

        ctx.beginPath();
        ctx.rect(x, y, lineLen, lineLen);
        ctx.lineWidth = 1;
        ctx.fillStyle = "#eb732a";
        ctx.strokeStyle = "black";
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.textAlign = "center"; 
        ctx.fillText(traps_pos[i], x + 0.5*lineLen, y + 0.55*lineLen); 
    }
}

// This function draws the players' tokens. 
// It draws different whether there are one or two tokens in one tile.
function drawTokens(){
    [x1_, y1_] = coordinates[p1_pos];
    [x2_, y2_] = coordinates[p2_pos];

    [x1, y1] = toCanvasCoordinates(x1_, y1_);
    [x2, y2] = toCanvasCoordinates(x2_, y2_);

    var x1_real, y1_real, x2_real, y2_real;
    if (p1_pos === p2_pos){
        x1_real = x1+lineLen*0.03;
        y1_real = y1+lineLen*0.03;

        x2_real = x2+lineLen*0.37;
        y2_real = y2+lineLen*0.36;     
    }   
    else{
        x1_real = x1+0.2*lineLen;
        y1_real = y1+0.2*lineLen;

        x2_real = x2+0.2*lineLen;
        y2_real = y2+0.2*lineLen;        
    }
    
    setTimeout(()=>{
        const p1_img = document.getElementById(p1);
        const p2_img = document.getElementById(p2);
        
        if(playersTurn === 1){
            ctx.drawImage(p2_img, x2_real, y2_real, 0.6*lineLen, 0.6*lineLen);
            ctx.drawImage(p1_img, x1_real, y1_real, 0.6*lineLen, 0.6*lineLen);
        }
        else if(playersTurn === 2){
            ctx.drawImage(p1_img, x1_real, y1_real, 0.6*lineLen, 0.6*lineLen);
            ctx.drawImage(p2_img, x2_real, y2_real, 0.6*lineLen, 0.6*lineLen);
        }
    },150)
}


// MAIN PART OF THE CODE

var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");


// Found at https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
const urlParams = new URLSearchParams(window.location.search);
const p1 = urlParams.get("p1");
const p2 = urlParams.get("p2");

// Both players start at location 0
var p1_pos = 0;
var p2_pos = 0;

// Player 1 begins
var playersTurn = 1;

// To use images in canvas, we need to add the images to the HTML 
//  first, and use display none to hide them.
const p1_img = document.createElement("img");
p1_img.src = "../images/"+images[p1]+".png";
p1_img.alt = "Player 1 image";
p1_img.style.display = "none";
p1_img.id = p1;
document.body.appendChild(p1_img);

const p2_img = document.createElement("img");
p2_img.src = "../images/"+images[p2]+".png";
p2_img.alt = "Player 2 image";
p2_img.style.display = "none";
p2_img.id = p2;
document.body.appendChild(p2_img);

// Initializes the board.
drawBoard();

myStorage = window.localStorage;

var diceImg = document.querySelector("#dice");
var diceText = document.querySelector(".diceText");
diceText.innerHTML = p1+"'s <br /> turn"
var trapText = document.querySelector(".trapText");

var diceRoll;

// The roll function executes every time the "Roll dice" button is pressed.
var rollBtn = document.querySelector("#roll");
rollBtn.addEventListener("click", roll);
function roll(){
    diceRoll = Math.floor(Math.random() * 6) + 1;
    diceImg.src = "../images/"+diceRoll+".png";

    // Code for player 1
    if(playersTurn === 1){
        p1_pos += diceRoll;

        if (p1_pos>=31){                    // If you land on "Finish"
            p1Finish();
        }
        else if(traps_pos.includes(p1_pos)){ // If you land on the traps
            p1Trap();
        }
        else{                               // If you land elsewhere
            p1Else();
        }
    }
    // Code for player 2.
    else{
        p2_pos += diceRoll;

        if(p2_pos>=31){                     // If you land on "Finish"
            p2Finish();
        }
        else if(traps_pos.includes(p2_pos)){ // If you land on the traps
            p2Trap();
        }
        else{                               // If you land elsewhere
            p2Else();
        }
    }

    drawBoard();
}



//// HELPER FUNCTIONS FOR ROLL FUNCTION ////


function p1Finish(){
    diceText.innerHTML = p1 + " <br /> You won!"
    p1_pos = 31;
    localStorage.setItem("winner", p1);
    setTimeout(() => {window.location.href="./finale.html";}, 2000);
}
function p2Finish(){
    diceText.innerHTML = p2 + " <br /> You won!"
    p2_pos = 31;
    localStorage.setItem("winner", p2);
    setTimeout(() => {window.location.href="./finale.html";}, 2000);
}

function p1Trap(){
    trapText.innerText = traps_text[p1_pos];
    rollBtn.disabled = true;
    setTimeout(() => {
        playersTurn = diceRoll===6 ? 1 : 2;
        if (diceRoll !== 6)  diceText.innerHTML = p2+"'s <br /> turn"

        rollBtn.disabled = false;
        trapText.innerText = "";
        p1_pos -= 3;
        drawBoard();
    }, 4500);
}

function p2Trap(){
    trapText.innerText = traps_text[p2_pos];
    rollBtn.disabled = true;
    setTimeout(() => {
        playersTurn = diceRoll===6 ? 2 : 1;
        if (diceRoll !== 6)  diceText.innerHTML = p1 + "'s <br /> turn"
        
        rollBtn.disabled = false;
        p2_pos -= 3;
        trapText.innerText = "";
        drawBoard();
    }, 4500);
}


function p1Else(){
    playersTurn = diceRoll===6 ? 1 : 2;
    if (diceRoll !== 6)  diceText.innerHTML = p2+"'s <br /> turn"
}

function p2Else(){
    playersTurn = diceRoll===6 ? 2 : 1;
    if (diceRoll !== 6)  diceText.innerHTML = p1+"'s <br /> turn"
}
