$(document).ready(function () {
    // if ($('html').scrollTop() < 50) {
    //   $("html, body").animate({ scrollTop: 50 }, 500);
    // }

    setExternalLinksTarget();
    setYouTubeVideoHeight();

    window.addEventListener("resize", function() {
        setYouTubeVideoHeight();
    });

    setPhoneFooterClickAction();
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

function setPhoneFooterClickAction() {
    $("#footer-phone-text").click(function() {
        var text1 = "Phone";
        var text2 = "(613) 612-0623"
        var html = $(this).html();
        if (html == text1) {
            $(this).html(text2);
        } else {
            $(this).html(text1);
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                window.location.href='tel:16136120623';
            }
        }
        return false;
    })
}