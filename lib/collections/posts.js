Posts = new Mongo.Collection('posts');

Posts.allow({
    update: ownsDocument,
    remove: ownsDocument
});


Posts.deny({
    update: function (userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.url;
    }
});

validatePost = function (post) {
    var errors = {};
    if (!post.title) errors.title = "Please fill in a headline";
    return errors;
}

Meteor.methods({
    postInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            desc: String,
            role: String,
            date: String,
            venue: String,
            text: String,
            tag: String,
        });

        var errors = validatePost(postAttributes);
        if (errors.title)
            throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

        var postWithSameLink = Posts.findOne({
            title: postAttributes.title
        });
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});