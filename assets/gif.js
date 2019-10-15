$(document).ready(function () {

    $(".addLady").on("click", function (event) {
        event.preventDefault();
        var addComedian = $("#ladyAdded").val().trim();
        console.log(addComedian);
        //   Pushes the user added comedian to the gifArray
        gifArray.push(addComedian);
        //   Clears the textbox
        $("#ladyAdded").val("");
        $("#buttonDiv").empty();
        femaleComedianLoop();

    });


    // create an array to loop through for button creation and gif call
    var gifArray = ["Tina Fey", "Amy Poehler", "Maya Rudolph", "Lucille Ball", "Ali Wong", "Kristen Wiig", "Tiffany Hadish"];
    // Loop to create buttons
    function femaleComedianLoop() {
        for (var i = 0; i < gifArray.length; i++) {
            // Check to see if loop works (it does)
            console.log(gifArray[i]);
            // Create buttons for each array item
            var button = $("<button>")
            button.attr("class", "data-name", gifArray[i]);
            button.text(gifArray[i]);
            $("#buttonDiv").append(button);
        }
    }
    femaleComedianLoop();

    $("#buttonDiv").on("click", ".data-name", function () {
        // console.log(this);
        var comedian = $(this).text();
        console.log(comedian);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            comedian + "&api_key=bHEkkzo2pA0nUQTUN6W2aCtygWlV0ITR&limit=10";
        ;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                //   console.log(response.data);
                var results = response.data;
                console.log(results);

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var ratingResult = results[i].rating;
                    var newP = $("<p>").text("Rating: " + ratingResult);
                    var femaleGif = $("<img>");
                    femaleGif.attr({
                        "class": "targetClick",
                        "data-state": "still",
                        "src": results[i].images.fixed_height_still.url,
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url
                    })
                    gifDiv.prepend(newP);
                    gifDiv.prepend(femaleGif);
                    $("#gifDiv").prepend(gifDiv);
                };
                $(".targetClick").on("click", function () {
                    console.log(this);
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate")
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }

                });


            });
    });
});