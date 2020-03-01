
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

// function coordinates(x0, y0){
//     var startX = 100;
//     var startY = 100;
//     // var x = startX + Math.floor(y0/2)*lineLen*x0;
//     // var y = startY + 1.03*Math.sqrt(3)*y0*lineLen;
//     var x = startX + Math.floor(1+(y0/2))*lineLen*x0;
//     var y = startY + 1.03*Math.sqrt(3)*y0*lineLen*Math.floor(x0/2);
//     return [x, y];
// }


// var lineLen = 100;
// function createHex(x0, y0){
//     [x, y] = coordinates(x0, y0);
//     ctx.moveTo(x, y);
//     ctx.lineTo(x+lineLen, y);
//     ctx.lineTo(x+lineLen+lineLen*0.5, y+lineLen*0.87);
//     ctx.lineTo(x+lineLen, y+lineLen*0.87+lineLen*0.87);
//     ctx.lineTo(x, y+lineLen*0.87+lineLen*0.87);
//     ctx.lineTo(x-lineLen*0.5, y+lineLen*0.87);
//     ctx.lineTo(x+1, y-2);
//     ctx.lineWidth = 9;
//     ctx.fillStyle = "white";
//     ctx.stroke(); 
//     ctx.fill();
// }

// // const image = document.getElementById('source');
// // ctx.drawImage(image, 65, 100, 170, 170);

// createHex(0, 0);
// createHex(0, 1);
// createHex(1, 1);
// createHex(2, 1);
// createHex(0, 2);


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

var lineLen = 130;
function toCanvasCoordinates(x0, y0){
    var startX = 0;
    var startY = 0;
    var x = startX + lineLen*x0;
    var y = startY + lineLen*y0;
    return [x, y];
}
function createRect(x0, y0, text){
    [x, y] = toCanvasCoordinates(x0, y0);
    ctx.beginPath();
    ctx.rect(x, y, lineLen, lineLen);
    ctx.lineWidth = 4;
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
        createRect(x_coord, y_coord, i+1)
    }
    createRect(9, 5, "Finish");
    
    setTimeout(()=>{    // Because of load times
        const tree = document.getElementById('tree');
        ctx.drawImage(tree, 500, 150, 750, 600);
        
        const orange_leaves = document.getElementById('orange_leaves');
        const red_leaves = document.getElementById('red_leaves');
        const yellow_leaves = document.getElementById('yellow_leaves');
        ctx.drawImage(orange_leaves, 900, 680, 60, 80);
        ctx.drawImage(red_leaves, 900, 680, 150, 100);
        ctx.drawImage(yellow_leaves, 850, 720, 80, 60);
        
        ctx.drawImage(yellow_leaves, 750, 730, 80, 60);
        ctx.drawImage(red_leaves, 750, 680, 150, 100);
        ctx.drawImage(orange_leaves, 750, 680, 60, 80);
    },30)

    drawTokens()

}

function drawTokens(){


    [x1_, y1_] = coordinates[p1_pos];
    [x2_, y2_] = coordinates[p2_pos];


    [x1, y1] = toCanvasCoordinates(x1_, y1_);
    [x2, y2] = toCanvasCoordinates(x2_, y2_);

    if (p1_pos === p2_pos){
        console.log("here");
        setTimeout(()=>{
            const p1_img = document.getElementById(p1);
            ctx.drawImage(p1_img, x1+lineLen*0.03, y1+lineLen*0.03, 0.6*lineLen, 0.6*lineLen);
            
            const p2_img = document.getElementById(p2);
            ctx.drawImage(p2_img, x2+lineLen*0.37, y2+lineLen*0.36, 0.6*lineLen, 0.6*lineLen);
        },50)
    }   
    else{
        setTimeout(()=>{
            const p1_img = document.getElementById(p1);
            ctx.drawImage(p1_img, x1+0.2*lineLen, y1+0.2*lineLen, 0.6*lineLen, 0.6*lineLen);
            
            const p2_img = document.getElementById(p2);
            ctx.drawImage(p2_img, x2+0.2*lineLen, y2+0.2*lineLen, 0.6*lineLen, 0.6*lineLen);
        },50)

    }

    // if(player === 1){
    //     setTimeout(()=>{
    //         const image = document.getElementById('deer');
    //         ctx.drawImage(image, x+lineLen*0.03, y+lineLen*0.03, 0.6*lineLen, 0.6*lineLen);
    //     },30)
    // }else{
    //     setTimeout(()=>{
    //         const image = document.getElementById('dragon');
    //         ctx.drawImage(image, x+lineLen*0.37, y+lineLen*0.36, 0.6*lineLen, 0.6*lineLen);
    //     },30)
    // }
}






// Found at https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
const urlParams = new URLSearchParams(window.location.search);
const p1 = urlParams.get('p1');
const p2 = urlParams.get('p2');
// console.log(p1);
// console.log(p2);

var p1_local = localStorage.getItem('p1');
var p2_local = localStorage.getItem('p2');
// console.log(p1_local);
// console.log(p2_local);
localStorage.clear();


var p1_pos = 0;
var p2_pos = 0;

var playersTurn = 1;

var body = document.body;

var p1_img = document.createElement("img");
p1_img.src = '../images/'+images[p1]+".png";
p1_img.alt = "Player 1 image";
p1_img.id = p1;
body.appendChild(p1_img);

var p2_img = document.createElement("img");
p2_img.src = '../images/'+images[p2]+".png";
p2_img.alt = "Player 2 image";
p2_img.id = p2;
body.appendChild(p2_img);


drawBoard();








