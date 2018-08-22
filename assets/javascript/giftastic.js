$(document).ready(function () {
    console.log("ready!");

    var topics = ["Toy Story", "Incredibles", "Jurassic Park", "Harry Potter", "Avengers"]

    for (var i = 0; i < topics.length; i++) {
        $("#buttons").append("<button class='movie'>" + topics[i] + "</button>");
    }

    $("#search").html("<input type='text' id='input' placeholder = 'Movie Title'>");
    $("#searchButton").html("<button type='submit' id='addMovie'>" + "Add Movie" + "</button>");


    $("#addMovie").on("click", function () {
        topics.push($("#input").val());
        $("#buttons").append("<button class='movie'>" + $("#input").val().trim() + "</button>");
        console.log(topics);
    });

    var clickGif = $("<div class='row' id='click'>");
    var clickText = $("<p>").text("Click Gifs to Play!");
    clickGif.append(clickText);
    $("#gifField").prepend(clickGif);
    clickGif.hide();


    $(document).on("click", ".movie", function () {
        clickGif.show();
        var movie = $(this).text();
        var queryurl = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=mGLsTKX4l3wSH9hTzlisvBaVJFzRhAC9";
        var queryurl2 = "http://www.omdbapi.com/?apikey=trilogy&" + movie;
        $.ajax({
            url: queryurl,
            method: "GET",
            data: {
                limit: 10,
                rating: "g",
            }
        }).then(function (response) {
            // console.log(response);
            results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='col-lg-4 col-md-6 col-sm-12' id='movieGif'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var image = $("<img>");
                $("#gifs").prepend("<img>");
                image.attr("src", results[i].images.fixed_height_still.url);
                image.attr("data-still", results[i].images.fixed_height_still.url);
                image.attr("data-animate", results[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                image.css("height", "160px");
                image.css("width", "240px");
                gifDiv.append(p);
                gifDiv.prepend(image);
                $("#gifs").prepend(gifDiv);
            }
        });

        $.ajax({
            url: queryurl2,
            method: "GET",
            data: {
                t: movie,
            }
        }).then(function (response) {
            console.log(response);
            $("#movieInfo").prepend("<tr><td id='title'>" + response.Title + "</td><tr><td>" + response.Year + "</td><tr><td>" + "<img src=" + response.Poster + "height='300px' width='200px'>" + "</td>");
        });

    });


    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        var data_animate = $(this).attr("data-animate");
        var data_still = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("src", data_animate);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", data_still);
            $(this).attr("data-state", "still");
        }
    });



});