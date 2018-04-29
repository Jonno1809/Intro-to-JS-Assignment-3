$(document).ready(function () {
    // $("body").css("background-color","red");
    advanceProgressBar(calculateScrollPercentage());

    $(document).scroll(function () { 
        advanceProgressBar(calculateScrollPercentage());
    });
});

function advanceProgressBar(percentage) {
    $('#progress-indicator').css("width", percentage+"%");
}

function calculateScrollPercentage() {
    var scrollPosition = $(document).scrollTop();
    var windowHeight = parseInt(document.body.scrollHeight) - parseInt(document.body.clientHeight);

    if (windowHeight || windowHeight > 0) {
        var percentage = (scrollPosition / windowHeight) * 100;
        return percentage;
    }
    return 100;
}