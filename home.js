$(document).ready(function () {
    advanceProgressBar(calculateScrollPercentage());

    // Scroll event listener
    $(document).scroll(function () { 
        advanceProgressBar(calculateScrollPercentage());
    });
});

/**
 * Advances the scroll progress bar based on the scroll percentage
 * @param {number} percentage - Scroll percentage
 */
function advanceProgressBar(percentage) {
    $('#progress-indicator').css("width", percentage+"%");
}

/**
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