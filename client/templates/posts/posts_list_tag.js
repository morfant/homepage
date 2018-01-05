
var getScrollPosition = function () {
    scroll_t = $(document).scrollTop();
    scroll_l = $(document).scrollLeft();
    // console.log(scroll_t);
    // console.log(scroll_l);
}

Template.postsListTag.onCreated(function() {
    // attach handler
    $(document).on("scroll", getScrollPosition);
});


Template.postsListTag.helpers({
    posts: function (_tag) {
        // console.log(tag);
        // console.log(posts);

        // filter
        return Posts.find({tag: _tag}, {
            sort: {
                dateBegin : -1 //newer one will display on top.
            }
        });
    },

});


Template.postsListTag.onRendered(function() {

    // restore previous scroll position
    $(document).scrollTop(scroll_t);
    $(document).scrollLeft(scroll_l);

});


Template.postsListTag.onDestroyed(function() {

    // detach handler
    $(document).off("scroll");
});
