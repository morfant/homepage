

Template.postsList.onCreated(function() {

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