
var topics = ["Dragon Ball", "The Simpsons", "The Flintstones",
 "Tom and Jerry", "Family Guy", "Rugrats", "Scooby Doo",
"Futurama", "Avatar", "Batman", "South Park", "Pokemon"];

function drawTopics() {
    for (var item = 0; item < topics.length; item++) {
        createButton(topics[item]);
    }
}

drawTopics();

$("#submit").on("click", function (event) {

    event.preventDefault();

    if ($("#inputAnimal").val().trim() != "") {

        var txtAnimal = $("#inputAnimal").val().trim();

        topics.push(txtAnimal);

        $("#buttonAnimal").empty();

        drawTopics();
    }
});

$(document).on("click", ".clickAnimal", function (event) {

    $("#gifsDiv").empty();
    $("#movieDiv").empty();

    var animal = event.currentTarget.defaultValue;
    getData(animal);
});

$(document).on("click", ".clickImage", function (event) {
    var status = $(this).attr("status");

    if (status === "still") {
        var urlMoving = $(this).attr("urlMoving");
        $(this).attr("src", urlMoving);
        $(this).attr("status", "moving");
    }
    else {
        var urlStill = $(this).attr("urlStill");
        $(this).attr("src", urlStill);
        $(this).attr("status", "still");
    }
});


function createButton(animalType) {
    var button = $("<input>");
    button.attr("type", "submit");
    button.attr("value", animalType);
    button.addClass("clickAnimal")
    button.addClass("btn btn-danger");
    button.text(animalType);
    button.addClass("btnStyle");

    $("#buttonAnimal").append(button);
}

function getGifs(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var data = response.data;
        var countRow = 0;
        var countColumns = 0;

        for (var item = 0; item < data.length; item++) {

            if (countRow == 0 || countColumns == 3) {
                var row = $("<div>");
                row.addClass("row");
                countRow++;
                countColumns = 0;
            }


            var column = $("<div>");
            column.addClass("col-md-4");
            countColumns++;

            var title = $("<h2>");
            title.text("Title: " + data[item].title);

            var rating = $("<h3>");
            rating.text("Rating: " + data[item].rating);

            var image = $("<img>");
            image.attr("src", data[item].images.fixed_height_still.url);
            image.attr("status", "still");
            image.attr("urlStill", data[item].images.fixed_height_still.url);
            image.attr("urlMoving", data[item].images.fixed_height.url);
            image.addClass("clickImage");
            image.addClass("thumbnail");


            var download = $("<a>");
            download.text("Download gif");
            download.download = "image.gif";
            download.addClass("clickDownload");
            download.attr("target", "blank");
            download.attr("urlMoving", data[item].images.fixed_height.url);
            download.attr("href", data[item].images.fixed_height.url);

            column.append(title);
            column.append(rating);
            column.append(image);
            column.append(download);

            row.append(column);

            $("#gifsDiv").append(row);
        }
    });
}

function getMovies(queryUrl) {
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var data = response.data;

        var row = $("<div>");
        row.addClass("row");

        var column = $("<div>");
        column.addClass("col-md-12");

        var title = $("<h2>");
        console.log(response.Title);
        title.text(response.Title);

        var genre = $("<h3>");
        console.log(response.Genre);
        genre.text(response.Genre);

        var image = $("<img>");
        image.attr("src", response.Poster);
        image.addClass("thumbnail");

        column.append(title);
        column.append(genre);
        column.append(image);

        row.append(column);

        $("#movieDiv").append(row);
    });
}

function getData(query) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=0BQFGRWa66lLlfSA1tYVMRU1JbWey7GX&limit=10";

    console.log(queryURL);
    getGifs(queryURL);

    var queryMovie = "https://www.omdbapi.com/?t=" + query + "&apikey=eafa5113";

    getMovies(queryMovie);
}