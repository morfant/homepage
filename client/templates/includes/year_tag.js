Template.yearTag.helpers({

    year: function() {
        return "2017";
    }

});



Template.yearTag.events({
    '#year': function (e) {
        e.preventDefault();
        console.log("click year tag");
    }
});