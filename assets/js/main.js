(function($) {
    var $body = $('body');
    var $header = $('#header');
    var $button = $('.glow-on-hover');
    var $glowLink = $('.glow-link');

    // Store the initial device pixel ratio and viewport size
    var initialDevicePixelRatio = window.devicePixelRatio;
    var initialViewportHeight = window.innerHeight; // Use innerHeight for more accurate viewport height
    var initialViewportWidth = window.innerWidth;

    $(window).on('load', function() {
        setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Apply a small scale to the header initially
    $header.css('transform', 'scale(0.7)');  // Scale down the header to 70%

    $header.on('click', function(e) {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            e.preventDefault();  // Prevent default action for links and buttons
        }

        // Calculate the translation distance
        var headerHeight = $header.outerHeight();
        var viewportHeight = window.innerHeight;

        // Ensure the header moves up but does not exceed the top border
        var moveAmount = Math.max(-headerHeight, -(viewportHeight - headerHeight));

        // Apply the calculated transform for smooth transition
        $header.css({
            transform: `translateY(${moveAmount}px)`,
            transition: 'transform 1s ease-out'
        });

        $header.addClass('is-active clicked');
    });

    $button.on('click', function(e) {
        e.stopPropagation();  // Prevent other event listeners from triggering
        $header.trigger('click');
    });

    $glowLink.on('click', function(e) {
        e.preventDefault();
        $(this).addClass('clicked');
    });

    // Throttling function to minimize the number of resize events handled
    function throttleResize(callback, delay) {
        var resizeTimeout;
        return function() {
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            resizeTimeout = setTimeout(callback, delay);
        };
    }

    // Function to handle resizing logic
    function handleResize() {
        var currentViewportHeight = window.innerHeight;
        var currentViewportWidth = window.innerWidth;
        var currentDevicePixelRatio = window.devicePixelRatio;

        // If the device pixel ratio has changed, it's likely a zoom
        // If the viewport width or height has changed significantly, it's an actual resize
        if (currentDevicePixelRatio !== initialDevicePixelRatio ||
            currentViewportHeight !== initialViewportHeight ||
            currentViewportWidth !== initialViewportWidth) {

            // Reset the header position only if the window has resized (not zoomed)
            if (currentDevicePixelRatio !== initialDevicePixelRatio) {
                // Zooming detected; prevent reset
                return;
            }

            // Update the stored values after resize
            initialViewportHeight = currentViewportHeight;
            initialViewportWidth = currentViewportWidth;

            // Reset header position if the window was resized
            $header.css('transform', 'translateY(0)');
            $header.removeClass('is-active clicked');
        }
    }

    // Attach the throttled resize event handler
    $(window).on('resize', throttleResize(handleResize, 100));

})(jQuery);
