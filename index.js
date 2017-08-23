/*
Application name	Last.fm Music Rating Service
API key	48a68fa743a6e709380166a2342c0c27
Shared secret	23a2a34d9f04f79a30f4c01246f2e68f
Registered to	bquietndrive87
*/

var key = "48a68fa743a6e709380166a2342c0c27";
var url = "https://ws.audioscrobbler.com/2.0/";
// var albums = [];


//Youtube Search API
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = "AIzaSyB5wDWKKvdRnOYBrt1dLh7U1vOKKnvsgo4";

function getYouTube(searchTerm, albums, callback) {
    const query = {
        q: `${searchTerm} ${albums[0]}`,
        part: 'snippet',
        key: API_KEY
    }
    $.getJSON(YOUTUBE_SEARCH_URL, query, function(result) {
            $(`.album1 .yt-results0`).append().html(`
            <div class="album1results">
            <div class="ytlabel"><h3>Listen to album on YouTube</h3></div>
            <h4>${result.items[0].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[0].id.videoId}' target="_blank"><img src='${result.items[0].snippet.thumbnails.high.url}'></a></div>
            <h4>${result.items[1].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[1].id.videoId}' target="_blank"><img src='${result.items[1].snippet.thumbnails.high.url}'></a></div>
            <h4>${result.items[2].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[2].id.videoId}' target="_blank"><img src='${result.items[2].snippet.thumbnails.high.url}'></a></div>
            <h4>${result.items[3].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[3].id.videoId}' target="_blank"><img src='${result.items[3].snippet.thumbnails.high.url}'></a></div>
            <h4>${result.items[4].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[4].id.videoId}' target="_blank"><img src='${result.items[4].snippet.thumbnails.high.url}'></a></div>
            </div>`);
        });
    $(".album1 .ytlabel").on("click", function(e) {
        e.preventDefault();
        $(".yt-results0").slideToggle();
    });
}

//Last.fm Album info//
function getAlbumInfo(albumName, searchTerm) {
    const settings = {
        artist: `${searchTerm}`,
        album: albumName,
        api_key: key,
        method: "album.getInfo",
        format: "json",
        autocorrect: 1
    };
    for (var i = 0; i < 3; i++) {
        settings.album = albumName[i];
        $.getJSON(url, settings, function(result) {
            var test = "test " + i;
            var albumtag = ".album" + i;
        })
    }
};


function getApiData(searchTerm) {
    var albums = [];
    const settings = {
        artist: `${searchTerm}`,
        api_key: key,
        method: "artist.gettopalbums",
        format: "json",
        autocorrect: 1
    };
    $(".albums").html(`<h2 class="albumheader">Albums</h2><div class="albumsection"></div>`);
    $.getJSON(url, settings, function(result){
        $.each(result, function(i, field){
            for (var i = 0; i < 3; i++) {
                $(".albumsection").append(
                `
                <div class="album${i + 1}"><h2>${result.topalbums.album[i].name}</h2><img src="${result.topalbums.album[i].image[3]["#text"]}" alt="albumcover">
                <div class="yt-results0">
                <h3 class="ytheading"></h3>
                </div>
                </div>
                `);
            }
        });
        for (var i = 0; i < 3; i++) {
            let albumName = `${result.topalbums.album[i].name}`;
            albums.push(albumName);
        }
    getYouTube(searchTerm, albums);
    });
    $(".albumheader").on("click", function(e) {
        e.preventDefault();
        $(".albumsection").slideToggle();
    });
}

//Artist Info info function//
function getArtistInfo(searchTerm) {
    const settings = {
        artist: `${searchTerm}`,
        api_key: key,
        method: "artist.getInfo",
        autocorrect: 1,
        format: "json",
    }
    $.getJSON(url, settings, function(result){
        var x = result.artist.bio.content;
        if (x.length > 1000) x = x.substring(0, 1000);
        $(".artistinfo").html(`<div class="artistinfoswitch"><h2>Artist Bio</h2></div>      <div class="artistcontent"><img src="${result.artist.image[2]["#text"]}"><p>${x}</p></div>`);
    })
    $(hideSections);
    $("div.artistinfo").on("click", function(e) {
        e.preventDefault();
        $("div.artistcontent").slideToggle();
    });
}

function hideSections() {

}

function watchSubmit() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        $(".artistinfo").remove();
        $(".js-search-results").append(`<div class="artistinfo"></div>`)
        $("footer").removeClass("hidden");
        for (var i = 0; i < 3; i++) {
            $(`.album${i+1}`).remove();
        }
        var name = $(".userinput").val();
        getArtistInfo(name);
        getApiData(name);
    })
}

$(watchSubmit);




