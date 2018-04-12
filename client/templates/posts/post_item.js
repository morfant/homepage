var arr = [];
var hasAlready;

Template.postItem.onCreated(function () {
    // console.log("post_item created");
    // arr = Session.get("slideImages");
});

Template.registerHelper("addSlideImage", function (imglink, id, title) {
    // var arr = [];

    arr = Session.get("slideImages");
    console.log("addSlideImage: " + arr);

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
    getYear: function() {
        var date = moment(this.dateBegin).format('YYYYMMDD')
        return date;
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

    showTags: function (tag) {

        var displayTags = [];
        if (tag != null && tag.length) {
            tag.forEach(function (t) {
                displayTags.push(' #' + t);
            });
        }

        return displayTags;
    }

  // getDateBegin: function() {
  //   var date = this.dateBegin;
  //   return moment(date).format('MMM, DD');
  // },

  // getDateEnd: function() {
  //   var date = this.dateEnd;
  //   return moment(date).format('MMM, DD');
  // }

});


Template.postItem.onRendered(function () {

    this.autorun(() => {
        console.log("post_item rendered");

        global_renderedLength = global_renderedLength + 1;
        console.log(global_renderedLength);
        // console.log(Session.get('postLength'));

        if (global_renderedLength == Session.get('postLength')) {
            console.log("All posts rendered!!");
            Session.set('postItemAllRendered', true);
        };

    });

});