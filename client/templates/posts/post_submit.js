Template.postSubmit.created = function () {
    Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
    errorMessage: function (field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.postSubmit.events({
    'submit form': function (e) {
        e.preventDefault();

        var post = {
            title: $(e.target).find('[name=title]').val(),
            desc: $(e.target).find('[name=desc]').val(),
            role: $(e.target).find('[name=role]').val(),
            date: $(e.target).find('[name=date]').val(),
            venue: $(e.target).find('[name=venue]').val(),
            text:  $(e.target).find('[name=text]').val(),
            tag:  $(e.target).find('[name=tag]').val(),
        };

        console.log(post);

        var errors = validatePost(post);
        if (errors.title) return Session.set('postSubmitErrors', errors);

        Meteor.call('postInsert', post, function (error, result) { // display the error to the user and abort 
            if (error) return throwError(error.reason);

            if (result.postExists) throwError('This title has already been posted');

            Router.go('postPage', {
                _id: result._id
            });

        });

    }
});