var token = document.querySelector(".token");
console.log(token);

var degrees = 0;
degrees += 180000;
token.style.webkitTransform = "rotateY(" + degrees + "deg)";
token.style.MozTransform = "rotateY(" + degrees + "deg)";
token.style.msTransform = "rotateY(" + degrees + "deg)";
token.style.OTransform = "rotateY(" + degrees + "deg)";
token.style.transform = "rotateY(" + degrees + "deg)";
