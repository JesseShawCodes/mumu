/*
Application name	Last.fm Music Rating Service
API key	48a68fa743a6e709380166a2342c0c27
Shared secret	23a2a34d9f04f79a30f4c01246f2e68f
Registered to	bquietndrive87
*/

var key = "48a68fa743a6e709380166a2342c0c27";
var url = "http://ws.audioscrobbler.com/2.0/";

function getApiData(searchTerm) {
    console.log(`Function has been executed. You have searched for ${searchTerm}`);
    var searchUrl = `${url}?method=artist.gettopalbums&artist=${searchTerm}&api_key=${key}&format=json`
    const settings = {
        artist: `${searchTerm}`,
        api_key: key,
        method: "artist.gettopalbums",
        format: "json"
    }
    $.getJSON(url, settings, function(result){
        $.each(result, function(i, field){
            for (var i = 0; i < 3; i++) {
                $(".js-search-results").append(`<h1>${i + 1}. ${result.topalbums.album[i].name}</h1>`);
                $(".js-search-results").append(`<img src="${result.topalbums.album[i].image[3]["#text"]}">`);
            }
        })
    });
}

function watchSubmit() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        var name = $(".userinput").val();
        console.log(name);
        getApiData(name);
    })    
}

$(watchSubmit);
