
var urlParams = new URLSearchParams(window.location.search);
var winner = urlParams.get('winner');

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

var degrees = 0;
degrees += 180000;
token.style.webkitTransform = "rotateY(" + degrees + "deg)";
token.style.MozTransform = "rotateY(" + degrees + "deg)";
token.style.msTransform = "rotateY(" + degrees + "deg)";
token.style.OTransform = "rotateY(" + degrees + "deg)";
token.style.transform = "rotateY(" + degrees + "deg)";

