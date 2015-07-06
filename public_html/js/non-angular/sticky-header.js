
$(window).scroll(function() {
    if ($(this).scrollTop() > $('header').height()-$('nav').outerHeight()){  
        $('nav').addClass("sticky");
        console.log("add");
    }
    else{
        $('nav').removeClass("sticky");
        console.log("remove");
    }
});