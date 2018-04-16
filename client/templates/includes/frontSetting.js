Template.frontSetting.created = function () {
    console.log("frontSetting created()")
    Session.set('frontSettingSubmitErrors', {});
}


Template.frontSetting.helpers({
    errorMessage: function (field) {
        return Session.get('frontSettingSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('frontSettingSubmitErrors')[field] ? 'has-error' : '';
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

    }

});


Template.frontSetting.events({

    'submit form': function (e) {
        e.preventDefault();

        var settings = {
            frontImageLink: convertGDlink($(e.target).find('[name=front-image]').val()),
        }

        console.log(settings);

        var errors = validateSettings(settings);
        if (errors.frontImageLink) return Session.set('frontSettingSubmitErrors', errors);

        Meteor.call('updateSetting', settings, function (error, result) { // display the error to the user and abort 
            if (error) return throwError(error.reason);

            // console.log(result);
            Router.go('frontGate', {
            });

        });

    }
});
