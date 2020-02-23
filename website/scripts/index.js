// fetch('../assets/characters.json', {mode:'no-cors'})
//     .then((response) => response.json() )
//     .then((characterJson) => console.log(characterJson))
//     .catch((error) => console.error(error));

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

for (var i = 0; i<10; i++){
    var char_i = allCharacters.findIndex(element => element.Id==characterIDs[i]);
    var character = allCharacters[char_i];
    characters.push(character);
    addCharacterToCard(character, i);
}
console.log(characters);



function addCharacterToCard(character, i){
    var name = document.createElement("h2");
    name.innerHTML = character.Name;

    var culture = document.createElement("p");
    culture.innerHTML = character.Culture;

    var born = document.createElement("p");
    born.innerHTML = "Born " + character.Born;

    var titles = document.createElement("p");
    titles.innerHTML = character.Titles;

    var aliases = document.createElement("p");
    aliases.innerHTML = character.Aliases;

    characterDivs[i].appendChild(name);
    characterDivs[i].appendChild(culture);
    characterDivs[i].appendChild(born);
    characterDivs[i].appendChild(titles);
    characterDivs[i].appendChild(aliases);
}
