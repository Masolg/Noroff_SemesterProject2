
// VARIABLES
var characterIDs = [583, 1303, 148, 216, 529, 1022, 1052, 955, 1346, 2024];
var characterNames = ["Jon Snow",
                    "Daenerys Targaryen",
                    "Arya Stark",
                    "Brienne of Tarth",
                    "Jaime Lannister",
                    "Theon Greyjoy",
                    "Tyrion Lannister",
                    "Sandor Clegane",
                    "Drogo",
                    "Tormund"]

var characterDivs = document.getElementsByClassName("character");
var characters = [];

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


var gameCanvas = document.getElementById("gameCanvas");
var ctx = gameCanvas.getContext("2d");



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

var lineLen = 130;
function toCanvasCoordinates(x0, y0){
    var startX = 2;
    var startY = 2;
    var x = startX + lineLen*x0;
    var y = startY + lineLen*y0;
    return [x, y];
}
function createRect(x0, y0, text){
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
    ctx.fillText(text, x+0.5*lineLen, y+0.55*lineLen); 
}

function drawBoard(){

    
    createRect(1, 0, "Start");
    for (var i = 1; i<coordinates.length; i++){
        [x_coord, y_coord] = coordinates[i];
        createRect(x_coord, y_coord, i)
    }
    createRect(9, 5, "Finish");
    
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
        ctx.fillText(traps_pos[i], x+0.5*lineLen, y+0.55*lineLen); 
    }
}

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






// Found at https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
const urlParams = new URLSearchParams(window.location.search);
const p1 = urlParams.get("p1");
const p2 = urlParams.get("p2");


var p1_pos = 0;
var p2_pos = 0;

var playersTurn = 1;


var p1_img = document.createElement("img");
p1_img.src = "../images/"+images[p1]+".png";
p1_img.alt = "Player 1 image";
p1_img.style.display = "none";
p1_img.id = p1;
document.body.appendChild(p1_img);

var p2_img = document.createElement("img");
p2_img.src = "../images/"+images[p2]+".png";
p2_img.alt = "Player 2 image";
p2_img.style.display = "none";
p2_img.id = p2;
document.body.appendChild(p2_img);


drawBoard();

var diceImg = document.querySelector("#dice");
var diceText = document.querySelector(".diceText");
diceText.innerHTML = p1+"'s <br /> turn"
var trapText = document.querySelector(".trapText");


var rollBtn = document.querySelector("#roll");
rollBtn.addEventListener("click", roll);
function roll(){
    var diceRoll = Math.floor(Math.random() * 6) + 1;
    diceImg.src = "../images/"+diceRoll+".png";

    if(playersTurn === 1){
        p1_pos += diceRoll;

        if (p1_pos>=31){
            diceText.innerHTML = p1+" <br /> You won!"
            p1_pos = 31;
            myStorage = window.localStorage;
            localStorage.setItem("winner", p1);
            setTimeout(() => {window.location.href="./finale.html";}, 2000);
        }
        else if(traps_pos.includes(p1_pos)){
            trapText.innerText = traps_text[p1_pos];
            rollBtn.disabled = true;
            if (diceRoll===6){
                setTimeout(() => {
                    rollBtn.disabled = false;
                    playersTurn = 1;
                    p1_pos -= 3;
                    trapText.innerText = "";
                    drawBoard();
                }, 4500);
            }
            else{
                setTimeout(() => {
                    rollBtn.disabled = false;
                    playersTurn = 2;
                    diceText.innerHTML = p2+"'s <br /> turn"
                    p1_pos -= 3;
                    trapText.innerText = "";
                    drawBoard();
                }, 4500);
            }
        }
        else{
            
            if(diceRoll===6){
                playersTurn = 1;
            }
            else{
                diceText.innerHTML = p2+"'s <br /> turn"
                playersTurn = 2;
            }
        }
    }
    else{
        p2_pos += diceRoll;

        if(p2_pos>=31){
            diceText.innerHTML = p2+" <br /> You won!"
            p2_pos = 31;
            myStorage = window.localStorage;
            localStorage.setItem("winner", p2);
            setTimeout(() => {window.location.href="./finale.html";}, 2000);
        }
        else if(traps_pos.includes(p2_pos)){
            trapText.innerText = traps_text[p2_pos];
            rollBtn.disabled = true;
            if (diceRoll===6){
                setTimeout(() => {
                    rollBtn.disabled = false;
                    p2_pos -= 3;
                    playersTurn = 2;
                    trapText.innerText = "";
                    drawBoard();
                }, 4500);
            }
            else{
                setTimeout(() => {
                    rollBtn.disabled = false;
                    p2_pos -= 3;
                    playersTurn = 1;
                    trapText.innerText = "";
                    diceText.innerHTML = p1+"'s <br /> turn"
                    drawBoard();
                }, 4500);
            }
        }
        else{
            if (diceRoll===6){
                playersTurn = 2;
            }
            else{
                playersTurn = 1;
                diceText.innerHTML = p1+"'s <br /> turn"
            }
        }
    }
    drawBoard();

    
}







