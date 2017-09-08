var post = null;
var googleDriveConvertPrefix = "https://drive.google.com/uc?export=view&id=";

Template.postPage.helpers({

    imageLink: function(idx) {
        post = Posts.findOne({_id: this._id});
        var urls = [post.imageLink_0, post.imageLink_1, post.imageLink_2];
        var imageIds = [];
        for (var i = 0; i < 3; i++) {
            if (urls[i] != "") {
                imageIds[i] = googleDriveConvertPrefix + urls[i].split("id=")[1];
            }
            else {
                imageIds[i] = "";
            }
        }
        return imageIds[idx];
    },

    imageName: function() {
        if (post != null) {
            return post.imageName;
        } else {
            return "";
        }
    }
});