(function($) {
    var $body = $('body');
    var $header = $('#header');
    var $button = $('.glow-on-hover');
    var $glowLink = $('.glow-link');

    $(window).on('load', function() {
        setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    $header.on('click', function(e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            e.preventDefault();
        }

        // Get the height of the header dynamically
        var headerHeight = $header.outerHeight();
        
        // Calculate the maximum translation value for the header to slide up without crossing the top border
        var maxTranslateY = headerHeight > $(window).height() ? $(window).height() : headerHeight;

        // Add the necessary classes for activation
        $header.addClass('is-active clicked');
        $header.addClass('fade-out');  // Add the fade-out class to the header

        // Apply the calculated translateY value for smooth animation
        $header.css('transform', 'translateY(-' + maxTranslateY + 'px)'); // Adjust the header's translation to fit within the viewport

        // To trigger the background image fade-out effect, toggle a class
        $header.addClass('background-fade');
    });

    $button.on('click', function(e) {
        e.stopPropagation();
        $header.trigger('click');
    });

    // Add click behavior to glow-link elements
    $glowLink.on('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        $(this).addClass('clicked'); // Add the clicked class to preserve size
    });
})(jQuery);
