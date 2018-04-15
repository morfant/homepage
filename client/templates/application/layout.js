Template.layout.helpers({
    pageTitle: function () {
        return Session.get('pageTitle');
    },
    onGate: function() {
        console.log(Router.current().route.getName());
        if (Router.current().route.getName() == 'frontGate') {
            return true;
        } else {
            return false;
        }
    }
});