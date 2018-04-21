Template.frontSetting.created = function () {
    console.log("frontSetting created()")
    Session.set('settingsSubmitErrors', {});
}


Template.frontSetting.helpers({
    errorMessage: function (field) {
        return Session.get('settingsSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('settingsSubmitErrors')[field] ? 'has-error' : '';
    },
    getFrontImageLink: function (){
        var link = Settings.findOne({
            frontImageLink: {$exists: true}
        });

        if (!link) {
            console.log("No link exists!");
            return false;
        }

        return link.frontImageLink;
    },
    getCVtext: function (){
        var text = Settings.findOne({
            cvText: {$exists: true}
        });

        if (!text) {
            console.log("No cv text exists!");
            return false;
        }

        return text.cvText;
    }



});


Template.frontSetting.events({

    'submit form': function (e) {
        e.preventDefault();

        var settings = {
            frontImageLink: convertGDlink($(e.target).find('[name=front-image]').val()),
            cvText: $(e.target).find('[name=cv-text]').val(),
        }

        // console.log(settings);

        var errors = validateSettings(settings);
        if (errors.frontImageLink) return Session.set('settingsSubmitErrors', errors);
        if (errors.cvText) return Session.set('settingsSubmitErrors', errors);

        Meteor.call('updateSetting', settings, function (error, result) { // display the error to the user and abort 
            if (error) return throwError(error.reason);

            // console.log(result);
            Router.go('frontGate', {
            });

        });

    }
});
