$(document).ready(function () {
    // // Set grey default state of scroll progress on document ready
    // advanceProgressBar(calculateScrollPercentage());

    // Setup fullpage
    $('#fullpage').fullpage({
        navigation: true,
        onLeave: function(index, nextIndex, direction) {
            advanceProgressBar(calculateScrollPercentage());
        }
    });

    getKhJSONDetails();

    // Scroll event listener
    $(document).scroll(function () { 
        advanceProgressBar(calculateScrollPercentage());
    });

    // Bootstrap Scrollspy - automatically update links in navbar on scroll
    $('body').scrollspy({target: ".navbar"});
});

/**
 * Advances the scroll progress bar based on the scroll percentage
 * @param {number} percentage - Scroll percentage
 */
function advanceProgressBar(percentage) {
    $('#progress-indicator').css("width", percentage+"%");
}

/**
 * @deprecated due to not working for fullpage.js - use @function calculateScrollPercentage(sectionIndex) instead
 * Calculate the percentage of how much the page has been scrolled
 */
function calculateScrollPercentage() {
    var scrollPosition = $(document).scrollTop();
    var windowHeight = parseInt(document.body.scrollHeight) - parseInt(document.body.clientHeight);

    if (windowHeight || windowHeight > 0) {
        var percentage = (scrollPosition / windowHeight) * 100;
        return percentage;
    }
    return 100; // If can't find window height, just fill progress bar
}

function calculateScrollPercentage(sectionIndex) {

}

/**
 * Read the kh-details.json file and returns as a json object
 */
function getKhJSONDetails() {
    var khGames = {};

    $.getJSON("kh-details.json", function(json) {
        khGames = json;
        // $.each(json, function(key, value) {
        //     khGames.push(value);
        // });
        console.log(khGames);
    });

    return khGames;
}