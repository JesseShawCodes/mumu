/*
Application name	Last.fm Music Rating Service
API key	48a68fa743a6e709380166a2342c0c27
Shared secret	23a2a34d9f04f79a30f4c01246f2e68f
Registered to	bquietndrive87
*/

var key = "48a68fa743a6e709380166a2342c0c27";
var url = "https://ws.audioscrobbler.com/2.0/";


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
            $(`.album1 .yt-results0`).append().html(
            `
            <div class="ytlabel"><h3>Listen to album on YouTube<span class="arrow-right"></span></h3></div>
            <div class="searchresults">
            <h4>${result.items[0].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[0].id.videoId}' target="_blank"><img src='${result.items[0].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[1].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[1].id.videoId}' target="_blank"><img src='${result.items[1].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[2].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[2].id.videoId}' target="_blank"><img src='${result.items[2].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[3].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[3].id.videoId}' target="_blank"><img src='${result.items[3].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[4].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[4].id.videoId}' target="_blank"><img src='${result.items[4].snippet.thumbnails.high.url}'></a></div>
            </div>`
            );
        });
    const query2 = {
        q: `${searchTerm} ${albums[1]}`,
        part: 'snippet',
        key: API_KEY
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query2, function(result) {
            $(`.album2 .yt-results0`).append().html(
            `
            <div class="ytlabel"><h3>Listen to album on YouTube<span class="arrow-right"></span></h3></div>
            <div class="searchresults">
            <h4>${result.items[0].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[0].id.videoId}' target="_blank"><img src='${result.items[0].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[1].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[1].id.videoId}' target="_blank"><img src='${result.items[1].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[2].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[2].id.videoId}' target="_blank"><img src='${result.items[2].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[3].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[3].id.videoId}' target="_blank"><img src='${result.items[3].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[4].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[4].id.videoId}' target="_blank"><img src='${result.items[4].snippet.thumbnails.high.url}'></a></div>
            </div>`
            );
        });
    const query3 = {
        q: `${searchTerm} ${albums[2]}`,
        part: 'snippet',
        key: API_KEY
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query3, function(result) {
            $(`.album3 .yt-results0`).append().html(
            `
            <div class="ytlabel"><h3>Listen to album on YouTube<span class="arrow-right"></span></h3></div>
            <div class="searchresults">
            <h4>${result.items[0].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[0].id.videoId}' target="_blank"><img src='${result.items[0].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[1].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[1].id.videoId}' target="_blank"><img src='${result.items[1].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[2].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[2].id.videoId}' target="_blank"><img src='${result.items[2].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[3].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[3].id.videoId}' target="_blank"><img src='${result.items[3].snippet.thumbnails.high.url}'></a>
            <h4>${result.items[4].snippet.title}</h4>
            <a href='http://www.youtube.com/watch?v=${result.items[4].id.videoId}' target="_blank"><img src='${result.items[4].snippet.thumbnails.high.url}'></a></div>
            </div>`);
        });
    setTimeout(function() { hideFields(); }, 1000);
}

function getApiData(searchTerm) {
    var albums = [];
    const settings = {
        artist: `${searchTerm}`,
        api_key: key,
        method: "artist.gettopalbums",
        format: "json",
        autocorrect: 1
    };
    $(".albums").html(`<h2 class="albumheader">Albums</h2><span class="albumsection"></span>`);
    $.getJSON(url, settings, function(result){
        $.each(result, function(i, field){
            $(".albumheader").append(`<div class="arrow-down"></div> `)
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
        var y;
        var x = result.artist.bio.content;
        var n = x.indexOf(". ", 1500);
        if (x.length > 1000) y = x.substring(0, n + 1);
        $(".artistinfo").html(`<div class="artistinfoswitch"><h2>Artist Bio<span class="arrow-down2"></span></h2></div>     
            <div class="artistcontent"><img src="${result.artist.image[2]["#text"]}" alt="artistphoto"><p>${y}</p></div>`);
    });

}

function watchSubmit() {
    $("form").on("submit", function(e) {
        e.preventDefault();
        $(".albums").removeClass("hidden");
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

/*
This function hides certain fields in order to make the app more managable and interactive.
*/
function hideFields() {
    $(".album1 .ytlabel").on("click", function(e) {
        e.preventDefault();
        $(this).next().slideToggle(1000);
        $(".album1 .arrow-right").toggleClass('rotated2');
    });
    $(".album2 .ytlabel").on("click", function(e) {
        e.preventDefault();
        $(this).next().slideToggle(1000);
        $(".album2 .arrow-right").toggleClass('rotated2');
    });
    $(".album3 .ytlabel").on("click", function(e) {
        e.preventDefault();
        $(this).next().slideToggle(1000);
        $(".album3 .arrow-right").toggleClass('rotated2');
    });
    //artist info//
    $(".artistinfoswitch").on("click", function(e) {
        e.preventDefault();
        $(".artistcontent").slideToggle(1000);
        $(this).toggleClass("showfields");
        $(`.arrow-down2`).toggleClass('rotated');
    });
    $(".albumheader").on("click", function(e) {
        e.preventDefault();
        console.log("album slide toggle has run")
        $(".albumsection").slideToggle(1000);
        $(`.arrow-down`).toggleClass('rotated');
    });
}

