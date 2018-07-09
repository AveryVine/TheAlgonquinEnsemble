$(document).ready(function () {
    if ($('html').scrollTop() < 50) {
      $("html, body").animate({ scrollTop: 50 }, 500);
    }
});