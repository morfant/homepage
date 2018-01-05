var filterdId = [];

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
        console.log("posts()");
        return Posts.find({}, {
            sort: {
                dateBegin : -1 //newer one will display on top.
            }
        });
    },

});


Template.postsList.onRendered(function() {

    // restore previous scroll position
    $(document).scrollTop(scroll_t);
    $(document).scrollLeft(scroll_l);

});


Template.postsList.onDestroyed(function() {
    // detach handler
    $(document).off("scroll");
});
