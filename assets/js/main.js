(function($) {
    var $body = $('body');

    // Play initial animations on page load.
    $(window).on('load', function() {
        setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Add slide-up effect when "See Through My Eyes" is clicked
    $('#header .content a').on('click', function(e) {
        e.preventDefault(); // Prevent the link from navigating

        // Add 'is-active' class to header to slide it up
        $('#header').addClass('is-active');
    });
})(jQuery);
