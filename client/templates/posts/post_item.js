var arr = [];
var hasAlready;

Template.postItem.onCreated(function () {
  arr = Session.get("slideImages");
});

Template.registerHelper("addSlideImage", function (imglink, id, title) {

  if (imglink != "") {

    hasAlready = false;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        // console.log("has already same");
        hasAlready = true;
      }
    }

    if (!hasAlready) {
      var a = { imglink, id, title};
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
  },

  getDate: function() {

    var db = moment(this.dateBegin).format('MMM D');
    var de = moment(this.dateEnd).format('MMM D');

    if (db != de) {
      var mb = moment(this.dateBegin).month();
      var me = moment(this.dateEnd).month();

      if (mb == me){
        var period = db + " ~ " + moment(this.dateEnd).date();
      } else {
        var period = db + " ~ " + de;
      }
      return period;

    } else {
      return de;
    }

  },

  // getDateBegin: function() {
  //   var date = this.dateBegin;
  //   return moment(date).format('MMM, DD');
  // },

  // getDateEnd: function() {
  //   var date = this.dateEnd;
  //   return moment(date).format('MMM, DD');
  // }

});