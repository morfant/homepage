Template.postEdit.created = function () {
    Session.set('postEditErrors', {});
}

Template.postEdit.helpers({
    errorMessage: function (field) {
        return Session.get('postEditErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
    }
});


Template.postEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            title: $(e.target).find('[name=title]').val(),
            desc: $(e.target).find('[name=desc]').val(),
            role: $(e.target).find('[name=role]').val(),
            date: $(e.target).find('[name=date]').val(),
            venue: $(e.target).find('[name=venue]').val(),
            text:  $(e.target).find('[name=text]').val(),
            tag:  $(e.target).find('[name=tag]').val(),
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