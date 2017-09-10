
var post = null;

Template.postPage.onCreated(function () {
    // console.log(Session.get("slideImages"))
    // console.log("onCreated()");
    // post = Posts.findOne({_id: this._id});
    // console.log(post);
    console.log(Session.get("slideIndex"));
    // console.log(mySwiper.clickedIndex);
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
            // if (urls[i] != "") {
            //     imageIds[i] = googleDriveConvertPrefix + urls[i].split("id=")[1];
            // } else {
            //     imageIds[i] = "";
            // }
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
            // return googleDriveConvertPrefix + url.split("id=")[1];
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
            // return googleDriveConvertPrefix + url.split("id=")[1];
        } else {
            post = Posts.findOne({
                _id: this._id
            });
        }
    }


});