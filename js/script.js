
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var streetVal = $('#street').val();
    var cityVal = $('#city').val();
    var YOUR_API_KEY = "AIzaSyDbJqP1B5lt0xui_aX7w_O3MNDk8UZwGNQ";

    var address = streetVal + ',' + cityVal;


    $('greeting').text('So, you want to live at' + address + '?');

    var streetViewURL = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

    console.log("streetview: ", streetViewURL);

    //var api-key = "702b9290bd6d47d1aa854012fad33b38";
    var queryURL = "http://api.nyasdtimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=702b9290bd6d47d1aa854012fad33b38";

    $.getJSON( queryURL).done(
        function( data ) {
            console.log(data);
            console.log(data.response.docs[0]);
              
            $nytHeaderElem.text('Articles about city : ', cityVal);
            var articles = data.response.docs;
            for(var i = 0; i< articles.length; i++) {
                var article = articles[i];
                $nytElem.append('<li class = "article">' + '<a href = " '+article.web_url+' ">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
            }    
        }
    ). fail(function() {
            $nytHeaderElem.text("Sorry, we could not find any matching articles.");
        });
    // 
    $("body").append('<img class="bgimg" src="' + streetViewURL + '"/>');



    return false;
};

$('#form-container').submit(loadData);
