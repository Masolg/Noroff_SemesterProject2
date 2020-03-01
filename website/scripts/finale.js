
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
// Using local storage to get the winner.
var winner = localStorage.getItem("winner");
// localStorage.clear();    // Uncomment when not testing

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

var token = document.querySelector(".token");

token.childNodes[1].src = "../images/"+images[winner]+".png";
token.childNodes[1].alt = images[winner];

token.style.transform = "rotateY(200000deg)";

