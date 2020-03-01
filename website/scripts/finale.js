
var urlParams = new URLSearchParams(window.location.search);
var winner = urlParams.get("winner");

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

var deg = 200000;
token.style.transform = "rotateY(" + deg + "deg)";

