Template.slideImages.created = function () {
    
    console.log("slideImages() create");

};

Template.slideImages.helpers({

    setSlideImages: function () {
        console.log("setSlideImages()");
        // console.log(Template.currentData());

        var postsArr = this;
        var slideImageArr = [];
        // Session.set("slideImages", slideImageArr);

        postsArr.forEach(function(obj) {
            var l = obj.imageLink_0;
            var i = obj._id;
            var t = obj.title;
            // console.log(l, i, t);
            if (l) {
                var a = {imglink: l, id: i, title: t};
                slideImageArr.push(a);
            }
        }, this);

        // console.log("slideImages setSlideImages() slideImageArr: " + slideImageArr);
        global_arr = slideImageArr;
        // console.log("global_arr");
        // console.log(global_arr);
        // Session.set("slideImages", slideImageArr);


    }

});

