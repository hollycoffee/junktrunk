$(document).ready(function () {
    $('#appList').hide();
});

var appArray = null;

function showLoader(message) {
    $.mobile.loadingMessageTheme = 'a';
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.showPageLoadingMsg('a', message);
}

function hideLoader() {
    $.mobile.hidePageLoadingMsg();
}

function search() {
    var searchTerm = $('#searchBar').val();
    if (searchTerm.length > 0) {
        appArray = new Array();
        showLoader('Loading Apps');
        var request = { type: "GET", url: "http://itunes.apple.com/search?term=" + searchTerm + "&lang=en_us&country=us" + "&entity=software,iPadSoftware", processData: true, dataType: "jsonp", async: true };
        var req = $.ajax(request);
        req.done(function (response) {
            if (response.results.length > 0) {
                resetTable();
                for (var i = 0; i < response.results.length; i++) {
                    var app = new App(response.results[i]);
                    insertAppIntoTable(app);
                    appArray[i] = app;
                }
            }
            else {
                resetTable();
                $('#appList').html($('#appList').html() + "<li data-readonly='true'>No matches found</li>");
                $('#appList').listview('refresh');
                $('html, body').animate({ scrollTop: $('#appList').offset().top }, 'fast');
            }
        });

        req.always(function () {
            hideLoader();
            $('html, body').animate({ scrollTop: $('#appList').offset().top }, 'fast');
        });
    }
}

function App(jsonApp) {
    this.artistId = jsonApp.artistId;
    this.artistName = jsonApp.artistName;
    this.artistViewUrl = jsonApp.artistViewUrl;
    this.artworkUrl60 = jsonApp.artworkUrl60;
    this.artworkUrl100 = jsonApp.artworkUrl100;
    this.artworkUrl512 = jsonApp.artworkUrl512;
    this.averageUserRating = jsonApp.averageUserRating;
    this.averageUserRatingForCurrentVersion = jsonApp.averageUserRatingForCurrentVersion;
    this.bundleId = jsonApp.bundleId;
    this.contentAdvisoryRating = jsonApp.contentAdvisoryRating;
    this.currency = jsonApp.currency;
    this.description = jsonApp.description;
    this.features = jsonApp.features;
    this.fileSizeBytes = jsonApp.fileSizeBytes;
    this.formattedPrice = jsonApp.formattedPrice;
    this.genreIds = jsonApp.genreIds;
    this.genres = jsonApp.genres;
    this.isGameCenterEnabled = jsonApp.isGameCenterEnabled;
    this.kind = jsonApp.kind;
    this.langaugeCodesIS02A = jsonApp.langaugeCodesIS02A;
    this.price = jsonApp.price;
    this.primaryGenreId = jsonApp.primaryGenreId;
    this.primaryGenreName = jsonApp.primaryGenreName;
    this.releaseDate = jsonApp.releaseDate;
    this.releaseNotes = jsonApp.releaseNotes;
    this.screenshotUrls = jsonApp.screenshotUrls;
    this.sellerName = jsonApp.sellerName;
    this.sellerUrl = jsonApp.sellerUrl;
    this.supportedDevices = jsonApp.supportedDevices;
    this.trackCensoredName = jsonApp.trackCensoredName;
    this.trackContentRating = jsonApp.trackContentRating;
    this.trackId = jsonApp.trackId;
    this.trackName = jsonApp.trackName;
    this.trackViewUrl = jsonApp.trackViewUrl;
    this.userRatingCount = jsonApp.userRatingCount;
    this.userRatingCountForCurrentVersion = jsonApp.userRatingCountForCurrentVersion;
    this.version = jsonApp.version;
    this.wrapperType = jsonApp.wrapperType;
}

function showSearchView() {
    $('#searchBarDiv').show('fast');
    $('html, body').animate({ scrollTop: $('#searchForm').offset().top }, 'fast');
}

function resetTable() {
    $('#appList').show();
    var table = $("#appList");
    var html = "<li id='appListTitle' data-role='list-divider'>Results</li>";
    table.html(html);
}

function insertAppIntoTable(app) {
    var table = $("#appList");

    var rating = app.averageUserRating + "/5 stars out of " + app.userRatingCount + " ratings";
    if (typeof (app.averageUserRating) == "undefined") {
        rating = "No ratings"
    }

    var html = "<li data-corners='false' data-shadow='false' data-iconshadow='true' data-wrapperels='div' data-icon='arrow-r' data-iconpos='right' data-theme='c' class='ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb ui-btn-up-c' style='height:70px'>";
    html += "<div class='ui-btn-inner ui-li'><div class='ui-btn-text'>";
    html += "<a onclick=\"setupDetailsPage('" + app.trackCensoredName + "')\" href=\"#\" class=\"ui-link-inherit\">";
    html += "<img src='" + app.artworkUrl60 + "' class='ui-li-thumb' style='border-radius: 10px;-moz-border-radius: 10px;-khtml-border-radius: 10px;-webkit-border-radius: 10px;-moz-box-shadow: 3px 3px 5px #888;-webkit-box-shadow: 3px 3px 5px #888;box-shadow: 3px 3px 5px #888;margin-top:5px;margin-left:5px' title='" + app.trackCensoredName + "'>";
    html += "<h3 class='ui-li-heading' style='margin-top:5px'>" + app.trackCensoredName + "</h3>";
    html += "<p class='ui-li-desc'>" + rating + "</p>";
    html += "</a></div><span class='ui-icon ui-icon-info ui-icon-shadow'>&nbsp;</span></div></li>";

    table.html(table.html() + html);

    table.listview('refresh');
}

function setupDetailsPage(appName) {
    var app = null;

    for (var i = 0; i < appArray.length; i++) {
        app = appArray[i];
        if (app.trackCensoredName == appName) {
            break;
        }
    }

    if (app != null && app.trackCensoredName.length > 0) {
        var detailTitle = $('#detailsTitle');
        var detailContent = $('#detailsContent');

        detailTitle.html(app.trackCensoredName);

        var rating = app.averageUserRating + "/5 stars out of " + app.userRatingCount + " ratings";
        if (typeof (app.averageUserRating) == "undefined") {
            rating = "No ratings"
        }

        var html = "<p><img src='" + app.artworkUrl100 + "' width='100px' style='border-radius: 15px;-moz-border-radius: 15px;-khtml-border-radius: 15px;-webkit-border-radius: 15px;-moz-box-shadow: 3px 3px 5px #888;-webkit-box-shadow: 3px 3px 5px #888;box-shadow: 3px 3px 5px #888;' title='" + app.trackCensoredName + "'></p>";
        html += "<b><a id='priceButton' style='width:80px;' target='_blank' href='" + app.trackViewUrl + "'><font color='#04b900'>" + app.formattedPrice + "</font></a></b><br/>";
        html += "<em><b>" + rating + "</b></em>";
        html += "<center><p><h3>Description</h3></p></center>";
        html += "<p>" + app.description + "</p>";
        html += "<center><p><h3>Screenshots</h3>"

        for (var i = 0; i < app.screenshotUrls.length; i++) {
            html += "<a href='" + app.screenshotUrls[i] + "' target='_blank'><img border='0' src='" + app.screenshotUrls[i] + "' width='100px' style='-moz-box-shadow: 3px 3px 5px #888;-webkit-box-shadow: 3px 3px 5px #888;box-shadow: 3px 3px 5px #888;'/></a>&nbsp;";
        }

        html += "</p></center>"

        html += "<center><p><h3>Compatible Devices</h3>";

        for (var i = 0; i < app.supportedDevices.length; i++) {
            html += app.supportedDevices[i] + "<br/>";
        }

        html += "</p></center>";

        detailContent.html(html);

        $.mobile.changePage('#detailsView');

    }
}