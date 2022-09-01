$( document ).ready(function() {

    if(window.innerWidth >= 992){
        initializeGalleryImages();
    }
    initializeSchemaImages();

    $(".place").hover(
        function() {
          if($( this ).html() == "waiting"){
             $('#WAITING').css("display","block");
          }else{
             $('#HOUSE_DESCR').css("display","block");
             let house_info = $( this ).html().split(";");
             $('#FLAT_AREA').html(house_info[0]);
             $('#ALL_AREA').html(house_info[1]);

             $('#PRICE_PARAGRAPH').show();
             $('#ALL_PRICE').html(house_info[2] + " zł");
              if(house_info[3]!='free'){
                  $('#PRICE_PARAGRAPH').hide();
                  $('#ALL_STATUS').html('sprzedano');
              }else{
                  $('#ALL_PRICE').html("<span style=\"color: red;\">" + house_info[2] + " zł </span>")
                  $('#PRICE_PARAGRAPH').show();
                  $('#ALL_STATUS').html('dostępne')
              }

              $('#TERM').html(house_info[4])

             /*if(house_info[1]){
                $('#ALL_AREA').parent().parent().css("display","block");

             }else
             {
                $('#ALL_AREA').parent().parent().css("display","none");
             }

             $('#ALL_PRICE').html(house_info[2]);
             if(house_info[3]!='free'){
                $('#PRICE_PARAGRAPH').hide();
                $('#ALL_STATUS').html('sprzedano');
             }else{
                $('#PRICE_PARAGRAPH').show();
                $('#ALL_STATUS').html('dostępne')
             }

             if(house_info[4] == 'promotion'){
                $('.promotion').show();
                $('#HOUSE_DESCR').css("background-color", "#FEFEEB");
                $('#ALL_PRICE_BEFORE').html(house_info[2]);
                $('#ALL_PRICE_NOW').html(house_info[5]);
                $('#PRICE_PARAGRAPH').hide();
             }else{
                $('.promotion').hide();
                $('#HOUSE_DESCR').css("background-color", "white");
             }

             if(house_info[4] == "2020" || house_info[4] == "2021"){
                $('#TERM_P').css("display","block");
                if(house_info[4] == "2020"){
                    $('#TERM').html("XII 2020");
                }else{
                    $('#TERM').html("I kw. 2021 r.");
                }

             }else{
                $('#TERM_P').css("display","none");
             }*/
          }
        },
        function() {
           if($( this ).html() == "waiting"){
               $('#WAITING').css("display","none");
           }else{
               $('#HOUSE_DESCR').css("display","none");
           }
            $('#PROMO_INFO_ID').css("visibility","hidden")
        }
    );

  $('#mainSlider').ma5slider();

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 45)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }

    navbarCollapse();
    //Try to detect horizontal resize
    window.onresize = navbarCollapse;

  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse Navbar
  var navbarCollapse = function() {

    if ($("#mainNav").offset().top > 100 || window.innerWidth < 992) {
      	$("#mainNav").addClass("navbar-shrink");
		$("#logoHeader").css("display","none");
		$("#logoShrink").css("display","block");
		$(".fa, .fa-facebook-square").css("color","white");		
    } else {
      $("#mainNav").removeClass("navbar-shrink");
		$("#logoHeader").css("display","block");
		$("#logoShrink").css("display","none");
		$(".fa, .fa-facebook-square").css("color","#3b5998");	
    }
  };
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
   
   
   
$("#svg0").click(function(e){
    var elm = $(this);
    var xPos = e.pageX - elm.offset().left;
    var yPos = e.pageY - elm.offset().top;

    console.log(2*xPos, 2*yPos);
});

   $('#ikonaStandardy').click(toggleInteriorContent)
   $('#INTERIOR_DETAILS_HEADER').click(toggleInteriorContent)

});

function toggleInteriorContent(){
    $("#INTERIOR_DETAILS_CONTENT").stop(true, true).slideToggle();
    $("#ICON_UP").toggle();
    $("#ICON_DOWN").toggle();
}

function initializeGalleryImages(){
    $('.portfolio-link-gallery').attr('href','#portfolioModalGallery');
}

function initializeSchemaImages(){
    $('.portfolio-link-schema').attr('href','#portfolioModalSchema');
}

function initializeModal(slide){

    if(window.innerWidth < 992){
        return;
    }

    if($('.vertical-center-4').hasClass('slick-initialized')){
            $('.vertical-center-4').slick('unslick');
    }

    gallerySlider = $('.portfolio-modal');
    gallerySlider.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd',
    function(e) {
       $('.vertical-center-4').show();
       $('.vertical-center-4').slick({
             dots: false,
             centerMode: true,
             initialSlide: slide-1,
             slidesToShow: 1,
             slidesToScroll: 2,
             adaptiveHeight: true,
             variableWidth: true,
       });

    });
    $('.portfolio-modal').keyup(function(e){
        if(e.which == 27){
           if($('.vertical-center-4').hasClass('slick-initialized')){
              dismissModal();
           }
        }
    });
}

function showHouseProjection(projectionFile){
    window.open(window.location.href + "house_projections/"+projectionFile);
}

function dismissModal(){
       $('.vertical-center-4').hide();
       $('.vertical-center-4').slick('unslick');
}







