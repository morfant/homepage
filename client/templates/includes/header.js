
Template.header.events({

    // when click link on expanded menu, it collapse automatically
    'click .navbar-nav' : function (e) {
        $('#navigation').collapse('hide')
    }

});