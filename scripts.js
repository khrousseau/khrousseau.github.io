(function($) {
	var $body = $('body');

	// Play initial animations on page load.
	$(window).on('load', function() {
		setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});
})(jQuery);
