var posts = [];
var tagLinkSpan;

var getScrollPosition = function () {
    scroll_t = $(document).scrollTop();
    scroll_l = $(document).scrollLeft();
    // console.log(scroll_t);
    // console.log(scroll_l);
}

Template.postsList.onCreated(function() {

    // reset slideImages - will be made by post_item.js
    console.log("postsList.onCreate() reset slideImages");
    // Session.set("slideImages", null);
    // global_arr = null;
    // console.log("session slideimages: " + Session.get("slideImages"));


    // attach handler
    $(document).on("scroll", getScrollPosition);
});


Template.postsList.helpers({
    posts: function () {
        posts = Posts.find({}, {
            sort: {
                dateBegin : -1 //newer one will display on top.
            }
        });

        return posts;
    },

});


Template.postsList.onRendered(function() {
    console.log("posts_list rendered()");

    /*
    var postsArr = posts.fetch();
    var slideImageArr = [];

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
    console.log("posts_list onRendered() slideImageArr: " + slideImageArr);
    // Session.set("slideImages", slideImageArr);
    global_arr = slideImageArr;
    // Session.set("isSwiperSet", false);
    Session.set("isSlideImagesSet", true);
    console.log("isSlideImages true!");
    */


    // made from mind_map.js
    var tagsObj = Session.get("tagsWithNum");

    // clear previous tag links holder
    if (tagLinkSpan) {
        tagLinkSpan.outerHTML = "";
        delete tagLinkSpan;
    }

    // Make new tag links holder
    tagLinkSpan = document.createElement("SPAN");
    
    for (k in tagsObj) {
        // console.log(k); // key
        // console.log(tagsObj[k]); // value

        // Tag links on navbar (header.html)
        var linkText = document.createTextNode(" " + k);
        var a = document.createElement("A");
        a.href = "/posts/category/"+k;
        a.appendChild(linkText);
        tagLinkSpan.appendChild(a); // attach to holder
    }

    console.log("posts_list onRendered() make links");
    document.getElementById("tag-links").appendChild(tagLinkSpan);



    // restore previous scroll position
    $(document).scrollTop(scroll_t);
    $(document).scrollLeft(scroll_l);


});


Template.postsList.onDestroyed(function() {

    // detach handler
    $(document).off("scroll");
});
