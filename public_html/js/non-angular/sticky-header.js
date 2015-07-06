//set header position on startpage
/*$(document).ready(function(){
 	var str = window.location.href; 
 	console.log(str.indexOf('home'));
	if (str.indexOf('home') != -1) {
		$('nav').css('top',$(window).height()- $('nav').outerHeight()); 
	};
}); */


//sticky header
$(window).scroll(function() {
    if ($(this).scrollTop() > $('header').height()-$('nav').outerHeight()){  
        $('nav').addClass("sticky");
    }
    else{
        $('nav').removeClass("sticky");
    }
});