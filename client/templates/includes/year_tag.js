var year = 0;

Template.yearTag.onCreated(function() {

});



Template.registerHelper("getYear", function(dateBegin){
    var y = moment(dateBegin).year();
    // console.log("getyear(): " + y);
    
    if (y != year) {
        year = y;
        // console.log("true");
        return true;
    } else {
        // console.log("false");
        return false;
    }


 });


Template.yearTag.helpers({
    year: function() {
        // console.log("year(): " + year.toString());
        return year.toString();
    },
});



Template.yearTag.events({
    'click #year-tag': function (e) {
        e.preventDefault();
        console.log("click year tag: " + e.target.textContent);
    }
});