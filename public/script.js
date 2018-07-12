$(document).ready(function () {
    // if ($('html').scrollTop() < 50) {
    //   $("html, body").animate({ scrollTop: 50 }, 500);
    // }

    setExternalLinksTarget();
    setYouTubeVideoHeight();

    window.addEventListener("resize", function() {
        setYouTubeVideoHeight();
    });
});

function setExternalLinksTarget() {
    $("a.external-link").attr('target' ,'_blank');
}

function setYouTubeVideoHeight() {
    let youtubeVideoRatio = 0.5625;
    let youtubeWidth = $(".youtube").width();
    let youtubeHeight = youtubeWidth * youtubeVideoRatio;
    $(".youtube").css('height', youtubeHeight);
}