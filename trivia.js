var category = 'music';
var trivia = httpGet("https://the-trivia-api.com/api/questions?limit=5");

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

console.log(trivia);