Template.cvPage.onCreated(function() {
});


Template.cvPage.helpers({
    getCVtext: function (){
        var text = Settings.findOne({
            cvText: {$exists: true}
        });

        if (!text) {
            console.log("No cv text exists!");
            return false;
        }

        lineBreakText = text.cvText.replace(/\n/g, "<br />");
        return lineBreakText;
    }

});
