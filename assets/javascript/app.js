$(document).ready(function () {

    var character = ["Tyler Durden", "Brock Samson", "Homer Simpson", "Megaman", "Mario", "Professor Farnsworth"];

    var userChoice = character[0];

    //Render starting buttons from array
    function createButtons() {
        //Clear the previous GIFs when new button is clicked
        $(".buttons").empty();
        for (var i = 0; i < character.length; i++) {
            $(".buttons").append("<button>" + character[i] + "</button>")
        }
        APILoop();
    }
    createButtons();

    //Make the buttons responsive
    function APILoop() {
        $(".buttons button").click(function () {
            userChoice = $(this).text();
            console.log(userChoice);
            $(".gifs").empty();


            //Link the API
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + userChoice + "&api_key=WRuFw9Szdio5PH7S9G280MUiVyyXJF3s";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(queryURL);
                console.table(response);
                //Render 5 GIFs after clicking the button + pause/start
                for (var i = 0; i < 5; i++) {
                    $(".gifs").append("<div class='gifRating'>Rating: " + response.data[i].rating + "</div>");
                    $(".gifs").append("<div><img src='" + response.data[i].images.fixed_height_still.url +
                        "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" +
                        response.data[i].images.fixed_height.url + "' data-state='still' class='imgSize'></div>");
                }
                $(".imgSize").click(function () {



                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
        });
    }

    //add button//
    $("#add-character").on("click", function (event) {
        event.preventDefault();
        //Make the text box collect data/append new buttons
        var addCharacter = $("#character-input").val().trim();
        if (addCharacter === "") {
            return false;
        }
        else {
            character.push(addCharacter);
            console.log(character);
            createButtons();
            document.forms["character-form"].reset();
        }
    });


});