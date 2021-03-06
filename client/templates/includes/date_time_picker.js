var isEdit = false; // set true if it is on '/edit'

Template.dateTimePicker.onCreated(function() {
    console.log("DateTimePicker()");
    Session.set("date_begin", "");
    Session.set("date_end", "");

    if (this.data != null){
        isEdit = true;
        // console.log("isEdit: " + isEdit);
    } else {
        isEdit = false; // not edit, but submit.
    }


    console.log(moment());

});


Template.dateTimePicker.helpers({

});


Template.dateTimePicker.onRendered(function() {
    // console.log("onrendered: " + isEdit);

    if (isEdit){
        this.$('.datetimepicker_begin').datetimepicker({
            useCurrent: true,
            format: 'YYYY-MM-DD',
            date: this.data.dateBegin,
        });
        this.$('.datetimepicker_end').datetimepicker({
            useCurrent: true,
            format: 'YYYY-MM-DD',
            date: this.data.dateEnd,
        });
    } else {
        this.$('.datetimepicker_begin').datetimepicker({
            useCurrent: true,
            format: 'YYYY-MM-DD',
            defaultDate: moment() 
        });
        this.$('.datetimepicker_end').datetimepicker({
            useCurrent: true,
            format: 'YYYY-MM-DD',
            defaultDate: moment() 

        });
    } 

    Session.set("date_begin", this.$('.datetimepicker_begin').data("DateTimePicker").date().toDate());
    // console.log(this.$('.datetimepicker_begin').data("DateTimePicker").date().toDate());


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

