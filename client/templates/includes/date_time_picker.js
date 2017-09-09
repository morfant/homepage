Template.dateTimePicker.onRendered(function() {
    this.$('.datetimepicker_begin').datetimepicker();
    this.$('.datetimepicker_end').datetimepicker({
        // useCurrent: false;
    });

});



Template.dateTimePicker.events({

    '.datetimepicker_begin': function (e) {
        e.preventDefault();
        $('.datetimepicker_end').data("DateTimePicker").minDate(e.date);
    },
    '.datetimepicker_end': function (e) {
        e.preventDefault();
        $('.datetimepicker_begin').data("DateTimePicker").maxDate(e.date);
    }

});

