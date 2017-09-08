Template.file.helpers({
    imageFile() {
        return Images.findOne();
    },
    videoFile() {
        return Videos.findOne();
    }
});