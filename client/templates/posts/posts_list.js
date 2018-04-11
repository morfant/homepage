var tagLinkSpan;

var getScrollPosition = function () {
    scroll_t = $(document).scrollTop();
    scroll_l = $(document).scrollLeft();
    // console.log(scroll_t);
    // console.log(scroll_l);
}

Template.postsList.onCreated(function() {

    // reset slideImages - will be made by post_item.js
    // console.log("postsList.onCreate() reset slideImages");
    // Session.set("slideImages", null);
    // global_arr = null;
    // console.log("session slideimages: " + Session.get("slideImages"));


    // attach handler
    $(document).on("scroll", getScrollPosition);
});


Template.postsList.helpers({
    posts: function (_tag) {

        var posts = [];

        if (_tag == undefined) {
            posts = Posts.find({}, {
                    sort: {
                        dateBegin : -1
                    }
                });
        } else {
            posts = Posts.find({tag: _tag}, {
                sort: {
                    dateBegin : -1 //newer one will display on top.
                    // dateBegin : 1 //newer one will display on top.
                }
            });
        }
        console.log(posts.fetch());
        return posts;
    },

});


Template.postsList.onRendered(function() {
    // console.log("posts_list rendered()");

    // made from mind_map.js
    var tagsObj = Session.get("all_tags");

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
        a.href = PATH_postList + k; // link on the tag links (on header bar)
        a.appendChild(linkText);
        tagLinkSpan.appendChild(a); // attach to holder
    }

    // console.log("posts_list onRendered() make links");
    document.getElementById("tag-links").appendChild(tagLinkSpan);


    // restore previous scroll position
    $(document).scrollTop(scroll_t);
    $(document).scrollLeft(scroll_l);


});


Template.postsList.onDestroyed(function() {

    // detach handler
    $(document).off("scroll");
});
