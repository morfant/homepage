Settings = new Mongo.Collection('settings');

Settings .allow({
    update: ownsDocument,
    remove: ownsDocument
});


Settings.deny({
});

validateSettings = function (settings) {
    var errors = {};
    if (!settings.frontImageLink) errors.frontImageLink = "Please fill in a front gate backgrond image link";
    return errors;
}


Meteor.methods({
    updateSetting: function (settings) {
        check(Meteor.userId(), String);
        check(settings, {
            frontImageLink: String,
        });

        var user = Meteor.user();

        var newSettings = _.extend(settings, {
            submitted: new Date()
        });

        console.log(newSettings);

        // var settingsId = Settings.insert(newSettings);
        var o = Settings.upsert(
            {frontImageLink: {$exists: true}},
            { $set: newSettings },
            function (error, result) {
                if (error) {
                    // display the error to the user
                    throwError(error.reason);
                } else {
                    console.log(result);
                    return result;
                }
            }
        );


        // Settings.update(currentPostId, {
        //     $set: postProperties
        // }, function (error) {
        //     if (error) {
        //         // display the error to the user
        //         throwError(error.reason);
        //     } else {
        //         Router.go('postPage', {
        //             _id: currentPostId
        //         });
        //     }
        // });
    }
});

