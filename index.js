/*
Application name	Last.fm Music Rating Service
API key	48a68fa743a6e709380166a2342c0c27
Shared secret	23a2a34d9f04f79a30f4c01246f2e68f
Registered to	bquietndrive87
*/

var key = "48a68fa743a6e709380166a2342c0c27";
var url = "https://ws.audioscrobbler.com/2.0/";
var albums = [];

function getAlbumInfo(albumName) {
    console.log(albumName);
}



function getApiData(searchTerm) {
    const settings = {
        artist: `${searchTerm}`,
        api_key: key,
        method: "artist.gettopalbums",
        format: "json",
        autocorrect: 1
    };
    $.getJSON(url, settings, function(result){
        $.each(result, function(i, field){
            for (var i = 0; i < 3; i++) {
                $(".js-search-results").append(`<div class="searchresult"><h2>${result.topalbums.album[i].name}</h2><img src="${result.topalbums.album[i].image[3]["#text"]}" alt="albumcover"></div>`);
            }
        });
        for (var i = 0; i < 3; i++) {
            let albumName = `${result.topalbums.album[i].name}`;
            albums.push(albumName);
        }
    });
}

function watchSubmit() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        $(".searchresult").remove();
        var name = $(".userinput").val();
        getApiData(name);
        getAlbumInfo(albums);
    })
}

$(watchSubmit);
