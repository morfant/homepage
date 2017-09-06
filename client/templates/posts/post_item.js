Template.postItem.helpers({

  ownPost: function () {
    return this.userId === Meteor.userId();
  },

  desc: function () {
    // Find desc of this post
    return "멀티미티어 음악공연";

  },

  domain: function () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }

});