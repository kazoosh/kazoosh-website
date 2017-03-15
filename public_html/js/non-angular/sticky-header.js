(function () {
	'use strict';

	$(window).scroll(function() {
		if ($(this).scrollTop() > $('header').height()-$('nav').outerHeight()){  
			$('nav').addClass("sticky");
		}
		else{
			$('nav').removeClass("sticky");
		}
		});
}());