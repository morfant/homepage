var arr = [];
mySwiper = null;

/* functions */
var initSwiper = function() {
    // console.log("---initSwiper()");

    // console.log("mySwiper: " + mySwiper);
    if (mySwiper) {
        mySwiper.destroy();
    }
    mySwiper = new Swiper('.swiper-container', {
        mode: 'horizontal',
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
        calculateHeight: true
    })

}


var delSwiper = function(){
    // console.log("---delSwiper()");

    // clear previous swiper DOM
    var previousSwiper = document.getElementsByClassName("swiper-wrapper");
    if (previousSwiper){
        mySwiper.removeAllSlides(); // swiper js API
    }
    // console.log(document.getElementsByClassName("swiper-slide"));
}


var addSliders = function() {
    // console.log("---addSliders()");
        
    arr = global_arr;
    // console.log("addSliders() get slideimages : " + arr);

    if (arr != null) {
        arr.forEach(function(obj) {
            // console.log(obj.imglink, obj.id);

            var div = document.createElement("DIV");
            div.className = "swiper-slide";
            div.style = "cursor:pointer; background-image:url(" + convertGDlink(obj.imglink) + ")";
            // div.style = "background-image:url(" + convertGDlink(obj.imglink) + ")";

            var a = document.createElement("A");
            a.href = "/post/"+obj.id; // link on the slide image
            a.style = "width:90%; height:100%";
            // console.log(a.href);

            // Title text
            var p = document.createElement("P");
            p.className = "swiper-title-text";
            var t = document.createTextNode(obj.title);
            p.appendChild(t);
            // console.log(p);

            a.appendChild(p);
            div.appendChild(a);
            mySwiper.appendSlide(div); // swiper js API

        }, this); 
    }

    // console.log(document.getElementsByClassName("swiper-slide"));
};



Template.swiper.onCreated(function () {
    // console.log("swiper created!!!!!");
});



Template.swiper.helpers({
    getTag: function (_tag) {
        // console.log(_tag);
    },
});


Template.swiper.events({

});


Template.swiper.onRendered(function () {

    this.autorun(function() {
        // console.log("swiper onRendred()");
        Template.currentData();

        // keep running order : mySwiper has to be instanciated first.
        initSwiper();
        delSwiper();
        addSliders();

    })


});