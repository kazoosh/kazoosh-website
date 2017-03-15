(function () {
	'use strict';

	$('#lnkMail').hover(function(){
		// here you can use whatever replace you want
		var newHref = $(this).attr('href').replace('spam', 'com');
		$(this).attr('href', newHref);
		var newHref2 = $(this).attr('href').replace('example', 'kazoosh');
		$(this).attr('href', newHref2);
	});
}());