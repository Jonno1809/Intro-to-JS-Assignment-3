var khGames = getKhJSONDetails(); // Array of all KH games

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

    // Scroll event listener
    $(document).scroll(function () { 
        advanceProgressBar(calculateScrollPercentage());
    });

    // Bootstrap Scrollspy - automatically update links in navbar on scroll
    $('body').scrollspy({target: ".navbar"});

    console.log(sortGamesByReleaseOrder());
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
 * Read the kh-details.json file and returns an array of json objects (games in this case)
 */
function getKhJSONDetails() {
    var khGames = [];

    $.getJSON("kh-details.json", function(json) {
        // khGames = json;
        $.each(json, function(key, value) {
            khGames.push(value);
        });
        console.log(khGames);
    });

    return khGames;
}

/**
 * Sort the games by the order they should be played
 * @param {array} games the array of game-details objects
 */
function sortGamesByPlayOrder() {
    khGames.sort(function(a, b) { return a.playOrder - b.playOrder }); // Comparator function to tell JS how to compare the items when sorting
    return khGames;
}

/**
 * Sort the games by chronological order they are set in the KH universe
 */
function sortGamesByChronologicalOrder() {
    khGames.sort(function(a,b) {
        // Comparator function to tell JS how to compare the items when sorting
        // This comparator inlcudes cases where the key doesn't exist
        // a < b = -1, a > b = 1, a==b = 0
        if (!a.chronologicalOrder) {
            return -1;
        } else if (!b.chronologicalOrder) {
            return 1;
        } else if (!a.chronologicalOrder && !b.chronologicalOrder) {
            return 0;
        }
        return a.chronologicalOrder - b.chronologicalOrder;
    }); 
    return khGames;
}

/**
 * Sort the games by the year they were released
 */
function sortGamesByReleaseOrder() {
    khGames.sort(function(a,b) {
        // Comparator function to tell JS how to compare the items when sorting
        // Compare by release year, then if both the same then give bundled game priority (higher up list)
        var order = a.releaseOrder - b.releaseOrder;
        if (order == 0) {
            if (!b.games) {
                return -1;
            } else if (!a.games) {
                return 1;
            } else if (!a.games && !b.games) {
                return 0;
            }
        }
        return order;
    });
    return khGames;
}