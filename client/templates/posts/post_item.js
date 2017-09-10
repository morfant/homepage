var arr = [];
var hasAlready;

Template.postItem.onCreated(function () {
  arr = Session.get("slideImages");
});

Template.registerHelper("addSlideImage", function (imglink, id) {

  if (imglink != "") {

    hasAlready = false;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        // console.log("has already same");
        hasAlready = true;
      }
    }

    if (!hasAlready) {
      var a = { imglink, id };
      arr.push(a);
      Session.set("slideImages", arr);
    }
  }

});

Template.postItem.helpers({

  ownPost: function () {
    return this.userId === Meteor.userId();
  },

  domain: function () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }

});