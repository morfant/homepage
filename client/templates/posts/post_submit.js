Template.postSubmit.created = function () {
    // console.log("postSubmit created()")
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

        // if 'date_end' is empty, fill with 'date_begin'
        if (Session.get("date_end") == "") Session.set("date_end", Session.get("date_begin"));

        var tag = $(e.target).find('[name=tag]').val();
        var tags = postSubmitHandleTag(tag);

        var post = {
            title: $(e.target).find('[name=title]').val(),
            desc: $(e.target).find('[name=desc]').val(),
            role: $(e.target).find('[name=role]').val(),
            dateBegin: Session.get("date_begin"),
            dateEnd: Session.get("date_end"),
            venue: $(e.target).find('[name=venue]').val(),
            text:  $(e.target).find('[name=text]').val(),
            audioLink: $(e.target).find('[name=audio-link]').val(),
            imageLink_0: $(e.target).find('[name=image-link-0]').val(),
            imageLink_1: $(e.target).find('[name=image-link-1]').val(),
            imageLink_2: $(e.target).find('[name=image-link-2]').val(),
            videoLink: $(e.target).find('[name=video-link]').val(),
            // imageName:  $(e.target).find('[name=imageName]').val(),
            tag: tags // Array
        };

        // console.log(post);

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