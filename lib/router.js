lastRoute = "";

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('posts'), Meteor.subscribe('settings');
    }
});

Router.route('/', {
    name: 'frontGate',
});

Router.route('/setting', {
    name: 'frontSetting',
});

Router.route('/cv', {
    name: 'cvPage',
});

Router.route('/posts/:tag?', {
    name: 'postsList',
    data: function () {

        // if (this.params.tag) {
        //     var tagHolder = new Object();
        //     tagHolder.tag = this.params.tag;
        //     // console.log(tagHolder.tag);
        //     return tagHolder;
        // }

        // var holder = new Object();

        // console.log("router - postsLIst: " + this.params.tag);
        let _tag = this.params.tag;
        let posts = null;

        if (_tag) {
            // return Posts.find({tag: _tag}, {
            posts = Posts.find({tag: _tag}, {
                sort: {
                    dateBegin : -1 //newer one will display on top.
                    // dateBegin : 1 //newer one will display on top.
                }
            }).fetch();
        } else {
            posts = Posts.find({}, {
                sort: {
                    dateBegin : -1
                    // dateBegin : 1
                }
            }).fetch();
        }

        // holder.tag = this.params.tag;
        // holder.data = posts;
        return posts;

        // return holder;

    }

});

Router.route('/post/:_id', {
    name: 'postPage',
    data: function () {
        var r = Posts.findOne(this.params._id);
        // console.log(r);
        return r;
    }
});

Router.route('/posts/category/:tag', {
    name: 'postsList_tag',
    data: function () {
        var tagHolder = new Object();
        tagHolder.tag = this.params.tag;
        // console.log(tagHolder);
        return tagHolder;
    },
});


Router.route('/edit/:_id', {
    name: 'postEdit',
    data: function () {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/submit', {
    name: 'postSubmit',
    data: function() {
        console.log("postSubmit!!!")
    }
});

Router.route('/adminSetup', {
    name: 'adminSetup'
});


var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

var resetScrollPosition = function () {

    // reset scroll position for viewing each page
    $(document).scrollTop(0);
    $(document).scrollLeft(0);
    this.next();
}



var setLastRoute = function () {
    var r = Router.current().route.getName();
    lastRoute = r;
    console.log("set lastRoute: " + lastRoute);
    // Session.set("lastRoute", r);
}


// hook
Router.onBeforeAction(requireLogin, {
    only: 'postSubmit'
});
// Router.onBeforeAction('dataNotFound', {
//     only: 'postPage'
// });
Router.onBeforeAction(resetScrollPosition, {
    only: 'postPage'
});

// Router.onRerun(resetSwiperTag, {
//     only: 'postsList_tag',
// });

// Router.onBeforeAction(reRenderSwiper, {
//     only: 'postsList_tag',
// });

// Router.onBeforeAction(resetSwiperTag, {
//     only: 'postsList',
// });

// Router.onAfterAction(setLastRoute, {
//     only: 'postsList_tag'
// });


Router.onAfterAction(function() {
    // console.log("ON AFTER ACTION");

    let currentPath = Iron.Location.get().path;
    global_url = currentPath;
});



Router.onStop(function(){
    // console.log("ONSTOP()");
});

// onBeforeAction is executed before actually going to a new route
Router.onBeforeAction(function(){
    // console.log("ONBEFOREACTION()");
    let currentPath = Iron.Location.get().path;
    let previousLocationPath = global_url;
    if (previousLocationPath != currentPath) {
        // console.log("ROUTE CHANGED!!!");
        global_prevYear = 0; global_renderedLength = 0;
    }
    // else continue to the regular route we were heading to
    this.next();
});
