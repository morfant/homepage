
Template.frontGate.onCreated(function() {
    // Meteor.call('imgLoading', ' ', function(error, result) {
    //     if (error) return throwError(error.reason);

    //     console.log(result);
    // });
    // imgLoading();
});


Template.frontGate.helpers({
    convertImgLink: function(img_link_from_google_drive) {

        console.log(convertGDlink(img_link_from_google_drive))
        return convertGDlink(img_link_from_google_drive);
    },

    getImageLink: function (){
        var link = Settings.findOne({
            frontImageLink: {$exists: true}
        });

        if (!link) {
            // console.log("No link exists!");
            return false;
        }

        return link.frontImageLink;

    },

    // loadImg: function() {
    //     console.log("loadImg()")
    //     var img = new Image();
    //     img.load(convertGDlink("https://drive.google.com/open?id=0B5O0D-88dhuVdmZPSG9VTjM4SGc"));
    //     document.getElementById('front-gate-image').appendChild(img);
    // }

});

var loadImg = function() {

    console.log("loadImg()")
    let img = new Image();
    img.load(convertGDlink("https://drive.google.com/open?id=0B5O0D-88dhuVdmZPSG9VTjM4SGc"));
    document.getElementById('front-gate-image').appendChild(img);
}


Template.frontGate.onRendered(function() {

    // loadImg();

});

