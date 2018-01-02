var arr = [];

Template.swiper.onCreated(function () {
    // console.log("swiper created");
    Session.set("slideImages", arr);
    if (Session.get("slideIndex") == undefined) {
        Session.set("currentSlideIndex", 0);
        // console.log("make session");
    }
});


Template.swiper.helpers({

});


Template.swiper.events({

});


Template.swiper.onRendered(function () {

    arr = Session.get("slideImages");
    // console.log(arr);
    arr.forEach(function(obj) {
        // console.log(obj.imglink, obj.id);

        var a = document.createElement("A");
        a.href = "/posts/"+obj.id;
        a.style = "width:90%; height:100%";
        // console.log(a.href);

        var div = document.createElement("DIV");
        div.className = "swiper-slide";
        div.style = "cursor:pointer; background-image:url(" + convertGDlink(obj.imglink) + ")";

        div.appendChild(a);
        document.getElementById("swiper-wrapper").appendChild(div);
    }, this);


    var setSlideIndex = function(){
        Session.set("slideIndex", mySwiper.activeIndex);
    };
 

    var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,

            // If we need pagination
            pagination: '.swiper-pagination',

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            // And if we need scrollbar
            // scrollbar: '.swiper-scrollbar',

            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 7000,
            autoplayDisableOnInteraction: false,

            onSlideChangeEnd: setSlideIndex,
            centeredSlides: true

            // setWrapperSize: true,
            // autoHeight: true


        });

    // set to displaying slide
    mySwiper.slideTo(Session.get("slideIndex"), 0);


});