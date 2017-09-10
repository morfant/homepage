var isEdit = false;

Template.dateTimePicker.onCreated(function() {
    Session.set("date_begin", "");
    Session.set("date_end", "");

    if (this.data != null){
        isEdit = true;
        // console.log("isEdit: " + isEdit);
    } else {
        isEdit = false; // not edit, but submit.
    }


});


Template.dateTimePicker.helpers({

});


Template.dateTimePicker.onRendered(function() {
    // console.log("onrendered: " + isEdit);

    if (isEdit){
        this.$('.datetimepicker_begin').datetimepicker({
            format: 'YYYY-MM-DD',
            date: this.data.dateBegin,
        });
        this.$('.datetimepicker_end').datetimepicker({
            format: 'YYYY-MM-DD',
            date: this.data.dateEnd,
        });
    } else {
        this.$('.datetimepicker_begin').datetimepicker({
            format: 'YYYY-MM-DD'
        });
        this.$('.datetimepicker_end').datetimepicker({
            useCurrent: false,
            format: 'YYYY-MM-DD'
        });


    } 


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

