$( document ).ready(function() {

    if(window.innerWidth >= 992){
        initializeGalleryImages();
    }
    initializeSchemaImages();

    $(".wholePlace").hover(
        function() {
            $('#WHOLE_HOUSE_DESCR').css("display","block");
            let house_info = $( this ).html().split(";");
            if(house_info.length < 2){
                $(".house_descr").css("width", "600px")
                $("#WHOLE_HOUSE_DESCR_FOREIGNOBJECT").css("width", "600px")
                $('#WHOLE_FREE').html("Informacje wkrótce");
            }else {
                $(".house_descr").css("width", "400px")
                $("#WHOLE_HOUSE_DESCR_FOREIGNOBJECT").css("width", "500px")
                $('#WHOLE_FREE').html(house_info[0] + "/" + house_info[1]);
            }
        },
        function() {
            $('#WHOLE_HOUSE_DESCR').css("display","none");
        }
    );

    $(".place").hover(
        function() {
             $(".house_descr").css("width", "500px")
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
        },
        function() {
            $('#HOUSE_DESCR').css("display","none");
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

      $(".full-overlay-image").css("margin-top", ($("#mainNav").offset().top + 180) + "px")

      if(window.innerWidth > 992){
          $(".full-overlay-image").css("width", "50%")
          $(".full-overlay-image").css("left", "25%")
          $("#osiedle_lg").css("display", "block")
          $("#osiedle_sm").css("display", "none")
      }else{
          $(".full-overlay-image").css("width", "80%")
          $(".full-overlay-image").css("left", "10%")
          $("#osiedle_lg").css("display", "none")
          $("#osiedle_sm").css("display", "block")
      }
  };
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
   
   
   
$("#svg0").click(function(e){
    var elm = $(this);
//    var xPos = e.pageX - elm.offset().left;
//    var yPos = e.pageY - elm.offset().top;
//
//    console.log(Math.round(2*xPos), Math.round(2*yPos));


//            pt.x = e.clientX;
//            pt.y = e.clientY;
//
//            // The cursor point, translated into svg coordinates
//            var cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
//            console.log("(" + cursorpt.x + ", " + cursorpt.y + ")");
console.log(e)
console.log(e.offsetX + " " + e.offsetY)
console.log(e.pageX + " " + e.pageY)
console.log(Math.round(e.pageX - e.offsetX) + " " + Math.round(e.pageY - e.offsetY))
console.log(Math.round(e.screenX) + " " + Math.round(e.screenY))
console.log(elm.offset().left);
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

function showCatalog(projectionFile){
    window.open(window.location.href + "catalogs/"+projectionFile);
}

function selectHouse(houseNumber, houseContent){
    $('#svgTitle').html("BUDYNEK NR "+houseNumber);
    //$('body').scrollTo('#svg1'); // Scroll screen to target element
    $([document.documentElement, document.body]).animate({
            scrollTop: $("#svg1").offset().top
        }, 1000);

    let houseContentInfo = houseContent.split("_");
    for(let i=0; i<4; i++){
        let apartmentPolygon = $('#place' + (i + 1))
        apartmentPolygon.html(houseContentInfo[i]);
        if(houseContentInfo[i].includes('free')){
            apartmentPolygon.attr('class','place placeFree');
        }else{
            apartmentPolygon.attr('class','place placeBooked');
        }
    }
}

function dismissModal(){
       $('.vertical-center-4').hide();
       $('.vertical-center-4').slick('unslick');
}

function closePresalePopup(){
    $('.full-overlay').hide();
    $('.full-overlay-image').hide();
}







