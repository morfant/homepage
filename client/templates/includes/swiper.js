// import Swiper from 'swiper';

var arr = [];
var slideIndex;
// mySwiper = null;

var delSwiper = function(){

   console.log("---delSwiper()");
        //clear previous swiper DOM
        var previousSwiper = document.getElementsByClassName("swiper-wrapper");
        console.log("prev");
        console.log(previousSwiper);
        if (previousSwiper){
            mySwiper.removeAllSlides();
        }

        /*
            console.log("previous swiper exist")
            while (previousSwiper.firstChild) {
                console.log("delete swiper slide")
                previousSwiper.removeChild(previousSwiper.firstChild);
            }

            // clear swiper-wrapper style
            previousSwiper.style = "";
        } else {
            console.log("No previous swiper")
        }
        */


        console.log(document.getElementsByClassName("swiper-slide"));
}

var addSliders = function() {
    console.log("---addSliders()");
        
        // var mySwiper = null;
        // mySwiper = null;

        // arr = Session.get("slideImages");
        arr = global_arr;
        console.log("swiper_onRendred() get slideimages : " + arr);

        if (arr != null) {
            arr.forEach(function(obj) {
                console.log(obj.imglink, obj.id);

                var div = document.createElement("DIV");
                div.className = "swiper-slide";
                div.style = "cursor:pointer; background-image:url(" + convertGDlink(obj.imglink) + ")";
                // div.style = "background-image:url(" + convertGDlink(obj.imglink) + ")";

                var a = document.createElement("A");
                a.href = "/posts/"+obj.id;
                a.style = "width:90%; height:100%";
                console.log(a.href);

                // Title text
                var p = document.createElement("P");
                p.className = "swiper-title-text";
                var t = document.createTextNode(obj.title);
                p.appendChild(t);
                console.log(p);

                a.appendChild(p);
                div.appendChild(a);
                mySwiper.appendSlide(div);
                // document.getElementsByClassName("swiper-wrapper")[0].appendChild(div);
                // document.getElementById("swiper-wrapper").appendChild(div);
                // console.log(document.getElementsByClassName('swiper-wrapper'));

            }, this); 
        }

        console.log(document.getElementsByClassName("swiper-slide"));

    };

var initSwiper = function() {
    console.log("---initSwiper()");

    // var setSlideIndex = function(){
    //     if (mySwiper != null) {
    //         slideIndex = mySwiper.activeIndex;
    //         console.log("slideIndex: " + slideIndex);
    //         // Session.set("slideIndex", mySwiper.activeIndex);
    //     }
    // };


    console.log("mySwiper: " + mySwiper);
    if (mySwiper) {
        mySwiper.destroy();
    }
    mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fracion'
        //   clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    if (mySwiper != null && mySwiper.slides.length <= 1) { // 'mySwiper.slides.length' + 2
        console.log("Disable slide");
    } else {
    }

    if (mySwiper != null) {
        mySwiper.slideTo(slideIndex, 0);
    }
    // console.log(mySwiper);

}


var resetSwiper = function() {
    console.log("resetSwiper()")
    console.log(document.getElementsByClassName('swiper-slide'));
    console.log(mySwiper)

    var targetRemove = document.getElementsByClassName('swiper-slide');
    var len = targetRemove.length;
    console.log("len: " + len)


    if (mySwiper != null) {
        // var swiperWrapper = $('.swiper-wrapper');
        // mySwiper.destroy();
        // swiperWrapper.empty();
        // // $('.swiper-wrapper').arrt('style', '');
        // // mySwiper.removeAllSlides();
        // mySwiper.reInit();
    }


    // if (len > 0) {
    //     var parentNode = targetRemove.parentNode;
    //     while(parentNode.firstChild) {
    //         parentNode.removeChild(parentNode.firstChild);
    //     }
    // }
    
    // console.log(document.getElementsByClassName('swiper-slide'));

    
    // var previousSwiper = document.getElementById("swiper-wrapper");
    // if (previousSwiper){
    //     while (previousSwiper.firstChild) {
    //         previousSwiper.removeChild(previousSwiper.firstChild);
    //     }

    //     // clear swiper-wrapper style
    //     previousSwiper.style = "";
    // } else {
    //     console.log("No previous swiper")
    // }

    // console.log(Template.currentData());
    // console.log("swiper onRender() autorun");


}


Template.swiper.onCreated(function () {

    console.log("swiper created!!!!!");

});



Template.swiper.helpers({
    getTag: function (_tag) {
        console.log(_tag);
    },
    updateSwiper: function() {
        // console.log("updateSwiper()")
        // resetSwiper();
        // initSwiper();
    }
});


Template.swiper.events({

});

Template.swiper.onRendered(function () {

    this.autorun(function() {
    console.log("swiper onRendred()");
    Template.currentData();
    // var previousSwiper = document.getElementsByClassName("swiper-wrapper");
    // console.log("prev-onRendered()");
    // console.log(previousSwiper);

        initSwiper();
        delSwiper();
        addSliders();
    })
   // console.log(mySwiper);

    //     //clear previous swiper DOM
    //     var previousSwiper = document.getElementsByClassName("swiper-wrapper");
    //     if (previousSwiper){
    //         while (previousSwiper.firstChild) {
    //             previousSwiper.removeChild(previousSwiper.firstChild);
    //         }

    //         // clear swiper-wrapper style
    //         previousSwiper.style = "";
    //     } else {
    //         console.log("No previous swiper")
    //     }

    //     console.log(Template.currentData());
    //     console.log("swiper onRender() autorun");


    //     // var mySwiper = null;
    //     // mySwiper = null;

    //     // arr = Session.get("slideImages");
    //     arr = global_arr;
    //     console.log("swiper_onRendred() get slideimages : " + arr);

    //     if (arr != null) {
    //         arr.forEach(function(obj) {
    //             console.log(obj.imglink, obj.id);

    //             var div = document.createElement("DIV");
    //             div.className = "swiper-slide";
    //             div.style = "cursor:pointer; background-image:url(" + convertGDlink(obj.imglink) + ")";
    //             // div.style = "background-image:url(" + convertGDlink(obj.imglink) + ")";

    //             var a = document.createElement("A");
    //             a.href = "/posts/"+obj.id;
    //             a.style = "width:90%; height:100%";
    //             // console.log(a.href);

    //             // Title text
    //             var p = document.createElement("P");
    //             p.className = "swiper-title-text";
    //             var t = document.createTextNode(obj.title);
    //             p.appendChild(t);

    //             a.appendChild(p);
    //             div.appendChild(a);
    //             document.getElementsByClassName("swiper-wrapper")[0].appendChild(div);
    //             // document.getElementById("swiper-wrapper").appendChild(div);

    //         }, this); 
    //     }

    // console.log("out of autorun");

    // var setSlideIndex = function(){
    //     if (mySwiper != null) {
    //         slideIndex = mySwiper.activeIndex;
    //         console.log("slideIndex: " + slideIndex);
    //         // Session.set("slideIndex", mySwiper.activeIndex);
    //     }
    // };


    // console.log("mySwiper: " + mySwiper);
    // mySwiper = new Swiper('.swiper-container', {
    //     spaceBetween: 30,
    //     centeredSlides: true,
    //     autoplay: {
    //         delay: 2500,
    //         disableOnInteraction: false,
    //     },
    //     pagination: {
    //         el: '.swiper-pagination',
    //         type: 'fracion'
    //     //   clickable: true,
    //     },
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    // });

    // if (mySwiper != null && mySwiper.slides.length <= 1) { // 'mySwiper.slides.length' + 2
    //     console.log("Disable slide");
    // } else {
    // }

    // if (mySwiper != null) {
    //     mySwiper.slideTo(slideIndex, 0);
    // }

});