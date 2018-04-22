Template.postEdit.created = function () {
    Session.set('postEditErrors', {});

}

Template.postEdit.helpers({
    errorMessage: function (field) {
        return Session.get('postEditErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
    },
    // imageLink: function() {
    //     return 
    // }
});


Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentPostId = this._id;

        var tag = $(e.target).find('[name=tag]').val();
        var tags = postSubmitHandleTag(tag);

        var postProperties = {
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
            tag: tags
        };


        var errors = validatePost(postProperties);
        if (errors.title) return Session.set('postEditErrors', errors);

        Posts.update(currentPostId, {
            $set: postProperties
        }, function (error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                Router.go('postPage', {
                    _id: currentPostId
                });
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});