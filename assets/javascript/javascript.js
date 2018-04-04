
//$(document).ready(function () {

$("#submit").on("click", function (event) {

    event.preventDefault();    

    var txtAnimal = $("#inputAnimal").val();

    console.log(txtAnimal);

    createButton(txtAnimal);

    //getData(txtAnimal);
});

$(document).on("click", ".clickAnimal", function (event) {
    console.log(event);

    $("#animalDiv").empty();

    var animal = event.currentTarget.defaultValue;
    getData(animal);
});

function createButton(animalType){
    var button = $("<input>");
    button.attr("type", "submit");
    button.attr("value", animalType);
    button.addClass("clickAnimal")
    button.text(animalType);

    $("#buttonAnimal").append(button);
}

function getData(animalType) {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalType + "&api_key=0BQFGRWa66lLlfSA1tYVMRU1JbWey7GX&limit=18";//&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var data = response.data;
        var countRow = 0;

        for (var item = 0; item < data.length; item++) { 

            var row = $("<div>");
            row.addClass("row");

            var column = $("<div>");
            column.addClass("col-md-4");
            
            var title = $("<h2>");
            title.text("Rating: " + data[item].rating);

            var image = $("<img>");
            image.attr("src", data[item].images.fixed_height.url);
            image.addClass("thumbnail")

            column.append(title);
            column.append(image);

            row.append(column);

            $("#animalDiv").append(row);
        }
    });
}



//});