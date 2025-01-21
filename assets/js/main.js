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
        $header.addClass('is-active clicked');
        $header.addClass('fade-out');  // Add the fade-out class to the header
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
