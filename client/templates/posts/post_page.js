
var post = null;

var hasImage = [false, false, false];
var hasVideo = false;
var hasAudio = false;

Template.postPage.onCreated(function () {


});

Template.postPage.helpers({

    htmlText: function () {

        post = Posts.findOne({
            _id: this._id
        });

        // Keep replace order
        // lineBreakText = post.text.replace(/\</g, "&lt;");
        // lineBreakText = lineBreakText.replace(/\>/g, "&gt;");
        // lineBreakText = lineBreakText.replace(/\n/g, "<br />");

        lineBreakText = post.text.replace(/\n/g, "<br />");
        // console.log(lineBreakText);
        return lineBreakText;
    },

    imageLink: function (idx) {

        var urls = [post.imageLink_0, post.imageLink_1, post.imageLink_2];
        // console.log(urls);
        var imageIds = [];
        for (var i = 0; i < 3; i++) {
            if (urls[i] != "") {
                imageIds[i] = convertGDlink(urls[i]);
                hasImage[i] = true;
            }
        }
        // console.log(hasImage);
        return imageIds[idx];
    },

    getHasImage: function(idx) {
        return hasImage[idx];
    },

    getHasVideo: function() {
        return hasVideo;
    },

    getHasAudio: function() {
        return hasAudio;
    },

    isImageEmpty: function () {

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
            if (url != "") hasAudio = true;
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
            if (url != "") hasVideo = true;
            return convertGDlink(url);
        } else {
            post = Posts.findOne({
                _id: this._id
            });
        }
    }


});