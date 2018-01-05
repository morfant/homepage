var tagLinkSpan;

var getScrollPosition = function () {
    scroll_t = $(document).scrollTop();
    scroll_l = $(document).scrollLeft();
    // console.log(scroll_t);
    // console.log(scroll_l);
}

Template.postsList.onCreated(function() {
    // attach handler
    $(document).on("scroll", getScrollPosition);
});


Template.postsList.helpers({
    posts: function () {
        return Posts.find({}, {
            sort: {
                dateBegin : -1 //newer one will display on top.
            }
        });
    },

});


Template.postsList.onRendered(function() {

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

    document.getElementById("tag-links").appendChild(tagLinkSpan);



    // restore previous scroll position
    $(document).scrollTop(scroll_t);
    $(document).scrollLeft(scroll_l);

});


Template.postsList.onDestroyed(function() {

    // detach handler
    $(document).off("scroll");
});
