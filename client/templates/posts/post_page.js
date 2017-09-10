
var post = null;

Template.postPage.onCreated(function () {

});

Template.postPage.helpers({

    imageLink: function (idx) {
        post = Posts.findOne({
            _id: this._id
        });
        var urls = [post.imageLink_0, post.imageLink_1, post.imageLink_2];
        var imageIds = [];
        for (var i = 0; i < 3; i++) {
            imageIds[i] = convertGDlink(urls[i]);
        }
        return imageIds[idx];
    },

    imageName: function () {
        if (post != null) {
            return post.imageName;
        } else {
            return "";
        }
    },

    audioLink: function () {
        if (post != null) {
            var url = post.audioLink;
            return convertGDlink(url);
        } else {
            post = Posts.findOne({
                _id: this._id
            });
        }
    },

    videoLink: function () {
        if (post != null) {
            var url = post.videoLink;
            return convertGDlink(url);
        } else {
            post = Posts.findOne({
                _id: this._id
            });
        }
    }


});