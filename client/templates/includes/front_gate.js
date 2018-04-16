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
            console.log("No link exists!");
            return false;
        }

        return link.frontImageLink;

    }

});