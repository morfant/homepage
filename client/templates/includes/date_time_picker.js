Template.dateTimePicker.onCreated(function() {
    Session.set("date_begin", "");
    Session.set("date_end", "");

});

Template.dateTimePicker.onRendered(function() {
    this.$('.datetimepicker_begin').datetimepicker();
    this.$('.datetimepicker_end').datetimepicker({
        useCurrent: false
    });
});



Template.dateTimePicker.events({

    'dp.change .datetimepicker_begin': function (e) {
        e.preventDefault();
        var date = moment(e.date).toDate();
        Session.set("date_begin", date);
        // console.log("date_begin: " + date);

    },
    'dp.change .datetimepicker_end': function (e) {
        e.preventDefault();
        var date = moment(e.date).toDate();
        Session.set("date_end", date);
        // console.log("date_end: " + date);
    }

});

