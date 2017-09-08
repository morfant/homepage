Template.linkimage.helpers({

    imagelink: function(url) {
        var imageId = url.split("id=")[1];
        return "https://drive.google.com/uc?export=view&id="+imageId;
    },

    imagename() {
        return "ththth";
    }
});