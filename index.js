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
    var loc = [];
    for (var i = 0; i < albums.length; i++) {
        loc[i] = `div.album${i + 1} > div`
    }
    // console.log(loc);
    for (var i = 0; i < albums.length; i++) {
        const query = {
            q: `${searchTerm} ${albums[i]}`,
            part: 'snippet',
            key: API_KEY,
            viewCount: "viewCount"
        }
        // console.log(query.q);
        var classname = loc[i];
        var searchTerm = query.q;
        // console.log(loc[i] + " " + searchTerm);
        var ytResult = [];
        $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
    } 
}





//Last.fm Album info//
function getAlbumInfo(albumName, searchTerm) {
    // console.log(albumName);
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
            // console.log(result.album.wiki.content);
            var test = "test " + i;
            var albumtag = ".album" + i;
        })
        // getWikiInfo(albumName, searchTerm);
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
                $(".albumsection").append(`
                <div class="album${i + 1}"><h2>${result.topalbums.album[i].name}</h2><img src="${result.topalbums.album[i].image[3]["#text"]}" alt="albumcover">
                <div class="yt-results">
                <h3 class="ytheading">Listen on YouTube</h3>
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
    // console.log(albums);
    // getAlbumInfo(albums, searchTerm);
    // getWikiInfo(albums, searchTerm);
    // console.log(albums);
    });
    
}

//Artist Info info function//
function getArtistInfo(searchTerm) {
    // console.log(searchTerm);
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
}

function hideSections() {
    $("body > main > div.js-search-results > div.artistinfo").on("click", function(e) {
        e.preventDefault();
        $("div.artistcontent").slideToggle();
    });
    $("div.albums > h2").on("click", function(e) {
        e.preventDefault();
        $(".albumsection").slideToggle();
    })
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
        // $(".searchresult").remove();
        var name = $(".userinput").val();
        getArtistInfo(name);
        getApiData(name);
        // getYouTube(name);
        // getAlbumInfo(albums);
    })
}

$(watchSubmit);




