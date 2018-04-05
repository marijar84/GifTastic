
var topics = ["Dragon Ball", "Los Simpsons", "Family Guy", "Rugrats", "Scooby Doo"];

function drawTopics() {
    for (var item = 0; item < topics.length; item++) {
        createButton(topics[item]);
    }
}

drawTopics();

$("#submit").on("click", function (event) {

    event.preventDefault();

    var txtAnimal = $("#inputAnimal").val().trim();

    console.log(txtAnimal);

    createButton(txtAnimal);
});

$(document).on("click", ".clickAnimal", function (event) {


    $("#animalDiv").empty();

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
    button.addClass("btn btn-primary");
    button.text(animalType);
    button.addClass("btnStyle");

    $("#buttonAnimal").append(button);
}

function getData(animalType) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalType + "&api_key=0BQFGRWa66lLlfSA1tYVMRU1JbWey7GX&limit=10";//&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var data = response.data;
        var countRow = 0;
        var countColumns = 0;

        for (var item = 0; item < data.length; item++) {

            if(countRow == 0 || countColumns == 3){
                var row = $("<div>");
                row.addClass("row");
                countRow++;
                countColumns = 0;
            }
            

            var column = $("<div>");
            column.addClass("col-md-4");
            countColumns++;

            var title = $("<h2>");
            title.text("Rating: " + data[item].rating);

            var image = $("<img>");
            image.attr("src", data[item].images.fixed_height_still.url);
            image.attr("status", "still");
            image.attr("urlStill", data[item].images.fixed_height_still.url);
            image.attr("urlMoving", data[item].images.fixed_height.url);
            image.addClass("clickImage");
            image.addClass("thumbnail")

            column.append(title);
            column.append(image);

            row.append(column);

            $("#animalDiv").append(row);
        }
    });
}