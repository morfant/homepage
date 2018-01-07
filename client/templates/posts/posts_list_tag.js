var tagLinkSpan;
var posts = [];

var getScrollPosition = function () {
    scroll_t = $(document).scrollTop();
    scroll_l = $(document).scrollLeft();
    // console.log(scroll_t);
    // console.log(scroll_l);
}

Template.postsListTag.onCreated(function() {


    /*
    // Tracker.autorun((computation) => {
        var tag = Router.current().params.tag;
        if (tag) {

            // reset slideImages - will be made by post_item.js
            console.log("postsListTag.onCreate() reset slideImages: " + tag);
            // Session.set("slideImages", null);
            global_arr = null;
            // console.log("session slideimages: " + Session.get("slideImages"));

        }
    // });
    */

    // attach handler
    $(document).on("scroll", getScrollPosition);
});


Template.postsListTag.helpers({
    posts: function (_tag) {
        // console.log("tag: " + _tag);
        // console.log(posts);

        // filter
        posts = Posts.find({tag: _tag}, {
            sort: {
                dateBegin : -1 //newer one will display on top.
            }
        });
        return posts;
    },

});


Template.postsListTag.onRendered(function() {

    /*
    // Tracker.autorun((computation) => {
    //     if (Router.current().params.tag) {

            // console.log("auto run postsListTag!");
            console.log("posts_list_tag rendered()");

            // posts = Posts.find({tag: Router.current().params.tag}, {
            //     sort: {
            //         dateBegin : -1 //newer one will display on top.
            //     }
            // });


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

            // var a = { imglink, id, title};
            // arr.push(a);
            console.log("posts_list_tag onRendered() slideImageArr: " + slideImageArr);

            // Session.set("slideImages", slideImageArr);
            global_arr = slideImageArr;
            // Session.set("isSwiperSet", false);
            Session.set("isSlideImagesSet", true);
            console.log("isSlideImages true!");

    //     }
    // });
*/

    // restore previous scroll position
    $(document).scrollTop(scroll_t);
    $(document).scrollLeft(scroll_l);

});


Template.postsListTag.onDestroyed(function() {

    // detach handler
    $(document).off("scroll");

    console.log("destroyed");
});
