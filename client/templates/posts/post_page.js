
var post = null;

var hasImage = [false, false, false];
var hasVideo = false;
var hasAudio = false;

Template.postPage.onCreated(function () {


});

var makeTagLinks = function(tag_array) {

    // let tagLinks = document.createElement('span');
    let tagLinks = document.getElementById('tags')

    Object.keys(tag_array).forEach(function(key) {
        // console.log(key)
        // console.log(tag_array[key])

        let t = tag_array[key];

        let a = document.createElement('a');
        a.href = PATH_postList + t;
        a.className = "post-page-tag-links-a";
        let text = document.createTextNode("#" + t);
        a.appendChild(text);
        tagLinks.appendChild(a);

        if (key != tag_array.length - 1) {
            let spliter = document.createTextNode(", ");
            tagLinks.appendChild(spliter);
        }

    })

}

Template.postPage.helpers({
    tags: function() {
        // console.log(this.tag)
        // console.log((this.tag).length);
        return (this.tag).length;

    },
    ownPost: function () {
        return this.userId === Meteor.userId();
    },

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

    checkLink: function() {
        post = Template.currentData();

        if (post != null) {

            //img
            var urls = [post.imageLink_0, post.imageLink_1, post.imageLink_2];
            for (var i = 0; i < IMAGE_MAX_NUM; i++) {
                if (urls[i] != "") { hasImage[i] = true; }
            }
    
            //audio
            var url_audio = post.audioLink;
            if (url_audio != "") hasAudio = true;

            //video
            var url_video = post.videoLink;
            if (url_video != "") hasVideo = true;

        } else {
            post = Posts.findOne({
                _id: this._id
            });
        }

        // console.log(hasAudio);
        // console.log(hasImage)


    },

    imageLink: function (idx) {

        var urls = [post.imageLink_0, post.imageLink_1, post.imageLink_2];
        // console.log(urls);
        var imageIds = [];
        for (var i = 0; i < 3; i++) {
            if (urls[i] != "") {
                imageIds[i] = convertGDlink(urls[i]);
                // hasImage[i] = true;
            }
        }
        // console.log(hasImage);
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
            // if (url != "") hasAudio = true;
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
            // if (url != "") hasVideo = true;
            // console.log(hasVideo);
            return convertGDlink(url);
        } else {
            post = Posts.findOne({
                _id: this._id
            });
        }
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



});


Template.postPage.events({
    'click .back-to-list' : function(e) {
        // console.log("back")
        history.back();
    }
});

Template.postPage.onRendered(function () {

    makeTagLinks(Template.currentData().tag)



});