// fetch("../assets/characters.json", {mode:"no-cors"})
//     .then((response) => response.json() )
//     .then((characterJson) => console.log(characterJson))
//     .catch((error) => console.error(error));


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

var characterDivs = document.getElementsByClassName("character");


// FETCH AND DISPLAY CARDS
for (var i = 0; i<10; i++){
    var char_i = allCharacters.findIndex(element => element.Id==characterIDs[i]);
    var character = allCharacters[char_i];
    characters.push(character);
    addCharacterToCard(character, i);
}

function addCharacterToCard(character, i){

    var front = document.createElement("div");
    front.setAttribute("class", "front");
    front.style.display = "block";

    var picture = document.createElement("img");
    picture.src = "../images/"+images[character.Name]+".png";
    picture.alt = character.Name+" Token";
    front.appendChild(picture);

    var name = document.createElement("h2");
    name.innerHTML = character.Name;
    front.appendChild(name);

    var culture = document.createElement("p");
    culture.innerHTML = character.Culture;
    front.appendChild(culture);

    var born = document.createElement("p");
    born.innerHTML = "Born " + character.Born;
    front.appendChild(born);

    var back = document.createElement("div");
    back.setAttribute("class", "back");
    back.style.display = "none";

    var titles = document.createElement("p");
    titles.setAttribute("class", "titles");
    titles.innerHTML = character.Titles.slice(0,3);
    back.appendChild(titles);

    var aliases = document.createElement("p");
    aliases.setAttribute("class", "aliases");
    aliases.innerHTML = character.Aliases.slice(0,3);
    back.appendChild(aliases);

    var allegiances = document.createElement("p");
    allegiances.setAttribute("class", "allegiances");
    allegiances.innerHTML = "Allegiances: ";
    var allegianceIDs = character.Allegiances;
    for (var j = 0; j < allegianceIDs.length; j++){
        var houseIndex = allHouses.findIndex(element => element.Id == allegianceIDs[j]);
        var houseName = allHouses[houseIndex].Name;
        allegiances.innerHTML += "<br />" + houseName;
    }
    back.appendChild(allegiances);


    characterDivs[i].appendChild(front);
    characterDivs[i].appendChild(back);

}

// CARD CLICK
var players = [];
var playerNames = [];
function characterPress(elem){

    if (players.length === 0){
        elem.style.border = "2px solid blue";
        players.push(elem);
        playerNames.push(elem.childNodes[0].childNodes[1].innerHTML);
    }
    else if (players.length  === 1){
        if (players.includes(elem)){
            elem.style.border = "none";
            players = [];
            playerNames = [];
        }
        else{
            elem.style.border = "2px solid blue";
            players.push(elem);
            playerNames.push(elem.childNodes[0].childNodes[1].innerHTML);
            document.getElementById("btn").disabled = false;
            for (var i = 0; i<10; i++){
                var player1Num = parseInt(players[0].getAttribute("number"))-1;
                var player2Num = parseInt(players[1].getAttribute("number"))-1;
                if( i !== player1Num && i!== player2Num ){
                    characterDivs[i].style.opacity = "70%";
                    characterDivs[i].style.cursor = "default";
                }
            }
        }
    }
    else if (players.length === 2){
        if (players.includes(elem)){
            elem.style.border = "none";
            document.getElementById("btn").disabled = true;
            for (var i = 0; i<10; i++){
                characterDivs[i].style.opacity = "100%";
                characterDivs[i].style.cursor = "pointer";
            }
            var player1Num = parseInt(players[0].getAttribute("number"));
            var player2Num = parseInt(players[1].getAttribute("number"));
            var thisPlayerNum = parseInt(elem.getAttribute("number"));
            if( player1Num === thisPlayerNum ){
                players.splice(0, 1);
                playerNames.splice(0, 1);
            }
            else if( player2Num === thisPlayerNum ){
                players.splice(1, 2);
                playerNames.splice(1, 2);
            }
        }
        else{

        }
    }
}


// HOVER
var front = document.getElementsByClassName("front");
var back = document.getElementsByClassName("back");
characterDivs[0].addEventListener("mouseenter", () => {
    front[0].style.display = "none";
    back[0].style.display = "block";
});
characterDivs[0].addEventListener("mouseleave", () => {
    front[0].style.display = "block";
    back[0].style.display = "none";
});
characterDivs[1].addEventListener("mouseenter", () => {
    front[1].style.display = "none";
    back[1].style.display = "block";
});
characterDivs[1].addEventListener("mouseleave", () => {
    front[1].style.display = "block";
    back[1].style.display = "none";
});
characterDivs[2].addEventListener("mouseenter", () => {
    front[2].style.display = "none";
    back[2].style.display = "block";
});
characterDivs[2].addEventListener("mouseleave", () => {
    front[2].style.display = "block";
    back[2].style.display = "none";
});
characterDivs[3].addEventListener("mouseenter", () => {
    front[3].style.display = "none";
    back[3].style.display = "block";
});
characterDivs[3].addEventListener("mouseleave", () => {
    front[3].style.display = "block";
    back[3].style.display = "none";
});
characterDivs[4].addEventListener("mouseenter", () => {
    front[4].style.display = "none";
    back[4].style.display = "block";
});
characterDivs[4].addEventListener("mouseleave", () => {
    front[4].style.display = "block";
    back[4].style.display = "none";
});
characterDivs[5].addEventListener("mouseenter", () => {
    front[5].style.display = "none";
    back[5].style.display = "block";
});
characterDivs[5].addEventListener("mouseleave", () => {
    front[5].style.display = "block";
    back[5].style.display = "none";
});
characterDivs[6].addEventListener("mouseenter", () => {
    front[6].style.display = "none";
    back[6].style.display = "block";
});
characterDivs[6].addEventListener("mouseleave", () => {
    front[6].style.display = "block";
    back[6].style.display = "none";
});
characterDivs[7].addEventListener("mouseenter", () => {
    front[7].style.display = "none";
    back[7].style.display = "block";
});
characterDivs[7].addEventListener("mouseleave", () => {
    front[7].style.display = "block";
    back[7].style.display = "none";
});
characterDivs[8].addEventListener("mouseenter", () => {
    front[8].style.display = "none";
    back[8].style.display = "block";
});
characterDivs[8].addEventListener("mouseleave", () => {
    front[8].style.display = "block";
    back[8].style.display = "none";
});
characterDivs[9].addEventListener("mouseenter", () => {
    front[9].style.display = "none";
    back[9].style.display = "block";
});
characterDivs[9].addEventListener("mouseleave", () => {
    front[9].style.display = "block";
    back[9].style.display = "none";
});


// PLAY BUTTON
var button = document.getElementById("btn");
button.addEventListener("click", play);
function play(){
    if ( playerNames.length === 2){
        var p1 = playerNames[0];
        var p2 = playerNames[1];
        
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
        // myStorage = window.localStorage;
        // localStorage.setItem("p1", p1);
        // localStorage.setItem("p2", p2);
        
        window.location.href="./game.html?p1="+p1+"&p2="+p2;
    }


    
}
