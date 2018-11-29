let floatingButtonShouldShow = false;

$(document).ready(function () {
    setExternalLinksTarget();

    let currPage = window.location.pathname;
    let database;

    if (currPage.includes("watch")) {
        setYouTubeVideoHeight();
        window.addEventListener("resize", function () {
            setYouTubeVideoHeight();
        });
    } else if (currPage.includes("calendar")) {
        database = new Database();
        database.getEvents(true, false)
            .then(function (events) {
                $("#event-list").text("");
                for (let i = 0; i < events.length; i++) {
                    eventBlock = CalendarEvent.generateEventBlock(events[i], false);
                    $("#event-list").append(eventBlock);
                }
                setExternalLinksTarget();
            })
            .catch(function () {
                $("#event-list").text("Unable to load events!");
            });
        database.getEvents(false, true)
            .then(function (events) {
                $("#past-event-list").text("");
                for (let i = 0; i < events.length; i++) {
                    eventBlock = CalendarEvent.generateEventBlock(events[i], false);
                    $("#past-event-list").append(eventBlock);
                }
            })
            .catch(function () {
                $("#past-event-list").text("Unable to load past events!");
            });
    } else if (currPage.includes("index") || currPage === "/") {
        database = new Database();
        database.getUpcomingEvent()
            .then(function (event) {
                eventBlock = CalendarEvent.generateEventBlock(event, true);
                if ($("#upcoming-event").text() === "Loading event...") {
                    $("#upcoming-event").text("");
                }
                $("#upcoming-event").append(eventBlock);
                setExternalLinksTarget();
            })
            .catch(function () {
                $("#upcoming-event").text("Unable to load event!");
            })
    }

    prepareFloatingScrollButton();
    setPhoneFooterClickAction();
});

$(window).resize(function() {
    setFloatingScrollButtonVisibility();
})

function prepareFloatingScrollButton() {
    setFloatingScrollButtonVisibility()

    $(".floating-scroll").click(function () {
        console.log($(".ensemble").offset().top);
        console.log($(".parallax").height());
        $("html, body").animate({
            scrollTop: $(".parallax").height() + 5
        }, 1000)
    });

    $(window).scroll(function() {
        if (floatingButtonShouldShow) {
            if ($(window).scrollTop() > 50) {
                $(".floating-scroll").fadeOut()
            } else {
                $(".floating-scroll").fadeIn()
            }
        }
    });
}

function setFloatingScrollButtonVisibility() {
    floatingButtonShouldShow = !($(".floating-scroll").css("display") === "none")
}

function setExternalLinksTarget() {
    $("a.external-link").attr('target', '_blank');
}

function setYouTubeVideoHeight() {
    let youtubeVideoRatio = 0.5625;
    let youtubeWidth = $(".youtube").width();
    let youtubeHeight = youtubeWidth * youtubeVideoRatio;
    $(".youtube").css('height', youtubeHeight);
}

function setPhoneFooterClickAction() {
    $("#footer-phone").click(function () {
        var text1 = "Phone";
        var text2 = "(613) 612-0623";
        var textContainer = $("#footer-phone-text");
        var html = textContainer.html();
        if (html == text1) {
            textContainer.html(text2);
        } else {
            textContainer.html(text1);
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                window.location.href = 'tel:16136120623';
            }
        }
        return false;
    })
}
