var arr = [];
var slideIndex;

Template.swiper.onCreated(function () {

    // Tracker.autorun((computation) => {
    //     if (Router.current().params.tag) {
        // if (Session.get("isSlideImagesSet") == false) {
        // if (Session.get("isSlideImagesSet") == true) {
        // if (Session.equals("isSlideImagesSet", true)) {
            console.log("swiper created!!!!!");
            // Session.set("slideImages", arr);
            // if (Session.get("slideIndex") == undefined) {
            // if (slideIndex == undefined) {
            //     Session.set("currentSlideIndex", 0);
            // }
        // } else {
            // console.log("isSildeImagesSet false");
        // }

        // computation.stop();
    // })

});



Template.swiper.helpers({
    getTag: function (_tag) {
        console.log(_tag);
    }

});


Template.swiper.events({

});



Template.swiper.onRendered(function () {

            var mySwiper = null;
    
            // arr = Session.get("slideImages");
            arr = global_arr;
            console.log("swiper_onRendred() get slideimages : " + arr);

            if (arr != null) {
                arr.forEach(function(obj) {
                    console.log(obj.imglink, obj.id);

                    var div = document.createElement("DIV");
                    div.className = "swiper-slide";
                    div.style = "cursor:pointer; background-image:url(" + convertGDlink(obj.imglink) + ")";

                    var a = document.createElement("A");
                    a.href = "/posts/"+obj.id;
                    a.style = "width:90%; height:100%";
                    // console.log(a.href);

                    // Title text
                    var p = document.createElement("P");
                    p.className = "swiper-title-text";
                    var t = document.createTextNode(obj.title);
                    p.appendChild(t);

                    a.appendChild(p);
                    div.appendChild(a);
                    document.getElementById("swiper-wrapper").appendChild(div);

                }, this); 

                var setSlideIndex = function(){
                    slideIndex = mySwiper.activeIndex;
                    // console.log("slideIndex: " + slideIndex);
                    // Session.set("slideIndex", mySwiper.activeIndex);
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

                console.log(mySwiper);
                // set to displaying slide
                // mySwiper.slideTo(Session.get("slideIndex"), 0);
                mySwiper.slideTo(slideIndex, 0);
            } 
        // }
        
        // else {
        //     console.log("isSildeImagesSet false 2");
        // }

        // computation.stop();

        if (mySwiper != null) {
            console.log("fin");
            // Session.set("isSlideImagesSet", false);
            // console.log("currentComputation: " + Tracker.currentCompution);
            // console.log("computation: ");
            // console.log(computation);
            // computation.stop();
            // console.log("computation stop()");
            // console.log(computation);
        }


    // });

});