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
    }
});

