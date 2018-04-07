Template.slideImages.created = function () {
    
    console.log("slideImages() create");

    /*

    var _tag = Router.current().params.tag;

    if (_tag == undefined) {
        posts = Posts.find();
    } else {
        posts = Posts.find({tag: _tag}, {
            sort: {
                dateBegin : -1 //newer one will display on top.
            }
        });
    }


    var postsArr = posts.fetch();
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

    console.log("slideImages onCreated() slideImageArr: " + slideImageArr);
    global_arr = slideImageArr;
    */

 

};

Template.slideImages.helpers({

    setSlideImages: function (_tag) {
        console.log("setSlideImages()");
        if (_tag == undefined) {
            posts = Posts.find();
        } else {
            posts = Posts.find({tag: _tag}, {
                sort: {
                    dateBegin : -1 //newer one will display on top.
                }
            });
        }


        var postsArr = posts.fetch();
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

        console.log("slideImages setSlideImages() slideImageArr: " + slideImageArr);
        global_arr = slideImageArr;
        console.log("global_arr");
        console.log(global_arr);
        // Session.set("slideImages", slideImageArr);


    }

});

